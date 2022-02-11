import { useEffect, useState } from "react";

const useOrientation = () => {
  const [orientation, setOrientation] = useState(screen.orientation.type);

  useEffect(() => {
    const orientationChangeHandler = () => {
      setOrientation(screen.orientation.type);

      console.log(screen.orientation.type);
    };

    screen.orientation.addEventListener("change", orientationChangeHandler);

    return () => {
      screen.orientation.removeEventListener(
        "change",
        orientationChangeHandler
      );
    };
  }, []);

  return orientation;
};

export default useOrientation;
