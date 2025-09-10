import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function PortfolioCard() {
  const portfolioData = [
    {
      asset: "Charizard Holo",
      chains: "Base Set",
      amount: "2",
      price: "$8,450.00",
      avgPrice: "$7,200.00",
      growth: "+17.4%",
      fees: "Courtyard"
    },
    {
      asset: "Blastoise 1st Ed",
      chains: "Base Set",
      amount: "1",
      price: "$5,200.00",
      avgPrice: "$4,800.00",
      growth: "+8.3%",
      fees: "VeVe"
    },
    {
      asset: "Pikachu Promo",
      chains: "XY Series",
      amount: "3",
      price: "$890.00",
      avgPrice: "$890.00",
      growth: "0.0%",
      fees: "TCG Live"
    }
  ];

  return (
    <Card className="p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold bg-accent/30 px-3 py-1 rounded">Card Collection</h3>
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
            Vintage
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => console.log("Tokens filter")}
          >
            Modern
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-7 gap-4 text-sm font-medium text-muted-foreground border-b pb-2">
          <span>Card</span>
          <span>Set</span>
          <span>Qty</span>
          <span>Market Price</span>
          <span>Avg. Purchase</span>
          <span>Growth</span>
          <span>Platform</span>
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