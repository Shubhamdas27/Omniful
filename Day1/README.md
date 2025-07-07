# TechVision - Semantic HTML5 Website

A complete, accessible, and SEO-optimized website built with semantic HTML5 and modern CSS. This project demonstrates best practices for web accessibility, responsive design, and semantic markup.

## 🌟 Features

- **Semantic HTML5**: Proper use of semantic elements (header, nav, main, section, article, aside, footer)
- **Full Accessibility**: WCAG 2.1 AA compliant with proper ARIA labels, keyboard navigation, and screen reader support
- **SEO Optimized**: Complete meta tags, Open Graph, Twitter Cards, and structured data (JSON-LD)
- **Responsive Design**: Mobile-first approach with flexbox and grid layouts
- **Modern CSS**: Custom properties, modern selectors, and accessibility features
- **Multi-step Form**: Accessible form with fieldsets, legends, and proper validation
- **Dropdown Navigation**: Keyboard-friendly navigation with proper focus management
- **Dashboard Layout**: Professional dashboard with data visualization and responsive design
- **Indian Localization**: Uses Indian names, currency (₹), and locations by default

## 📁 Project Structure

```
Day1/
├── index.html          # Landing page with SEO optimization
├── blog.html           # Blog layout with articles and sidebar
├── contact.html        # Multi-step accessible contact form
├── dashboard.html      # Dashboard with sidebar navigation
├── styles/
│   └── main.css        # Complete CSS with responsive design
├── images/             # Placeholder for images
└── README.md           # This file
```

## 🚀 Pages Overview

### 1. Landing Page (index.html)
- SEO-optimized meta tags
- Open Graph and Twitter Cards
- Structured data (JSON-LD)
- Hero section with call-to-action
- Features showcase
- About section with statistics
- Semantic HTML structure

### 2. Blog Page (blog.html)
- Two detailed blog articles
- Sidebar with recent posts, categories, and newsletter signup
- Proper article structure with headers and footers
- Tag cloud and social links
- Full semantic markup

### 3. Contact Form (contact.html)
- Multi-step form with progress indicator
- Accessible form elements with proper labels
- Fieldsets and legends for grouping
- ARIA attributes for enhanced accessibility
- Contact information sidebar
- Form validation structure

### 4. Dashboard (dashboard.html)
- Professional dashboard layout
- Sidebar navigation with proper focus management
- Data visualization with progress bars and charts
- Project management interface
- Responsive design with mobile considerations
- Accessibility features throughout

## 🎨 Design Features

### Accessibility
- Proper heading hierarchy (h1 → h2 → h3)
- High contrast colors (4.5:1 minimum ratio)
- Focus indicators for keyboard navigation
- ARIA labels and descriptions
- Semantic HTML for screen readers
- Skip links for keyboard users

### Responsive Design
- Mobile-first CSS approach
- Flexible grid layouts
- Responsive typography
- Touch-friendly interface elements
- Optimized for all screen sizes

### SEO Optimization
- Complete meta tag structure
- Social media optimization
- Structured data for rich snippets
- Semantic HTML for better crawling
- Performance-optimized CSS

## 🛠️ Technical Implementation

### HTML5 Semantic Elements Used
- `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`
- `<fieldset>`, `<legend>` for form grouping
- `<figure>`, `<figcaption>` for media content
- `<address>` for contact information
- `<time>` for dates and timestamps

### CSS Features
- CSS Custom Properties (variables)
- Flexbox and Grid layouts
- Modern pseudo-selectors
- Media queries for responsive design
- Focus management and accessibility
- Print styles included

### Accessibility Features
- WCAG 2.1 AA compliance
- Screen reader compatibility
- Keyboard navigation support
- High contrast mode support
- Reduced motion preferences
- Proper ARIA implementation

## 🌐 Deployment Instructions

### Option 1: Netlify Deployment

1. **Prepare your files**:
   - Ensure all files are in the project folder
   - Test locally by opening `index.html` in a browser

2. **Deploy to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Sign up or log in
   - Drag and drop your project folder to the deployment area
   - Or use Git integration:
     ```bash
     git init
     git add .
     git commit -m "Initial commit"
     git branch -M main
     git remote add origin YOUR_GITHUB_REPO_URL
     git push -u origin main
     ```
   - Connect your GitHub repository in Netlify

3. **Configure build settings**:
   - Build command: (leave empty for static sites)
   - Publish directory: `./` (root directory)
   - Click "Deploy site"

4. **Custom domain (optional)**:
   - Go to Site settings → Domain management
   - Add your custom domain
   - Configure DNS settings as instructed

### Option 2: GitHub Pages Deployment

1. **Create a GitHub repository**:
   - Go to [github.com](https://github.com)
   - Create a new repository
   - Upload your files or use Git:
     ```bash
     git init
     git add .
     git commit -m "Initial commit"
     git branch -M main
     git remote add origin YOUR_REPO_URL
     git push -u origin main
     ```

2. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

3. **Access your site**:
   - Your site will be available at: `https://USERNAME.github.io/REPOSITORY-NAME`
   - GitHub will provide the URL after deployment

### Option 3: Vercel Deployment

1. **Install Vercel CLI** (optional):
   ```bash
   npm install -g vercel
   ```

2. **Deploy via web interface**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up or log in
   - Import your GitHub repository
   - Deploy automatically

3. **Deploy via CLI**:
   ```bash
   vercel --prod
   ```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Customization

### Colors
Edit CSS custom properties in `styles/main.css`:
```css
:root {
  --primary-color: #2563eb;
  --secondary-color: #64748b;
  /* ... other colors */
}
```

### Typography
Change the font family:
```css
:root {
  --font-family: 'Your Font', system-ui, sans-serif;
}
```

### Layout
Modify grid and flexbox layouts in the respective sections of the CSS file.

## 🧪 Testing

### Accessibility Testing
- Use axe DevTools browser extension
- Test with screen readers (NVDA, JAWS, VoiceOver)
- Verify keyboard navigation
- Check color contrast ratios

### Performance Testing
- Use Lighthouse in Chrome DevTools
- Test Core Web Vitals
- Optimize images and assets

### SEO Testing
- Validate HTML markup
- Check meta tags with social media debuggers
- Test structured data with Google's Rich Results Test

## 📋 Checklist

- [x] Semantic HTML5 structure
- [x] Accessibility (WCAG 2.1 AA)
- [x] Responsive design
- [x] SEO optimization
- [x] Multi-step accessible form
- [x] Dropdown navigation
- [x] Dashboard layout
- [x] Modern CSS with custom properties
- [x] Cross-browser compatibility
- [x] Print styles
- [x] Dark mode support
- [x] High contrast mode support
- [x] Reduced motion support

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ using pure HTML and CSS - no JavaScript required!**
