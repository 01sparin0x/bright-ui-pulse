import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, PieChart, BarChart3, Target, Star, Zap, Trophy } from "lucide-react";

const portfolioStats = {
  totalValue: 28750,
  totalCards: 156,
  avgValue: 184,
  topCard: "Charizard Base Set",
  topCardValue: 1250,
  growth30d: 12.5,
  growth7d: -2.1
};

const rarityDistribution = [
  { rarity: "Common", count: 89, percentage: 57.1, value: 2340 },
  { rarity: "Uncommon", count: 35, percentage: 22.4, value: 4580 },
  { rarity: "Rare", count: 24, percentage: 15.4, value: 8920 },
  { rarity: "Ultra Rare", count: 6, percentage: 3.8, value: 7650 },
  { rarity: "Secret Rare", count: 2, percentage: 1.3, value: 5260 }
];

const setDistribution = [
  { set: "Base Set", cards: 45, value: 12500, completion: 85 },
  { set: "Jungle", cards: 32, value: 6750, completion: 62 },
  { set: "Fossil", cards: 28, value: 4200, completion: 58 },
  { set: "Team Rocket", cards: 25, value: 3100, completion: 45 },
  { set: "Gym Heroes", cards: 26, value: 2200, completion: 40 }
];

const typeDistribution = [
  { type: "Fire", count: 32, percentage: 20.5 },
  { type: "Water", count: 28, percentage: 17.9 },
  { type: "Electric", count: 24, percentage: 15.4 },
  { type: "Grass", count: 22, percentage: 14.1 },
  { type: "Psychic", count: 20, percentage: 12.8 },
  { type: "Fighting", count: 18, percentage: 11.5 },
  { type: "Colorless", count: 12, percentage: 7.7 }
];

export default function Analytics() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-pokemon-blue">Collection Analytics</h1>
          <p className="text-muted-foreground">
            Deep insights into your Pokemon card collection performance and distribution.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-pokemon-blue">${portfolioStats.totalValue.toLocaleString()}</div>
            <div className="text-muted-foreground">Total Value</div>
            <div className={`text-sm flex items-center justify-center mt-1 ${portfolioStats.growth30d > 0 ? 'text-success' : 'text-destructive'}`}>
              {portfolioStats.growth30d > 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
              {Math.abs(portfolioStats.growth30d)}% (30d)
            </div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-success">{portfolioStats.totalCards}</div>
            <div className="text-muted-foreground">Total Cards</div>
            <div className="text-sm text-pokemon-yellow mt-1">${portfolioStats.avgValue} avg. value</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-pokemon-yellow">{setDistribution.length}</div>
            <div className="text-muted-foreground">Unique Sets</div>
            <div className="text-sm text-muted-foreground mt-1">
              {Math.round(setDistribution.reduce((sum, set) => sum + set.completion, 0) / setDistribution.length)}% avg. completion
            </div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-destructive">${portfolioStats.topCardValue}</div>
            <div className="text-muted-foreground">Most Valuable</div>
            <div className="text-sm text-pokemon-blue mt-1">{portfolioStats.topCard}</div>
          </Card>
        </div>

        <Tabs defaultValue="distribution" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="distribution">Distribution</TabsTrigger>
            <TabsTrigger value="sets">Sets Analysis</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
          </TabsList>

          <TabsContent value="distribution" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Rarity Distribution */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <PieChart className="h-5 w-5 mr-2" />
                  Rarity Distribution
                </h3>
                <div className="space-y-3">
                  {rarityDistribution.map((item) => (
                    <div key={item.rarity} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{item.rarity}</Badge>
                          <span className="text-sm">{item.count} cards</span>
                        </div>
                        <div className="text-sm font-medium">${item.value.toLocaleString()}</div>
                      </div>
                      <div className="w-full bg-accent/20 rounded-full h-2">
                        <div
                          className="bg-pokemon-blue h-2 rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground">{item.percentage}% of collection</div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Type Distribution */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Type Distribution
                </h3>
                <div className="space-y-3">
                  {typeDistribution.map((item) => (
                    <div key={item.type} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{item.type}</span>
                        <span className="text-sm">{item.count} cards</span>
                      </div>
                      <div className="w-full bg-accent/20 rounded-full h-2">
                        <div
                          className="bg-pokemon-yellow h-2 rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground">{item.percentage}% of collection</div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sets" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Set Completion Analysis</h3>
              <div className="space-y-4">
                {setDistribution.map((set) => (
                  <div key={set.set} className="border rounded-lg p-4 hover:bg-accent/20 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{set.set}</h4>
                        <div className="text-sm text-muted-foreground">
                          {set.cards} cards • ${set.value.toLocaleString()} value
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-pokemon-blue">{set.completion}%</div>
                        <div className="text-xs text-muted-foreground">Complete</div>
                      </div>
                    </div>
                    
                    <div className="w-full bg-accent/20 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-pokemon-blue to-pokemon-yellow h-3 rounded-full"
                        style={{ width: `${set.completion}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-success" />
                  Top Performers
                </h3>
                <div className="space-y-3">
                  {[
                    { name: "Charizard Base Set", gain: 25.4, value: 1250 },
                    { name: "Blastoise Base Set", gain: 18.2, value: 850 },
                    { name: "Venusaur Base Set", gain: 12.7, value: 720 }
                  ].map((card) => (
                    <div key={card.name} className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-10 bg-gradient-to-br from-pokemon-blue/20 to-pokemon-yellow/20 rounded flex items-center justify-center">
                          <Zap className="h-4 w-4 text-pokemon-yellow" />
                        </div>
                        <div>
                          <div className="font-medium">{card.name}</div>
                          <div className="text-sm text-muted-foreground">${card.value.toLocaleString()}</div>
                        </div>
                      </div>
                      <div className="text-success font-bold">+{card.gain}%</div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Investment Insights
                </h3>
                <div className="space-y-4">
                  <div className="p-3 bg-accent/20 rounded-lg">
                    <div className="text-sm text-muted-foreground">Best Investment Category</div>
                    <div className="font-semibold">Ultra Rare Cards</div>
                    <div className="text-xs text-success">+18.5% average growth</div>
                  </div>
                  
                  <div className="p-3 bg-accent/20 rounded-lg">
                    <div className="text-sm text-muted-foreground">Recommended Focus</div>
                    <div className="font-semibold">Base Set Completion</div>
                    <div className="text-xs text-pokemon-blue">15% remaining to complete</div>
                  </div>
                  
                  <div className="p-3 bg-accent/20 rounded-lg">
                    <div className="text-sm text-muted-foreground">Next Target</div>
                    <div className="font-semibold">Jungle Set Cards</div>
                    <div className="text-xs text-pokemon-yellow">38% completion needed</div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Trophy className="h-5 w-5 mr-2" />
                Collection Goals
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Complete Base Set",
                    progress: 85,
                    target: "16/151 cards",
                    deadline: "End of Q1 2024"
                  },
                  {
                    title: "Reach $30K Portfolio",
                    progress: 96,
                    target: "$1,250 remaining",
                    deadline: "Next month"
                  },
                  {
                    title: "Collect All Charizards",
                    progress: 60,
                    target: "4/10 variants",
                    deadline: "End of 2024"
                  },
                  {
                    title: "First Edition Collection",
                    progress: 30,
                    target: "12/40 cards",
                    deadline: "Long term"
                  }
                ].map((goal) => (
                  <div key={goal.title} className="border rounded-lg p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{goal.title}</h4>
                          <div className="text-sm text-muted-foreground">{goal.target}</div>
                        </div>
                        <Badge variant="outline">{goal.deadline}</Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span className="font-medium">{goal.progress}%</span>
                        </div>
                        <div className="w-full bg-accent/20 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-pokemon-blue to-pokemon-yellow h-3 rounded-full"
                            style={{ width: `${goal.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}