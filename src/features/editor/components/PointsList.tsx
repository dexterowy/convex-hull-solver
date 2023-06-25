import { useMemo } from "react";
import { PointForm } from "../../../components/PointForm";
import { Point } from "../../../lib/ConvexHullAlgorithm";
import PointsListItem from "./PointsListItem";
import { MdAdd } from "react-icons/md";

type Props = {
  points: Point[];
  hull: Point[];
  onPointDelete: (point: Point) => void;
  onStartAddingPoint: () => void;
  isAddingPoint: boolean;
  onStartEditingPoint: (point: Point) => void;
  selectedPoint: Point | null;
  onPointAdd: (point: Point) => void;
  onPointUpdate: (point: Point) => void;
};

const PointsList = (props: Props) => {
  const recognizedHull = useMemo(() => {
    switch (props.hull.length - 1) {
      case 0:
      case -1:
        return "No points";
      case 1:
        return "Hull is a point";
      case 2:
        return "Hull is a line";
      case 3:
        return "Hull is a triangle";
      case 4:
        return "Hull is a quadrangle";
      default:
        return `Hull is a ${props.hull.length - 1}-gon`;
    }
  }, [props.hull.length]);

  return (
    <aside className="px-2 w-[300px] bg-slate-50/5 flex flex-col">
      <nav className="p-4 shadow-slate-200">
        <h1 className="text-2xl">Convex hull solver</h1>
      </nav>
      <h2 className=" p-2 text-xl font-extrabold">Points</h2>

      <div className="h-[1px] w-full bg-slate-400 my-2"></div>
      <ul className="">
        {props.points.map((point, index) => (
          <PointsListItem
            key={index}
            point={point}
            onPointDelete={props.onPointDelete}
            onPointSelect={() => props.onStartEditingPoint(point)}
            pointIsSelected={props.selectedPoint === point}
            onPointUpdate={props.onPointUpdate}
          />
        ))}

        {props.isAddingPoint ? (
          <PointForm point={null} onSave={props.onPointAdd} />
        ) : (
          <li
            className="p-2 my-1 bg-slate-50/10 hover:bg-slate-50/20 hover:cursor-pointer"
            onClick={props.onStartAddingPoint}
          >
            <div className="flex flex-row space-x-4 items-center ">
              <MdAdd size="1.5rem" />
              <span>Add new point</span>
            </div>
          </li>
        )}
      </ul>
      <div className="flex-grow" />
      <div className="w-full border-slate-400 border-2 rounded-sm p-4 text-center font-bold ">
        <span className=" ">{recognizedHull}</span>
        <div>
          {props.hull.slice(0, -1).map((point, index) => (
            <span key={index} className="text-blue-500">
              {` (${point.x}, ${point.y})`}
            </span>
          ))}
        </div>
      </div>

      <div className="flex-grow" />
      <footer className="py-2">
        <h3 className="text-sm">
          Created by: <br />
          Hubert Olszewski <br /> Mateusz Szczotarz <br />
          Damian Rożek
        </h3>
      </footer>
    </aside>
  );
};
export default PointsList;
