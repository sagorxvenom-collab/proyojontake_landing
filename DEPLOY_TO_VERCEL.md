# Deploying Proyojontake to Vercel

## Steps

1. **Rename** `package.vercel.json` → `package.json`
   (replace the existing one)

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Push to GitHub** (create a new repo and push all files)

4. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com) → New Project → Import Git Repository
   - Select your repo
   - Vercel will auto-detect the `vercel.json` settings

5. **Done!** Vercel will run `npm run build:vercel` and deploy automatically.

## Build settings (already in vercel.json)
- Build Command: `npm run build:vercel`
- Output Directory: `dist`
- Framework: Vite

## Notes
- All gallery images are in `/public/` — they are included in the zip
- No backend or database needed — this is a fully static site
- Google Fonts loads automatically via CSS
