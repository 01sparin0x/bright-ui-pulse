import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ArrowUpDown, TrendingUp, TrendingDown, Calendar, User, Zap } from "lucide-react";

const mockTrades = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  type: Math.random() > 0.5 ? 'buy' : 'sell',
  cardName: `Pokemon Card #${i + 1}`,
  quantity: Math.floor(Math.random() * 5) + 1,
  price: Math.floor(Math.random() * 500) + 10,
  platform: ["TCGPlayer", "eBay", "Courtyard.io", "Cardmarket"][Math.floor(Math.random() * 4)],
  counterparty: `User${Math.floor(Math.random() * 1000)}`,
  status: ["completed", "pending", "cancelled"][Math.floor(Math.random() * 3)]
}));

export default function TradeHistory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortBy, setSortBy] = useState('date');

  const filteredTrades = mockTrades
    .filter(trade =>
      trade.cardName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterType === '' || trade.type === filterType) &&
      (filterStatus === '' || trade.status === filterStatus)
    )
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === 'price') return b.price - a.price;
      return a.cardName.localeCompare(b.cardName);
    });

  const totalBuys = mockTrades.filter(t => t.type === 'buy' && t.status === 'completed').length;
  const totalSells = mockTrades.filter(t => t.type === 'sell' && t.status === 'completed').length;
  const totalVolume = mockTrades
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + (t.price * t.quantity), 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-pokemon-blue">Trade History</h1>
          <p className="text-muted-foreground">
            Track all your Pokemon card trades, purchases, and sales.
          </p>
        </div>

        {/* Trade Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-pokemon-blue">{filteredTrades.length}</div>
            <div className="text-muted-foreground">Total Trades</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-success">{totalBuys}</div>
            <div className="text-muted-foreground">Purchases</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-destructive">{totalSells}</div>
            <div className="text-muted-foreground">Sales</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-pokemon-yellow">${totalVolume.toLocaleString()}</div>
            <div className="text-muted-foreground">Total Volume</div>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search trades..."
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
              <option value="buy">Purchases</option>
              <option value="sell">Sales</option>
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background"
            >
              <option value="">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <Button
              variant="outline"
              onClick={() => setSortBy(sortBy === 'date' ? 'price' : sortBy === 'price' ? 'name' : 'date')}
            >
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Sort by {sortBy}
            </Button>
          </div>
        </Card>

        {/* Trade List */}
        <div className="space-y-3">
          {filteredTrades.map((trade) => (
            <Card key={trade.id} className="p-4 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-16 bg-gradient-to-br from-pokemon-blue/20 to-pokemon-yellow/20 rounded flex items-center justify-center">
                    <Zap className="h-6 w-6 text-pokemon-yellow" />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{trade.cardName}</h3>
                      <Badge 
                        variant={trade.type === 'buy' ? 'default' : 'destructive'}
                        className={trade.type === 'buy' ? 'bg-success' : ''}
                      >
                        {trade.type === 'buy' ? (
                          <>
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Purchase
                          </>
                        ) : (
                          <>
                            <TrendingDown className="h-3 w-3 mr-1" />
                            Sale
                          </>
                        )}
                      </Badge>
                      <Badge variant="outline">
                        {trade.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {trade.date}
                      </div>
                      <div className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        {trade.counterparty}
                      </div>
                      <div>{trade.platform}</div>
                    </div>
                  </div>
                </div>
                
                <div className="text-right space-y-1">
                  <div className="text-lg font-bold">
                    ${(trade.price * trade.quantity).toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {trade.quantity}x @ ${trade.price}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}