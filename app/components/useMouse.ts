import { useMotionValue } from "framer-motion";
import { useEffect } from "react";

export default function useMouse() {
  /* Used  useMotionValue instead of useState to update the mouse potion because useState rerenders when it moves so since i am using FM it is better for performance that I use useMotionValue  */
  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const mouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    mouse.x.set(clientX);
    mouse.y.set(clientY);
  };

  useEffect(() => {
    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  return mouse;
}
