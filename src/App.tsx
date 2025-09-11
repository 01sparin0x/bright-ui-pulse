import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Collection from "./pages/Collection";
import CardLibrary from "./pages/CardLibrary";
import Platforms from "./pages/Platforms";
import TradeHistory from "./pages/TradeHistory";
import MarketData from "./pages/MarketData";
import DeckBuilder from "./pages/DeckBuilder";
import Analytics from "./pages/Analytics";
import Wallet from "./pages/Wallet";
import Settings from "./pages/Settings";
import Premium from "./pages/Premium";
import Community from "./pages/Community";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/library" element={<CardLibrary />} />
          <Route path="/platforms" element={<Platforms />} />
          <Route path="/trades" element={<TradeHistory />} />
          <Route path="/market" element={<MarketData />} />
          <Route path="/deck-builder" element={<DeckBuilder />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/community" element={<Community />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
