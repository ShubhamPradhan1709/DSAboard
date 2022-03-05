import { FC, useLayoutEffect } from 'react';
import board from './Board';

const Canvas: FC = () => {

  useLayoutEffect(() => {
    const main = document.getElementsByTagName('main')[0];
    main.appendChild(board.canvas);
  }, []);

  return null;
}

export default Canvas;

