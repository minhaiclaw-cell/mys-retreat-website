# MYS Retreat Campground

A modern, responsive campground website inspired by luxury resort aesthetics, adapted for outdoor camping experiences.

![MYS Retreat](https://placehold.co/800x400/2d4a3e/ffffff?text=MYS+Retreat)

## Overview

MYS Retreat is a campground and nature escape located in the heart of the wilderness. This website showcases the campground's accommodations, activities, and booking capabilities with a clean, modern design that emphasizes natural beauty and outdoor adventure.

## Features

- **Responsive Design** - Fully responsive layout that works beautifully on all devices
- **Modern Aesthetics** - Clean typography with earthy, nature-inspired color palette
- **Smooth Animations** - Scroll-triggered animations and smooth page transitions
- **Booking Form** - Functional contact/booking form with validation
- **Gallery** - Image gallery showcasing the campground
- **Location Info** - Detailed directions and nearby attractions

## Website Sections

1. **Hero** - Full-screen hero with compelling headline and call-to-action
2. **Introduction** - Welcome message and campground overview
3. **Stay** - Accommodations (Tent Sites, RV Sites, Cabins)
4. **Experience** - Activities and outdoor adventures
5. **Gather** - Community spaces, fire pits, and camp kitchen
6. **Location** - Getting here, drive times, and nearby attractions
7. **Gallery** - Photo gallery of the campground
8. **Contact/Booking** - Reservation form and contact information

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Custom CSS with CSS variables
- **Vanilla JavaScript** - No external dependencies
- **Google Fonts** - Cormorant Garamond & Inter
- **Placeholder Images** - Using placehold.co for all images

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Forest Green | `#2d4a3e` | Primary brand color |
| Dark Green | `#1a2d26` | Dark backgrounds |
| Light Green | `#4a6741` | Secondary accents |
| Earth Brown | `#5c4a3d` | Secondary color |
| Rust | `#8b4513` | Accent/CTA color |
| Cream | `#f5f2ed` | Light backgrounds |
| Sand | `#e8e4df` | Section backgrounds |

## File Structure

```
mys-retreat-website/
├── index.html          # Main HTML file
├── styles.css          # Complete stylesheet
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- No external JavaScript dependencies
- Minimal HTTP requests
- Optimized CSS with CSS variables
- Lazy-loading ready image structure
- Accessible markup with ARIA labels

## Setup Instructions

### Local Development

1. Clone or download the repository
2. Open `index.html` in your browser
3. No build process required - it's pure HTML/CSS/JS

### Deploy to GitHub Pages

1. Create a new repository on GitHub named `mys-retreat-website`
2. Push these files to the repository:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/mys-retreat-website.git
   git push -u origin main
   ```
3. Go to repository Settings > Pages
4. Select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Save and wait for deployment

Your site will be live at: `https://YOUR_USERNAME.github.io/mys-retreat-website/`

## Customization

### Changing Images

Replace placeholder images by updating the `src` attributes in `index.html`:

```html
<!-- Current placeholder -->
<img src="https://placehold.co/800x600/2d4a3e/ffffff?text=MYS+Retreat" alt="...">

<!-- Replace with your image -->
<img src="images/your-image.jpg" alt="...">
```

### Changing Colors

Edit CSS variables in `styles.css`:

```css
:root {
    --color-primary: #2d4a3e;     /* Change this */
    --color-accent: #8b4513;       /* Change this */
    --color-cream: #f5f2ed;        /* Change this */
}
```

### Adding Pages

This is a single-page website. To add more pages:

1. Create new HTML files (e.g., `about.html`, `contact.html`)
2. Copy the header and footer from `index.html`
3. Update navigation links
4. Add page-specific content

## License

This project is available for personal and commercial use.

## Credits

- Design inspired by [Wander the Resort](https://www.wandertheresort.com/)
- Fonts: [Google Fonts](https://fonts.google.com/)
- Icons: Custom SVG icons

---

&copy; 2025 MYS Retreat. All rights reserved.
