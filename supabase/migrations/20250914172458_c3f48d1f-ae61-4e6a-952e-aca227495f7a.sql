-- Create profiles table for user settings
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT,
  email TEXT,
  currency TEXT DEFAULT 'USD',
  notifications_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create cards reference table
CREATE TABLE public.cards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  set_name TEXT NOT NULL,
  card_number TEXT NOT NULL,
  edition TEXT, -- unlimited, shadowless, etc.
  language TEXT DEFAULT 'English',
  rarity TEXT,
  image_url TEXT,
  tcg_id TEXT, -- External API identifier
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create gradings table for graded cards
CREATE TABLE public.gradings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  grading_company TEXT NOT NULL, -- PSA, CGC, Beckett
  grade DECIMAL(3,1) NOT NULL CHECK (grade >= 1 AND grade <= 10),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create market prices table for historical and real-time data
CREATE TABLE public.market_prices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  card_id UUID NOT NULL REFERENCES public.cards(id) ON DELETE CASCADE,
  source TEXT NOT NULL, -- eBay, TCGPlayer, CardMarket
  price DECIMAL(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  condition TEXT, -- NM, LP, etc.
  grading_id UUID REFERENCES public.gradings(id),
  date_collected TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user collection table
CREATE TABLE public.user_collection (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  card_id UUID NOT NULL REFERENCES public.cards(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  condition TEXT DEFAULT 'NM', -- Near Mint, Light Play, etc.
  grading_id UUID REFERENCES public.gradings(id),
  acquisition_price DECIMAL(10,2),
  acquisition_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create alerts table
CREATE TABLE public.alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  card_id UUID NOT NULL REFERENCES public.cards(id) ON DELETE CASCADE,
  trigger_type TEXT NOT NULL CHECK (trigger_type IN ('price_drop', 'price_increase', 'percentage_change')),
  threshold_value DECIMAL(10,2) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gradings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_collection ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for cards (publicly readable)
CREATE POLICY "Cards are publicly readable" ON public.cards
  FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert cards" ON public.cards
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- RLS Policies for gradings (publicly readable)
CREATE POLICY "Gradings are publicly readable" ON public.gradings
  FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert gradings" ON public.gradings
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- RLS Policies for market prices (publicly readable)
CREATE POLICY "Market prices are publicly readable" ON public.market_prices
  FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert market prices" ON public.market_prices
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- RLS Policies for user collection
CREATE POLICY "Users can view their own collection" ON public.user_collection
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert to their own collection" ON public.user_collection
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own collection" ON public.user_collection
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete from their own collection" ON public.user_collection
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for alerts
CREATE POLICY "Users can view their own alerts" ON public.alerts
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own alerts" ON public.alerts
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own alerts" ON public.alerts
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own alerts" ON public.alerts
  FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_cards_name ON public.cards(name);
CREATE INDEX idx_cards_set_name ON public.cards(set_name);
CREATE INDEX idx_cards_tcg_id ON public.cards(tcg_id);
CREATE INDEX idx_market_prices_card_id ON public.market_prices(card_id);
CREATE INDEX idx_market_prices_date ON public.market_prices(date_collected);
CREATE INDEX idx_user_collection_user_id ON public.user_collection(user_id);
CREATE INDEX idx_user_collection_card_id ON public.user_collection(card_id);
CREATE INDEX idx_alerts_user_id ON public.alerts(user_id);

-- Create function to update updated_at columns
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cards_updated_at
  BEFORE UPDATE ON public.cards
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_collection_updated_at
  BEFORE UPDATE ON public.user_collection
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_alerts_updated_at
  BEFORE UPDATE ON public.alerts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, username)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'username', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Insert some sample Pokemon cards
INSERT INTO public.cards (name, set_name, card_number, edition, rarity, image_url, tcg_id) VALUES
('Charizard', 'Base Set', '4', 'Shadowless', 'Rare Holo', 'https://images.pokemontcg.io/base1/4_hires.png', 'base1-4'),
('Blastoise', 'Base Set', '2', 'Shadowless', 'Rare Holo', 'https://images.pokemontcg.io/base1/2_hires.png', 'base1-2'),
('Venusaur', 'Base Set', '15', 'Shadowless', 'Rare Holo', 'https://images.pokemontcg.io/base1/15_hires.png', 'base1-15'),
('Pikachu', 'Base Set', '58', 'Shadowless', 'Common', 'https://images.pokemontcg.io/base1/58_hires.png', 'base1-58'),
('Mewtwo', 'Base Set', '10', 'Shadowless', 'Rare Holo', 'https://images.pokemontcg.io/base1/10_hires.png', 'base1-10');

-- Insert sample gradings
INSERT INTO public.gradings (grading_company, grade) VALUES
('PSA', 10.0),
('PSA', 9.0),
('BGS', 9.5),
('CGC', 10.0);

-- Insert sample market prices for Charizard
INSERT INTO public.market_prices (card_id, source, price, currency, condition, date_collected) 
SELECT 
  c.id,
  'TCGPlayer',
  350.00,
  'USD',
  'NM',
  now() - interval '1 day'
FROM public.cards c WHERE c.name = 'Charizard' AND c.set_name = 'Base Set';

INSERT INTO public.market_prices (card_id, source, price, currency, condition, date_collected) 
SELECT 
  c.id,
  'eBay',
  375.00,
  'USD',
  'NM',
  now() - interval '1 day'
FROM public.cards c WHERE c.name = 'Charizard' AND c.set_name = 'Base Set';