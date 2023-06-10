import { ConvexHullAlgorithm, Point } from "./lib/ConvexHullAlgorithm";

function App() {
  const points: Point[] = [
    { x: -2, y: 5 },
    { x: 0, y: 9 },
    { x: 2, y: 3 },
    { x: 1, y: 1 }
  ];

  const convexHullAlgorithm = new ConvexHullAlgorithm(points);
  convexHullAlgorithm.execute();

  return (
    <div className="App">
      CONVEX-HULL-SOLVER
    </div>
  );
}

export default App;
