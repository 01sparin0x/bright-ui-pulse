import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Wallet, 
  TrendingUp, 
  Trophy, 
  Settings, 
  LogOut,
  Zap,
  Camera,
  Image,
  Briefcase,
  ArrowLeftRight,
  Coins,
  Layers,
  CircleDollarSign,
  Crown,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  onScanCard?: () => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: "Collection", active: true },
  { icon: Image, label: "Card Library" },
  { icon: Briefcase, label: "Platforms" },
  { icon: ArrowLeftRight, label: "Trade History" },
  { icon: Coins, label: "Market Data" },
  { icon: Layers, label: "Deck Builder" },
  { icon: CircleDollarSign, label: "Analytics" },
  { icon: Wallet, label: "Wallet" },
  { icon: Settings, label: "Settings" },
  { icon: Crown, label: "PREMIUM", premium: true },
  { icon: Users, label: "Community" },
];

export function Sidebar({ onScanCard }: SidebarProps) {
  return (
    <div className="w-64 bg-sidebar border-r border-border h-screen flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-pokemon-blue rounded-lg flex items-center justify-center">
            <Zap className="h-6 w-6 text-pokemon-yellow" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-pokemon-blue">PokeVault</h1>
            <p className="text-xs text-muted-foreground">Digital Collection</p>
          </div>
        </div>

        {/* Scan Card Button */}
        <Button 
          onClick={onScanCard}
          className="w-full mb-4 bg-pokemon-yellow hover:bg-pokemon-yellow/90 text-pokemon-blue font-semibold"
        >
          <Camera className="h-4 w-4 mr-3" />
          Scan Card
        </Button>
      </div>

      <div className="flex-1 px-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              className={cn(
                "w-full flex items-center px-4 py-3 text-left text-sm font-medium transition-all duration-200 hover:bg-sidebar-hover rounded-md",
                item.active 
                  ? "bg-sidebar-active text-accent-foreground border-r-2 border-success" 
                  : "text-muted-foreground hover:text-foreground",
                item.premium && "text-yellow-600 font-bold"
              )}
              onClick={() => console.log(`Clicked ${item.label}`)}
            >
              <Icon className="w-4 h-4 mr-3" />
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="p-4 border-t border-border">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-muted-foreground hover:text-foreground"
          onClick={() => console.log("Logout clicked")}
        >
          <LogOut className="h-4 w-4 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );
}