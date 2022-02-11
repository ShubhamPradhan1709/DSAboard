const toggleFullScreen = async (value?: boolean) => {
  const root = document.getElementById("root");

  if (document.fullscreenElement && value !== true) {
    try {
      await document.exitFullscreen();
    } catch (error) {
      console.error(error);
    }
  } else {
    try {
      await root.requestFullscreen({ navigationUI: "hide" });
    } catch (error) {
      console.error(error);
    }
  }
};


export default toggleFullScreen;
