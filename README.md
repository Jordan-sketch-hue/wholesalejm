# Wholesale Jamaica - Premium E-Commerce Platform

> **The New Downtown Kingston Standard** - A production-grade wholesale commerce platform for Jamaica

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- MongoDB Atlas account (or local MongoDB)
- Optional: Redis for caching
- Optional: Stripe/Payment gateway API keys

### Installation

```bash
# Clone repository
git clone <your-repo-url>
cd wholesaledemo

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your credentials
nano .env

# Start development server
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000

---

## 📁 Project Structure

```
wholesaledemo/
├── public/                      # Static files
│   └── robots.txt              # SEO crawling rules
├── src/
│   ├── pages/                  # HTML pages
│   │   ├── index.html          # Homepage (with hero, deals, features)
│   │   ├── tracking.html       # Real-time order tracking
│   │   ├── auth/
│   │   │   ├── login.html      # Login page (JWT + OAuth)
│   │   │   └── register.html   # Registration page
│   │   ├── shop/
│   │   │   ├── cart.html       # Shopping cart
│   │   │   ├── checkout.html   # Checkout flow
│   │   │   └── order-confirmation.html  # Success page
│   │   └── admin/
│   │       └── dashboard.html  # Admin analytics & management
│   ├── modules/                # JavaScript interactivity
│   │   ├── mobileMenu.js       # Mobile menu toggle
│   │   ├── smoothScroll.js     # Scroll behavior
│   │   ├── revealAnimations.js # Reveal on scroll
│   │   ├── modals.js           # Modal system
│   │   ├── faq.js              # Accordion FAQ
│   │   └── cart.js             # Cart management
│   ├── services/               # Business logic
│   │   ├── authService.js      # Authentication (JWT + OAuth)
│   │   ├── oauthService.js     # OAuth callbacks
│   │   ├── routeGuard.js       # Protected routes
│   │   ├── paymentService.js   # Payment processing
│   │   ├── trackingService.js  # Order tracking
│   │   └── whatsappService.js  # WhatsApp integration
│   ├── styles/
│   │   └── globals.css         # Tailwind + premium animations
│   ├── app.js                  # App initialization
│   └── main.js                 # Entry point
├── server/
│   ├── index.js                # Express server setup
│   ├── api/
│   │   └── routes/
│   │       ├── auth.js         # Login, register, OAuth
│   │       ├── products.js     # Product catalog
│   │       ├── orders.js       # Order management
│   │       ├── users.js        # User profiles
│   │       ├── payments.js     # Payment processing
│   │       ├── whatsapp.js     # WhatsApp webhooks
│   │       └── tracking.js     # Tracking updates
│   ├── database/
│   │   ├── connection.js       # MongoDB connection
│   │   └── models/
│   │       ├── User.js         # User schema
│   │       ├── Product.js      # Product schema
│   │       └── Order.js        # Order schema
│   ├── auth/
│   │   ├── jwt.js              # JWT utilities
│   │   └── password.js         # Password hashing
│   ├── middleware/
│   │   ├── index.js            # Core middleware
│   │   └── loggerMiddleware.js # Request logging
│   ├── services/               # Business logic
│   └── config/                 # Configuration files
├── index.html                  # Root HTML (Vite entry)
├── package.json                # Dependencies
├── .env.example                # Environment template
├── .gitignore                  # Git ignore rules
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS setup
├── vite.config.js              # Vite configuration
└── README.md                   # This file
```

---

## 🎨 Design & Features

### Homepage
- ✅ Hero section with animated background gradients
- ✅ Flash wholesale discounts carousel
- ✅ "Shop Wholesale Smarter" features grid
- ✅ Popular categories showcase
- ✅ Customer testimonials section
- ✅ WhatsApp quick order CTA
- ✅ FAQ accordion section
- ✅ Newsletter signup
- ✅ Premium footer with links

### Authentication System
- ✅ JWT-based authentication
- ✅ Email/password login & register
- ✅ OAuth support (Google, Apple, Facebook)
- ✅ Password hashing with bcrypt
- ✅ Protected routes
- ✅ Session management

### E-Commerce
- ✅ Shopping cart with localStorage persistence
- ✅ Product catalog with filtering
- ✅ Bulk pricing tiers
- ✅ Smart checkout flow (3-step)
- ✅ Multiple payment methods
- ✅ Order confirmation page
- ✅ Saved cart functionality

### Order Management
- ✅ Real-time order tracking
- ✅ Order history for customers
- ✅ Order status management (admin)
- ✅ Delivery timeline visualization
- ✅ SMS/Email/WhatsApp notifications

### Admin Dashboard
- ✅ Revenue analytics & KPIs
- ✅ Order management interface
- ✅ Inventory management
- ✅ Customer management
- ✅ Payment transaction history
- ✅ Promotion/coupon management
- ✅ Analytics charts & reports

### Payment Integration
- ✅ Stripe integration ready
- ✅ Jamaica-specific gateways (NCB, Scotia, JN, Lynk, WiPay)
- ✅ Bank transfer support
- ✅ Cash on delivery option
- ✅ WhatsApp payment links
- ✅ Refund processing

### WhatsApp Integration
- ✅ Order placement via WhatsApp
- ✅ Status notifications
- ✅ Delivery alerts
- ✅ Customer support chat
- ✅ Promotional campaigns

---

## 🔐 Security Features

- HTTPS/SSL encryption
- CORS protection
- Rate limiting (100 requests/15min)
- MongoDB injection prevention
- Password hashing (bcrypt)
- JWT token verification
- CSRF protection ready
- Admin logging & audit trail

---

## 📱 Responsive Design

- Mobile-first approach
- Fully responsive to 2560px width
- Touch-optimized navigation
- PWA-ready (service worker support)
- Smooth animations on mobile
- Optimized images via Cloudinary

---

## 🌍 Deployment

### Vercel (Recommended for Frontend)

```bash
npm run build
# Push to GitHub and connect to Vercel
```

### Node.js Backend Hosting

Options:
- **Railway**: Recommended, free tier available
- **Render**: Good PostgreSQL support
- **Heroku**: Classic choice
- **DigitalOcean**: Self-managed servers

### Environment Variables

Set these in your hosting platform:

```
MONGODB_URI=<your-mongo-atlas-connection>
REDIS_URL=<optional-redis-connection>
JWT_SECRET=<strong-random-secret>
STRIPE_PUBLIC_KEY=<stripe-key>
STRIPE_SECRET_KEY=<stripe-key>
WHATSAPP_API_KEY=<whatsapp-business-api>
CLOUDINARY_API_KEY=<cloudinary-key>
```

---

## 🛠️ Development

### Available Commands

```bash
# Development
npm run dev              # Start both frontend + backend

# Production Build
npm run build            # Build for production
npm run preview          # Preview production build

# Linting
npm run lint             # Check code quality
npm run format           # Format code with Prettier
```

### Architecture

**Frontend**: HTML5 + Tailwind CSS + Vanilla JavaScript (ES Modules)
**Backend**: Node.js + Express.js
**Database**: MongoDB Atlas
**Real-time**: Socket.io for order tracking
**Caching**: Redis (optional)
**Storage**: Cloudinary for images
**Payments**: Stripe + Jamaica gateways
**Messaging**: WhatsApp Business API

---

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `POST /api/auth/oauth-callback` - OAuth handler
- `POST /api/auth/refresh` - Refresh token

### Products
- `GET /api/products` - List products
- `GET /api/products/:id` - Get product details

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get order details
- `PATCH /api/orders/:id/status` - Update status

### Payments
- `POST /api/payments/process` - Process card payment
- `POST /api/payments/jamaican` - Jamaica gateway payment
- `POST /api/payments/bank-transfer` - Bank transfer
- `GET /api/payments/verify/:txnId` - Verify payment

### Tracking
- `GET /api/tracking/:number` - Track order

---

## 🎯 Next Steps

### Recommended Order:
1. ✅ Set up environment & dependencies
2. ✅ Configure MongoDB connection
3. ✅ Run local dev server
4. ✅ Integrate real payment gateways
5. ✅ Set up WhatsApp Business API
6. ✅ Configure Cloudinary image hosting
7. ✅ Deploy backend to Railway/Render
8. ✅ Deploy frontend to Vercel
9. ✅ Set up SSL certificates
10. ✅ Configure DNS & domain

---

## 📈 Performance Optimization

- Image optimization via Cloudinary
- Code splitting with Vite
- Lazy loading for images
- Redis caching for products
- CDN acceleration
- Minified CSS/JS bundles
- Gzip compression enabled

---

## 🤝 Contributing

This is a commercial platform for Wholesale Jamaica. Please contact for contribution guidelines.

---

## 📄 License

Proprietary - Wholesale Jamaica 2024

---

## 📞 Support

- **Email**: support@wholesalejm.com
- **WhatsApp**: +1 (876) 555-0000
- **Hours**: 8am - 10pm (Mon-Sun)

---

## 🎊 The Vision

**"A modern Jamaican commerce ecosystem."**

This platform represents the future of wholesale in Jamaica:
- Premium UX matching international standards
- Speed and reliability you can trust
- Fair pricing and transparency
- Support that actually cares
- Technology that works for your business

**Built with ❤️ for Caribbean commerce.**

---

Made with love for Wholesale Jamaica • 2024
