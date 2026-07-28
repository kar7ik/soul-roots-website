# SoulRoots Website

A beautiful, responsive website for SoulRoots yoga retreats built with HTML, Tailwind CSS, and vanilla JavaScript.

## 🏗️ Project Structure

```
soul-roots-website/
├── index.html          # Homepage
├── about.html          # About page
├── booking.html        # Booking form
├── retreats.html       # Retreats information
├── sessions.html       # Sessions page
├── gallery.html        # Photo gallery
├── contact.html        # Contact page
├── faq.html           # FAQ page
├── thankyou.html      # Thank you page
├── 404.html           # Not found page
├── robots.txt          # Search engine crawl rules
├── sitemap.xml         # Search engine sitemap
├── assets/
│   ├── css/
│   │   ├── tailwind-input.css  # Tailwind source (edit this)
│   │   ├── tailwind.css        # Compiled Tailwind output (generated, do not edit)
│   │   └── styles.css          # Custom styles
│   ├── js/
│   │   ├── main.js     # Main navigation & carousel
│   │   ├── booking-form.js  # Booking form handler
│   │   ├── contact-form.js  # Contact form handler
│   │   ├── gallery.js  # Gallery lightbox
│   │   └── toast.js    # Toast notifications
│   └── images/         # Image assets (JPG/PNG originals + WebP variants)
├── netlify/
│   └── functions/
│       └── booking-proxy.js  # Netlify function for form submissions
├── netlify.toml        # Netlify configuration
└── package.json        # Node.js dependencies
```

## 🎨 Features

- **Responsive Design**: Mobile-first design with Tailwind CSS (compiled build, not the CDN script)
- **Image Carousel**: Interactive carousel on homepage
- **Gallery Lightbox**: Click images to view in fullscreen
- **Booking Form**: Integrated form that submits to Google Apps Script via Netlify function, with honeypot spam protection
- **Smooth Navigation**: Sticky header with scroll effects
- **Mobile Menu**: Slide-out navigation menu for mobile devices
- **SEO**: canonical URLs, Open Graph/Twitter tags, JSON-LD structured data, robots.txt, sitemap.xml
- **Security headers**: CSP, HSTS, Permissions-Policy configured in `netlify.toml`

## 🚀 Local Development

### Prerequisites

- Node.js (v20 or higher — required by Tailwind CSS v4)
- npm

### Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # then edit .env and set GOOGLE_SCRIPT_URL to your Google Apps Script deployment URL
   ```

3. **Start local development server:**
   ```bash
   npm run dev
   ```

   This compiles the Tailwind CSS, then starts Netlify Dev, which:
   - Serves your static files
   - Runs Netlify Functions locally
   - Provides hot-reloading
   - Accessible at `http://localhost:8888`

   While actively editing Tailwind classes, run `npm run watch:css` in a second terminal to
   recompile `assets/css/tailwind.css` on every save.

### Alternative: Simple HTTP Server (Static Files Only)

If you only want to test the static site without Netlify Functions:

**Using Python:**
```bash
# Python 3
python3 -m http.server 8000
```

**Using Node.js (http-server):**
```bash
npx http-server -p 8000
```

Then open `http://localhost:8000` in your browser. Run `npm run build` first so
`assets/css/tailwind.css` exists.

> **Note**: The booking form will not work with a simple HTTP server since it requires the Netlify function. Use `npm run dev` to test the full functionality.

## 📦 Deployment to Netlify

### Option 1: Git-based Deployment (Recommended)

1. Push your code to GitHub, GitLab, or Bitbucket
2. Connect your repository to Netlify
3. Netlify will automatically detect the settings from `netlify.toml`
4. Deploy!

### Option 2: Netlify CLI

1. **Install Netlify CLI globally** (if not already installed):
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify:**
   ```bash
   netlify login
   ```

3. **Initialize and deploy:**
   ```bash
   netlify init
   netlify deploy --prod
   ```

### Option 3: Drag & Drop

1. Go to [Netlify Drop](https://app.netlify.com/drop)
2. Drag and drop your project folder
3. Your site will be live!

## 🔧 Configuration

### Netlify Function

The booking and contact forms both post to a Netlify function (`netlify/functions/booking-proxy.js`) that proxies submissions to a Google Apps Script endpoint. The function:

- Handles CORS preflight requests
- Rejects submissions where the hidden honeypot field is filled in (spam bots)
- Requires a `GOOGLE_SCRIPT_URL` environment variable — set it in `.env` locally and in
  Netlify's Site settings > Environment variables for deploys
- Forwards valid POST requests to Google Apps Script
- Returns appropriate responses

### Custom Colors (Tailwind)

Custom colors are defined in the `@theme` block of `assets/css/tailwind-input.css`:
- `sand`: #F6F0E6
- `forest`: #1F6E4F
- `ochre`: #C77C2C
- `terracotta`: #D96C3B
- `charcoal`: #333333
- `sage`: #5B6F4A
- `clay`: #B86B4B

After changing a color, run `npm run build:css` (or keep `npm run watch:css` running) to
regenerate `assets/css/tailwind.css`.

## 📝 Pages

- **Home** (`index.html`): Hero section, carousel, retreats overview
- **About** (`about.html`): Information about SoulRoots
- **Retreats** (`retreats.html`): Detailed retreat information
- **Booking** (`booking.html`): Booking form
- **Sessions** (`sessions.html`): Upcoming sessions
- **Gallery** (`gallery.html`): Photo gallery with lightbox
- **Contact** (`contact.html`): Contact information
- **FAQ** (`faq.html`): Frequently asked questions
- **Thank You** (`thankyou.html`): Confirmation page

## 🐛 Troubleshooting

### Booking or contact form not working locally

- Make sure you're using `npm run dev` (Netlify Dev) instead of a simple HTTP server
- Check that the Netlify function is running (should see in terminal)
- Verify `GOOGLE_SCRIPT_URL` is set in your `.env` file (see `.env.example`)

### Images not loading

- Ensure image paths start with `/` (absolute paths) for Netlify deployment
- Check that images exist in `assets/images/` directory

### Styles not applying

- Run `npm run build:css` and confirm `assets/css/tailwind.css` was regenerated
- Check the browser console for a 404 on `assets/css/tailwind.css`
- Clear browser cache

## 🌐 Before going live

Several files use `https://soulroots.netlify.app` as a placeholder domain (canonical URLs,
Open Graph tags, `robots.txt`, `sitemap.xml`). Once the real production domain is decided,
find-and-replace that placeholder across the project:

```bash
grep -rl "soulroots.netlify.app" --include="*.html" --include="*.txt" --include="*.xml" . \
  | xargs sed -i '' 's#https://soulroots.netlify.app#https://YOUR-REAL-DOMAIN#g'
```

Also note: the retreat dates on `retreats.html` (Oct/Nov 2025) are in the past — update the
visible copy and the matching `Event` JSON-LD block before relying on this page for bookings.

## 📄 License

ISC