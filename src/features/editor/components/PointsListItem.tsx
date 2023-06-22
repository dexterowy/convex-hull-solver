import { MdDelete } from "react-icons/md";
import { Point } from "../../../lib/ConvexHullAlgorithm";
import { PointForm } from "../../../components/PointForm";

type Props = {
  point: Point;
  onPointDelete: (point: Point) => void;
  onPointSelect: () => void;
  pointIsSelected: boolean;
  onPointUpdate: (point: Point) => void;
};

const PointsListItem = ({ point, onPointDelete, onPointSelect, pointIsSelected, onPointUpdate }: Props) => {
  return pointIsSelected ?  <PointForm point={point} onSave={onPointUpdate} /> : (
    <li
      className="p-2 my-1 w-full hover:bg-white/5 hover:cursor-pointer"
      onClick={onPointSelect}
    >
      <div className="flex flex-row space-x-4 ">
        <div>
          <span className="font-bold pr-2">X:</span>
          {point.x}
        </div>
        <div>
          <span className="font-extrabold pr-2">Y:</span>
          {point.y}
        </div>
        <div className="flex justify-end flex-grow">
          <button
            className="hover:bg-white/20 hover:cursor-pointer hover:rounded-full p-1"
            onClick={(e) => {
              e.stopPropagation();
              onPointDelete(point);
            }}
          >
            <MdDelete size="1.5rem" />
          </button>
        </div>
      </div>
    </li>
  );
};
export default PointsListItem;
