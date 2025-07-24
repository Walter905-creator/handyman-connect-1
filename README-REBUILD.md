# Fixlo App

Fixlo connects customers with local service professionals.

## Setup

1. Clone the repository:
```bash
git clone https://github.com/Walter905-creator/fixloapp.git
cd fixloapp
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Build for production:
```bash
npm run build
```

## Features

- **Modern React App** - Built with React 18 and React Router
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Advanced UI Components** - Including sticky CTA and exit intent modal
- **Service Listings** - 9 professional services (Plumbing, Electrical, etc.)
- **Contact Forms** - Subscribe and contact pages with form handling
- **Responsive Design** - Works on desktop and mobile devices

## Project Structure

```
src/
├── components/
│   ├── Header.js           # Navigation header
│   ├── StickyCTA.js        # Sticky call-to-action button
│   └── ExitIntentModal.js  # Modal triggered on exit intent
├── pages/
│   ├── Home.js             # Landing page with services
│   ├── Subscribe.js        # Subscription form
│   └── Contact.js          # Contact information and form
├── App.js                  # Main app component with routing
├── index.js                # React app entry point
└── index.css               # Tailwind CSS imports
```

## Deployment

The app is configured for Vercel deployment with automatic builds and API proxying to the backend at `https://fixlo-backend.onrender.com`.

## Technologies Used

- React 18
- React Router DOM
- Tailwind CSS
- PostCSS
- Autoprefixer