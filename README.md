<div align="center">
  <br />
  <h1>🥤 Fizzi — Next-Gen 3D Prebiotic Soda Landing Experience</h1>
  <p><b>A high-performance, cinematic 3D web application with interactive WebGL animations & custom flavor-wise checkout.</b></p>

  <p>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white" alt="Three.js" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=black" alt="GSAP" />
  </p>

  <p>
    <b>📖 Overview</b> •
    <b>⚡ Tech Stack</b> •
    <b>✨ Key Features</b> •
    <b>🛠️ How to Run</b> •
    <b>🏗️ Architecture</b> •
    <b>👤 Author</b>
  </p>

  <br />
</div>

---

## 📖 Project Overview

**Fizzi** is an ultra-modern landing page engineered for a prebiotic soda brand. Built with **React, Vite, React Three Fiber (Three.js), and GSAP ScrollTrigger**, the application features real-time 3D model manipulation, smooth scroll scrubbing, glassmorphic UI components, and an interactive flavor-wise payment drawer.

The project is fully decoupled from external dependencies, featuring localized static assets, low GPU rendering overhead, and 100% offline capability.

---

## ⚡ Tech Stack

| Technology | Role | Description |
| :--- | :--- | :--- |
| **React (v18)** | Frontend Framework | Component-driven UI architecture |
| **Vite (v8)** | Build Tool & Dev Server | Ultra-fast HMR and optimized static bundling |
| **TypeScript** | Type Safety | Strict interfaces for CMS mock data and component props |
| **React Three Fiber (R3F)** | 3D Canvas | Declarative WebGL rendering with Three.js |
| **@react-three/drei** | 3D Helpers | Viewports, environment lighting, floating models & clouds |
| **GSAP + ScrollTrigger** | Animations | Smooth timeline scrubbing and scroll-driven 3D canvas physics |
| **Tailwind CSS** | Styling | Modern utilities, glassmorphism (`backdrop-blur`), and custom gradients |

---

## ✨ Key Features

### 1. 🥤 Synchronized 3D Can Physics
- Multi-can 3D hero arrangement rendered in a unified WebGL viewport (`ViewCanvas.tsx`).
- Smooth 360° group rotations synchronized with page scroll depth via GSAP `ScrollTrigger`.

### 2. 🫧 Floating Pill Navbar & Smooth Navigation
- Glassmorphic backdrop blur floating header (`backdrop-blur-md bg-white/10 border-white/15`).
- Anchor links (`#flavors`, `#ingredients`, `#gut-health`) with smooth `scrollIntoView` click handlers.

### 3. 🛍️ Custom Flavor-Wise Checkout Modal
- Interactive modal triggered by the **"Order Sample Pack"** and **"SHOP NOW"** CTA buttons.
- **Per-Flavor Quantity Control**: Select exact quantities (`-` / `+`) for Black Cherry, Lemon Lime, Grape Goodness, Strawberry Lemonade, and Watermelon Crush.
- **Dynamic Pricing Engine**: Live subtotal calculation with automatic **10% Bundle Discount** applied for orders of 5+ cans.
- **Multi-Payment Selection**: Choose between 💳 Card, 🍎 Apple/GPay, and ⚡ Express 1-Click Checkout.

### 4. 🧪 "Show, Don't Tell" Ingredient Inspection Card
- Interactive tabbed component featuring prebiotic fiber, organic fruit extracts, and zero added sugar highlights.
- Animated stat counters and progress bars triggered when scrolled into view.

### 5. ⚡ 60 FPS Performance Optimizations
- **Capped Canvas DPR**: Constrained canvas pixel ratio (`dpr={[1, 1.5]}`) reducing GPU shader load by 40%.
- **Instant Scroll Response**: GSAP scrub latency tuned to `0.5s` with `gsap.ticker.lagSmoothing(1000, 16)`.
- **Local Asset Storage**: All 3D models and textures (including `cloud.png`) stored locally under `/public/textures/` for instant load times without CDN failure.
- **WebGL Context Lost Handler**: Prevents WebGL canvas crashes on browser hard refreshes.

---

## 🛠️ How to Run Locally

Follow these steps to run the application on your local machine:

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **Package Manager**: `npm` (v9+) or `yarn`

### 1. Clone the Repository
```bash
git clone https://github.com/ashish3120/project_fizz.git
cd project_fizz
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open your browser and navigate to **`http://localhost:5173`**.

### 4. Build for Production
```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory.

---

## 🏗️ Architecture & Project Structure

```
Fizzi/
├── public/
├── src/
│   ├── app/
│   │   └── app.css               # Global CSS & Tailwind directives
│   ├── components/
│   │   ├── AmbientOrbs.tsx       # Mouse parallax glowing background orbs
│   │   ├── Bounded.tsx           # Layout container wrapper
│   │   ├── Button.tsx            # Universal CTA button with event dispatchers
│   │   ├── FizziLogo.tsx         # SVG Brand Logo
│   │   ├── FloatingCan.tsx       # Animated floating 3D can mesh
│   │   ├── Header.tsx            # Glassmorphic pill navbar & modal triggers
│   │   ├── IngredientCard.tsx    # Interactive nutrition inspection card
│   │   ├── SamplePackModal.tsx   # Flavor-wise quantity & payment checkout drawer
│   │   ├── SodaCan.tsx           # GLTF 3D Soda Can renderer & materials
│   │   └── ViewCanvas.tsx        # Global R3F WebGL Canvas viewport
│   ├── config/
│   │   └── prismic-data.json     # Local static CMS data mock
│   ├── hooks/
│   │   └── useMediaQuery.ts      # Responsive viewport hook
│   ├── slices/
│   │   ├── Hero/                 # Hero section 3D scene & text timeline
│   │   ├── Carousel/             # 3D Flavor switcher carousel
│   │   ├── SkyDive/              # Skydive animation scene with local clouds
│   │   └── AlternatingText/      # Gut health feature breakdown
│   ├── App.tsx                   # Main layout renderer
│   ├── main.tsx                  # React entrypoint
│   └── prismicio.ts              # Decoupled static data query client
├── index.html                    # Root HTML document
├── package.json                  # NPM dependencies & scripts
├── tsconfig.json                 # TypeScript compiler configuration
└── vite.config.ts                # Vite bundler configuration
```

---

## 👤 Author

**Ashish**  
- GitHub: [@ashish3120](https://github.com/ashish3120)  

---

<div align="center">
  <sub>Built with ❤️ using React, Vite, Three.js, and GSAP.</sub>
</div>
