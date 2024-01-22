ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can read courses" ON public.courses
    FOR SELECT
    USING (true);

CREATE POLICY "Admins can create courses" ON public.courses
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1
            FROM public.admins
            WHERE admins.user_id = auth.uid()::UUID -- pray to god this is how policies work
        )
    )

CREATE POLICY "Everyone can read notes" ON public.notes
    FOR SELECT
    USING (true);

CREATE POLICY "Authenticated can create notes" ON public.notes
    FOR INSERT
    TO authenticated
    WITH CHECK (true);
