import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, TrendingUp, Shield, Zap } from "lucide-react";

const platforms = [
  {
    name: "Courtyard.io",
    description: "Premium marketplace for graded Pokemon cards and collectibles",
    status: "connected",
    fees: "2.5%",
    features: ["Graded Cards", "Authentication", "Insurance"],
    url: "https://courtyard.io",
    logo: "🏛️"
  },
  {
    name: "TCGPlayer",
    description: "World's largest marketplace for trading card games",
    status: "available",
    fees: "8.5%",
    features: ["Price Tracking", "Mass Entry", "Seller Tools"],
    url: "https://tcgplayer.com",
    logo: "🎮"
  },
  {
    name: "Pokemon TCG Live",
    description: "Official Pokemon Trading Card Game digital platform",
    status: "connected",
    fees: "Free",
    features: ["Digital Cards", "Online Play", "Trading"],
    url: "https://tcg.pokemon.com",
    logo: "⚡"
  },
  {
    name: "eBay",
    description: "Global marketplace with extensive Pokemon card listings",
    status: "available",
    fees: "12.9%",
    features: ["Auction Format", "Buy It Now", "Global Reach"],
    url: "https://ebay.com",
    logo: "📦"
  },
  {
    name: "Cardmarket",
    description: "European marketplace for trading card games",
    status: "available",
    fees: "5%",
    features: ["European Focus", "Price Guide", "Want Lists"],
    url: "https://cardmarket.com",
    logo: "🇪🇺"
  },
  {
    name: "COMC",
    description: "Check Out My Cards - Sports and gaming card marketplace",
    status: "available",
    fees: "Variable",
    features: ["Storage Service", "Processing", "Shipping"],
    url: "https://comc.com",
    logo: "📋"
  }
];

export default function Platforms() {
  const connectPlatform = (platform: any) => {
    console.log(`Connecting to ${platform.name}`);
  };

  const viewPlatform = (platform: any) => {
    window.open(platform.url, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-pokemon-blue">Trading Platforms</h1>
          <p className="text-muted-foreground">
            Connect with partner platforms for price tracking, trading, and purchasing Pokemon cards.
          </p>
        </div>

        {/* Platform Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-pokemon-blue">{platforms.length}</div>
            <div className="text-muted-foreground">Available Platforms</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-success">{platforms.filter(p => p.status === 'connected').length}</div>
            <div className="text-muted-foreground">Connected</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-pokemon-yellow">Live</div>
            <div className="text-muted-foreground">Price Sync</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-destructive">24/7</div>
            <div className="text-muted-foreground">Monitoring</div>
          </Card>
        </div>

        {/* Platforms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((platform) => (
            <Card key={platform.name} className="p-6 hover:shadow-lg transition-all duration-200 hover:scale-105">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{platform.logo}</div>
                    <div>
                      <h3 className="font-bold text-lg">{platform.name}</h3>
                      <Badge 
                        variant={platform.status === 'connected' ? 'default' : 'secondary'}
                        className={platform.status === 'connected' ? 'bg-success' : ''}
                      >
                        {platform.status === 'connected' ? (
                          <>
                            <Shield className="h-3 w-3 mr-1" />
                            Connected
                          </>
                        ) : (
                          'Available'
                        )}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => viewPlatform(platform)}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground">{platform.description}</p>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Trading Fees:</span>
                    <span className="font-semibold">{platform.fees}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {platform.features.map((feature) => (
                      <Badge key={feature} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  {platform.status === 'connected' ? (
                    <>
                      <Button variant="outline" className="flex-1" onClick={() => viewPlatform(platform)}>
                        <TrendingUp className="h-4 w-4 mr-2" />
                        View Prices
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => console.log('Disconnect')}>
                        Disconnect
                      </Button>
                    </>
                  ) : (
                    <Button className="flex-1" onClick={() => connectPlatform(platform)}>
                      <Zap className="h-4 w-4 mr-2" />
                      Connect Platform
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}