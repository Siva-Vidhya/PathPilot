<div align="center">

# 🛣️ PathPilot

### AI-Powered Last-Mile Decision Engine

*Intelligent route optimization for the modern delivery ecosystem*

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Leaflet](https://img.shields.io/badge/Leaflet-Maps-199900?style=for-the-badge&logo=leaflet&logoColor=white)](https://leafletjs.com/)

</div>

---

## 📖 Description

**PathPilot** is an AI-powered Last-Mile Decision Engine that helps delivery agents optimize routes, predict customer availability, and make intelligent delivery decisions in real-time. Built for the Chennai, India metropolitan region, PathPilot transforms raw delivery data into actionable intelligence — eliminating inefficiencies and maximizing fleet performance.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🧭 **Smart Order Sequencing** | AI-driven spatial clustering to determine the optimal delivery order, minimizing total distance and time. |
| 🔄 **Real-Time Adaptive Routing** | Live route recalculation that responds instantly to traffic conditions (Normal / Heavy / Jam). |
| ❌ **Failed Delivery Decision Engine** | Automated resolution workflows when a delivery attempt fails — reassign, reschedule, or redirect. |
| 👤 **Customer Availability Prediction** | ML-driven scoring to predict the probability a customer is home, ranked before dispatch. |
| 📍 **Smart Delivery Clustering** | Geographical grouping of delivery stops into efficient micro-clusters around the Chennai hub. |
| 📱 **Automated Smart Communication** | Simulated customer notification pipeline (SMS/push) with delivery/read receipts tracking. |
| 🧠 **Learning Feedback System** | Continuous model accuracy improvement based on outcomes (delivered, failed, re-routed). |
| 🤝 **Multi-Agent Collaboration** | Intelligent workload balancing and live re-assignment of orders across the active driver fleet. |

---

## 🗺️ Live Map Intelligence

The spatial map view provides:
- **Numbered Sequence Markers** — See your delivery order at a glance (1 → 2 → 3...)
- **Before vs. After Comparison** — Toggle between the raw trajectory and the AI-optimized sequence
- **Traffic Overlay** — Route color changes dynamically based on live traffic conditions
- **Dark Mode Cartography** — High-fidelity map tiles for a premium operational experience

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18 + TypeScript + Vite |
| **Animations** | Framer Motion |
| **Maps** | Leaflet.js + React-Leaflet |
| **Icons** | Lucide React |
| **Backend** | Node.js |
| **Database** | Supabase |
| **AI/ML** | Python (Simulation Engine) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18.x
- npm ≥ 9.x

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Siva-Vidhya/PathPilot.git
cd PathPilot

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

---

## 📁 Project Structure

```
PathPilot/
├── src/
│   ├── components/       # Reusable UI components (Sidebar, Toast, Layout...)
│   ├── pages/            # Full page views (Dashboard, Map, Orders, Insights...)
│   ├── hooks/            # Custom React hooks (useSimulation)
│   ├── data/             # Mock data & initial state
│   ├── types/            # TypeScript type definitions
│   └── main.tsx          # Application entry point
├── public/               # Static assets
├── index.html
├── vite.config.ts
└── package.json
```

---

## 🌍 Region

> Currently configured for the **Chennai, Tamil Nadu** metropolitan hub.  
> Hub Coordinates: `13.0827° N, 80.2707° E`

---

## 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">
  <sub>Built with ❤️ for smarter last-mile logistics</sub>
</div>
