import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, MessageCircle, Share, TrendingUp, Users, Zap, Trophy, Star, Plus, Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const mockPosts = [
  {
    id: 1,
    user: "PokeMaster92",
    avatar: "🔥",
    time: "2h ago",
    content: "Just pulled this amazing Charizard from a booster pack! What do you think it's worth?",
    image: true,
    likes: 24,
    comments: 8,
    category: "pulls"
  },
  {
    id: 2,
    user: "CardCollector",
    avatar: "⚡",
    time: "4h ago", 
    content: "Looking to trade my duplicate Pikachu Illustrator for Base Set Shadowless cards. Anyone interested?",
    likes: 15,
    comments: 12,
    category: "trades"
  },
  {
    id: 3,
    user: "VintageCards",
    avatar: "🌟",
    time: "6h ago",
    content: "PSA 10 Base Set completion milestone! 🎉 Only 3 cards left to go. The journey has been incredible!",
    image: true,
    likes: 47,
    comments: 23,
    category: "achievements"
  }
];

const leaderboard = [
  { rank: 1, user: "CardKing", points: 2847, badge: "👑" },
  { rank: 2, user: "PokeLegend", points: 2341, badge: "🥈" },
  { rank: 3, user: "MasterTrader", points: 1956, badge: "🥉" },
  { rank: 4, user: "VintageHunter", points: 1724, badge: "⭐" },
  { rank: 5, user: "RareSeeker", points: 1583, badge: "⭐" }
];

const trendingTopics = [
  { tag: "#BaseSets", posts: 234 },
  { tag: "#PriceAlert", posts: 189 },
  { tag: "#TradeOffers", posts: 156 },
  { tag: "#PSAGrading", posts: 142 },
  { tag: "#NewReleases", posts: 98 }
];

export default function Community() {
  const [newPost, setNewPost] = useState("");
  const [filter, setFilter] = useState("all");
  const { toast } = useToast();

  const createPost = () => {
    if (!newPost.trim()) return;
    
    toast({
      title: "Post Created!",
      description: "Your post has been shared with the community.",
    });
    setNewPost("");
  };

  const likePost = (postId: number) => {
    toast({
      title: "Post Liked!",
      description: "Your like has been added to the post.",
    });
  };

  const filteredPosts = filter === "all" ? mockPosts : mockPosts.filter(post => post.category === filter);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-pokemon-blue">Community Hub</h1>
          <p className="text-muted-foreground">
            Connect with fellow Pokemon card collectors, share your pulls, and trade cards.
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-pokemon-blue">12.5K</div>
            <div className="text-muted-foreground">Active Members</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-success">847</div>
            <div className="text-muted-foreground">Posts Today</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-pokemon-yellow">1.2K</div>
            <div className="text-muted-foreground">Active Trades</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-destructive">98%</div>
            <div className="text-muted-foreground">Positive Rating</div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Feed */}
          <div className="lg:col-span-3 space-y-6">
            {/* Create Post */}
            <Card className="p-4">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-pokemon-blue/20 to-pokemon-yellow/20 rounded-full flex items-center justify-center">
                    <Zap className="h-5 w-5 text-pokemon-yellow" />
                  </div>
                  <div className="flex-1">
                    <Input
                      placeholder="Share your latest pull, trade offer, or collecting tip..."
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      className="mb-3"
                    />
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">📷 Photo</Button>
                        <Button variant="outline" size="sm">🎯 Trade</Button>
                        <Button variant="outline" size="sm">📊 Poll</Button>
                      </div>
                      <Button onClick={createPost} disabled={!newPost.trim()}>
                        <Plus className="h-4 w-4 mr-2" />
                        Post
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Filter Tabs */}
            <Tabs value={filter} onValueChange={setFilter}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All Posts</TabsTrigger>
                <TabsTrigger value="pulls">Pulls & Finds</TabsTrigger>
                <TabsTrigger value="trades">Trade Offers</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Posts Feed */}
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="p-6 hover:shadow-md transition-shadow">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-pokemon-blue/20 to-pokemon-yellow/20 rounded-full flex items-center justify-center">
                          <span>{post.avatar}</span>
                        </div>
                        <div>
                          <div className="font-semibold">{post.user}</div>
                          <div className="text-sm text-muted-foreground">{post.time}</div>
                        </div>
                      </div>
                      <Badge variant="outline">
                        {post.category}
                      </Badge>
                    </div>

                    <p className="text-sm">{post.content}</p>

                    {post.image && (
                      <div className="w-full h-48 bg-gradient-to-br from-pokemon-blue/20 to-pokemon-yellow/20 rounded-lg flex items-center justify-center">
                        <Zap className="h-12 w-12 text-pokemon-yellow" />
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center space-x-6">
                        <button
                          onClick={() => likePost(post.id)}
                          className="flex items-center space-x-2 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Heart className="h-4 w-4" />
                          <span className="text-sm">{post.likes}</span>
                        </button>
                        
                        <button className="flex items-center space-x-2 text-muted-foreground hover:text-pokemon-blue transition-colors">
                          <MessageCircle className="h-4 w-4" />
                          <span className="text-sm">{post.comments}</span>
                        </button>
                        
                        <button className="flex items-center space-x-2 text-muted-foreground hover:text-pokemon-yellow transition-colors">
                          <Share className="h-4 w-4" />
                          <span className="text-sm">Share</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <Card className="p-4">
              <h3 className="font-semibold mb-4 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                Trending Topics
              </h3>
              <div className="space-y-3">
                {trendingTopics.map((topic) => (
                  <div key={topic.tag} className="flex items-center justify-between">
                    <span className="text-sm text-pokemon-blue font-medium">{topic.tag}</span>
                    <span className="text-xs text-muted-foreground">{topic.posts} posts</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Leaderboard */}
            <Card className="p-4">
              <h3 className="font-semibold mb-4 flex items-center">
                <Trophy className="h-4 w-4 mr-2 text-pokemon-yellow" />
                Top Contributors
              </h3>
              <div className="space-y-3">
                {leaderboard.map((user) => (
                  <div key={user.rank} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-mono">#{user.rank}</span>
                      <span className="text-lg">{user.badge}</span>
                      <span className="text-sm font-medium">{user.user}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{user.points}pts</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  Find Trading Partners
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Star className="h-4 w-4 mr-2" />
                  Join Premium Group
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Start Discussion
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}