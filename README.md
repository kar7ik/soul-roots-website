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
├── assets/
│   ├── css/
│   │   └── styles.css  # Custom styles
│   ├── js/
│   │   ├── main.js     # Main navigation & carousel
│   │   ├── booking-form.js  # Booking form handler
│   │   ├── gallery.js  # Gallery lightbox
│   │   └── tailwind-config.js  # Tailwind custom colors
│   └── images/         # Image assets
├── netlify/
│   └── functions/
│       └── booking-proxy.js  # Netlify function for form submissions
├── netlify.toml        # Netlify configuration
└── package.json        # Node.js dependencies
```

## 🎨 Features

- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Image Carousel**: Interactive carousel on homepage
- **Gallery Lightbox**: Click images to view in fullscreen
- **Booking Form**: Integrated form that submits to Google Apps Script via Netlify function
- **Smooth Navigation**: Sticky header with scroll effects
- **Mobile Menu**: Slide-out navigation menu for mobile devices

## 🚀 Local Development

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start local development server:**
   ```bash
   npm run dev
   ```
   
   This will start Netlify Dev, which:
   - Serves your static files
   - Runs Netlify Functions locally
   - Provides hot-reloading
   - Accessible at `http://localhost:8888`

### Alternative: Simple HTTP Server (Static Files Only)

If you only want to test the static site without Netlify Functions:

**Using Python:**
```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Using Node.js (http-server):**
```bash
npx http-server -p 8000
```

**Using PHP:**
```bash
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

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

The booking form uses a Netlify function (`netlify/functions/booking-proxy.js`) that proxies form submissions to a Google Apps Script endpoint. The function:

- Handles CORS preflight requests
- Forwards POST requests to Google Apps Script
- Returns appropriate responses

### Custom Colors (Tailwind)

Custom colors are defined in `assets/js/tailwind-config.js`:
- `sand`: #F6F0E6
- `forest`: #1F6E4F
- `ochre`: #C77C2C
- `terracotta`: #D96C3B
- `charcoal`: #333333
- `sage`: #A3B18A
- `clay`: #B86B4B

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

### Booking form not working locally

- Make sure you're using `npm run dev` (Netlify Dev) instead of a simple HTTP server
- Check that the Netlify function is running (should see in terminal)
- Verify the Google Apps Script URL in `netlify/functions/booking-proxy.js`

### Images not loading

- Ensure image paths start with `/` (absolute paths) for Netlify deployment
- Check that images exist in `assets/images/` directory

### Styles not applying

- Verify Tailwind CDN is loading in the browser console
- Check that `tailwind-config.js` is loaded after Tailwind CDN
- Clear browser cache

## 📄 License

ISC