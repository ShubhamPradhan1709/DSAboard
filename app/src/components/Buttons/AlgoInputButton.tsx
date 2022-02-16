import React, { FC, useState } from "react";

interface IProps {
  title: string;
  onClick: (value: any) => Promise<void>;
}

const AlgoInputButton: FC<IProps> = ({ title, onClick }) => {
  const [searchValue, setSearchValue] = useState(0);

  return (
    <div className="flex items-center justify-between">
      <input
        className="shadow flex-shrink appearance-none w-1/3 border mr-2 py-2 px-3 text-gray-700 rounded-md border-cyan-400 leading-tight focus:outline-none focus:shadow-outline"
        type="string"
        placeholder="Value to Search"
        value={searchValue}
        onChange={(e) => setSearchValue(+e.target.value)}
      />

      <button
        className="my-1 font-semibold flex-auto w-2/3 leading-none text-white py-4 px-10 bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none"
        onClick={() => onClick(searchValue)}
      >
        {title}
      </button>
    </div>
  );
};

export default AlgoInputButton;
