# enyu-sched

![React](https://img.shields.io/badge/React-23272f?logo=react&logoColor=61dafb&style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-23272f?logo=typescript&logoColor=3178c6&style=for-the-badge)
![Vite](https://img.shields.io/badge/Vite-23272f?logo=vite&logoColor=646cff&style=for-the-badge)
![TailwindCSS](https://img.shields.io/badge/Tailwind-23272f?logo=tailwindcss&logoColor=38bdf8&style=for-the-badge)

Generate a visualized weekly schedule table from plain text. Built around one university's student portal schedule format.

> **Note:** Schedule formats may change at any time. This tool may break without notice.

<!-- screenshots soon -->

## Features

- Paste raw schedule text and parse it automatically
- Visual weekly table with time blocks
- Conflict and duplicate detection
- F2F vs online day breakdown
- Unit limit tracking
- Multi-section support
- Export as PNG or copy as plain text

---

## Tech Stack

- **Vite**
- **React**
- **TypeScript**
- **Tailwind CSS v4**
- **Zustand**
- **Iconify**

---

## Development

Clone the repo and install dependencies with [pnpm](https://pnpm.io):

```bash
git clone <this repo>
cd enyu-sched
pnpm install
pnpm run dev
```

Deployment is handled automatically via GitHub Actions on push to `main`.