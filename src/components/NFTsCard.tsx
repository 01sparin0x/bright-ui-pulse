import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function NFTsCard() {
  const nftPlaceholders = Array(6).fill(null);

  return (
    <Card className="p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold bg-accent/30 px-3 py-1 rounded">Pokemon Cards</h3>
        <div className="flex items-center space-x-4">
          <div className="text-success font-semibold">
            Value +23,4%
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => console.log("Expand Card Library view")}
          >
            Expand View
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-4">
        {nftPlaceholders.map((_, index) => (
          <button
            key={index}
            className="aspect-square bg-gradient-to-br from-primary/20 to-pokemon-blue/20 rounded-lg border-2 border-transparent hover:border-primary hover:bg-primary/10 transition-all duration-200 hover:scale-105 cursor-pointer"
            onClick={() => console.log(`Clicked Pokemon Card ${index + 1}`)}
          >
            <div className="w-full h-full flex items-center justify-center text-muted-foreground font-bold">
              ⚡ #{index + 1}
            </div>
          </button>
        ))}
      </div>
    </Card>
  );
}