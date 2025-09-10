import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export function TransactionsCard() {
  const transactions = Array(10).fill(null).map((_, index) => ({
    type: index % 3 === 0 ? "purchase" : index % 3 === 1 ? "sale" : "trade",
    chains: index % 2 === 0 ? "Courtyard" : "OpenSea",
    amount: `${Math.floor(Math.random() * 3) + 1} Card${Math.floor(Math.random() * 3) + 1 > 1 ? 's' : ''}`,
    fees: `$${(Math.random() * 5000 + 100).toFixed(0)}`
  }));

  return (
    <Card className="p-6 h-full hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Recent Trades</h3>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search trades..."
              className="pl-10 pr-3 py-1 text-sm border border-border rounded bg-background hover:border-accent/50 focus:border-accent transition-colors duration-200"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="grid grid-cols-4 gap-2 text-xs font-medium text-muted-foreground pb-2 border-b">
          <span>Type (Buy/Sell/Trade)</span>
          <span>Platform</span>
          <span>Quantity</span>
          <span>Value</span>
        </div>

        <div className="space-y-1 max-h-80 overflow-y-auto">
          {transactions.map((tx, index) => (
            <button
              key={index}
              className="w-full grid grid-cols-4 gap-2 text-xs p-2 rounded hover:bg-accent/20 transition-colors duration-200 cursor-pointer text-left"
              onClick={() => console.log(`Clicked transaction ${index + 1}`)}
            >
              <span className={tx.type === "sale" ? "text-success" : tx.type === "purchase" ? "text-primary" : "text-muted-foreground"}>
                {tx.type}
              </span>
              <span className="text-muted-foreground">{tx.chains}</span>
              <span>{tx.amount}</span>
              <span>{tx.fees}</span>
            </button>
          ))}
        </div>
      </div>

      <Button 
        variant="ghost" 
        size="sm" 
        className="w-full mt-4"
        onClick={() => console.log("Expand transactions view")}
      >
        Expand View
      </Button>
    </Card>
  );
}