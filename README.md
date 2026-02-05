# 🍷 La Tavola — L'Art de Vivre

An elegant restaurant website built with **Angular 21** and **Tailwind CSS**, featuring a refined UI with smooth animations, lazy-loaded pages, and a responsive design.

---

## ✨ Features

- **Home** — Immersive landing page with splash screen and scroll-driven animations
- **Menu** — Dynamic menu with category filtering
- **Gallery** — Visual showcase of dishes and ambiance
- **Reservation** — Online booking form
- **Responsive Design** — Fully optimized for mobile, tablet, and desktop
- **Lazy Loading** — Route-level code splitting for fast initial load

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Angular 21 (Standalone Components) |
| Styling | Tailwind CSS |
| Language | TypeScript 5.8 |
| Build Tool | Vite |
| Routing | Angular Router (lazy-loaded) |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/la-tavola.git
cd la-tavola

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

The app will be served at `http://localhost:4200`.

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## 📁 Project Structure

```
src/
├── app.component.ts          # Root component with navigation & splash screen
├── app.routes.ts             # Route definitions (lazy-loaded)
├── components/ui/            # Reusable UI components (Button, SectionTitle)
├── directives/               # Custom directives (scroll appear)
├── pages/
│   ├── home/                 # Home page
│   ├── menu/                 # Menu page
│   ├── gallery/              # Gallery page
│   └── reservation/          # Reservation page
└── services/                 # Data services (menu items)
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
