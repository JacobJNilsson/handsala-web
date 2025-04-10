# Handsala Web

The official web platform for Handsala, built with Next.js.

## Setup

### Prerequisites

- Node.js (v20 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/handsala-web.git
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

To start the production server:

```bash
npx serve@latest out
```

## Docker

This project includes a Dockerfile for containerized deployment:

1. Build the Docker image

   ```bash
   docker build -t handsala-web .
   ```
2. Run the container

   ```bash
   docker run -p 3000:3000 handsala-web
   ```

Access the application at [http://localhost:3000](http://localhost:3000).
