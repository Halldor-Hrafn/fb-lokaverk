This folder contains all the PL/pgSQL scripts used.

special.sql got some SQL commands that had to be performed directly on the Supabase Postgres database in order to make things function (namely change email column in auth.users to UNIQUE so that foreign keys work for it)