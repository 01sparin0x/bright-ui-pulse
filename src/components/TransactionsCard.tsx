import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export function TransactionsCard() {
  const transactions = Array(10).fill(null).map((_, index) => ({
    type: index % 2 === 0 ? "send" : "receive",
    chains: "Ethereum",
    amount: `${(Math.random() * 10).toFixed(2)} ETH`,
    fees: `$${(Math.random() * 50).toFixed(2)}`
  }));

  return (
    <Card className="p-6 h-full hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Transactions</h3>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-3 py-1 text-sm border border-border rounded bg-background hover:border-accent/50 focus:border-accent transition-colors duration-200"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="grid grid-cols-4 gap-2 text-xs font-medium text-muted-foreground pb-2 border-b">
          <span>Type (send/receive)</span>
          <span>Chains</span>
          <span>Amount</span>
          <span>Fees</span>
        </div>

        <div className="space-y-1 max-h-80 overflow-y-auto">
          {transactions.map((tx, index) => (
            <button
              key={index}
              className="w-full grid grid-cols-4 gap-2 text-xs p-2 rounded hover:bg-accent/20 transition-colors duration-200 cursor-pointer text-left"
              onClick={() => console.log(`Clicked transaction ${index + 1}`)}
            >
              <span className={tx.type === "send" ? "text-destructive" : "text-success"}>
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