# sorry-site 💜

A personalised apology website built with Vite — no framework, just vanilla HTML/CSS/JS.

## Setup

```bash
npm install
npm run dev        # local dev with hot reload  →  http://localhost:5173
npm run build      # production build  →  /dist
npm run preview    # preview the build locally
```

## Adding your assets

Put these files inside the `public/` folder:

| File | What it does |
|---|---|
| `bittersweet.mp3` | Background music (Bittersweet — Madison Beer) |
| `your-guitar-video.mp4` | Your guitar video (any filename is fine) |

Then in `index.html`, find the commented-out `<video>` block and uncomment it, replacing `your-guitar-video.mp4` with your actual filename.

## Deploy to Cloudflare Pages

1. Push this folder to a GitHub repo
2. Go to https://dash.cloudflare.com → **Pages** → **Create a project** → Connect to GitHub
3. Pick your repo and set:
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Click **Save and Deploy** — done! 🎉

Every time you push to `main`, Cloudflare auto-redeploys.
