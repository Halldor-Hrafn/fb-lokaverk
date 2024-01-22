CREATE TABLE IF NOT EXISTS public.courses (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    title TEXT NOT NULL,
    initials TEXT NOT NULL,
    version SMALLINT NOT NULL,
    subject TEXT NOT NULL,
    topic TEXT NOT NULL,
    status TEXT NOT NULL,
    stage TEXT NOT NULL,
    number_of_credits SMALLINT NOT NULL,
    -- school?
    description TEXT NOT NULL,
    prerequisites TEXT NULL,
    criteria TEXT NOT NULL,
    expected_end_result TEXT NOT NULL,
    expected_end_qualification TEXT NOT NULL,
    course_assessment TEXT NOT NULL,
    schools TEXT NOT NULL,
    is_exemplary BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT courses_pkey PRIMARY KEY (id)
    CONSTRAINT courses_initials_unique UNIQUE (initials)
) TABLESPACE pg_default;

CREATE TABLE IF NOT EXISTS public.notes (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    course_initials TEXT NULL,
    user_id UUID NULL,
    note TEXT NOT NULL,

    CONSTRAINT notes_pkey PRIMARY KEY (id),
    CONSTRAINT notes_course_initials_fkey FOREIGN KEY (course_initials) REFERENCES public.courses (initials) ON DELETE SET NULL,
    CONSTRAINT notes_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users (id) ON DELETE SET NULL
) TABLESPACE pg_default;

CREATE TABLE IF NOT EXISTS public.admins (
    id INTEGER GENERATED BY DEFAULT AS IDENTITY, -- question wether this should rather be a SMALLINT
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    user_id UUID NOT NULL,

    CONSTRAINT admins_pkey PRIMARY KEY (id),
    CONSTRAINT admins_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users (id) ON DELETE CASCADE
)
