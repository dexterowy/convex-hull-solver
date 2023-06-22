import { Point } from "chart.js";
import { useState } from "react";

type Props = {
  point: Point | null;
  onSave: (point: Point) => void;
};

export const PointForm = (props: Props) => {
  const [x, setX] = useState(props.point?.x ?? "");
  const [y, setY] = useState(props.point?.y ?? "");

  return (
    <div className="flex flex-col my-4 items-center bg-slate-300/10 py-2">
      <div className="flex flex-row space-x-4 w-full justify-around">
        <div className="flex flex-col">
          <span className="font-bold pr-2">X:</span>
          <input
            value={x}
            className="max-w-[100px] text-black p-1"
            onChange={(e) => setX(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <span className="font-extrabold pr-2">Y:</span>
          <input
            value={y}
            className="max-w-[100px] text-black p-1"
            onChange={(e) => setY(e.target.value)}
          />
        </div>
      </div>
      <button
        className="p-2 my-2 bg-slate-50/10 hover:bg-slate-50/20 hover:cursor-pointer w-full"
        onClick={() => {
          try {
            if (!x || !y) throw new Error("Invalid input");
            if (isNaN(Number(x)) || isNaN(Number(y)))
              throw new Error("Invalid input");
            props.onSave({
              x: Number(x),
              y: Number(y),
            });
          } catch (err) {
            alert("Invalid input");
          }
        }}
      >
        SAVE
      </button>
    </div>
  );
};
