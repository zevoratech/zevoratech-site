# ZevoraTech website

Plain static site (HTML, CSS, one JS file). No build step.

## Files
- `index.html`, `products.html`, `about.html`, `contact.html` - main pages
- `privacy-policy.html` - site policy; `privacy-policy-<product>.html` - one per product (winclean, netscope, zevorasensorlab, kaalanilai, kngc)
- `child-safety-kngc.html` - child safety standards page for the KNGC app (Play Store requirement)
- `styles.css`, `script.js` - shared styling, menu, home slideshow, contact form (Web3Forms)
- `robots.txt`, `sitemap.xml` - search engines (update the sitemap when you add a page)
- `assets/` - logos and the slide image

## Publishing
Upload the changed files to the `zevoratech-site` repo on GitHub (Add file > Upload files). It deploys automatically.

## Adding a product
1. Add a card in `products.html` (and a slide in `index.html` if it should be featured).
2. Add its `privacy-policy-<name>.html`, link it from `privacy-policy.html`, and add it to `sitemap.xml`.

## Notes
- KNGC address is https://kngc.in (old kngc.zevoratech.in redirects later).
- Home slideshow notes: `README-slider.txt`.
