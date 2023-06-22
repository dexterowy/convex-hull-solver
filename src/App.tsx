import { ConvexHullAlgorithm, Point } from "./lib/ConvexHullAlgorithm";

import "./index.css";
import { useMemo, useState } from "react";
import PointsList from "./features/editor/components/PointsList";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";

const initialPoints: Point[] = [
  { x: -42, y: 5 },
  { x: 0, y: 9 },
  { x: -1, y: 3 },
  { x: 1, y: 1 },
];

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

function App() {
  const [points, setPoints] = useState<Point[]>(initialPoints);

  const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);
  const [isAddingPoint, setIsAddingPoint] = useState(false);

  const convexHullPoints = useMemo(() => {
    const convexHullAlgorithm = new ConvexHullAlgorithm(points);
    const hullPoints = convexHullAlgorithm.execute();
    return [...hullPoints, hullPoints[0]] as Point[];
  }, [points]);

  const handleDeletePoint = (point: Point) => {
    setPoints((prevPoints) => prevPoints.filter((p) => p !== point));
  };

  const handleAddPoint = (point: Point) => {
    setPoints(
      (prevPoints) => [...prevPoints, { x: point.x, y: point.y }] as Point[]
    );
    setIsAddingPoint(false);
  };

  const handleUpdatePoint = (point: Point) => {
    setPoints((prevPoints) =>
      prevPoints.map((p) => (p === selectedPoint ? point : p))
    );
    setSelectedPoint(null);
  };

  return (
    <div className="min-h-[300px] flex flex-col bg-slate-700 text-slate-200">
      <div className="flex-grow flex flex-row">
        <main className="flex flex-col flex-grow">
          <div className="max-h-screen flex flex-row justify-center p-8">
            <Scatter
              options={{
                aspectRatio: 1,
                color: "#fff",
                plugins: {
                  legend: {
                    labels: {
                      font: {
                        size: 24,
                      },
                    },
                  },
                },
                scales: {
                  x: {
                    grid: {
                      color: "#fff",
                    },
                    // min,
                    title: {
                      color: "#fff",
                    },
                  },
                  y: {
                    grid: {
                      color: "#fff",
                    },
                  },
                },
              }}
              data={{
                datasets: [
                  {
                    label: "Base points",
                    data: points,
                    borderColor: "#36A2EB",
                    backgroundColor: "#9BD0F5",
                    pointRadius: 7,
                  },
                  {
                    label: "Convex hull",
                    data: convexHullPoints,
                    showLine: true,
                    borderColor: "red",
                    backgroundColor: "lightcoral",
                    pointRadius: 10,
                  },
                ],
              }}
            />
          </div>
        </main>
        <PointsList
          points={points}
          hull={convexHullPoints}
          selectedPoint={selectedPoint}
          onPointDelete={handleDeletePoint}
          isAddingPoint={isAddingPoint}
          onStartAddingPoint={() => setIsAddingPoint(true)}
          onStartEditingPoint={setSelectedPoint}
          onPointAdd={handleAddPoint}
          onPointUpdate={handleUpdatePoint}
        />
      </div>
    </div>
  );
}

export default App;
