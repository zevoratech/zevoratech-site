# ZevoraTech website

Plain static site (HTML, CSS, one JS file). No build step, no framework.

## Files
- `index.html`, `products.html`, `about.html`, `contact.html` - main pages
- `privacy-policy.html` and `privacy-policy-<product>.html` - policies; `child-safety-kngc.html` - KNGC child safety standards
- `styles.css` - all styling (colours and fonts are variables at the top)
- `script.js` - menu, headline and scroll animations, contact and "notify me" forms (Web3Forms)
- `robots.txt`, `sitemap.xml` - search engines (add new pages to the sitemap)
- `assets/` - logos and the KNGC photo

## Publishing
Upload the changed files (and the `assets` folder if it changed) to the `zevoratech-site` repo on GitHub: Add file > Upload files. The site updates in a minute or two; hard refresh (Ctrl+F5) to see it.

## Adding a product
Copy an existing product card in `products.html` (and in `index.html` if it should be featured), then add its privacy policy page and a line in `sitemap.xml`.

## Motion
The hero orbit and headline animate once on load. Cards and graphics animate when scrolled into view. Everything is switched off for visitors who set "reduce motion" on their device.
