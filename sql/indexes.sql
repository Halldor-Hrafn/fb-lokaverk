CREATE INDEX idx_courses_initials ON public.courses USING GIN (initials);

CREATE INDEX idx_notes_course_initials ON public.notes USING GIN (course_initials);

