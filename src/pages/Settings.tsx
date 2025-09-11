import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { User, Bell, Shield, Palette, Database, Zap, Crown } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function Settings() {
  const [notifications, setNotifications] = useState({
    priceAlerts: true,
    newCards: false,
    trades: true,
    marketing: false
  });
  
  const [profile, setProfile] = useState({
    username: "PokeCollector",
    email: "collector@pokevault.com",
    displayName: "Pokemon Master"
  });

  const { toast } = useToast();

  const saveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-pokemon-blue">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account preferences and application settings.
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="display">Display</TabsTrigger>
            <TabsTrigger value="premium">Premium</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <User className="h-5 w-5 mr-2" />
                Profile Information
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-pokemon-blue/20 to-pokemon-yellow/20 rounded-full flex items-center justify-center">
                    <Zap className="h-10 w-10 text-pokemon-yellow" />
                  </div>
                  <Button variant="outline">Change Avatar</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={profile.username}
                      onChange={(e) => setProfile(prev => ({...prev, username: e.target.value}))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input
                      id="displayName"
                      value={profile.displayName}
                      onChange={(e) => setProfile(prev => ({...prev, displayName: e.target.value}))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile(prev => ({...prev, email: e.target.value}))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <select className="w-full px-3 py-2 border rounded-md bg-background">
                      <option>UTC-5 (Eastern Time)</option>
                      <option>UTC-8 (Pacific Time)</option>
                      <option>UTC+0 (GMT)</option>
                    </select>
                  </div>
                </div>

                <Button onClick={saveSettings} className="w-full md:w-auto">
                  Save Changes
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Notification Preferences
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Price Alerts</div>
                    <div className="text-sm text-muted-foreground">Get notified when card prices change significantly</div>
                  </div>
                  <Switch
                    checked={notifications.priceAlerts}
                    onCheckedChange={(checked) => setNotifications(prev => ({...prev, priceAlerts: checked}))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">New Card Releases</div>
                    <div className="text-sm text-muted-foreground">Notifications about new Pokemon card sets</div>
                  </div>
                  <Switch
                    checked={notifications.newCards}
                    onCheckedChange={(checked) => setNotifications(prev => ({...prev, newCards: checked}))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Trade Updates</div>
                    <div className="text-sm text-muted-foreground">Updates on your trades and transactions</div>
                  </div>
                  <Switch
                    checked={notifications.trades}
                    onCheckedChange={(checked) => setNotifications(prev => ({...prev, trades: checked}))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Marketing & Tips</div>
                    <div className="text-sm text-muted-foreground">Collecting tips and platform updates</div>
                  </div>
                  <Switch
                    checked={notifications.marketing}
                    onCheckedChange={(checked) => setNotifications(prev => ({...prev, marketing: checked}))}
                  />
                </div>

                <Button onClick={saveSettings} className="w-full md:w-auto">
                  Save Preferences
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Privacy & Security
              </h3>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Collection Visibility</h4>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="visibility" defaultChecked />
                      <span>Public - Anyone can view my collection</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="visibility" />
                      <span>Friends Only - Only approved friends can see</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="visibility" />
                      <span>Private - Only I can see my collection</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Data Management</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      Download My Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Delete Account
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Two-Factor Authentication</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">2FA Status</div>
                      <div className="text-sm text-muted-foreground">Add extra security to your account</div>
                    </div>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="display" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Palette className="h-5 w-5 mr-2" />
                Display Preferences
              </h3>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Theme</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-3 border rounded-lg cursor-pointer hover:bg-accent/50 text-center">
                      <div className="w-full h-12 bg-gradient-to-br from-background to-accent rounded mb-2"></div>
                      <div className="text-sm">Light</div>
                    </div>
                    <div className="p-3 border-2 border-primary rounded-lg cursor-pointer bg-accent/20 text-center">
                      <div className="w-full h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded mb-2"></div>
                      <div className="text-sm">Dark</div>
                    </div>
                    <div className="p-3 border rounded-lg cursor-pointer hover:bg-accent/50 text-center">
                      <div className="w-full h-12 bg-gradient-to-br from-blue-500 to-yellow-400 rounded mb-2"></div>
                      <div className="text-sm">Pokemon</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Card Display</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Show card prices</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Animate card hovers</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>High quality images</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Language & Region</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Language</Label>
                      <select className="w-full px-3 py-2 border rounded-md bg-background">
                        <option>English (US)</option>
                        <option>English (UK)</option>
                        <option>Français</option>
                        <option>Español</option>
                        <option>日本語</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Currency</Label>
                      <select className="w-full px-3 py-2 border rounded-md bg-background">
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                        <option>GBP (£)</option>
                        <option>JPY (¥)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="premium" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Crown className="h-5 w-5 mr-2 text-pokemon-yellow" />
                Premium Membership
              </h3>
              
              <div className="space-y-6">
                <div className="p-4 bg-gradient-to-r from-pokemon-blue/10 to-pokemon-yellow/10 rounded-lg border-2 border-pokemon-yellow">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-bold">Current Plan: Free</h4>
                      <p className="text-muted-foreground">Upgrade to unlock premium features</p>
                    </div>
                    <Badge variant="outline" className="bg-pokemon-yellow/20 text-pokemon-yellow border-pokemon-yellow">
                      Free Tier
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-6">
                    <h4 className="text-lg font-semibold mb-2">Free</h4>
                    <div className="text-3xl font-bold mb-4">$0<span className="text-base font-normal">/month</span></div>
                    <ul className="space-y-2 text-sm">
                      <li>✓ Basic collection tracking</li>
                      <li>✓ Price alerts (5 cards)</li>
                      <li>✓ Standard card scanner</li>
                      <li>✓ Community access</li>
                      <li>✗ Advanced analytics</li>
                      <li>✗ Unlimited price alerts</li>
                      <li>✗ Portfolio insights</li>
                    </ul>
                  </div>

                  <div className="border-2 border-pokemon-yellow rounded-lg p-6 bg-pokemon-yellow/5">
                    <h4 className="text-lg font-semibold mb-2 flex items-center">
                      Premium 
                      <Crown className="h-4 w-4 ml-2 text-pokemon-yellow" />
                    </h4>
                    <div className="text-3xl font-bold mb-4">$9.99<span className="text-base font-normal">/month</span></div>
                    <ul className="space-y-2 text-sm mb-6">
                      <li>✓ Everything in Free</li>
                      <li>✓ Advanced analytics & insights</li>
                      <li>✓ Unlimited price alerts</li>
                      <li>✓ Portfolio performance tracking</li>
                      <li>✓ Batch card scanning</li>
                      <li>✓ Priority support</li>
                      <li>✓ Export data & reports</li>
                    </ul>
                    <Button className="w-full bg-pokemon-yellow hover:bg-pokemon-yellow/90 text-pokemon-blue font-bold">
                      Upgrade to Premium
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}