# Supabase setup – step-by-step

This guide gets your portfolio connected to Supabase so you can edit all content from the **Admin** panel. You only need to do it once.

---

## What you’re doing in one sentence

You’ll create a free Supabase project, add your project URL and key to the app, run the database setup (tables + seed data), create one admin user, then sign in at `/admin/login` to edit everything.

---

## Part 1: Create a Supabase project (one-time)

Do this in your browser. No code yet.

### Step 1.1 – Sign up / log in

1. Open **https://supabase.com**
2. Click **Start your project**
3. Log in with **GitHub** (or email) and follow the prompts  
   - *You’ll see:* Supabase dashboard home

### Step 1.2 – New project

1. Click **New project**
2. Under **Organization** leave the default (or create one)
3. **Name:** e.g. `my-portfolio`
4. **Database password:** choose a strong password and **save it** (you need it for CLI later)
5. **Region:** pick one close to you
6. Click **Create new project**  
   - *You’ll see:* “Setting up project…” then the project dashboard

### Step 1.3 – Get your project details

1. In the left sidebar click **Project Settings** (gear icon)
2. Open the **API** tab
3. You’ll need two values (keep this tab open):
   - **Project URL** (e.g. `https://abcdefgh.supabase.co`)
   - **anon public** key (long string under “Project API keys”)

---

## Part 2: Connect the app to Supabase

You’ll put the URL and key in a `.env` file so the app can talk to your project.

### Step 2.1 – Create `.env` in the project

1. In your project, open the **`my portifolio`** folder (where `package.json` is).
2. Copy the file **`.env.example`** and paste it in the same folder.
3. Rename the copy to **`.env`** (no `.example`).

### Step 2.2 – Fill in the values

1. Open **`.env`** in the editor.
2. Replace the placeholders with the values from Part 1.3:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Use your real **Project URL** and **anon public** key. Save the file.

### Step 2.3 – Restart the dev server

If the app is already running, stop it (Ctrl+C) and start again:

```bash
npm run dev
```

The app now uses your Supabase project when those env vars are set.

---

## Part 3: Run the database setup (tables + seed)

You can do this in **two ways**. Pick one.

---

### Path A – From the Supabase website (no CLI)

Good if you don’t want to install anything else.

1. In Supabase dashboard, left sidebar: **SQL Editor**.
2. Click **New query**.
3. Open this file in your project:  
   **`supabase/schema.sql`**
4. Select all its contents (Ctrl+A) and copy.
5. Paste into the SQL Editor.
6. Click **Run** (or Ctrl+Enter).  
   - *You’ll see:* “Success. No rows returned” (that’s normal).
7. In the left sidebar open **Table Editor**. You should see tables like `site_settings`, `home_content`, `projects`, etc.

Database is ready. Skip to **Part 4**.

---

### Path B – From the terminal (Supabase CLI) so someone can “run everything” for you

Good if you want to run one command from the project (or have me run it for you).

#### Step B.1 – Install Supabase CLI (one-time on your machine)

In a terminal (PowerShell or Command Prompt):

```bash
npm install -g supabase
```

If that fails, use:

```bash
npx supabase --version
```

(Then use `npx supabase` instead of `supabase` in the steps below.)

#### Step B.2 – Log in to Supabase (one-time)

```bash
supabase login
```

(or `npx supabase login`)

- A browser window opens. Log in and allow access.  
- *You’ll see:* “Logged in” in the terminal.

#### Step B.3 – Link this folder to your project

1. In Supabase dashboard → **Project Settings** → **General**, find **Reference ID** (short id like `abcdefgh`).
2. In the terminal, go to your **`my portifolio`** folder:

```bash
cd "c:\Users\ESTHER SUNDAY\Documents\my-portfolio\my portifolio"
```

3. Link the project (use your real Reference ID):

```bash
supabase link --project-ref YOUR_REFERENCE_ID
```

When asked for the database password, use the one you set in Step 1.2.

- *You’ll see:* “Linked project …”

#### Step B.4 – Push the database schema and seed

Still in the **`my portifolio`** folder:

```bash
supabase db push
```

(or `npx supabase db push`)

- *You’ll see:* migrations being applied, then “Finished supabase db push.”

Database is ready. Continue to **Part 4**.

---

## Part 4: Create an admin user (so you can log in to Admin)

The Admin panel uses Supabase Auth. You need at least one user.

1. In Supabase dashboard, left sidebar: **Authentication** → **Users**.
2. Click **Add user** → **Create new user**.
3. Enter an **email** and **password** (remember them).
4. Click **Create user**.

You’ll use this email and password at **`/admin/login`** in your app.

---

## Part 5: Use the Admin panel

1. In the app, go to: **http://localhost:5173/admin/login** (or whatever port your dev server uses).
2. Sign in with the **email** and **password** from Part 4.
3. You’ll be redirected to **`/admin`**. From there you can edit:
   - **Site & Nav** – logo, preloader text, nav links
   - **Home** – hero, buttons, profile images, about text, tech stack, stats
   - **About** – all sections, skills, connect links
   - **Projects** – page text and list of projects (add/edit/delete)
   - **Contact** – headers, form label, contact cards, social links

Changes are saved to Supabase and show on the site right away.

---

## Connecting Supabase from Cursor (optional)

You can work with your Supabase project from inside Cursor in two ways.

### Option 1 – Supabase extension (browse tables, run SQL)

1. In Cursor, open **Extensions** (Ctrl+Shift+X).
2. Search for **Supabase**.
3. Install the official **Supabase** extension.
4. After install, use the Supabase icon in the sidebar: sign in, pick your project, then you can open **Table Editor** and **SQL Editor** inside Cursor.

### Option 2 – Supabase MCP (let the AI use the database)

MCP lets the AI in Cursor run read-only (or more) queries against your project. Setup is in Cursor settings:

1. **Supabase dashboard** → **Account** (or **Settings**) → create a **Personal Access Token**.
2. **Project Settings** → **General** → copy **Reference ID**.
3. In Cursor: **Settings** → **Cursor Settings** → **MCP** (or “Features” → “MCP”).
4. Add a Supabase MCP server with your token and project ref (see [Supabase MCP docs](https://supabase.com/docs/guides/platform/mcp) or the Cursor MCP docs for the exact JSON).

After that, you can ask the AI to run queries or inspect tables for you.

---

## Quick checklist

- [ ] Supabase account and project created
- [ ] `.env` created with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- [ ] Dev server restarted after adding `.env`
- [ ] Database setup run (Path A: SQL in dashboard **or** Path B: `supabase db push`)
- [ ] Admin user created in Authentication → Users
- [ ] Signed in at `/admin/login` and edited something at `/admin`

---

## If something goes wrong

- **“Supabase is not configured”** on `/admin/login`  
  - Check that `.env` is in the **`my portifolio`** folder (same as `package.json`).  
  - Restart the dev server after changing `.env`.

- **“Invalid login”** on `/admin/login`  
  - Use the email/password from **Authentication → Users** in Supabase.  
  - Confirm the user exists and email is correct.

- **Tables missing or empty**  
  - Run the SQL in **Path A** again, or run `supabase db push` again (Path B).  
  - In Table Editor, you should see `site_settings`, `home_content`, `about_content`, `projects`, `projects_page`, `contact_content`.

- **Changes don’t show on the site**  
  - Hard refresh (Ctrl+F5) or clear cache.  
  - Confirm `.env` has the same project as the one where you edited data.

If you tell me which step you’re on and what you see (e.g. error message or screenshot), I can walk you through the next click or command.
