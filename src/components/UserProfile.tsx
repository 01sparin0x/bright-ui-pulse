import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function UserProfile() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card className="p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer">
        <div className="space-y-3">
          <div>
            <label className="text-sm text-muted-foreground">Name</label>
            <p className="font-medium">John Doe</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Address</label>
            <p className="font-medium text-sm">0x742d...1a2b</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">PFP/NFT</label>
            <div className="w-12 h-12 bg-muted rounded-lg mt-1"></div>
          </div>
        </div>
      </Card>

      <Card className="p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer">
        <div className="space-y-3">
          <h3 className="font-semibold">Connected wallet</h3>
          <div>
            <p className="text-sm text-muted-foreground">Address 1</p>
            <p className="text-sm font-medium">0x742d...1a2b</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Address 2</p>
            <p className="text-sm font-medium">0x853c...2b3c</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer">
        <div className="space-y-3">
          <h3 className="font-semibold">Connected Exchanges</h3>
          <div>
            <p className="text-sm text-muted-foreground">Address 1</p>
            <p className="text-sm font-medium">Binance</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Address 2</p>
            <p className="text-sm font-medium">Coinbase</p>
          </div>
        </div>
      </Card>

      <div className="md:col-span-3">
        <Button 
          className="bg-muted hover:bg-muted/80 text-foreground border"
          onClick={() => console.log("Connect wallet clicked")}
        >
          CONNECT WALLET
        </Button>
      </div>
    </div>
  );
}