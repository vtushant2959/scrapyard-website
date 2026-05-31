"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const trailX = useMotionValue(-100);
  const trailY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const trailSpringConfig = { damping: 35, stiffness: 200, mass: 0.8 };

  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);
  const trailSpringX = useSpring(trailX, trailSpringConfig);
  const trailSpringY = useSpring(trailY, trailSpringConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isOnButton, setIsOnButton] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setTimeout(() => {
        trailX.set(e.clientX);
        trailY.set(e.clientY);
      }, 80);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor-hover]") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest("select");
      setIsHovering(!!isInteractive);
      setIsOnButton(!!(target.closest("button") || target.closest("a")));
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mouseover", onMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseover", onMouseOver);
    };
  }, [cursorX, cursorY, trailX, trailY]);

  return (
    <>
      {/* Trail circle */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: trailSpringX,
          y: trailSpringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full border"
          animate={{
            width: isHovering ? 48 : 36,
            height: isHovering ? 48 : 36,
            borderColor: isOnButton
              ? "rgba(44,235,136,0.8)"
              : "rgba(44,235,136,0.3)",
            backgroundColor: isClicking
              ? "rgba(44,235,136,0.1)"
              : "transparent",
            boxShadow: isHovering
              ? "0 0 20px rgba(44,235,136,0.4)"
              : "0 0 8px rgba(44,235,136,0.2)",
          }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        />
      </motion.div>

      {/* Main dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full bg-accent-glow"
          animate={{
            width: isClicking ? 6 : 8,
            height: isClicking ? 6 : 8,
            opacity: isHovering ? 0 : 1,
            boxShadow: "0 0 8px rgba(44,235,136,0.8)",
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>
    </>
  );
}
