# Wedding Website

A beautiful, responsive wedding website designed to be hosted on GitHub Pages with a custom domain from GoDaddy.

## Features

- **Responsive Design**: Looks great on all devices (desktop, tablet, mobile)
- **Interactive Elements**: 
  - Live countdown timer to wedding day
  - Photo gallery with modal viewer
  - RSVP form with validation
  - Smooth scrolling navigation
  - Floating animations
- **Multiple Sections**:
  - Hero section with countdown
  - Love story timeline
  - Wedding details (ceremony, reception, accommodations)
  - Photo gallery
  - RSVP form
  - Gift registry links
- **Modern Styling**: Beautiful typography, elegant colors, and smooth animations

## Setup Instructions

### 1. Customize Your Content

Edit the following placeholders in `index.html`:

- `[Your Names]` - Replace with bride and groom names
- `[Bride Name]` - Replace with bride's name
- `[Groom Name]` - Replace with groom's name
- `[Wedding Date]` - Replace with your wedding date
- `[Wedding Venue, City]` - Replace with venue and location
- `[Time]` - Replace with ceremony/reception times
- `[Ceremony Venue Name]` - Replace with ceremony venue
- `[Reception Venue Name]` - Replace with reception venue
- `[Full Address]` - Replace with venue addresses
- `[Google Maps Link]` - Replace with actual Google Maps links
- `[Hotel Name]` - Replace with recommended hotel
- `[Dress Code]` - Replace with your dress code
- `[RSVP Deadline]` - Replace with RSVP deadline
- `[Amazon Registry Link]` - Replace with registry links
- `[Instagram Link]` - Replace with social media links
- `[Email Address]` - Replace with contact email
- `[YourWeddingHashtag]` - Replace with your wedding hashtag

### 2. Update the Countdown Timer

In `script.js`, update the wedding date:

```javascript
const weddingDate = new Date('2025-06-15T15:00:00').getTime(); // Change this date
```

### 3. Add Your Photos

Replace the placeholder images in the `images/` folder:

- `hero-bg.jpg` - Main background image for hero section
- `gallery-1.jpg` through `gallery-6.jpg` - Engagement/couple photos
- `amazon-logo.png` - Amazon registry logo
- `target-logo.png` - Target registry logo  
- `honeymoon-fund.png` - Honeymoon fund image

Recommended image sizes:
- Hero background: 1920x1080px or larger
- Gallery images: 800x800px (square format works best)
- Logo images: 200x200px

### 4. Deploy to GitHub Pages

1. Create a new repository on GitHub
2. Upload all files to the repository
3. Go to repository Settings > Pages
4. Select "Deploy from a branch" and choose "main" branch
5. Your site will be available at `https://yourusername.github.io/repository-name`

### 5. Connect Your GoDaddy Domain

1. In your GitHub repository settings, go to Pages
2. Add your custom domain (e.g., `yournames.com`)
3. In your GoDaddy DNS settings, add these records:

**A Records** (point to GitHub Pages IPs):
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**CNAME Record**:
- Name: `www`
- Value: `yourusername.github.io`

Wait 24-48 hours for DNS propagation.

## Customization Options

### Colors
Update CSS variables in `styles.css`:
```css
:root {
    --primary-color: #d4af37;  /* Gold */
    --secondary-color: #8b4513; /* Brown */
    --accent-color: #f5f5dc;   /* Beige */
}
```

### Fonts
Current fonts used:
- Dancing Script (elegant script)
- Playfair Display (serif headers)
- Open Sans (body text)

### RSVP Form
The form currently shows a success message. To collect actual responses:
1. Use a service like Formspree, Netlify Forms, or Google Forms
2. Update the form action in `index.html`
3. Modify the JavaScript submission handler in `script.js`

### Music Player
Uncomment the music player code in `script.js` and add a wedding song MP3 file to a `music/` folder.

## File Structure

```
wedding/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
├── images/             # Image folder
│   ├── hero-bg.jpg
│   ├── gallery-1.jpg
│   ├── gallery-2.jpg
│   └── ...
└── README.md           # This file
```

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Performance Tips

1. Optimize images (compress before uploading)
2. Use WebP format for better compression
3. Keep total site size under 100MB for GitHub Pages
4. Test on mobile devices

## Need Help?

- Check GitHub Pages documentation
- Test your site locally by opening `index.html` in a browser
- Use browser developer tools to debug issues
- Ensure all image paths are correct and files exist

## License

This template is free to use for personal wedding websites. Customize as needed for your special day!

---

**Congratulations on your upcoming wedding! 💕**