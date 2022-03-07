import { useContext } from "react";
import PlayContext from "../contexts/playContext";

function usePlay() {
  const [play, setPlay] = useContext(PlayContext);

  const doAnimation = async (func: () => Promise<void>) => {
    if (play === false) {
      setPlay(true);
      await func();
      setPlay(false);
    }
  };

  return doAnimation;
}

export default usePlay;
