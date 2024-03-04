ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can read courses" ON public.courses
    FOR SELECT
    USING (true);

CREATE POLICY "Authenticated can create courses" ON public.courses
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Everyone can read notes" ON public.notes
    FOR SELECT
    USING (true);

CREATE POLICY "Authenticated can create notes" ON public.notes
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Everyone can view profiles" ON public.profiles
    FOR SELECT
    USING (true);

CREATE POLICY "Everyone can create profiles" ON public.profiles
    FOR INSERT
    TO anon
    WITH CHECK (true);

CREATE POLICY "Everyone can read questions" ON public.questions
    FOR SELECT
    USING (true);

CREATE POLICY "Authenticated can create questions" ON public.questions
    FOR INSERT
    TO authenticated
    WITH CHECK (true);