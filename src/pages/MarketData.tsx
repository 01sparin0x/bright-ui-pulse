import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, BarChart3, Zap, DollarSign } from "lucide-react";

const mockMarketData = [
  {
    name: "Charizard Base Set",
    currentPrice: 1250,
    change24h: 5.2,
    change7d: -2.1,
    volume: 45000,
    marketCap: 2500000,
    inCollection: true
  },
  {
    name: "Pikachu Illustrator",
    currentPrice: 8750,
    change24h: -1.8,
    change7d: 12.5,
    volume: 15000,
    marketCap: 850000,
    inCollection: false
  },
  {
    name: "Blastoise Base Set",
    currentPrice: 850,
    change24h: 3.4,
    change7d: 7.8,
    volume: 32000,
    marketCap: 1200000,
    inCollection: true
  },
  {
    name: "Venusaur Base Set",
    currentPrice: 720,
    change24h: -0.5,
    change7d: 4.2,
    volume: 28000,
    marketCap: 980000,
    inCollection: true
  }
];

const trendingCards = [
  { name: "Team Rocket Returns", change: 15.2, price: 450 },
  { name: "Neo Genesis", change: 12.8, price: 380 },
  { name: "Gym Heroes", change: 8.9, price: 290 },
  { name: "Base Set 2", change: -5.1, price: 150 },
  { name: "Jungle Set", change: -3.2, price: 120 }
];

export default function MarketData() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-pokemon-blue">Market Data</h1>
          <p className="text-muted-foreground">
            Track price trends and market analytics for Pokemon cards.
          </p>
        </div>

        {/* Market Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-pokemon-blue">$2.4M</div>
            <div className="text-muted-foreground">Market Cap</div>
            <div className="text-sm text-success">+5.2% 24h</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-success">$120K</div>
            <div className="text-muted-foreground">24h Volume</div>
            <div className="text-sm text-destructive">-2.1% 24h</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-pokemon-yellow">1,248</div>
            <div className="text-muted-foreground">Active Cards</div>
            <div className="text-sm text-success">+12 today</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-destructive">$845</div>
            <div className="text-muted-foreground">Avg. Price</div>
            <div className="text-sm text-success">+1.8% 24h</div>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Market Overview</TabsTrigger>
            <TabsTrigger value="collection">My Collection</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Top Cards Table */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Top Cards by Market Cap</h3>
              <div className="space-y-4">
                {mockMarketData.map((card, index) => (
                  <div key={card.name} className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="text-muted-foreground font-mono">#{index + 1}</div>
                      <div className="w-10 h-12 bg-gradient-to-br from-pokemon-blue/20 to-pokemon-yellow/20 rounded flex items-center justify-center">
                        <Zap className="h-5 w-5 text-pokemon-yellow" />
                      </div>
                      <div>
                        <div className="font-semibold">{card.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Vol: ${card.volume.toLocaleString()}
                        </div>
                      </div>
                      {card.inCollection && (
                        <Badge variant="outline" className="bg-success/20 text-success">
                          In Collection
                        </Badge>
                      )}
                    </div>
                    
                    <div className="text-right space-x-6 flex items-center">
                      <div>
                        <div className="font-bold text-lg">${card.currentPrice.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">
                          Cap: ${(card.marketCap / 1000).toFixed(0)}K
                        </div>
                      </div>
                      
                      <div className="text-right min-w-20">
                        <div className={`flex items-center ${card.change24h > 0 ? 'text-success' : 'text-destructive'}`}>
                          {card.change24h > 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                          {Math.abs(card.change24h)}%
                        </div>
                        <div className="text-xs text-muted-foreground">24h</div>
                      </div>
                      
                      <div className="text-right min-w-20">
                        <div className={`flex items-center ${card.change7d > 0 ? 'text-success' : 'text-destructive'}`}>
                          {card.change7d > 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                          {Math.abs(card.change7d)}%
                        </div>
                        <div className="text-xs text-muted-foreground">7d</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="collection" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Collection Performance</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-accent/20 rounded-lg">
                  <div className="text-2xl font-bold text-success">+$2,845</div>
                  <div className="text-sm text-muted-foreground">Unrealized Gains</div>
                </div>
                <div className="text-center p-4 bg-accent/20 rounded-lg">
                  <div className="text-2xl font-bold text-pokemon-blue">12.5%</div>
                  <div className="text-sm text-muted-foreground">Portfolio Growth</div>
                </div>
                <div className="text-center p-4 bg-accent/20 rounded-lg">
                  <div className="text-2xl font-bold text-pokemon-yellow">3</div>
                  <div className="text-sm text-muted-foreground">Top Performers</div>
                </div>
              </div>

              <div className="space-y-3">
                {mockMarketData.filter(card => card.inCollection).map((card) => (
                  <div key={card.name} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-10 bg-gradient-to-br from-pokemon-blue/20 to-pokemon-yellow/20 rounded flex items-center justify-center">
                        <Zap className="h-4 w-4 text-pokemon-yellow" />
                      </div>
                      <div>
                        <div className="font-semibold">{card.name}</div>
                        <div className="text-sm text-muted-foreground">Current: ${card.currentPrice}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-semibold ${card.change7d > 0 ? 'text-success' : 'text-destructive'}`}>
                        {card.change7d > 0 ? '+' : ''}{card.change7d}%
                      </div>
                      <div className="text-sm text-muted-foreground">7 days</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="trending" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-success" />
                  Top Gainers (7d)
                </h3>
                <div className="space-y-3">
                  {trendingCards.filter(card => card.change > 0).map((card) => (
                    <div key={card.name} className="flex items-center justify-between">
                      <div className="font-medium">{card.name}</div>
                      <div className="flex items-center space-x-2">
                        <div className="text-success font-semibold">+{card.change}%</div>
                        <div className="text-sm text-muted-foreground">${card.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <TrendingDown className="h-5 w-5 mr-2 text-destructive" />
                  Top Losers (7d)
                </h3>
                <div className="space-y-3">
                  {trendingCards.filter(card => card.change < 0).map((card) => (
                    <div key={card.name} className="flex items-center justify-between">
                      <div className="font-medium">{card.name}</div>
                      <div className="flex items-center space-x-2">
                        <div className="text-destructive font-semibold">{card.change}%</div>
                        <div className="text-sm text-muted-foreground">${card.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}