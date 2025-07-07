# Deployment Guide - TechVision Website

This guide provides step-by-step instructions for deploying your TechVision website to popular hosting platforms.

## 🚀 Quick Deployment Options

### Option 1: Netlify (Recommended)
**Best for: Beginners, automatic deployments, free SSL**

1. **Prepare your files**:
   ```bash
   # Ensure all files are in your project directory
   # Test locally by opening index.html in a browser
   ```

2. **Method A: Drag & Drop**:
   - Visit [netlify.com](https://netlify.com)
   - Sign up for a free account
   - Drag your entire project folder to the deploy area
   - Your site will be live in seconds!

3. **Method B: Git Integration**:
   - Push your code to GitHub:
     ```bash
     git init
     git add .
     git commit -m "Initial TechVision website"
     git branch -M main
     git remote add origin https://github.com/yourusername/techvision-website
     git push -u origin main
     ```
   - Connect your GitHub repo in Netlify
   - Enable automatic deployments

4. **Configure your site**:
   - Go to Site settings → General
   - Change site name: `your-site-name.netlify.app`
   - Add custom domain if desired

### Option 2: GitHub Pages
**Best for: Free hosting, GitHub integration**

1. **Create GitHub repository**:
   - Go to [github.com](https://github.com)
   - Create new repository: `techvision-website`
   - Upload your files or use Git:
     ```bash
     git init
     git add .
     git commit -m "TechVision website initial commit"
     git branch -M main
     git remote add origin https://github.com/yourusername/techvision-website
     git push -u origin main
     ```

2. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to "Pages" section
   - Source: "Deploy from a branch"
   - Branch: "main" / "/ (root)"
   - Click "Save"

3. **Access your site**:
   - URL: `https://yourusername.github.io/techvision-website`
   - Wait 5-10 minutes for first deployment

### Option 3: Vercel
**Best for: Performance, edge functions, easy integration**

1. **Deploy via web interface**:
   - Visit [vercel.com](https://vercel.com)
   - Sign up with GitHub account
   - Click "New Project"
   - Import your GitHub repository
   - Deploy automatically

2. **Deploy via CLI**:
   ```bash
   # Install Vercel CLI
   npm install -g vercel
   
   # Deploy from your project directory
   vercel
   
   # Follow the prompts
   # For production deployment:
   vercel --prod
   ```

### Option 4: Firebase Hosting
**Best for: Google integration, scalability**

1. **Install Firebase CLI**:
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase**:
   ```bash
   firebase login
   firebase init hosting
   ```

3. **Configure firebase.json**:
   ```json
   {
     "hosting": {
       "public": ".",
       "ignore": [
         "firebase.json",
         "**/.*",
         "**/node_modules/**"
       ]
     }
   }
   ```

4. **Deploy**:
   ```bash
   firebase deploy
   ```

## 🔧 Pre-Deployment Checklist

### Performance Optimization
- [ ] Compress images (use WebP format if possible)
- [ ] Minimize CSS (optional for production)
- [ ] Test loading speed with Lighthouse
- [ ] Optimize Core Web Vitals

### SEO Preparation
- [ ] Update meta tags with your actual domain
- [ ] Replace placeholder content with real content
- [ ] Add real images with proper alt text
- [ ] Update structured data URLs
- [ ] Create and submit sitemap.xml

### Content Updates
- [ ] Replace "TechVision" with your brand name
- [ ] Update contact information (currently set to Gurgaon, Haryana)
- [ ] Add real social media links
- [ ] Update copyright year
- [ ] Add actual project portfolio items
- [ ] Update currency symbols (currently set to Indian Rupees ₹)
- [ ] Replace demo names with actual team members

### Testing
- [ ] Test all navigation links
- [ ] Verify form functionality
- [ ] Test on mobile devices
- [ ] Check accessibility with axe DevTools
- [ ] Validate HTML at validator.w3.org

## 📁 File Structure for Deployment

```
your-website/
├── index.html          # Landing page
├── blog.html           # Blog page
├── contact.html        # Contact form
├── dashboard.html      # Dashboard
├── styles/
│   └── main.css        # All styles
├── images/             # Your images
│   ├── logo.png
│   ├── hero-image.jpg
│   └── [other images]
├── favicon.ico         # Site icon
└── README.md           # Documentation
```

## 🌐 Custom Domain Setup

### For Netlify:
1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Enter your domain name
4. Update DNS records with your domain provider:
   - Type: CNAME
   - Name: www
   - Value: [your-site].netlify.app

### For GitHub Pages:
1. Go to repository Settings → Pages
2. Add custom domain
3. Create CNAME file in repository root:
   ```
   yourdomain.com
   ```

### For Vercel:
1. Go to project settings → Domains
2. Add your domain
3. Update DNS records as instructed

## 🔒 SSL Certificate

All recommended platforms provide free SSL certificates:
- **Netlify**: Automatic SSL (Let's Encrypt)
- **GitHub Pages**: Automatic SSL for .github.io domains
- **Vercel**: Automatic SSL for all domains
- **Firebase**: Automatic SSL provisioning

## 📊 Analytics Setup

### Google Analytics 4
Add to `<head>` section of all pages:
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Other Analytics Options
- **Plausible**: Privacy-focused analytics
- **Fathom**: Simple, privacy-first analytics
- **Umami**: Open-source alternative

## 🛡️ Security Headers

Add security headers via platform configuration:

### Netlify (_headers file):
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Content-Security-Policy: default-src 'self'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com;
```

### Vercel (vercel.json):
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

## 🔄 Continuous Deployment

### Automatic Deployments
- **Netlify**: Automatically deploys on git push
- **Vercel**: Automatically deploys on git push
- **GitHub Pages**: Automatically deploys on git push

### Manual Deployment
For platforms requiring manual deployment:
```bash
# Build your site (if needed)
# Then deploy using platform-specific commands
```

## 📱 Testing After Deployment

### Essential Tests
1. **Lighthouse Audit**:
   - Performance: >90
   - Accessibility: >95
   - Best Practices: >90
   - SEO: >95

2. **Mobile Testing**:
   - Test on actual devices
   - Use Chrome DevTools device emulation
   - Check touch targets (minimum 44px)

3. **Browser Testing**:
   - Chrome, Firefox, Safari, Edge
   - Test on different screen sizes
   - Verify all functionality works

4. **Accessibility Testing**:
   - Use axe DevTools
   - Test with screen readers
   - Verify keyboard navigation

## 🆘 Troubleshooting

### Common Issues
- **404 errors**: Check file paths and case sensitivity
- **CSS not loading**: Verify CSS file paths
- **Images not displaying**: Check image paths and file extensions
- **Slow loading**: Optimize images and check file sizes

### Platform-Specific Issues
- **Netlify**: Check deploy logs for errors
- **GitHub Pages**: Ensure repository is public or upgrade to Pro
- **Vercel**: Check function logs for errors

## 📞 Support

If you encounter issues:
1. Check the platform's documentation
2. Search community forums
3. Check deployment logs
4. Contact platform support

---

**Your TechVision website is now ready for the world! 🌍**
