import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wallet as WalletIcon, TrendingUp, TrendingDown, ExternalLink, Copy, RefreshCw, Plus, Zap } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const mockWallets = [
  {
    name: "MetaMask",
    address: "0x742d35Cc6bE7B2bA64bF453182A767B4Ba78D289",
    balance: 2.45,
    usdValue: 4890.50,
    connected: true,
    type: "ethereum"
  },
  {
    name: "Phantom",
    address: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
    balance: 15.8,
    usdValue: 1580.00,
    connected: true,
    type: "solana"
  }
];

const mockTokens = [
  {
    name: "Pokemon Card Token",
    symbol: "PKT",
    balance: 1250,
    usdValue: 3125.00,
    change24h: 5.2,
    contract: "0x123...abc"
  },
  {
    name: "Trading Card Coin",
    symbol: "TCC", 
    balance: 850,
    usdValue: 1700.00,
    change24h: -2.1,
    contract: "0x456...def"
  }
];

const mockTransactions = [
  {
    id: 1,
    type: "receive",
    amount: 0.5,
    token: "ETH",
    usdValue: 1250.00,
    from: "0x123...abc",
    timestamp: "2 hours ago",
    status: "confirmed"
  },
  {
    id: 2,
    type: "send",
    amount: 100,
    token: "PKT",
    usdValue: 250.00,
    to: "0x789...xyz",
    timestamp: "1 day ago", 
    status: "confirmed"
  }
];

export default function Wallet() {
  const [selectedWallet, setSelectedWallet] = useState(mockWallets[0]);
  const { toast } = useToast();

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    toast({
      title: "Address copied!",
      description: "Wallet address has been copied to clipboard.",
    });
  };

  const connectWallet = () => {
    toast({
      title: "Connecting Wallet",
      description: "Please approve the connection in your wallet app.",
    });
  };

  const totalUsdValue = mockWallets.reduce((sum, wallet) => sum + wallet.usdValue, 0) + 
                      mockTokens.reduce((sum, token) => sum + token.usdValue, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-pokemon-blue">Digital Wallet</h1>
          <p className="text-muted-foreground">
            Manage your crypto wallets and tokenized Pokemon card assets.
          </p>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-pokemon-blue">${totalUsdValue.toLocaleString()}</div>
            <div className="text-muted-foreground">Total Portfolio</div>
            <div className="text-sm text-success">+12.5% (24h)</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-success">{mockWallets.filter(w => w.connected).length}</div>
            <div className="text-muted-foreground">Connected Wallets</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-pokemon-yellow">{mockTokens.length}</div>
            <div className="text-muted-foreground">Token Types</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-destructive">${mockTokens.reduce((sum, t) => sum + t.usdValue, 0).toLocaleString()}</div>
            <div className="text-muted-foreground">NFT Value</div>
          </Card>
        </div>

        <Tabs defaultValue="wallets" className="space-y-6">
          <TabsList>
            <TabsTrigger value="wallets">Wallets</TabsTrigger>
            <TabsTrigger value="tokens">Tokens</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>

          <TabsContent value="wallets" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Wallet List */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Connected Wallets</h3>
                  <Button onClick={connectWallet}>
                    <Plus className="h-4 w-4 mr-2" />
                    Connect Wallet
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {mockWallets.map((wallet) => (
                    <div 
                      key={wallet.address}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-accent/50 ${
                        selectedWallet.address === wallet.address ? 'border-primary bg-accent/20' : ''
                      }`}
                      onClick={() => setSelectedWallet(wallet)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <WalletIcon className="h-5 w-5" />
                          <span className="font-semibold">{wallet.name}</span>
                          <Badge variant="default" className="bg-success">Connected</Badge>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">${wallet.usdValue.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">{wallet.balance} {wallet.type.toUpperCase()}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground font-mono">
                          {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            copyAddress(wallet.address);
                          }}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Wallet Details */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{selectedWallet.name} Details</h3>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-accent/20 rounded-lg text-center">
                    <div className="text-3xl font-bold text-pokemon-blue">${selectedWallet.usdValue.toLocaleString()}</div>
                    <div className="text-muted-foreground">{selectedWallet.balance} {selectedWallet.type.toUpperCase()}</div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Wallet Address</div>
                    <div className="flex items-center justify-between p-2 bg-accent/10 rounded">
                      <span className="font-mono text-sm">{selectedWallet.address}</span>
                      <Button variant="ghost" size="sm" onClick={() => copyAddress(selectedWallet.address)}>
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button className="flex-1">
                      <Zap className="h-4 w-4 mr-2" />
                      Send
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <TrendingDown className="h-4 w-4 mr-2" />
                      Receive
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tokens" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Token Holdings</h3>
              <div className="space-y-4">
                {mockTokens.map((token) => (
                  <div key={token.symbol} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-pokemon-blue/20 to-pokemon-yellow/20 rounded-full flex items-center justify-center">
                        <span className="font-bold text-pokemon-yellow">{token.symbol[0]}</span>
                      </div>
                      <div>
                        <div className="font-semibold">{token.name}</div>
                        <div className="text-sm text-muted-foreground">{token.symbol}</div>
                        <div className="text-xs text-muted-foreground font-mono">{token.contract}</div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-bold">${token.usdValue.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">{token.balance.toLocaleString()} {token.symbol}</div>
                      <div className={`text-sm flex items-center justify-end ${token.change24h > 0 ? 'text-success' : 'text-destructive'}`}>
                        {token.change24h > 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                        {Math.abs(token.change24h)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
              <div className="space-y-3">
                {mockTransactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        tx.type === 'receive' ? 'bg-success/20' : 'bg-destructive/20'
                      }`}>
                        {tx.type === 'receive' ? 
                          <TrendingUp className="h-5 w-5 text-success" /> : 
                          <TrendingDown className="h-5 w-5 text-destructive" />
                        }
                      </div>
                      <div>
                        <div className="font-semibold">
                          {tx.type === 'receive' ? 'Received' : 'Sent'} {tx.amount} {tx.token}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {tx.type === 'receive' ? `From: ${tx.from}` : `To: ${tx.to}`}
                        </div>
                        <div className="text-xs text-muted-foreground">{tx.timestamp}</div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-bold">${tx.usdValue.toLocaleString()}</div>
                      <Badge variant="outline" className="bg-success/20 text-success">
                        {tx.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}