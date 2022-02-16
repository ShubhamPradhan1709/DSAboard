import { useState } from "react";

const useFullScreen = (): [boolean, () => Promise<void>] => {
  const [fullScreen, setFullScreen] = useState(false);

  const root = document.getElementById("root");

  const toggle = async () => {
    if (fullScreen) {
      try {
        await document.exitFullscreen();
        setFullScreen(false);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await root.requestFullscreen({ navigationUI: "hide" });
        setFullScreen(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return [fullScreen, toggle];
};

export default useFullScreen;
