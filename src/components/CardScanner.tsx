import { useState, useRef, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Camera, Upload, Loader2, CheckCircle, X } from 'lucide-react';
import { createWorker } from 'tesseract.js';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface PokemonCard {
  id: string;
  name: string;
  set: {
    name: string;
    series: string;
  };
  rarity: string;
  images: {
    small: string;
    large: string;
  };
  tcgplayer?: {
    prices?: {
      holofoil?: {
        market?: number;
      };
      normal?: {
        market?: number;
      };
    };
  };
}

interface CardScannerProps {
  onCardSaved: (card: PokemonCard) => void;
  onClose: () => void;
}

export function CardScanner({ onCardSaved, onClose }: CardScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [detectedText, setDetectedText] = useState<string>('');
  const [matchedCard, setMatchedCard] = useState<PokemonCard | null>(null);
  const [capturedImage, setCapturedImage] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      if (videoRef.current) {
        const video = videoRef.current;
        video.srcObject = stream;
        // Ensure metadata is loaded before enabling scanning
        await new Promise<void>((resolve) => {
          if (video.readyState >= 2) return resolve();
          const onLoaded = () => {
            video.removeEventListener('loadedmetadata', onLoaded);
            resolve();
          };
          video.addEventListener('loadedmetadata', onLoaded, { once: true });
        });
        await video.play();
        setIsScanning(true);
      }
    } catch (error) {
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please try uploading an image instead.",
        variant: "destructive"
      });
    }
  }, [toast]);

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsScanning(false);
  }, []);

  const capturePhoto = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    // Ensure video has valid dimensions
    if (video.videoWidth === 0 || video.videoHeight === 0) {
      await new Promise((r) => setTimeout(r, 150));
    }

    const width = video.videoWidth || 1280;
    const height = video.videoHeight || 720;
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(video, 0, 0, width, height);
    
    const imageData = canvas.toDataURL('image/jpeg');
    setCapturedImage(imageData);
    stopCamera();
    await processImage(imageData);
  }, [stopCamera]);

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const imageData = e.target?.result as string;
      setCapturedImage(imageData);
      await processImage(imageData);
    };
    reader.readAsDataURL(file);
  }, []);

  const processImage = async (imageData: string) => {
    setIsProcessing(true);
    try {
      // OCR Processing
      const worker = await createWorker('eng');
      const { data: { text } } = await worker.recognize(imageData);
      await worker.terminate();
      
      setDetectedText(text);
      
      // Extract card information from OCR text
      const cardName = extractCardName(text);
      
      if (cardName) {
        // Search Pokemon TCG API
        const matchedCard = await searchPokemonCard(cardName);
        if (matchedCard) {
          setMatchedCard(matchedCard);
          toast({
            title: "Card Found!",
            description: `Detected: ${matchedCard.name}`,
          });
        } else {
          toast({
            title: "Card Not Found",
            description: "Try adjusting the image or search manually.",
            variant: "destructive"
          });
        }
      }
    } catch (error) {
      console.error('Processing error:', error);
      toast({
        title: "Processing Error",
        description: "Failed to process the image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const extractCardName = (text: string): string => {
    // Simple extraction logic - look for Pokemon card patterns
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 2);
    
    // Pokemon names are usually at the top, exclude common TCG terms
    const excludeTerms = ['hp', 'basic', 'stage', 'evolution', 'pokemon', 'energy', 'trainer'];
    
    for (const line of lines) {
      const cleanLine = line.toLowerCase();
      if (!excludeTerms.some(term => cleanLine.includes(term)) && 
          line.length >= 3 && line.length <= 25 &&
          /^[a-zA-Z\s\-']+$/.test(line)) {
        return line;
      }
    }
    
    return lines[0] || '';
  };

  const searchPokemonCard = async (cardName: string): Promise<PokemonCard | null> => {
    try {
      const exactQuery = encodeURIComponent(`name:"${cardName}"`);
      const response = await fetch(`https://api.pokemontcg.io/v2/cards?q=${exactQuery}`);
      const data = await response.json();
      
      if (data.data && data.data.length > 0) {
        return data.data[0];
      }
      
      // Fallback: search without exact match
      const fallbackQuery = encodeURIComponent(`name:${cardName}`);
      const fallbackResponse = await fetch(`https://api.pokemontcg.io/v2/cards?q=${fallbackQuery}`);
      const fallbackData = await fallbackResponse.json();
      
      return fallbackData.data?.[0] || null;
    } catch (error) {
      console.error('API search error:', error);
      return null;
    }
  };

  const saveCard = async () => {
    if (matchedCard && user) {
      try {
        // First, check if card exists in our database
        let { data: existingCard } = await supabase
          .from('cards')
          .select('id')
          .eq('name', matchedCard.name)
          .eq('set_name', matchedCard.set.name)
          .single();

        let cardId = existingCard?.id;

        // If card doesn't exist, create it
        if (!existingCard) {
          const { data: newCard, error: cardError } = await supabase
            .from('cards')
            .insert({
              name: matchedCard.name,
              set_name: matchedCard.set.name,
              card_number: matchedCard.id,
              rarity: matchedCard.rarity,
              image_url: matchedCard.images?.large || matchedCard.images?.small,
              tcg_id: matchedCard.id
            })
            .select('id')
            .single();

          if (cardError) throw cardError;
          cardId = newCard.id;
        }

        // Add to user's collection or update quantity
        const { data: existingCollection } = await supabase
          .from('user_collection')
          .select('id, quantity')
          .eq('user_id', user.id)
          .eq('card_id', cardId)
          .single();

        if (existingCollection) {
          // Update quantity
          await supabase
            .from('user_collection')
            .update({ quantity: existingCollection.quantity + 1 })
            .eq('id', existingCollection.id);
        } else {
          // Add new card to collection
          await supabase
            .from('user_collection')
            .insert({
              user_id: user.id,
              card_id: cardId,
              quantity: 1,
              condition: 'NM'
            });
        }

        // Add market price data if available
        if (matchedCard.tcgplayer?.prices) {
          const price = matchedCard.tcgplayer.prices.holofoil?.market || 
                       matchedCard.tcgplayer.prices.normal?.market;
          
          if (price) {
            await supabase
              .from('market_prices')
              .insert({
                card_id: cardId,
                source: 'TCGPlayer',
                price: price,
                currency: 'USD',
                condition: 'NM'
              });
          }
        }

        toast({
          title: "Card Added!",
          description: `${matchedCard.name} has been added to your collection`
        });

        onCardSaved(matchedCard);
        onClose();
      } catch (error) {
        console.error('Error saving card:', error);
        toast({
          title: "Error",
          description: "Failed to save card to collection",
          variant: "destructive"
        });
      }
    } else if (!user) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to save cards to your collection",
        variant: "destructive"
      });
    }
  };

  const reset = () => {
    setCapturedImage('');
    setDetectedText('');
    setMatchedCard(null);
    setIsProcessing(false);
    stopCamera();
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-pokemon-blue">Scan Pokemon Card</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        {!capturedImage && !isScanning && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button onClick={startCamera} className="h-32 flex flex-col items-center justify-center">
                <Camera className="h-8 w-8 mb-2" />
                <span>Use Camera</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-32 flex flex-col items-center justify-center"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-8 w-8 mb-2" />
                <span>Upload Image</span>
              </Button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        )}

        {isScanning && (
          <div className="space-y-4">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full rounded-lg"
            />
            <div className="flex gap-2">
              <Button onClick={capturePhoto} className="flex-1">
                <Camera className="h-4 w-4 mr-2" />
                Capture
              </Button>
              <Button variant="outline" onClick={stopCamera}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {capturedImage && (
          <div className="space-y-4">
            <img src={capturedImage} alt="Captured card" className="w-full rounded-lg" />
            
            {isProcessing && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin mr-2" />
                <span>Processing image...</span>
              </div>
            )}

            {detectedText && !isProcessing && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Detected Text:</h3>
                  <p className="text-sm text-muted-foreground bg-muted p-2 rounded">
                    {detectedText}
                  </p>
                </div>

                {matchedCard && (
                  <div className="border rounded-lg p-4 bg-pokemon-yellow/10">
                    <div className="flex items-center gap-4">
                      <img 
                        src={matchedCard.images.small} 
                        alt={matchedCard.name}
                        className="w-20 h-28 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-bold text-lg">{matchedCard.name}</h4>
                        <p className="text-muted-foreground">{matchedCard.set.name}</p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="secondary">{matchedCard.rarity}</Badge>
                          {matchedCard.tcgplayer?.prices && (
                            <Badge variant="outline">
                              ${(matchedCard.tcgplayer.prices.holofoil?.market || 
                                matchedCard.tcgplayer.prices.normal?.market || 0).toFixed(2)}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <CheckCircle className="h-8 w-8 text-success" />
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button onClick={saveCard} className="flex-1">
                        Save to Collection
                      </Button>
                      <Button variant="outline" onClick={reset}>
                        Scan Another
                      </Button>
                    </div>
                  </div>
                )}

                {!matchedCard && !isProcessing && (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground">No matching card found</p>
                    <Button variant="outline" onClick={reset} className="mt-2">
                      Try Again
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </Card>
    </div>
  );
}