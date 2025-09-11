import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Zap, TrendingUp, BarChart3, Shield, Star } from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Deep insights into your collection performance with detailed charts and trends."
  },
  {
    icon: TrendingUp,
    title: "Unlimited Price Alerts",
    description: "Set alerts for any number of cards and get notified of price changes instantly."
  },
  {
    icon: Zap,
    title: "Batch Card Scanning",
    description: "Scan multiple cards at once with our advanced OCR technology."
  },
  {
    icon: Shield,
    title: "Portfolio Protection",
    description: "Insurance coverage and fraud protection for your digital card collection."
  },
  {
    icon: Star,
    title: "Priority Support",
    description: "Get priority customer support with faster response times."
  },
  {
    icon: Crown,
    title: "Exclusive Integrations",
    description: "Access to premium platforms and exclusive trading opportunities."
  }
];

const testimonials = [
  {
    name: "Alex Chen",
    username: "@pokecollector",
    text: "The premium analytics helped me identify undervalued cards in my collection. Worth every penny!",
    rating: 5
  },
  {
    name: "Sarah Johnson", 
    username: "@cardmaster",
    text: "Batch scanning saved me hours of manual entry. The premium features are game-changing.",
    rating: 5
  },
  {
    name: "Mike Rodriguez",
    username: "@tradingace",
    text: "Price alerts caught a 40% spike in my Charizard cards. Premium paid for itself!",
    rating: 5
  }
];

export default function Premium() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center space-x-3">
            <Crown className="h-12 w-12 text-pokemon-yellow" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pokemon-blue to-pokemon-yellow bg-clip-text text-transparent">
              PokeVault Premium
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Unlock the full potential of your Pokemon card collection with advanced features, 
            unlimited tracking, and premium insights.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Badge variant="outline" className="bg-success/20 text-success">
              ⚡ 50% off first month
            </Badge>
            <Badge variant="outline" className="bg-pokemon-yellow/20 text-pokemon-yellow">
              🎯 Most Popular
            </Badge>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <Card className="p-6 relative">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold">Free</h3>
              <div className="text-3xl font-bold">$0<span className="text-base font-normal text-muted-foreground">/month</span></div>
              <p className="text-muted-foreground">Perfect for casual collectors</p>
              
              <div className="space-y-3 text-left">
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-success" />
                  <span className="text-sm">Up to 100 cards</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-success" />
                  <span className="text-sm">Basic price tracking</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-success" />
                  <span className="text-sm">5 price alerts</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-success" />
                  <span className="text-sm">Standard card scanner</span>
                </div>
              </div>
              
              <Button variant="outline" className="w-full">
                Current Plan
              </Button>
            </div>
          </Card>

          {/* Premium Plan */}
          <Card className="p-6 relative border-2 border-pokemon-yellow bg-gradient-to-b from-pokemon-yellow/5 to-background">
            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-pokemon-yellow text-pokemon-blue">
              Most Popular
            </Badge>
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold flex items-center justify-center">
                Premium
                <Crown className="h-5 w-5 ml-2 text-pokemon-yellow" />
              </h3>
              <div className="text-3xl font-bold">$9.99<span className="text-base font-normal text-muted-foreground">/month</span></div>
              <p className="text-muted-foreground">For serious collectors</p>
              
              <div className="space-y-3 text-left">
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-success" />
                  <span className="text-sm">Unlimited cards</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-success" />
                  <span className="text-sm">Advanced analytics</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-success" />
                  <span className="text-sm">Unlimited price alerts</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-success" />
                  <span className="text-sm">Batch card scanning</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-success" />
                  <span className="text-sm">Portfolio insights</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-success" />
                  <span className="text-sm">Priority support</span>
                </div>
              </div>
              
              <Button className="w-full bg-pokemon-yellow hover:bg-pokemon-yellow/90 text-pokemon-blue font-bold">
                Upgrade Now
              </Button>
            </div>
          </Card>

          {/* Pro Plan */}
          <Card className="p-6 relative">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold">Pro Collector</h3>
              <div className="text-3xl font-bold">$19.99<span className="text-base font-normal text-muted-foreground">/month</span></div>
              <p className="text-muted-foreground">For professional traders</p>
              
              <div className="space-y-3 text-left">
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-success" />
                  <span className="text-sm">Everything in Premium</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-success" />
                  <span className="text-sm">API access</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-success" />
                  <span className="text-sm">White-label reports</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-success" />
                  <span className="text-sm">Collection insurance</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-success" />
                  <span className="text-sm">Dedicated support</span>
                </div>
              </div>
              
              <Button variant="outline" className="w-full">
                Coming Soon
              </Button>
            </div>
          </Card>
        </div>

        {/* Features Section */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-pokemon-blue mb-4">Premium Features</h2>
            <p className="text-muted-foreground">Everything you need to maximize your collection's potential</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="p-6 hover:shadow-lg transition-all duration-200 hover:scale-105">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-pokemon-yellow/20 rounded-lg flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-pokemon-yellow" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-pokemon-blue mb-4">What Our Users Say</h2>
            <p className="text-muted-foreground">Join thousands of satisfied Pokemon card collectors</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.username} className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-pokemon-yellow fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground italic">"{testimonial.text}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.username}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="p-8 bg-gradient-to-r from-pokemon-blue/10 to-pokemon-yellow/10 border-2 border-pokemon-yellow">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold">Ready to Level Up Your Collection?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join the premium community and unlock advanced features to maximize your Pokemon card 
              collection's potential. Start your free trial today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-pokemon-yellow hover:bg-pokemon-yellow/90 text-pokemon-blue font-bold">
                <Crown className="h-5 w-5 mr-2" />
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline">
                View All Features
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              30-day free trial • Cancel anytime • No hidden fees
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}