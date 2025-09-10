import { Sidebar } from "./Sidebar";
import { UserProfile } from "./UserProfile";
import { BalanceCard } from "./BalanceCard";
import { GrowthCard } from "./GrowthCard";
import { AssetsCard } from "./AssetsCard";
import { PortfolioCard } from "./PortfolioCard";
import { NFTsCard } from "./NFTsCard";
import { TransactionsCard } from "./TransactionsCard";

export function Dashboard() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          {/* User Profile Section */}
          <UserProfile />

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Column - Balance & Growth */}
            <div className="lg:col-span-2 space-y-6">
              <BalanceCard />
              
              {/* Portfolio Section */}
              <PortfolioCard />
              
              {/* NFTs Section */}
              <NFTsCard />
            </div>

            {/* Middle Column - Growth Chart */}
            <div className="space-y-6">
              <GrowthCard />
              <AssetsCard />
            </div>

            {/* Right Column - Transactions */}
            <div>
              <TransactionsCard />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}