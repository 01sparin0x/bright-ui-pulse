import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { AuthModal } from "@/components/AuthModal";
import { LogOut, Settings, Crown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function UserProfile() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out",
      description: "You've been signed out successfully"
    });
  };

  if (!user) {
    return (
      <>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                PV
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold text-foreground">Welcome to PokeVault!</h2>
              <p className="text-muted-foreground">Sign in to track your Pokemon card collection</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setAuthModalOpen(true)}
            >
              Sign In
            </Button>
          </div>
        </div>
        <AuthModal 
          open={authModalOpen} 
          onOpenChange={setAuthModalOpen} 
        />
      </>
    );
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src="" alt="User" />
          <AvatarFallback className="bg-primary text-primary-foreground font-bold">
            {user.email?.charAt(0).toUpperCase() || 'T'}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-bold text-foreground">Welcome back, Trainer!</h2>
          <p className="text-muted-foreground">{user.email}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
        <Button variant="outline" size="sm">
          <Crown className="h-4 w-4 mr-2" />
          Premium
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleSignOut}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}