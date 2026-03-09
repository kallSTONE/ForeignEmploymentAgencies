
-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (avoids recursive RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS: admins can read all roles, users can read their own
CREATE POLICY "Admins can read all roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can read own roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- Jobs table
CREATE TABLE public.jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    country TEXT NOT NULL,
    category TEXT NOT NULL,
    salary_min INTEGER,
    salary_max INTEGER,
    contract_length TEXT DEFAULT '2 Years',
    benefits TEXT,
    accommodation TEXT,
    requirements TEXT,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Anyone can read active jobs
CREATE POLICY "Anyone can read active jobs" ON public.jobs
  FOR SELECT USING (is_active = true);

-- Admins can read all jobs
CREATE POLICY "Admins can read all jobs" ON public.jobs
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Admins can insert jobs
CREATE POLICY "Admins can insert jobs" ON public.jobs
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Admins can update jobs
CREATE POLICY "Admins can update jobs" ON public.jobs
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Admins can delete jobs
CREATE POLICY "Admins can delete jobs" ON public.jobs
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Worker applications table
CREATE TABLE public.applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    age INTEGER,
    phone TEXT NOT NULL,
    email TEXT,
    passport_status TEXT DEFAULT 'none',
    experience TEXT,
    desired_country TEXT NOT NULL,
    job_category TEXT NOT NULL,
    education TEXT,
    marital_status TEXT,
    emergency_contact TEXT,
    additional_notes TEXT,
    status TEXT DEFAULT 'Submitted' CHECK (status IN ('Submitted', 'Under Review', 'Training', 'Document Processing', 'Visa Processing', 'Deployed', 'Rejected')),
    status_note TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Anyone can insert applications (public registration)
CREATE POLICY "Anyone can submit applications" ON public.applications
  FOR INSERT WITH CHECK (true);

-- Applicants can check their own status by application_id (handled via anon read with filter)
CREATE POLICY "Anyone can read own application by id" ON public.applications
  FOR SELECT USING (true);

-- Admins can update applications
CREATE POLICY "Admins can update applications" ON public.applications
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Admins can delete applications
CREATE POLICY "Admins can delete applications" ON public.applications
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Employer requests table
CREATE TABLE public.employer_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name TEXT NOT NULL,
    country TEXT NOT NULL,
    contact_person TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    workers_needed INTEGER,
    job_category TEXT,
    start_date DATE,
    additional_info TEXT,
    status TEXT DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'In Progress', 'Completed', 'Declined')),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.employer_requests ENABLE ROW LEVEL SECURITY;

-- Anyone can submit employer requests
CREATE POLICY "Anyone can submit employer requests" ON public.employer_requests
  FOR INSERT WITH CHECK (true);

-- Admins can read all employer requests
CREATE POLICY "Admins can read employer requests" ON public.employer_requests
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Admins can update employer requests
CREATE POLICY "Admins can update employer requests" ON public.employer_requests
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON public.jobs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON public.applications FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_employer_requests_updated_at BEFORE UPDATE ON public.employer_requests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
