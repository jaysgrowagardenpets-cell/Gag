# Welcome to React Router!

A modern, production-ready template for building full-stack React applications using React Router.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.

## Payments: PayPal and Cash App

Set these environment variables in a `.env` file at the project root (Vite):

```
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
VITE_CASHAPP_TAG=your_cashtag_without_dollar
```

- VITE_PAYPAL_CLIENT_ID: Create a PayPal REST app and copy the Client ID.
- VITE_CASHAPP_TAG: Your Cash App $Cashtag without the `$`, e.g. `johnsmith`.

Usage:

- PayPal renders native buttons via the PayPal JS SDK. Successful payments will show an alert in this demo.
- Cash App button opens your Cash App profile in a new tab. Users complete payment manually; confirm the order off-platform.

Security notes:

- For production, create orders on your server and verify webhooks (PayPal `CHECKOUT.ORDER.APPROVED`, capture details). The current implementation is client-only for simplicity.
