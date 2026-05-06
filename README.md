# Art Plumbing — Oldest AC Contest Tracker

## Deploy to GitHub + Render (10 minutes)

### Step 1 — Push to GitHub

1. Go to **github.com** → click **+** → **New repository**
2. Name it `art-ac-contest` (or anything you like), set it to **Private**, click **Create**
3. On your computer, open Terminal (Mac) or Command Prompt (Windows) in this folder and run:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/art-ac-contest.git
git push -u origin main
```

*(Replace `YOUR_USERNAME` with your GitHub username)*

---

### Step 2 — Deploy on Render

1. Go to **render.com** and sign in (connect your GitHub account)
2. Click **New +** → **Web Service**
3. Click **Connect** next to your `art-ac-contest` repo
4. Render will auto-detect the settings from `render.yaml` — just confirm:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Click **Create Web Service**
6. Wait ~2 minutes for the first deploy to finish
7. Your live URL will appear at the top — something like `https://art-ac-contest.onrender.com`

---

### ⚠️ Important: Data Persistence on Render Free Tier

Render's free tier **spins down** after 15 minutes of inactivity and **resets the filesystem** on each deploy. This means entries stored in `.data/entries.json` will be lost when the service restarts.

**For a contest where data must survive, do one of these:**

**Option A — Render Persistent Disk** (~$1/month):
- In your Render service settings → **Disks** → Add a disk
- Mount path: `/opt/render/project/src/.data`
- This keeps your data forever

**Option B — Free external DB** (recommended for long-term):
- Use [Airtable](https://airtable.com) or [Supabase](https://supabase.com) (both free)
- Let me know and I can update the code to use one of these

---

## What your DCs see
- The app opens directly to the DC Entry form
- No login required for DCs
- Data refreshes every 8 seconds

## Admin access
- Tap **📊 Admin** at the bottom of the app
- Password: **4151**
- Tap **🔒 Lock Admin** when done

## To reset for the real contest
Log into Admin and tap **Clear All Entries**
