import React, { FC, useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Loading from "../../components/Loading";
import SettingsModal from "../../components/Modal/SettingsModal";
import PlayContext from "../../contexts/playContext";
import useSlider from "../../hooks/useSlider";
import { isScreenMd, isScreenSm } from "../../utils/screenSize";

interface IProps {
  title: string;
}

const Panel: FC = ({ children }) => {
  const [length, Slider] = useSlider();
  const play = useState(false);

  return (
    <PlayContext.Provider value={play}>
      <div
        className="flex flex-col flex-shrink-0 md:flex-row bg-white rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none"
        style={{
          height: isScreenSm() ? `${length}px` : "100%",
          width: isScreenMd() ? `${length}px` : "100%",
        }}
      >
        <Slider />

        {children}
      </div>
    </PlayContext.Provider>
  );
};

export const PanelContent: FC<IProps> = ({ title, children }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [play] = useContext(PlayContext);

  const { pathname } = useLocation();

  return (
    <div className="flex-auto overflow-auto">
      <div
        className={`
            text-dark-secondary 
            flex pt-0 p-2 md:pt-2
            bg-gradient-to-b md:bg-gradient-to-r from-white to-slate-200
            justify-between
        `}
      >
        <button className="material-icons">
          <Link to="/">{pathname === "/" ? "" : "arrow_back"}</Link>
        </button>

        <h1 className="text-xl">{title}</h1>

        <button
          className="material-icons"
          onClick={() => setShowSettings(!showSettings)}
        >
          settings
        </button>
      </div>

      <hr />

      <SettingsModal isOpen={showSettings} setIsOpen={setShowSettings} />

      {play ? <Loading /> : <div className="p-3">{children}</div>}
    </div>
  );
};

export default Panel;
