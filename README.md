# ZevoraTech website — deployment guide

This is a plain static site (HTML/CSS/JS, no build step). That means it works with almost any free host. Below is the easiest free + secure option, plus one alternative.

## Recommended: Cloudflare Pages (free, HTTPS included, easy custom domain)

1. Go to https://dash.cloudflare.com and sign up (free).
2. In the sidebar, go to **Workers & Pages → Create → Pages → Upload assets**.
3. Give the project a name (e.g. `zevoratech`) and drag this entire folder in (or just the files: index.html, products.html, about.html, contact.html, styles.css, script.js, and the assets folder).
4. Click **Deploy**. You'll get a free `*.pages.dev` URL immediately — this confirms the site works.
5. Connect your domain:
   - In the project, go to **Custom domains → Set up a custom domain**.
   - Enter `zevoratech.in` (and add `www.zevoratech.in` too if you want).
   - If your domain's DNS is already on Cloudflare, it connects instantly. If not, Cloudflare will show you a nameserver or CNAME change to make at your domain registrar (wherever you bought zevoratech.in).
6. HTTPS is automatic and free — Cloudflare issues the certificate for you.

Total cost: $0/year (you only pay what you already paid for the domain itself).

## Alternative: GitHub Pages (also free)

1. Create a free GitHub account and a new repository, e.g. `zevoratech-site`.
2. Upload all the files in this folder to the repository (or use GitHub Desktop / `git push`).
3. In the repo, go to **Settings → Pages**, set source to the `main` branch, root folder.
4. Under **Settings → Pages → Custom domain**, enter `zevoratech.in` and save — GitHub will show you the DNS records to add at your domain registrar (usually an A record to GitHub's IPs plus a CNAME for `www`).
5. Check "Enforce HTTPS" once the certificate is issued (can take up to 24h).

## Folder contents
- `index.html` — Home
- `products.html` — Products (coming soon state)
- `about.html` — About ZevoraTech
- `contact.html` — Contact (form opens the visitor's email app — no backend/server needed)
- `styles.css` — all styling
- `script.js` — mobile menu + footer year
- `assets/logo.png` — your logo

## Editing later
Everything is plain HTML/CSS, so you (or I, next time we chat) can edit text directly in the `.html` files, or ask me to update copy, add real products, or wire up a real contact-form backend once you're ready.
