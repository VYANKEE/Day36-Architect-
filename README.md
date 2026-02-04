# ⚡ Day 36 : 45 Days Coding Challenge -: System Design Visualizer Pro

![Project Banner](https://img.shields.io/badge/Status-Production%20Ready-success?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-React%20|%20Tailwind%20|%20Framer%20Motion-cyan?style=for-the-badge)


   > **"Don't just read about System Design. Watch it live."**

An interactive, gamified simulation of high-scale distributed systems. This project visualizes invisible concepts like **Load Balancing, Caching (Redis), Database Sharding, and API Latency** through a high-fidelity cyberpunk interface.

🔗 **[LIVE DEMO LINK HERE](https://day36-architect.vercel.app/)**

---


---

## 🚀 Key Features

### 🎮 The Interactive Playground
A fully functional simulation engine where users can:
- **Toggle Components:** Enable/Disable **Auth Layer**, **Redis Cache**, and simulate **Database Failures**.
- **Real-time Packet Flow:** Watch SVG-based data packets travel through the architecture.
- **Latency Simulation:** Experience the speed difference between a **Cache Hit (10ms)** vs **Database Query (200ms)**.

### 🎨 High-Fidelity UI/UX
- **Aesthetic:** Neon glow effects, CRT scanlines, and a 3D moving grid floor.
- **Scrollytelling Pipeline:** A scroll-driven narrative that explains the request lifecycle step-by-step.
- **Responsive Animations:** Built with **Framer Motion** for 60FPS smooth transitions.

### 🧠 Educational Modules
- **Visual Learning:** Decrypts complex backend logic into visual nodes.
- **Live Logs:** A terminal-style log window that displays real-time system status codes (200 OK, 500 ERROR).

---

## 🛠️ Tech Stack

| Domain | Technology | Use Case |
| :--- | :--- | :--- |
| **Frontend** | React (Vite) | Component Architecture |
| **Styling** | Tailwind CSS | Utility-first Design & Layouts |
| **Animation** | Framer Motion | Physics-based micro-interactions |
| **Icons** | Lucide React | SVG Icons |
| **Deployment** | Vercel | CI/CD & Hosting |

---

## 🏗️ Architecture Explained

This project simulates a standard **Web Scale Architecture**:

1.  **Client:** Initiates the JSON request.
2.  **API Gateway / Load Balancer:** The entry point that routes traffic.
3.  **Auth Service:** Simulates JWT verification (adds latency).
4.  **Redis Cache:** Checks for hot data in memory (bypasses DB).
5.  **Database Shard:** The persistent storage layer (simulates disk I/O).

---
