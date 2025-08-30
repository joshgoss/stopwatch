# Stopwatch

A sleek, responsive stopwatch web app with lap tracking and digital-style rolling digits.  
Built with Vite, vanilla JavaScript (with JSDoc type hints), and modern CSS.

---

## Features

- Start, stop, reset stopwatch  
- Lap recording with animated lap list  
- Digital rolling digit display  
- Responsive design (mobile & desktop)  
- Accessible keyboard navigation  
- Prettier formatting & TypeScript type checking  

---

## Tech Stack

- **Vite** – fast dev server and bundler  
- **JavaScript** with JSDoc type hints  
- **TypeScript** – type checking only  
- **Prettier** – code formatting  
- **CSS** – custom styles with responsive grid/flexbox  

---

## Getting Started

### Install dependencies
```bash
npm install
```
or
```bash
pnpm install
```
or
```bash
yarn install
```

### Run in development
```bash
npm run dev
```

### Build for production
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

### Type-check the project
```bash
npm run typecheck
```

---

## Project Structure

```
stopwatch/
├── index.html                 — app HTML shell
├── package.json               — scripts and dependencies
├── package-lock.json          — lockfile
├── tsconfig.json              — type-checking configuration
├── vite.config.js             — Vite config
│
├── public/                    — static assets served at /
│   ├── favicon.ico            — favicon (ICO)
│   ├── favicon-16x16.png      — favicon 16×16
│   ├── favicon-32x32.png      — favicon 32×32
│   └── logo.png               — app logo
│
└── src/                       — application source
    ├── main.js                — app entry point
    ├── controller.js          — event wiring and control flow
    ├── models.js              — stopwatch state and timing
    ├── views.js               — UI rendering
    ├── utils.js               — utilities
    ├── types.js               — shared JSDoc typedefs
    └── style.css              — styles
```

---

## License

ISC
