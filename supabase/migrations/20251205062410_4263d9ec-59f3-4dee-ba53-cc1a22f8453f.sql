-- Create app roles enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table for admin access
CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create profiles table with extended fields
CREATE TABLE public.profiles (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    email TEXT,
    phone TEXT,
    shipping_address TEXT,
    shipping_city TEXT,
    shipping_country TEXT,
    shipping_postal_code TEXT,
    age INTEGER,
    motivation TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create challenge_enrollments table
CREATE TABLE public.challenge_enrollments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'abandoned', 'reward_approved', 'reward_shipped')),
    start_date DATE DEFAULT CURRENT_DATE,
    completed_days INTEGER DEFAULT 0,
    terms_accepted BOOLEAN DEFAULT false,
    medical_disclaimer_accepted BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id)
);

ALTER TABLE public.challenge_enrollments ENABLE ROW LEVEL SECURITY;

-- Create daily_proofs table
CREATE TABLE public.daily_proofs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    enrollment_id uuid REFERENCES public.challenge_enrollments(id) ON DELETE CASCADE NOT NULL,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    day_number INTEGER NOT NULL CHECK (day_number >= 1 AND day_number <= 7),
    proof_type TEXT CHECK (proof_type IN ('image', 'video', 'link')),
    proof_url TEXT,
    notes TEXT,
    wake_time TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    admin_notes TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    reviewed_by uuid REFERENCES auth.users(id),
    UNIQUE (enrollment_id, day_number)
);

ALTER TABLE public.daily_proofs ENABLE ROW LEVEL SECURITY;

-- Create newsletter_subscribers table for email marketing
CREATE TABLE public.newsletter_subscribers (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    discount_code TEXT,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    has_used_discount BOOLEAN DEFAULT false
);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = id);

-- RLS Policies for user_roles (admin only)
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
ON public.user_roles FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for challenge_enrollments
CREATE POLICY "Users can view their own enrollment"
ON public.challenge_enrollments FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own enrollment"
ON public.challenge_enrollments FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own enrollment"
ON public.challenge_enrollments FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all enrollments"
ON public.challenge_enrollments FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update all enrollments"
ON public.challenge_enrollments FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for daily_proofs
CREATE POLICY "Users can view their own proofs"
ON public.daily_proofs FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own proofs"
ON public.daily_proofs FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own proofs"
ON public.daily_proofs FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all proofs"
ON public.daily_proofs FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update all proofs"
ON public.daily_proofs FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for newsletter_subscribers (public insert)
CREATE POLICY "Anyone can subscribe to newsletter"
ON public.newsletter_subscribers FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view subscribers"
ON public.newsletter_subscribers FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger for new user profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name', '')
  );
  
  -- Also create default user role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update timestamps trigger
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_challenge_enrollments_updated_at
  BEFORE UPDATE ON public.challenge_enrollments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();