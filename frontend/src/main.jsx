import React from "react";

import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";

import "./Style/Global.css";

import "lenis/dist/lenis.css";

import Lenis from "lenis";

import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

// ==========================================
// REGISTER GSAP
// ==========================================

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// LENIS SMOOTH SCROLL
// ==========================================

const lenis = new Lenis({
  duration: 1.2,

  smoothWheel: true,

  autoRaf: false,
});

// IMPORTANT:
// Make Lenis available throughout the app

window.lenis = lenis;

// ==========================================
// CONNECT LENIS WITH GSAP
// ==========================================

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// ==========================================
// REACT APP
// ==========================================

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
