import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Grid, List, Star, Zap } from "lucide-react";

const rarities = ["Common", "Uncommon", "Rare", "Ultra Rare", "Secret Rare"];
const types = ["Fire", "Water", "Electric", "Grass", "Psychic", "Fighting"];
const sets = ["Base Set", "Jungle", "Fossil", "Team Rocket", "Gym Heroes"];

const mockCards = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  name: `Pikachu #${i + 1}`,
  set: sets[i % sets.length],
  rarity: rarities[i % rarities.length],
  type: types[i % types.length],
  price: Math.floor(Math.random() * 1000) + 10,
  image: `https://images.pokemontcg.io/base1/${i + 1}.png`,
}));

export default function Collection() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedRarity, setSelectedRarity] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCard, setSelectedCard] = useState<any>(null);

  const filteredCards = mockCards.filter(card => 
    card.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedRarity === '' || card.rarity === selectedRarity) &&
    (selectedType === '' || card.type === selectedType)
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-pokemon-blue">My Collection</h1>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search cards..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <select
              value={selectedRarity}
              onChange={(e) => setSelectedRarity(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background"
            >
              <option value="">All Rarities</option>
              {rarities.map(rarity => (
                <option key={rarity} value={rarity}>{rarity}</option>
              ))}
            </select>
            
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background"
            >
              <option value="">All Types</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </Card>

        {/* Collection Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-pokemon-blue">{filteredCards.length}</div>
            <div className="text-muted-foreground">Total Cards</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-success">${filteredCards.reduce((sum, card) => sum + card.price, 0).toLocaleString()}</div>
            <div className="text-muted-foreground">Total Value</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-pokemon-yellow">{new Set(filteredCards.map(c => c.set)).size}</div>
            <div className="text-muted-foreground">Unique Sets</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-destructive">{filteredCards.filter(c => c.rarity.includes('Rare')).length}</div>
            <div className="text-muted-foreground">Rare Cards</div>
          </Card>
        </div>

        {/* Cards Grid/List */}
        <div className={`${viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4' : 'space-y-2'}`}>
          {filteredCards.map((card) => (
            <Card 
              key={card.id} 
              className={`cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 ${
                viewMode === 'list' ? 'p-4' : 'p-2'
              }`}
              onClick={() => setSelectedCard(card)}
            >
              {viewMode === 'grid' ? (
                <div className="space-y-2">
                  <div className="aspect-[3/4] bg-gradient-to-br from-pokemon-blue/20 to-pokemon-yellow/20 rounded-lg flex items-center justify-center">
                    <Zap className="h-8 w-8 text-pokemon-yellow" />
                  </div>
                  <div className="text-sm font-semibold truncate">{card.name}</div>
                  <div className="flex justify-between items-center">
                    <Badge variant="secondary" className="text-xs">{card.rarity}</Badge>
                    <div className="text-sm font-bold text-success">${card.price}</div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-16 bg-gradient-to-br from-pokemon-blue/20 to-pokemon-yellow/20 rounded flex items-center justify-center">
                      <Zap className="h-4 w-4 text-pokemon-yellow" />
                    </div>
                    <div>
                      <div className="font-semibold">{card.name}</div>
                      <div className="text-sm text-muted-foreground">{card.set} • {card.type}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant="secondary">{card.rarity}</Badge>
                    <div className="text-lg font-bold text-success">${card.price}</div>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Card Detail Modal */}
        {selectedCard && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setSelectedCard(null)}>
            <Card className="p-6 max-w-md mx-4" onClick={e => e.stopPropagation()}>
              <div className="space-y-4">
                <div className="aspect-[3/4] bg-gradient-to-br from-pokemon-blue/20 to-pokemon-yellow/20 rounded-lg flex items-center justify-center">
                  <Zap className="h-16 w-16 text-pokemon-yellow" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{selectedCard.name}</h3>
                  <p className="text-muted-foreground">{selectedCard.set} • {selectedCard.type}</p>
                </div>
                <div className="flex justify-between items-center">
                  <Badge variant="secondary">{selectedCard.rarity}</Badge>
                  <div className="text-2xl font-bold text-success">${selectedCard.price}</div>
                </div>
                <Button onClick={() => setSelectedCard(null)} className="w-full">
                  Close
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}