
ALTER TABLE public.links 
ADD COLUMN IF NOT EXISTS image_url text,
ADD COLUMN IF NOT EXISTS description text;

ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS location text;
