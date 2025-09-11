import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Minus, Save, Share, Zap, Search, Filter } from "lucide-react";

const mockCollection = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Pokemon Card #${i + 1}`,
  type: ["Fire", "Water", "Electric", "Grass"][i % 4],
  cost: Math.floor(Math.random() * 5) + 1,
  hp: Math.floor(Math.random() * 100) + 50,
  attack: Math.floor(Math.random() * 80) + 20,
  owned: Math.floor(Math.random() * 4) + 1,
  inDeck: 0
}));

export default function DeckBuilder() {
  const [collection, setCollection] = useState(mockCollection);
  const [deckName, setDeckName] = useState("My New Deck");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");

  const deck = collection.filter(card => card.inDeck > 0);
  const totalCards = deck.reduce((sum, card) => sum + card.inDeck, 0);

  const addToDeck = (cardId: number) => {
    setCollection(prev => prev.map(card => 
      card.id === cardId && card.inDeck < card.owned
        ? { ...card, inDeck: card.inDeck + 1 }
        : card
    ));
  };

  const removeFromDeck = (cardId: number) => {
    setCollection(prev => prev.map(card => 
      card.id === cardId && card.inDeck > 0
        ? { ...card, inDeck: card.inDeck - 1 }
        : card
    ));
  };

  const filteredCollection = collection.filter(card =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterType === "" || card.type === filterType)
  );

  const typeDistribution = deck.reduce((acc, card) => {
    acc[card.type] = (acc[card.type] || 0) + card.inDeck;
    return acc;
  }, {} as Record<string, number>);

  const avgCost = deck.length > 0 
    ? (deck.reduce((sum, card) => sum + (card.cost * card.inDeck), 0) / totalCards).toFixed(1)
    : "0";

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-pokemon-blue">Deck Builder</h1>
            <p className="text-muted-foreground">Create and manage your Pokemon card decks.</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Share className="h-4 w-4 mr-2" />
              Share Deck
            </Button>
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save Deck
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Collection Panel */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="p-4">
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search collection..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border rounded-md bg-background"
                >
                  <option value="">All Types</option>
                  <option value="Fire">Fire</option>
                  <option value="Water">Water</option>
                  <option value="Electric">Electric</option>
                  <option value="Grass">Grass</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                {filteredCollection.map((card) => (
                  <div key={card.id} className="border rounded-lg p-3 hover:bg-accent/50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-10 bg-gradient-to-br from-pokemon-blue/20 to-pokemon-yellow/20 rounded flex items-center justify-center">
                          <Zap className="h-4 w-4 text-pokemon-yellow" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm">{card.name}</div>
                          <div className="flex items-center space-x-1">
                            <Badge variant="outline" className="text-xs">{card.type}</Badge>
                            <span className="text-xs text-muted-foreground">Cost: {card.cost}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">
                        Owned: {card.owned} | In Deck: {card.inDeck}
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeFromDeck(card.id)}
                          disabled={card.inDeck === 0}
                          className="h-6 w-6 p-0"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => addToDeck(card.id)}
                          disabled={card.inDeck >= card.owned}
                          className="h-6 w-6 p-0"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Deck Panel */}
          <div className="space-y-4">
            <Card className="p-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Deck Name</label>
                  <Input
                    value={deckName}
                    onChange={(e) => setDeckName(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-accent/20 rounded-lg">
                    <div className="text-2xl font-bold text-pokemon-blue">{totalCards}</div>
                    <div className="text-xs text-muted-foreground">Total Cards</div>
                  </div>
                  <div className="p-3 bg-accent/20 rounded-lg">
                    <div className="text-2xl font-bold text-pokemon-yellow">{avgCost}</div>
                    <div className="text-xs text-muted-foreground">Avg. Cost</div>
                  </div>
                </div>

                {/* Type Distribution */}
                <div>
                  <h4 className="font-semibold mb-2">Type Distribution</h4>
                  <div className="space-y-1">
                    {Object.entries(typeDistribution).map(([type, count]) => (
                      <div key={type} className="flex justify-between text-sm">
                        <span>{type}</span>
                        <span className="font-medium">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h4 className="font-semibold mb-3">Current Deck</h4>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {deck.length === 0 ? (
                  <div className="text-center text-muted-foreground text-sm py-4">
                    No cards in deck yet
                  </div>
                ) : (
                  deck.map((card) => (
                    <div key={card.id} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-8 bg-gradient-to-br from-pokemon-blue/20 to-pokemon-yellow/20 rounded flex items-center justify-center">
                          <Zap className="h-3 w-3 text-pokemon-yellow" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">{card.name}</div>
                          <Badge variant="outline" className="text-xs">{card.type}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-sm font-medium">×{card.inDeck}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFromDeck(card.id)}
                          className="h-5 w-5 p-0"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}