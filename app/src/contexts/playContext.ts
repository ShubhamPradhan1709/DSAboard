import { createContext } from "react";

type T = [boolean, React.Dispatch<React.SetStateAction<boolean>>];

const PlayContext = createContext<T>([false, () => {}]);

export default PlayContext;
