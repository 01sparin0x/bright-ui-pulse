import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Zap, Star } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const mockLibrary = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Pokemon Card #${i + 1}`,
  set: ["Base Set", "Jungle", "Fossil", "Team Rocket"][i % 4],
  rarity: ["Common", "Uncommon", "Rare", "Ultra Rare"][i % 4],
  type: ["Fire", "Water", "Electric", "Grass"][i % 4],
  price: Math.floor(Math.random() * 500) + 5,
  inCollection: Math.random() > 0.7,
}));

export default function CardLibrary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSet, setSelectedSet] = useState('');
  const [selectedRarity, setSelectedRarity] = useState('');
  const { toast } = useToast();

  const filteredCards = mockLibrary.filter(card =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedSet === '' || card.set === selectedSet) &&
    (selectedRarity === '' || card.rarity === selectedRarity)
  );

  const addToCollection = (card: any) => {
    toast({
      title: "Added to Collection",
      description: `${card.name} has been added to your collection.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold text-pokemon-blue">Card Library</h1>
        <p className="text-muted-foreground">Browse all available Pokemon cards and add them to your collection.</p>

        {/* Search and Filters */}
        <Card className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search cards in library..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <select
              value={selectedSet}
              onChange={(e) => setSelectedSet(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background"
            >
              <option value="">All Sets</option>
              <option value="Base Set">Base Set</option>
              <option value="Jungle">Jungle</option>
              <option value="Fossil">Fossil</option>
              <option value="Team Rocket">Team Rocket</option>
            </select>
            
            <select
              value={selectedRarity}
              onChange={(e) => setSelectedRarity(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background"
            >
              <option value="">All Rarities</option>
              <option value="Common">Common</option>
              <option value="Uncommon">Uncommon</option>
              <option value="Rare">Rare</option>
              <option value="Ultra Rare">Ultra Rare</option>
            </select>
          </div>
        </Card>

        {/* Library Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-pokemon-blue">{filteredCards.length}</div>
            <div className="text-muted-foreground">Available Cards</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-success">{filteredCards.filter(c => c.inCollection).length}</div>
            <div className="text-muted-foreground">In Your Collection</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-pokemon-yellow">{filteredCards.filter(c => !c.inCollection).length}</div>
            <div className="text-muted-foreground">Missing Cards</div>
          </Card>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredCards.map((card) => (
            <Card key={card.id} className="p-3 hover:shadow-lg transition-all duration-200 hover:scale-105">
              <div className="space-y-3">
                <div className="relative">
                  <div className="aspect-[3/4] bg-gradient-to-br from-pokemon-blue/20 to-pokemon-yellow/20 rounded-lg flex items-center justify-center">
                    <Zap className="h-8 w-8 text-pokemon-yellow" />
                  </div>
                  {card.inCollection && (
                    <div className="absolute top-2 right-2">
                      <Star className="h-4 w-4 text-pokemon-yellow fill-current" />
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm font-semibold truncate">{card.name}</div>
                  <div className="text-xs text-muted-foreground">{card.set}</div>
                  
                  <div className="flex justify-between items-center">
                    <Badge variant="secondary" className="text-xs">{card.rarity}</Badge>
                    <div className="text-sm font-bold text-success">${card.price}</div>
                  </div>
                  
                  <Button
                    size="sm"
                    className="w-full"
                    variant={card.inCollection ? "outline" : "default"}
                    onClick={() => addToCollection(card)}
                    disabled={card.inCollection}
                  >
                    {card.inCollection ? (
                      <>
                        <Star className="h-3 w-3 mr-1" />
                        In Collection
                      </>
                    ) : (
                      <>
                        <Plus className="h-3 w-3 mr-1" />
                        Add to Collection
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}