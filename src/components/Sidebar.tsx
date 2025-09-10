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
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Briefcase, label: "Portfolios" },
  { icon: Wallet, label: "Wallets" },
  { icon: ArrowLeftRight, label: "Exchanges" },
  { icon: Coins, label: "Assets" },
  { icon: Layers, label: "DeFi Protocols" },
  { icon: CircleDollarSign, label: "Tokens" },
  { icon: Image, label: "NFTs" },
  { icon: Settings, label: "Customize" },
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