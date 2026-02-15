# Supabase setup for portfolio

**Full step-by-step guide:** see **[docs/SUPABASE_SETUP.md](../docs/SUPABASE_SETUP.md)** – it breaks down every step and includes two ways to run the database (Dashboard vs CLI).

**Short version:**

1. **Create a project** at [supabase.com](https://supabase.com).
2. **Add env vars** – Copy `.env.example` to `.env` and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (from Project Settings → API).
3. **Run the schema** – Either paste `schema.sql` into Dashboard → SQL Editor and run it, or (after `supabase login` and `supabase link`) run `npx supabase db push` from the `my portifolio` folder.
4. **Create an admin user** – Authentication → Users → Add user (email + password). Use this at `/admin/login`.
5. **Open** `/admin` to edit all content.

**Connect from Cursor:** Install the **Supabase** extension from the Extensions panel to browse tables and run SQL. You can also set up Supabase MCP so the AI can query your project (see the full guide).
