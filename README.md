# Novista Property Solutions — Website

A static, responsive website for Novista Property Solutions Ltd, with a contact/request form that saves submissions to a free Supabase database.

## What's in this folder
- `index.html` — the site
- `styles.css` — all styling
- `script.js` — mobile nav, CTA behaviour, and the Supabase form submission
- `assets/` — logo, light-footer logo, favicon
- `supabase-setup.sql` — one-time database setup script

---

## Step 1 — Put the site on GitHub Pages (free hosting)

1. Go to [github.com](https://github.com) and create a **new repository** (e.g. `novista-website`). Keep it Public.
2. Upload all the files in this folder to that repository (drag-and-drop on the GitHub web UI works fine, or use `git push` if you're comfortable with git).
3. In the repository, go to **Settings → Pages**.
4. Under "Build and deployment", set **Source** to `Deploy from a branch`, choose the `main` branch and `/ (root)` folder, then **Save**.
5. GitHub will give you a live URL after a minute or two, usually:
   `https://YOUR-USERNAME.github.io/novista-website/`

That's your live site — free, forever, with no hosting bill.

*(Later, you can point a custom domain like `novistaproperty.com` at this for a small yearly domain fee — GitHub Pages supports custom domains under Settings → Pages → Custom domain.)*

---

## Step 2 — Connect the contact form to Supabase (free database)

Right now the form is built but not yet connected — it will show a friendly "not yet connected" message until you complete these steps.

1. Go to [supabase.com](https://supabase.com) and log into your account.
2. Create a **New Project** (choose any name, e.g. `novista`, and a strong database password — save that password somewhere safe).
3. Once the project is ready, open the **SQL Editor** (left sidebar) → **New query**.
4. Open `supabase-setup.sql` from this folder, copy its contents, paste into the SQL editor, and click **Run**. This creates the `inquiries` table where form submissions will be stored.
5. Go to **Project Settings → API**. Copy two values:
   - **Project URL**
   - **anon public** key
6. Open `script.js` in this folder and find these two lines near the top of the Supabase section:
   ```js
   const SUPABASE_URL = 'YOUR_SUPABASE_PROJECT_URL';
   const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
   ```
   Replace the placeholder text with your actual values (keep the quotes).
7. Save the file and re-upload it to GitHub (overwrite the old `script.js`).

Once that's done, every form submission will appear in Supabase under **Table Editor → inquiries**. You'll see name, phone, email, what they need, and their message — with a timestamp.

> The anon key is safe to put in public front-end code — it only allows new rows to be *inserted*, not read, edited, or deleted (that's what the Row Level Security policy in the SQL script does).

---

## Making future edits

- **Text/content:** edit the text directly inside `index.html`.
- **Colors/fonts/spacing:** edit `styles.css` — the main brand colors are defined once at the top as CSS variables (`--ink`, `--gold`, `--clay`, etc.), so changing a variable updates it everywhere.
- **Logo:** swap `assets/logo.svg` and `assets/logo-light.svg` with a new logo file whenever you have one designed — just keep the same filenames, or update the `<img src="">` paths in `index.html` if you rename them.
- **Phone/email/address:** update the placeholder contact details in the Contact section and footer of `index.html`.

## Notes
- The site has no page-load cost or subscription — GitHub Pages and Supabase's free tiers are both sufficient for a site like this well beyond launch.
- "Manage My Property" and "Diaspora Property Services" currently route visitors to the contact form with that option pre-selected. When you're ready for a full customer login/portal system, that's a larger build we can add later without needing to redo the marketing site.
