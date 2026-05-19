# Yavigo Platform - Implementation Guide

## 🚀 Quick Start

### Installation & Setup
```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open browser
# Navigate to http://localhost:3000
```

### Build for Production
```bash
pnpm build
pnpm start
```

## 📁 Complete Site Map

```
Homepage (/)
├─ Hero Section with Parallax
├─ Stats Section (50K+, 95%, 24/7)
├─ Destinations Showcase (5 countries)
├─ Why Choose Us (6 benefits)
└─ Navbar & Footer

Services (/services)
├─ 6 Service Cards
├─ 4-Step Process
└─ CTA Section

Visa Requirements (/visa-requirements)
├─ Country Accordion (6+ countries)
├─ Requirements List
└─ General Info

About (/about)
├─ Mission Statement
├─ Company Stats
├─ Core Values
└─ Team Message

Blog (/blog)
├─ 6 Blog Posts Grid
├─ Categories & Metadata
└─ Newsletter Signup

Contact (/contact)
├─ Visa Application Form
├─ Contact Info Cards
├─ Why Choose Us
└─ FAQ Section

Custom 404 Page
└─ Animated Error Page
```

## 🎨 Design System Reference

### Color Tokens (Defined in globals.css)
```css
/* Primary Colors */
--green-primary: oklch(0.72 0.22 128)    /* Main brand green */
--green-bright: oklch(0.82 0.22 128)     /* Bright green accent */
--green-dark: oklch(0.45 0.18 128)       /* Dark green variant */

/* Accent Colors */
--gold: oklch(0.84 0.15 70)              /* Luxury gold */
--gold-dark: oklch(0.68 0.12 65)         /* Deep gold */
--blue-accent: oklch(0.65 0.15 250)      /* Secondary blue */
--blue-light: oklch(0.75 0.12 260)       /* Light blue */

/* Neutral Colors */
--background: oklch(0.08 0.015 140)      /* Deep dark bg */
--surface-1: oklch(0.11 0.018 140)       /* Primary surface */
--surface-2: oklch(0.14 0.022 140)       /* Secondary surface */
--surface-3: oklch(0.18 0.025 140)       /* Tertiary surface */

/* Text Colors */
--foreground: oklch(0.94 0.03 130)       /* Primary text (white) */
--muted-foreground: oklch(0.55 0.06 140) /* Secondary text (gray) */
```

### Animation Patterns

#### 1. Page Entry (Staggered)
```jsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};
```

#### 2. Hover Effects
```jsx
whileHover={{ y: -4, scale: 1.02 }}
whileTap={{ scale: 0.95 }}
```

#### 3. Scroll Parallax
```jsx
const { scrollY } = useScroll();
const y = useTransform(scrollY, [0, 300], [0, 100]);
```

#### 4. Floating Animations
```jsx
animate={{ y: [0, 40, 0], x: [0, 20, 0] }}
transition={{ duration: 8, repeat: Infinity }}
```

## 📋 Component Implementation

### Key Components Structure

#### HeroSection (hero-section.tsx)
- Parallax background with scroll transform
- Animated headline gradient
- Search bar with icons
- Stats cards with stagger animation
- Scroll indicator with bounce

#### Homepage Sections (homepage-sections.tsx)
- **DestinationsShowcase**: 5 country cards with hover scale
- **StatsSection**: 3 stat cards with icon rotation
- **WhyChooseUs**: 6 benefit cards with checkmarks

#### Navbar (navbar.tsx)
- Sticky positioning with scroll blur
- Desktop nav with links
- Mobile hamburger menu with slide animation
- CTA button with gradient

#### Footer (footer.tsx)
- Multi-column layout
- Brand section with social links
- Four link columns (Services, Solutions, Resources, Company)
- Bottom bar with legal links

## 🔧 Customization Guide

### Update Brand Colors
Edit `/app/globals.css`:
```css
:root {
  --green-primary: oklch(0.72 0.22 128); /* Change this */
  --gold: oklch(0.84 0.15 70);           /* Or this */
}
```

### Add New Page
1. Create `/app/new-page/page.tsx`
2. Create `/app/new-page/layout.tsx` (with metadata)
3. Add to navbar links in `components/navbar.tsx`
4. Add to footer links in `components/footer.tsx`

### Modify Animation Timing
Change in component:
```jsx
transition={{ duration: 0.6 }} // Faster: 0.3, Slower: 1.0
delay: i * 0.1              // More delay: 0.2, Less: 0.05
```

### Update Hero Background
Replace image in `/public/images/hero-bg.jpg` and reference in `hero-section.tsx`

## 📱 Responsive Design Breakpoints

### Mobile First Approach
- **xs**: 320px - Mobile phones
- **sm**: 640px - Landscape phones
- **md**: 768px - Tablets
- **lg**: 1024px - Small laptops
- **xl**: 1280px - Desktops
- **2xl**: 1536px - Large screens

### Common Responsive Patterns
```jsx
/* Mobile: 1 column */
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

/* Text sizing */
<h1 className="text-3xl sm:text-4xl lg:text-5xl">

/* Padding */
<div className="px-4 sm:px-6 lg:px-8">
```

## 🎬 Advanced Animation Techniques

### Scroll-Triggered Reveals
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  Content appears when scrolled into view
</motion.div>
```

### Conditional Animations
```jsx
const isVisible = useInView(ref);
<motion.div animate={isVisible ? { opacity: 1 } : { opacity: 0 }} />
```

### Gesture Animations
```jsx
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
whileDrag={{ opacity: 0.5 }}
```

## 🌐 SEO & Performance

### Metadata Best Practices
- Each page has custom `title` and `description`
- Keywords aligned with visa/travel industry
- Open Graph tags for social sharing
- JSON-LD structured data (can be added)

### Performance Optimization
- Image lazy loading via Next.js `Image` component
- Code splitting by route (automatic with App Router)
- CSS optimized by Tailwind v4
- Animations use GPU acceleration

## 🔐 Form Handling

### Contact Form (/contact/page.tsx)
```jsx
const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: '',
  destination: '',
  message: ''
});

// Form submission simulated with 2s delay
// Connect to backend API as needed
```

### Adding Backend Integration
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Send to your API
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(formData)
  });
  
  // Handle response
};
```

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] Update logo in `/public/images/yavigo-logo.png`
- [ ] Update all destination images
- [ ] Replace blog post images
- [ ] Update company contact information
- [ ] Change all placeholder links to real URLs
- [ ] Test form submission integration
- [ ] Verify all pages load correctly
- [ ] Test responsive design on mobile
- [ ] Update metadata with real descriptions
- [ ] Set up analytics tracking
- [ ] Configure email notifications for forms
- [ ] Test all CTAs and navigation

## 📚 Key Dependencies

```json
{
  "next": "16.2.0",
  "react": "19.2.4",
  "framer-motion": "^11.15.0",
  "lucide-react": "^0.564.0",
  "tailwindcss": "^4.2.0"
}
```

## 🆘 Troubleshooting

### Images Not Showing
- Check image path in `/public/images/`
- Ensure image format is supported (JPG, PNG, WebP)
- Verify Image component has `alt` text

### Animations Not Smooth
- Check GPU acceleration: `will-change: transform` in CSS
- Reduce animation complexity
- Use `useReducedMotion` for accessibility

### Mobile Menu Not Working
- Verify `mobileOpen` state in Navbar
- Check `AnimatePresence` is imported
- Ensure mobile button click handler is attached

### Forms Not Submitting
- Check form validation
- Verify backend endpoint URL
- Check browser console for errors
- Ensure CORS is configured if cross-origin

## 📞 Support & Resources

- **Framer Motion Docs**: https://www.framer.com/motion/
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Lucide Icons**: https://lucide.dev

---

**Last Updated**: April 2026  
**Version**: 1.0.0  
**Status**: Production Ready
