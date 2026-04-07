# Handsala Web

The official web platform for Handsala, built with Next.js.

## Hosting

The site is hosted on [Sevalla](https://sevalla.com) (static site hosting) with [Cloudflare](https://cloudflare.com) as the DNS/proxy layer.

- **Sevalla** auto-deploys from the `palette` branch on push, running `npm run build` and serving the `out/` directory.
- **Cloudflare** provides DNS, CDN caching, and edge features. Note: Cloudflare Rocket Loader is active and must be kept disabled for Flutter scripts via `data-cfasync="false"` attributes in `public/palette/play/index.html`.

### Palette (Flutter Web App)

The Palette puzzle game is a Flutter web app deployed as static files under `public/palette/play/`. To update it:

1. In the `palette` repo, run `./deploy_to_nextjs.sh ../handsala-web`
2. Commit and push the updated files in this repo
3. Sevalla auto-deploys on push to the configured branch

See the [palette repo](https://github.com/JacobJNilsson/palette) for build details.

## Setup

### Prerequisites

- Node.js (v20 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/JacobJNilsson/handsala-web.git
   cd handsala-web
   ```

2. Install dependencies

   ```bash
   npm ci
   ```

## Development

Run the development server with:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Building for Production

To build the application for production:

```bash
npm run build
```

The output is a fully static export in the `out/` directory. To preview locally:

```bash
npx serve@latest out
```
