# Abhishek Portfolio — React Upgrade

This repository contains a React (Vite) conversion of the original static portfolio. The React version preserves all original text, images, and the color palette while adding smooth, GPU-accelerated animations (Framer Motion) and a subtle cursor-reactive background.

Quick start

1. Install dependencies:

   npm install

2. Run the dev server:

   npm run dev

Notes
- If `abhi.jpg` doesn't show up, move the file into the `public/` folder so it is served as `/abhi.jpg`.
- The app uses Framer Motion for all animations. No external scripts or jQuery are used.

Files added
- `package.json`, `vite.config.js` — Vite + React setup
- `public/index.html` — preserved meta + icon links
- `src/` — React source files and components

Accessibility & perf
- Focus outlines added for keyboard users.
- Framer Motion `whileInView` uses `viewport: { once: true }` to trigger animations only once.
# Abhishek-Portfolio