-- SkillSwap Database Schema for Supabase
-- Run these SQL commands in your Supabase SQL editor

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create profiles table to extend auth.users
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  location TEXT,
  bio TEXT,
  phone TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  is_online BOOLEAN DEFAULT FALSE,
  rating DECIMAL(2,1) DEFAULT 0.0,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create skills table
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create user_skills table (skills users can teach)
CREATE TABLE IF NOT EXISTS public.user_skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  skill_id UUID REFERENCES public.skills(id) ON DELETE CASCADE,
  proficiency_level TEXT CHECK (proficiency_level IN ('beginner', 'intermediate', 'advanced', 'expert')),
  years_experience INTEGER,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, skill_id)
);

-- Create user_learning_interests table (skills users want to learn)
CREATE TABLE IF NOT EXISTS public.user_learning_interests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  skill_id UUID REFERENCES public.skills(id) ON DELETE CASCADE,
  interest_level TEXT CHECK (interest_level IN ('casual', 'moderate', 'serious', 'urgent')),
  preferred_learning_style TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, skill_id)
);

-- Create skill_swaps table
CREATE TABLE IF NOT EXISTS public.skill_swaps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  teacher_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  learner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  teaching_skill_id UUID REFERENCES public.skills(id),
  learning_skill_id UUID REFERENCES public.skills(id),
  status TEXT CHECK (status IN ('pending', 'accepted', 'in_progress', 'completed', 'cancelled')) DEFAULT 'pending',
  proposed_duration TEXT,
  proposed_schedule TEXT,
  meeting_type TEXT CHECK (meeting_type IN ('online', 'in_person', 'hybrid')),
  location TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  swap_id UUID REFERENCES public.skill_swaps(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  swap_id UUID REFERENCES public.skill_swaps(id) ON DELETE CASCADE,
  reviewer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  reviewee_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  is_public BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create admin_users table for enhanced admin permissions
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
  permissions JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES public.profiles(id)
);

-- Create reports table for content moderation
CREATE TABLE IF NOT EXISTS public.reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  reporter_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  reported_user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  reported_content_type TEXT CHECK (reported_content_type IN ('user', 'swap', 'message', 'review')),
  reported_content_id UUID,
  reason TEXT NOT NULL,
  description TEXT,
  status TEXT CHECK (status IN ('pending', 'reviewed', 'resolved', 'dismissed')) DEFAULT 'pending',
  reviewed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_learning_interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_swaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create policies for skills (public read, admin write)
CREATE POLICY "Skills are viewable by everyone" ON public.skills
  FOR SELECT USING (true);

-- Create policies for user_skills
CREATE POLICY "User skills are viewable by everyone" ON public.user_skills
  FOR SELECT USING (true);

CREATE POLICY "Users can manage their own skills" ON public.user_skills
  FOR ALL USING (auth.uid() = user_id);

-- Create policies for user_learning_interests
CREATE POLICY "Learning interests are viewable by everyone" ON public.user_learning_interests
  FOR SELECT USING (true);

CREATE POLICY "Users can manage their own learning interests" ON public.user_learning_interests
  FOR ALL USING (auth.uid() = user_id);

-- Create policies for skill_swaps
CREATE POLICY "Users can view swaps they're involved in" ON public.skill_swaps
  FOR SELECT USING (auth.uid() = teacher_id OR auth.uid() = learner_id);

CREATE POLICY "Users can create swaps" ON public.skill_swaps
  FOR INSERT WITH CHECK (auth.uid() = teacher_id OR auth.uid() = learner_id);

CREATE POLICY "Users can update swaps they're involved in" ON public.skill_swaps
  FOR UPDATE USING (auth.uid() = teacher_id OR auth.uid() = learner_id);

-- Create policies for messages
CREATE POLICY "Users can view messages in their swaps" ON public.messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.skill_swaps 
      WHERE id = swap_id AND (teacher_id = auth.uid() OR learner_id = auth.uid())
    )
  );

CREATE POLICY "Users can send messages in their swaps" ON public.messages
  FOR INSERT WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM public.skill_swaps 
      WHERE id = swap_id AND (teacher_id = auth.uid() OR learner_id = auth.uid())
    )
  );

-- Create policies for reviews
CREATE POLICY "Public reviews are viewable by everyone" ON public.reviews
  FOR SELECT USING (is_public = true);

CREATE POLICY "Users can create reviews for completed swaps" ON public.reviews
  FOR INSERT WITH CHECK (
    auth.uid() = reviewer_id AND
    EXISTS (
      SELECT 1 FROM public.skill_swaps 
      WHERE id = swap_id AND status = 'completed' AND (teacher_id = auth.uid() OR learner_id = auth.uid())
    )
  );

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url, location)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url',
    NEW.raw_user_meta_data->>'location'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update user's updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updating updated_at
CREATE TRIGGER handle_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_skill_swaps_updated_at
  BEFORE UPDATE ON public.skill_swaps
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Insert some initial skills
INSERT INTO public.skills (name, category, description) VALUES
  ('JavaScript', 'Programming', 'Modern JavaScript programming language'),
  ('Python', 'Programming', 'Python programming language'),
  ('React', 'Web Development', 'React.js library for building user interfaces'),
  ('Node.js', 'Backend Development', 'JavaScript runtime for server-side development'),
  ('SQL', 'Database', 'Structured Query Language for database management'),
  ('Git', 'Version Control', 'Version control system for tracking changes'),
  ('Photography', 'Creative', 'Digital and film photography techniques'),
  ('Cooking', 'Lifestyle', 'Culinary skills and cooking techniques'),
  ('Spanish', 'Language', 'Spanish language learning'),
  ('Guitar', 'Music', 'Guitar playing and music theory'),
  ('Yoga', 'Fitness', 'Yoga practice and mindfulness'),
  ('Marketing', 'Business', 'Digital marketing and strategy')
ON CONFLICT (name) DO NOTHING;
