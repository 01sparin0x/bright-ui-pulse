import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, MoreHorizontal } from "lucide-react";

export function BalanceCard() {
  return (
    <Card className="p-6 hover:shadow-md transition-shadow duration-200 bg-accent/30 border-accent/50">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Collection Value</h3>
          <p className="text-3xl font-bold">47,890.95 $</p>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          className="hover:bg-accent/50"
          onClick={() => console.log("Expand balance view")}
        >
          Expand View
        </Button>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <button 
          className="px-3 py-1 text-sm rounded hover:bg-accent/50 transition-colors"
          onClick={() => console.log("Daily clicked")}
        >
          Daily
        </button>
        <button 
          className="px-3 py-1 text-sm rounded hover:bg-accent/50 transition-colors"
          onClick={() => console.log("Weekly clicked")}
        >
          Weekly
        </button>
        <button 
          className="px-3 py-1 text-sm rounded hover:bg-accent/50 transition-colors"
          onClick={() => console.log("Monthly clicked")}
        >
          Monthly
        </button>
        <button 
          className="px-3 py-1 text-sm rounded bg-muted text-foreground font-medium"
          onClick={() => console.log("Yearly clicked")}
        >
          Yearly
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-sm">Base Set</span>
          <span className="text-sm font-medium">$18,450</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm">Neo Genesis</span>
          <span className="text-sm font-medium">$12,890</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm">Crown Zenith</span>
          <span className="text-sm font-medium">$8,900</span>
        </div>
      </div>
    </Card>
  );
}