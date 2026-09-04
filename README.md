# Jamili Carpets — Enterprise Website

A complete, production-ready enterprise website for Jamili Carpets, a handmade Afghan carpet manufacturer established in 1980 in Kabul.

## Quick Start

### Option 1: Deploy Frontend (Static Site) to Cloudflare Pages

1. Upload all files to a GitHub repository
2. Go to Cloudflare Pages → Create project → Connect Git
3. Select your repository
4. Build settings: leave empty (no build command, no output directory)
5. Deploy

### Option 2: Deploy with Backend (Admin Panel + API)

1. **Create D1 Database:**
   ```
   npx wrangler d1 create jamili-carpets-db
   ```
   Copy the database ID into `worker/wrangler.toml`

2. **Run Database Schema:**
   ```
   npx wrangler d1 execute jamili-carpets-db --file=schema.sql
   ```

3. **Create R2 Bucket:**
   ```
   npx wrangler r2 bucket create jamili-carpets-images
   ```

4. **Create KV Namespace:**
   ```
   npx wrangler kv namespace create ADMIN_SESSIONS
   ```
   Copy the namespace ID into `worker/wrangler.toml`

5. **Deploy Worker:**
   ```
   cd worker
   npx wrangler deploy
   ```

6. **Deploy Pages:**
   Upload all frontend files (HTML, CSS, JS) to GitHub and connect to Cloudflare Pages

## File Structure

```
├── index.html              # Home page
├── about.html              # About / Our Story
├── collections.html       # All Collections overview
├── collection.html         # Single collection (dynamic via ?c= parameter)
├── product.html            # Product detail (dynamic via ?id= parameter)
├── custom-order.html       # Custom order form
├── artisans.html           # Artisan profiles
├── process.html            # 5-step carpet making process
├── wholesale.html          # Wholesale & trade program
├── blog.html               # Blog / Journal listing
├── article.html            # Single article (dynamic via ?id= parameter)
├── faq.html                # FAQ page
├── contact.html            # Contact page with form
├── 404.html                # Not found page
├── styles.css              # Complete stylesheet
├── main.js                 # Global JavaScript (menu, FAQ, forms)
├── products-data.js        # Product & collection data
├── collection.js           # Collection page logic (filtering, rendering)
├── product.js              # Product detail logic (gallery, quotes, share)
├── sitemap.xml             # SEO sitemap
├── robots.txt              # SEO robots
├── schema.sql              # D1 database schema + sample data
├── admin/                  # Admin panel
│   ├── index.html          # Login page
│   ├── dashboard.html      # Dashboard with stats
│   ├── products.html       # Product CRUD
│   ├── inquiries.html      # Quote inquiry management
│   ├── messages.html       # Contact message management
│   ├── settings.html       # Site settings
│   ├── admin.css           # Admin panel styles
│   └── admin.js            # Admin panel logic
└── worker/                 # Backend API
    ├── index.js            # Cloudflare Worker (API endpoints)
    └── wrangler.toml       # Worker configuration
```

## Admin Panel

- URL: `your-site.pages.dev/admin/`
- Default credentials: `admin` / `jamili2026`
- **Change password immediately after first login**

### Admin Features:
- Dashboard with stats (products, inquiries, messages)
- Product management (add, edit, delete)
- Inquiry management (view, reply via WhatsApp/email)
- Message management (view, reply via email)
- Settings (contact info, home page content, SEO, password)

## Collections

1. Classic Collection
2. Afghan Contemporary Collection
3. Mamluk Collection
4. Kilim Collection
5. Geometric Collection
6. Custom Order (bespoke)

## Features

- 5 collections + Custom Order
- 18 sample products with full specifications
- 3 images per product (front, back, detail)
- "Request a Quote" system (no prices shown)
- WhatsApp floating button on all pages
- Contact form + Custom order form + Wholesale application
- 6 blog articles with full content
- 15 FAQ items in 5 categories
- SEO: meta tags, Open Graph, schema markup, sitemap, robots.txt
- Fully mobile responsive
- Lazy loading, smooth animations
- Complete admin panel with CRUD

## Color Palette

- `#1F2A44` — Navy (primary)
- `#E8DCC8` — Cream (secondary)
- `#C6A75E` — Gold (accent)

## Fonts

- Playfair Display — headings
- Inter — body text
- Cormorant Garamond — testimonials/quotes

## Tech Stack

- Frontend: HTML, CSS, vanilla JavaScript
- Backend: Cloudflare Workers
- Database: Cloudflare D1
- Image Storage: Cloudflare R2
- Sessions: Cloudflare KV
- Hosting: Cloudflare Pages

## License

© 2026 Jamili Carpets. All rights reserved.
