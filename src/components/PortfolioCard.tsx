import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function PortfolioCard() {
  const portfolioData = [
    {
      asset: "ETH",
      chains: "Ethereum",
      amount: "12.5",
      price: "$2,450.00",
      avgPrice: "$2,200.00",
      growth: "+11.4%",
      fees: "$25.50"
    },
    {
      asset: "BTC",
      chains: "Bitcoin",
      amount: "0.8",
      price: "$65,000.00",
      avgPrice: "$58,000.00",
      growth: "+12.1%",
      fees: "$45.00"
    },
    {
      asset: "USDC",
      chains: "Polygon",
      amount: "5,000",
      price: "$1.00",
      avgPrice: "$1.00",
      growth: "0.0%",
      fees: "$2.30"
    }
  ];

  return (
    <Card className="p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold bg-accent/30 px-3 py-1 rounded">Portfolio</h3>
          <Button 
            variant="ghost" 
            size="sm"
            className="hover:bg-destructive/10 hover:text-destructive"
            onClick={() => console.log("Close portfolio")}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="sm"
            className="bg-muted text-foreground hover:bg-muted/80"
            onClick={() => console.log("DeFi filter")}
          >
            DeFi
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => console.log("Tokens filter")}
          >
            Tokens
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-7 gap-4 text-sm font-medium text-muted-foreground border-b pb-2">
          <span>Asset</span>
          <span>Chains</span>
          <span>Amount</span>
          <span>Price</span>
          <span>Avg. Price</span>
          <span>Growth</span>
          <span>Fees</span>
        </div>

        {portfolioData.map((item, index) => (
          <div 
            key={index}
            className="grid grid-cols-7 gap-4 text-sm p-3 rounded-lg hover:bg-accent/20 transition-colors duration-200 cursor-pointer border border-transparent hover:border-accent/30"
            onClick={() => console.log(`Clicked ${item.asset}`)}
          >
            <span className="font-medium">{item.asset}</span>
            <span className="text-muted-foreground">{item.chains}</span>
            <span>{item.amount}</span>
            <span>{item.price}</span>
            <span>{item.avgPrice}</span>
            <span className="text-success font-medium">{item.growth}</span>
            <span>{item.fees}</span>
          </div>
        ))}
      </div>

      <Button 
        variant="ghost" 
        size="sm" 
        className="w-full mt-4"
        onClick={() => console.log("Expand portfolio view")}
      >
        Expand View
      </Button>
    </Card>
  );
}