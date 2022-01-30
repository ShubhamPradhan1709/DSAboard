import { useEffect, useState } from "react";

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
