import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function UserProfile() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card className="p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer">
        <div className="space-y-3">
          <div>
            <label className="text-sm text-muted-foreground">Trainer Name</label>
            <p className="font-medium">Pokemon Trainer</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Trainer ID</label>
            <p className="font-medium text-sm">PKMN...CARD</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Trainer Avatar</label>
            <div className="w-12 h-12 bg-gradient-to-br from-pokemon-electric to-primary rounded-lg mt-1 flex items-center justify-center">
              <span className="text-lg">⚡</span>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer">
        <div className="space-y-3">
          <h3 className="font-semibold">Connected Platforms</h3>
          <div>
            <p className="text-sm text-muted-foreground">Platform 1</p>
            <p className="text-sm font-medium">Courtyard.io</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Platform 2</p>
            <p className="text-sm font-medium">Pokemon TCG Live</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer">
        <div className="space-y-3">
          <h3 className="font-semibold">Trading Platforms</h3>
          <div>
            <p className="text-sm text-muted-foreground">Platform 1</p>
            <p className="text-sm font-medium">OpenSea</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Platform 2</p>
            <p className="text-sm font-medium">VeVe Market</p>
          </div>
        </div>
      </Card>

      <div className="md:col-span-3">
        <Button 
          className="bg-muted hover:bg-muted/80 text-foreground border"
          onClick={() => console.log("Connect wallet clicked")}
        >
          CONNECT PLATFORM
        </Button>
      </div>
    </div>
  );
}