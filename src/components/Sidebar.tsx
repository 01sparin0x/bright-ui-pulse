import { 
  LayoutDashboard, 
  Briefcase, 
  Wallet, 
  ArrowLeftRight, 
  Coins, 
  Layers, 
  CircleDollarSign,
  Image,
  Settings,
  Crown,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";

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

export function Sidebar() {
  return (
    <div className="w-64 bg-sidebar border-r border-border h-screen flex flex-col">
      <div className="flex-1">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              className={cn(
                "w-full flex items-center px-4 py-3 text-left text-sm font-medium transition-all duration-200 hover:bg-sidebar-hover",
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
    </div>
  );
}