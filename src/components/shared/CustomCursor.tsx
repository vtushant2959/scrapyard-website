"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Ring follows with soft spring lag
  const ringX = useSpring(mouseX, { damping: 22, stiffness: 180, mass: 0.6 });
  const ringY = useSpring(mouseY, { damping: 22, stiffness: 180, mass: 0.6 });

  const [state, setState] = useState<"default" | "hover" | "click" | "text">("default");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const down = () => setState("click");
    const up   = () => setState((s) => (s === "click" ? "default" : s));

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("button") || t.closest("a")) { setState("hover"); return; }
      if (t.closest("input") || t.closest("textarea") || t.closest("select")) { setState("text"); return; }
      setState("default");
    };

    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup",   up);
    window.addEventListener("mouseover", over);
    document.documentElement.addEventListener("mouseleave", leave);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup",   up);
      window.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [mouseX, mouseY, visible]);

  // Hide on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) return null;

  return (
    <>
      {/* Outer ring — lags behind cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? 1 : 0 }}
      >
        <motion.div
          className="rounded-full"
          animate={{
            width:  state === "hover" ? 40 : state === "click" ? 28 : 32,
            height: state === "hover" ? 40 : state === "click" ? 28 : 32,
            borderWidth: state === "hover" ? 1.5 : 1,
            borderColor:
              state === "hover"  ? "rgba(44,235,136,0.9)" :
              state === "click"  ? "rgba(44,235,136,0.6)" :
              state === "text"   ? "rgba(200,205,213,0.5)" :
                                   "rgba(44,235,136,0.35)",
            borderStyle: "solid",
            backgroundColor:
              state === "hover" ? "rgba(44,235,136,0.06)" :
              state === "click" ? "rgba(44,235,136,0.12)" :
                                  "transparent",
            boxShadow:
              state === "hover" ? "0 0 16px rgba(44,235,136,0.25)" :
              state === "click" ? "0 0 10px rgba(44,235,136,0.3)" :
                                  "none",
          }}
          transition={{ type: "spring", damping: 18, stiffness: 260, mass: 0.4 }}
        />
      </motion.div>

      {/* Inner dot — follows cursor exactly */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? 1 : 0 }}
      >
        <motion.div
          className="rounded-full"
          animate={{
            width:  state === "hover" ? 5 : state === "click" ? 3 : 4,
            height: state === "hover" ? 5 : state === "click" ? 3 : 4,
            backgroundColor:
              state === "text" ? "rgba(200,205,213,0.9)" : "#2CEB88",
            opacity: state === "hover" ? 0.7 : 1,
            boxShadow:
              state === "hover" ? "0 0 6px rgba(44,235,136,0.9)" :
              state === "click" ? "0 0 4px rgba(44,235,136,0.7)" :
                                  "0 0 5px rgba(44,235,136,0.6)",
          }}
          transition={{ duration: 0.12 }}
        />
      </motion.div>
    </>
  );
}
