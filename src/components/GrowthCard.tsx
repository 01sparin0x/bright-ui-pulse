import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";

export function GrowthCard() {
  return (
    <Card className="p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold">Portfolio Growth</h3>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => console.log("Expand growth view")}
        >
          Expand View
        </Button>
      </div>

      <div className="flex items-center space-x-2 text-success">
        <TrendingUp className="w-5 h-5" />
        <span className="text-2xl font-bold">+23,4%</span>
      </div>

      <div className="mt-6 h-32 bg-chart-background rounded-lg flex items-end justify-center p-4">
        <svg width="200" height="80" viewBox="0 0 200 80" className="w-full h-full">
          <polyline
            fill="none"
            stroke="hsl(var(--chart-green))"
            strokeWidth="2"
            points="0,60 40,45 80,50 120,30 160,25 200,15"
            className="hover:stroke-success transition-colors duration-200"
          />
          <circle cx="200" cy="15" r="3" fill="hsl(var(--chart-green))" />
        </svg>
      </div>
    </Card>
  );
}