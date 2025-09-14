import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export function BalanceCard() {
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [recentCards, setRecentCards] = useState<any[]>([]);
  const { user } = useAuth();

  const timeFilters = ["Daily", "Weekly", "Monthly", "Yearly"];
  const selectedFilter = "Weekly";

  useEffect(() => {
    if (user) {
      fetchPortfolioData();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchPortfolioData = async () => {
    try {
      // Fetch user's collection with card details and latest prices
      const { data: collection, error } = await supabase
        .from('user_collection')
        .select(`
          *,
          cards (
            id,
            name,
            set_name,
            image_url,
            market_prices (
              price,
              source,
              currency,
              date_collected
            )
          )
        `)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;

      let totalValue = 0;
      const recentCardsData = collection?.map((item: any) => {
        // Get latest market price for each card
        const latestPrice = item.cards?.market_prices?.[0]?.price || 0;
        const cardValue = latestPrice * item.quantity;
        totalValue += cardValue;

        return {
          name: item.cards?.name,
          set: item.cards?.set_name,
          image: item.cards?.image_url,
          quantity: item.quantity,
          currentPrice: latestPrice,
          totalValue: cardValue
        };
      }) || [];

      setPortfolioValue(totalValue);
      setRecentCards(recentCardsData);
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Card className="p-6 hover:shadow-md transition-shadow duration-200">
        <div className="text-center py-8">
          <h3 className="text-lg font-semibold mb-2">Track Your Collection Value</h3>
          <p className="text-muted-foreground mb-4">Sign in to see your portfolio's real-time value</p>
          <div className="text-2xl font-bold text-muted-foreground">$0.00</div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Collection Value</h3>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => console.log("Expand Collection Value view")}
        >
          Expand View
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : (
        <>
          {/* Main Balance Display */}
          <div className="mb-6">
            <div className="text-4xl font-bold text-foreground mb-2">
              ${portfolioValue.toFixed(2)}
            </div>
            <div className="text-success font-semibold flex items-center">
              <span className="mr-1">↗</span>
              Portfolio tracking active
            </div>
          </div>

          {/* Time Filter Buttons */}
          <div className="flex space-x-2 mb-6">
            {timeFilters.map((filter) => (
              <Button
                key={filter}
                variant={filter === selectedFilter ? "default" : "outline"}
                size="sm"
                className="text-sm"
              >
                {filter}
              </Button>
            ))}
          </div>

          {/* Recent Cards */}
          {recentCards.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-muted-foreground mb-3">Recent Cards:</h4>
              {recentCards.slice(0, 3).map((card, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-pokemon-blue/20 rounded border flex items-center justify-center text-xs">
                      ⚡
                    </div>
                    <span className="text-sm text-muted-foreground">{card.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">${card.totalValue?.toFixed(2) || '0.00'}</div>
                    <div className="text-xs text-muted-foreground">
                      {card.quantity}x @ ${card.currentPrice?.toFixed(2) || '0.00'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {recentCards.length === 0 && (
            <div className="text-center py-4 text-muted-foreground">
              No cards in collection yet. Start scanning cards to build your portfolio!
            </div>
          )}
        </>
      )}
    </Card>
  );
}