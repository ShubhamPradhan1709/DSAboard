import { useEffect, useState } from "react";

export const lgWidth = 1024;
export const mdWidth = 768;

function useResponsiveScreen() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (width >= 1024) {
    return "lg";
  }

  if (width >= 768) {
    return "md";
  }

  return "sm";
}

export default useResponsiveScreen;
