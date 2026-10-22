# 🧸 TeddyPups U.A.E. — Luxury Boutique Pet Concierge Website Clone

A high-converting, mobile-first website for **TeddyPups U.A.E.** (inspired by `https://puppy.instabizweb.com/`). Designed for a luxury boutique pet adoption service based in Downtown Dubai specializing in purebred Korean teacup breeds and same-day showroom adoptions.

Built with clean, modern PHP, HTML5, Vanilla CSS, and JavaScript. Zero external NPM dependencies required. Completely ready to run locally in XAMPP or deploy immediately to GitHub and GitHub Pages.

---

## 🌟 Key Features & Sections

### 1. Brand Identity & Design System
- **Palette**: Warm editorial luxury with soft creams (`#fffdf8`), warm sands (`#f2be6b`), deep cocoa (`#2a170e`), toffee accents (`#a24a1a`), and WhatsApp emerald green (`#1f7a4d` / `#25D366`).
- **Typography**: Google Fonts pairing featuring **Fraunces** (luxury serif display), **Figtree** (crisp UI/body sans), and **Shantell Sans** (handwritten scrawl captions).
- **Aesthetics**: Scallop border patterns, 3D pill buttons with shadow offsets, smooth micro-interactions, washi-tape polaroids, and frosted-glass navbar.

### 2. High-Converting WhatsApp Concierge Model
- Replaces traditional friction-heavy e-commerce checkouts with direct, high-touch WhatsApp lead funnels (`+971 54 167 6733`).
- Dynamic deep-link generator pre-fills puppy names and customer inquiries automatically:
  `https://wa.me/971541676733?text=Hi%20TeddyPups,%20I'm%20interested%20in%20[PuppyName]`
- **Persistent Mobile Floating Action Bar**: Fixed bottom bar on mobile screens with one-tap "WhatsApp us" and "Call Showroom" triggers.

### 3. Interactive Catalog Grid ("Meet the Pups")
- **Dynamic Tab Switching**: Toggle between "Available Puppies" and "Already Gone Home".
- **Multi-Faceted Client Filtering**: Filter by breed (Maltipoo, Pomeranian, Toy Poodle, Cavapoo, Shih Tzu), gender (Boy/Girl), and origin (Downtown Dubai Showroom vs. Korean Teacup Import).
- **Puppy Detail Modal**: Pop-up dialog with full health specs, adult weight estimates, traits, and instant booking.
- **Video Clip Badges**: Cards with `▶ video` tags open a video player dialog.

### 4. Interactive "Your Puppy Journey" WhatsApp Simulator
- Interactive chat mockup widget where users click quick-reply breed chips to simulate real-time concierge communication with typing indicators and bot responses.

### 5. Dual Adoption Model Showcase
- **In our Showroom (Downtown Dubai)**: Same-day take-home, private bonding sessions, and immediate health certification.
- **Imported for You (Korea → Dubai)**: Direct sourcing from ethical Seoul breeders with climate-controlled flights, quarantine, and customs handled.

### 6. Social Proof & Testimonials ("Happy Families")
- 64+ moments counter with featured client review (Sarah M., Downtown Dubai).
- Polaroid UGC photo wall with tilt angles, washi tape, and click-to-enlarge lightbox.

### 7. Interactive FAQ Accordion
- Smooth collapsible accordions answering health check, vaccination, quarantine, and showroom questions.

---

## 📁 Project Directory Structure

```text
c:\xampp\htdocs\project\
├── assets/
│   ├── css/
│   │   └── style.css            # Master design system & responsive layout
│   ├── js/
│   │   └── app.js              # Filters, WhatsApp simulator, modals, drawer, FAQ
│   └── images/
│       ├── logo.png            # Official brand logo
│       ├── pup_*.webp / *.jpg  # 15 high-res puppy portraits
│       ├── happy_*.jpg         # 8 customer polaroid UGC photos
│       └── showroom_*.jpg      # 4 Dubai showroom atmosphere photos
├── includes/
│   ├── config.php              # Brand constants, phone, email, wa_url() helper
│   ├── data.php                # Complete dataset for puppies, families, FAQs
│   ├── header.php              # Sticky navbar, mobile drawer, scalloped hem
│   ├── footer.php              # CTA banner, directory, persistent mobile bar
│   ├── puppy-card.php          # Reusable puppy card template
│   └── modals.php              # Video, puppy detail, and photo lightbox modals
├── index.php                   # Master landing page (All 9 sections)
├── puppies.php                 # Dedicated puppy catalog page
├── happy-families.php          # Dedicated customer stories & polaroid gallery
├── how-it-works.php            # Detailed 3-step adoption journey & logistics
├── faq.php                     # Complete categorized FAQ accordion page
├── contact.php                 # Showroom address, hours & booking
├── .htaccess                   # Apache URL rewrite and caching rules
├── .gitignore                  # Clean repository configuration
└── README.md                   # Documentation & deployment guide
```

---

## 🚀 How to Run Locally

### Option 1: Using XAMPP (Apache)
1. Ensure this folder is inside your `C:\xampp\htdocs\` directory (e.g. `C:\xampp\htdocs\project`).
2. Start **Apache** from the XAMPP Control Panel.
3. Open your browser and navigate to:
   ```
   http://localhost/project/
   ```

### Option 2: Using PHP Built-In Web Server
From the project folder, open terminal/PowerShell and run:
```bash
php -S localhost:8000
```
Then open `http://localhost:8000/` in your browser.

---

## 🌐 Deploying to GitHub

This repository is clean and version-controlled, ready to be pushed to GitHub:

1. Stage and commit:
   ```bash
   git add .
   git commit -m "feat: complete TeddyPups U.A.E. PHP clone"
   ```
2. Create a new repository on GitHub and push:
   ```bash
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git branch -M main
   git push -u origin main
   ```
3. To enable free hosting on **GitHub Pages**:
   - Go to your repository on GitHub.
   - Click **Settings** → **Pages**.
   - Under **Build and deployment**, set Source to **Deploy from a branch**, select branch `main` and folder `/(root)`.
   - Click **Save**. Within seconds, your website will be live worldwide!

---

## 📞 Brand Information
- **Brand**: TeddyPups U.A.E.
- **Showroom**: Downtown Dubai, United Arab Emirates
- **Phone / WhatsApp**: `+971 54 167 6733`
- **Email**: `teddypupsadmin@gmail.com`
- **Hours**: Daily 10:00 AM – 9:00 PM (By Appointment)
