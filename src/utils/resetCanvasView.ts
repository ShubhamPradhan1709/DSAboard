const resetCanvasView = () => {
  const canvasContainer = document.getElementById("canvas-container");

  canvasContainer.scrollLeft = 0;
  canvasContainer.scrollTop = 0;
};

export default resetCanvasView;
