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
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.js
│
├── public/
│   ├── favicon.ico
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   └── logo.png
│
└── src/
    ├── main.js
    ├── controller.js
    ├── models.js
    ├── views.js
    ├── utils.js
    ├── types.js
    └── style.css
```

---

## License

ISC
