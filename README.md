# Pizza-Srore - Advanced E-commerce React Application
A feature-rich, high-performance pizza ordering platform designed for speed and seamless user experience. This project showcases enterprise-level state management and real-time interaction logic.

[LiveDemo](https://pizza-store-lovat-six.vercel.app/)

 ## 🚀 Project Overview
Pizza-Store is a modern Single Page Application (SPA) that mimics a real-world food delivery service. The project focuses on handling complex shopping cart operations, asynchronous data fetching from a remote API, and enhancing UX with browser-level Geolocation.

## 🛠 Tech Stack
Frontend Framework: React (Vite).
Styling: Tailwind CSS (Utility-first, responsive design).
State Management: Redux Toolkit (Centralized store for cart and user data).
Routing: React Router (Dynamic routing and navigation).
Data Handling: MockAPI (RESTful API simulation).
Web APIs: Geolocation API (User address detection).
Deployment: GitHub + Vercel (CI/CD).

## 💡 Key Engineering Highlights
State Management (Redux Toolkit): Orchestrated a centralized data store to manage the shopping cart, user profile, and application-wide UI states. I implemented "Slices" to handle modular state logic, ensuring that cart updates (adding/removing/calculating totals) are predictable and efficient.

Cart Logic & Dynamic Pricing: Developed a robust cart engine capable of handling independent item increments/decrements. I implemented pure functions to calculate total quantities and prices in real-time, ensuring zero-latency feedback for the user.

Geolocation & UX Optimization: Integrated the Browser Geolocation API to allow users to automatically fill in their delivery address. This feature demonstrates an understanding of utilizing Web APIs to reduce user friction during the checkout process.

Asynchronous Data & API Integration: Managed remote data fetching from MockAPI using modern async/await patterns. I implemented order searching functionality by Order ID, demonstrating proficiency in handling dynamic URL parameters and remote data synchronization.

Rapid UI Development with Tailwind CSS: Leveraged Tailwind CSS to build a fully responsive, modern interface. This approach allowed for fast prototyping while maintaining a clean, maintainable CSS architecture without the overhead of traditional CSS files.
