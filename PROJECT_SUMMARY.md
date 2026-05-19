# Yavigo - B2B Visa & Immigration Platform

## Project Overview

Yavigo is a fully-responsive Next.js website positioning Yavigo as a B2B visa and immigration partner for travel agencies, corporates, and immigration consultancies. The platform features luxury design aesthetics, extensive Framer Motion animations, and a comprehensive set of pages.

## Design System

### Color Palette
- **Primary Brand Color**: Lime Green (`#6DC327` to `#8AE020`) - Yavigo logo inspired
- **Dark Background**: Deep charcoal (`#080D08`) for premium feel
- **Accent Colors**: 
  - Gold (`#D4AF37`) for luxury touches
  - Blue Accent (`#4A90E2`) for visual richness
  - White/Off-white (`#F5F5F5`) for text
  - Grays for hierarchy

### Typography
- **Headings**: Plus Jakarta Sans (Bold, 500-900 weights)
- **Body**: Plus Jakarta Sans (400-600 weights)
- **Line Height**: 1.4-1.6 for optimal readability
- **Scale**: Responsive sizing from mobile to desktop

### Design Inspiration
- Clean, minimalist layouts with maximum whitespace
- Glass morphism effects with backdrop blur
- Gradient text for headings
- Animated cards and hover states
- Premium shadows and depth

## Pages & Structure

### 1. Homepage (`/`)
- **Hero Section**: Parallax background, animated gradient text, search bar, CTA buttons
- **Destinations Showcase**: 5-country grid with hover expand effects
- **Why Choose Us**: 6-feature grid with benefits
- **Navbar**: Sticky, scroll-aware with smooth transitions
- **Footer**: Comprehensive navigation and brand info

### 2. Services Page (`/services`)
- **Service Cards**: 6 detailed service offerings with icons and features
- **Process Section**: 4-step animated timeline
- **Call-to-Action**: End-to-end service explanation

Services Include:
- E-Visa Processing
- Immigration Services (long-term visas, residency, corporate mobility)
- Document Support
- Europe & UK Visa Specialists
- Fraud Protection
- Dedicated Partner Support

### 3. Visa Requirements Page (`/visa-requirements`)
- **Country Accordion**: Expandable list for 6+ countries
- **Processing Times**: Clearly displayed for each destination
- **Requirements List**: Comprehensive document checklists
- **General Requirements**: Universal visa requirements

### 4. About Page (`/about`)
- **Mission Statement**: Brand purpose and values
- **Company Markers**: B2B positioning, certified specialists, 100+ countries, dedicated partner support
- **Core Values**: Trust & Security, Excellence, Innovation
- **Founder Message**: Personal connection

### 5. Blog Page (`/blog`)
- **6 Featured Posts**: Full grid layout with images, metadata
- **Categories**: Visa Guides, Travel Tips, Pro Tips
- **Newsletter Signup**: Email subscription section
- **Post Preview**: Author, date, read time, excerpt

### 6. Contact Page (`/contact`)
- **Application Form**: Full visa application form with validation
- **Contact Cards**: Phone, Email, Office location
- **Why Choose Yavigo**: 6-point benefits section
- **FAQ Section**: 4 common questions with answers

## Components Architecture

### Core Components
- **Navbar**: Fixed header with responsive mobile menu
- **Hero Section**: Parallax scrolling with animated background
- **Footer**: Multi-column layout with brand and links
- **Homepage Sections** (separate file):
  - DestinationsShowcase
  - StatsSection
  - WhyChooseUs

### Animation Library: Framer Motion
Heavy use of animations throughout:
- **Scroll Triggers**: Sections animate in on scroll
- **Hover Effects**: Cards lift and transform on hover
- **Staggered Children**: Sequential animation of list items
- **Parallax**: Background images move with scroll
- **Transitions**: Smooth page transitions and state changes
- **Micro-interactions**: Buttons scale and glow on interaction

### Animation Techniques Used
```
- useScroll & useTransform for parallax
- whileHover & whileTap for interactive elements
- staggerChildren for sequential reveals
- initial/animate/exit for page transitions
- AnimatePresence for mount/unmount effects
```

## Design Features

### Visual Enhancements
1. **Animated Gradient Orbs**: Floating background elements with 8-10s animation cycles
2. **Glow Effects**: Box-shadow glows on green elements with pulse animations
3. **Grid Backgrounds**: Subtle grid overlay in hero section
4. **Smooth Scrolling**: Native scroll-smooth behavior
5. **Custom Scrollbar**: Green gradient scrollbar matching brand
6. **Shimmer Effects**: Loading and accent animations
7. **Ticker Animations**: For stats and counters

### Premium Touches
- Backdrop blur effects (glassmorphism)
- Gradient text for main headings
- Shadow depth layering
- Border gradients on cards
- Hover scale transformations
- Text balance for optimal line breaks

## Technical Stack

### Framework & Libraries
- **Next.js 16**: App Router, Server Components
- **React 19.2**: Latest features and hooks
- **TypeScript**: Type-safe components
- **Tailwind CSS 4**: Utility-first styling
- **Framer Motion 11**: Advanced animations

### UI Components
- **Lucide React**: 500+ icons (Phone, Mail, MapPin, etc.)
- **Radix UI**: Accessible component primitives
- **shadcn/ui**: Pre-built component library

### CSS Features
- CSS Grid & Flexbox layouts
- CSS custom properties (design tokens)
- Gradient backgrounds
- Backdrop filters
- CSS animations & keyframes

## Responsive Design

### Breakpoints
- **Mobile**: 320px - 640px (single column, full-width)
- **Tablet**: 641px - 1024px (2 columns, optimized spacing)
- **Desktop**: 1025px+ (3-4 columns, premium layout)

### Mobile-First Approach
- All layouts start mobile and scale up
- Touch-friendly button sizes (44px minimum)
- Optimized text sizes for readability
- Hamburger menu for mobile navigation

## Performance Optimizations

1. **Image Optimization**: Next.js Image component with lazy loading
2. **Code Splitting**: Dynamic imports for routes
3. **CSS Optimization**: Tailwind CSS v4 with no unused styles
4. **Animation Performance**: GPU-accelerated Framer Motion
5. **Metadata**: SEO-optimized titles and descriptions
6. **Caching**: Strategic cache headers

## SEO & Metadata

Each page has custom metadata:
- `title`: Descriptive page titles
- `description`: 155-160 character summaries
- `keywords`: Relevant search terms
- Open Graph tags for social sharing

## File Structure

```
/vercel/share/v0-project/
├── app/
│   ├── page.tsx (Homepage)
│   ├── layout.tsx (Root layout with metadata)
│   ├── globals.css (Design tokens & animations)
│   ├── contact/
│   │   ├── page.tsx
│   │   └── layout.tsx
│   ├── services/
│   │   ├── page.tsx
│   │   └── layout.tsx
│   ├── visa-requirements/
│   │   ├── page.tsx
│   │   └── layout.tsx
│   ├── about/
│   │   ├── page.tsx
│   │   └── layout.tsx
│   └── blog/
│       ├── page.tsx
│       └── layout.tsx
├── components/
│   ├── navbar.tsx
│   ├── hero-section.tsx
│   ├── homepage-sections.tsx (DestinationsShowcase, StatsSection, WhyChooseUs)
│   ├── footer.tsx
│   └── [other sections from previous build]
├── public/images/
│   ├── yavigo-logo.png
│   ├── hero-bg.jpg
│   ├── dest-*.jpg (6 destination images)
│   └── blog-*.jpg (3 blog images)
└── package.json
```

## Key Features Implemented

✅ Premium dark theme with green brand colors  
✅ Comprehensive Framer Motion animations (stagger, parallax, hover)  
✅ "Apply for Visa" CTA linking to `/contact` page  
✅ Multi-page site structure (6+ pages)  
✅ Responsive design for all devices  
✅ Professional hero section with parallax  
✅ Animated statistics and counters  
✅ Destination showcase with hover effects  
✅ Blog section with card grid  
✅ Contact form with validation  
✅ FAQ accordion sections  
✅ Professional footer with sitemap  
✅ SEO metadata for each page  
✅ Smooth scroll animations  
✅ Interactive cards and buttons  

## Color Accent System

Beyond the dominant green, the site uses:
- **Gold accents** on premium CTAs and highlights
- **Blue accents** for secondary actions and depth
- **Gradients** combining green→gold or green→blue
- **Opacity variations** for layering and depth

## Future Enhancement Opportunities

1. User authentication system
2. Visa application tracking
3. Payment integration
4. Live chat support
5. Document upload and verification
6. Integration with visa processing APIs
7. Multi-language support
8. Analytics dashboard
9. User testimonials section
10. Email newsletter integration

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Deployment

Ready to deploy on Vercel with:
- Automatic GitHub integration
- Built-in image optimization
- Edge middleware support
- Analytics integration

---

**Brand**: Yavigo - "We Serve Happiness"  
**Mission**: Making international travel simple, secure, and accessible to everyone  
**Target**: Travel agencies, corporates, and immigration consultancies needing a B2B visa & immigration partner
