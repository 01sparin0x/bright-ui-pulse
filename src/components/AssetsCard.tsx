import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function AssetsCard() {
  return (
    <Card className="p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold">Assets</h3>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => console.log("Expand assets view")}
        >
          Expand View
        </Button>
      </div>

      <div className="flex items-center justify-center mb-4">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="hsl(var(--muted))"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="hsl(var(--chart-green))"
              strokeWidth="8"
              fill="none"
              strokeDasharray="351.86"
              strokeDashoffset="0"
              className="transition-all duration-500 hover:stroke-success"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold">100%</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-success rounded-sm"></div>
          <span className="text-sm">DeFi</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-muted rounded-sm"></div>
          <span className="text-sm">Token</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-secondary rounded-sm"></div>
          <span className="text-sm">NFT</span>
        </div>
      </div>
    </Card>
  );
}