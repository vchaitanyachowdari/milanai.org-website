# Milan AI - Landing Page

A production-ready landing page for Milan AI, built with React, Vite, and Tailwind CSS.

## 🚀 Features

- **Modern Tech Stack**: React 19, Vite 6, Tailwind CSS 4
- **Production Ready**: Optimized builds, error boundaries, performance monitoring
- **SEO Optimized**: Meta tags, structured data, sitemap, robots.txt
- **Analytics**: Google Analytics integration with custom event tracking
- **Performance**: Web Vitals monitoring, lazy loading, code splitting
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **Security**: CSP headers, XSS protection, secure form handling
- **PWA Ready**: Web app manifest, service worker support
- **Error Handling**: Global error boundaries and reporting
- **Responsive**: Mobile-first design with Tailwind CSS

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd milanai-landing
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment variables:
```bash
cp .env.example .env.local
```

4. Update environment variables in `.env.local` with your values.

## 🛠️ Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## 🏗️ Building for Production

1. **Build the application**:
```bash
npm run build
```

2. **Preview the production build**:
```bash
npm run preview
```

3. **Analyze bundle size**:
```bash
npm run build:analyze
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── ErrorBoundary.jsx
│   ├── LoadingSpinner.jsx
│   └── ...
├── config/             # Configuration files
│   └── constants.js    # App constants and feature flags
├── utils/              # Utility functions
│   ├── analytics.js    # Analytics tracking
│   ├── errorHandler.js # Error handling
│   └── performance.js  # Performance monitoring
├── App.jsx             # Main application component
├── main.jsx           # Application entry point
└── index.css          # Global styles

public/
├── .well-known/       # Security and verification files
├── robots.txt         # Search engine directives
├── sitemap.xml        # Site structure for SEO
└── ...               # Static assets
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_APP_NAME` | Application name | Milan AI |
| `VITE_APP_URL` | Application URL | https://www.milanai.org |
| `VITE_FORMSPREE_ENDPOINT` | Form submission endpoint | - |
| `VITE_GA_TRACKING_ID` | Google Analytics ID | - |
| `VITE_ENABLE_ANALYTICS` | Enable analytics tracking | true |
| `VITE_ENABLE_ERROR_REPORTING` | Enable error reporting | true |

### Feature Flags

The application uses feature flags to enable/disable functionality:

- `VITE_ENABLE_ANALYTICS`: Google Analytics tracking
- `VITE_ENABLE_ERROR_REPORTING`: Error reporting to external services
- `VITE_ENABLE_PWA`: Progressive Web App features
- `VITE_DEBUG_MODE`: Development debugging features

## 📊 Analytics & Monitoring

### Google Analytics Events

The application tracks the following events:

- **Page Views**: Automatic page view tracking
- **Form Submissions**: Waitlist form submissions
- **Button Clicks**: CTA and navigation clicks
- **Scroll Depth**: User engagement tracking (25%, 50%, 75%, 90%)
- **Time on Page**: Session duration tracking
- **Web Vitals**: Core Web Vitals (LCP, FID, CLS)
- **Performance**: Resource loading times

### Error Monitoring

- Global error boundaries catch React errors
- Unhandled promise rejections are logged
- Network errors are tracked and reported
- Performance issues are monitored

## 🔒 Security

### Implemented Security Measures

- **Content Security Policy**: Prevents XSS attacks
- **X-Frame-Options**: Prevents clickjacking
- **X-Content-Type-Options**: Prevents MIME sniffing
- **Referrer Policy**: Controls referrer information
- **Form Validation**: Client and server-side validation
- **HTTPS Enforcement**: Secure connections only
- **Security.txt**: Responsible disclosure information

### Security Headers

The application includes security headers in the HTML:

```html
<meta http-equiv="X-Content-Type-Options" content="nosniff" />
<meta http-equiv="X-Frame-Options" content="DENY" />
<meta http-equiv="X-XSS-Protection" content="1; mode=block" />
<meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Configure environment variables

### Manual Deployment

1. Build the application: `npm run build`
2. Upload the `dist` folder to your web server
3. Configure your web server to serve the SPA correctly

### Server Configuration

For SPA routing, configure your server to serve `index.html` for all routes:

**Nginx**:
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

**Apache**:
```apache
RewriteEngine On
RewriteRule ^(?!.*\.).*$ /index.html [L]
```

## 📈 Performance Optimization

### Build Optimizations

- **Code Splitting**: Vendor and utility chunks separated
- **Tree Shaking**: Unused code elimination
- **Minification**: Terser for JavaScript, CSS optimization
- **Asset Optimization**: Image compression, inline small assets
- **Bundle Analysis**: Analyze bundle size with build:analyze

### Runtime Optimizations

- **Lazy Loading**: Images and components loaded on demand
- **Debouncing**: Form inputs and scroll events
- **Memoization**: React.memo for expensive components
- **Web Vitals**: Core Web Vitals monitoring and optimization

## 🧪 Testing

Currently, the project uses basic linting. To add comprehensive testing:

1. **Unit Tests**: Jest + React Testing Library
2. **E2E Tests**: Playwright or Cypress
3. **Visual Tests**: Chromatic or Percy
4. **Performance Tests**: Lighthouse CI

## 📝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, email contact@milanai.org or create an issue in the repository.

## 🔗 Links

- [Website](https://www.milanai.org)
- [Documentation](https://docs.milanai.org)
- [Support](mailto:contact@milanai.org)
