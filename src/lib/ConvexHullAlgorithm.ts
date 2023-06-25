export interface Point {
  x: number;
  y: number;
}

export class ConvexHullAlgorithm {
  private points: Point[];

  constructor(_points: Point[]) {
    this.points = _points;
  }

  private POINT_COMPARATOR(a: Point, b: Point): number {
    if (a.x < b.x) return -1;
    else if (a.x > b.x) return +1;
    else if (a.y < b.y) return -1;
    else if (a.y > b.y) return +1;
    else return 0;
  }

  private makeHullPresorted(points: Point[]): Point[] {
    if (points.length <= 1) return points.slice();

    let upperHull: Point[] = [];
    for (let i = 0; i < points.length; i++) {
      const p: Point = points[i];
      while (upperHull.length >= 2) {
        const q: Point = upperHull[upperHull.length - 1];
        const r: Point = upperHull[upperHull.length - 2];
        if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x))
          upperHull.pop();
        else break;
      }
      upperHull.push(p);
    }
    upperHull.pop();

    let lowerHull: Point[] = [];
    for (let i = points.length - 1; i >= 0; i--) {
      const p: Point = points[i];
      while (lowerHull.length >= 2) {
        const q: Point = lowerHull[lowerHull.length - 1];
        const r: Point = lowerHull[lowerHull.length - 2];
        // 
        if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x))
          lowerHull.pop();
        else break;
      }
      lowerHull.push(p);
    }
    lowerHull.pop();

    if (
      upperHull.length === 1 &&
      lowerHull.length === 1 &&
      upperHull[0].x === lowerHull[0].x &&
      upperHull[0].y === lowerHull[0].y
    )
      return upperHull;
    else return upperHull.concat(lowerHull);
  }

  private makeHull(points: Point[]): Point[] {
    let newPoints: Point[] = points.slice();
    newPoints.sort(this.POINT_COMPARATOR);
    return this.makeHullPresorted(newPoints);
  }

  private getResultInterpretation(convexHullPoints: Point[]): string {
    const numberOfPoints = convexHullPoints.length;
    const pointsToDisplay = convexHullPoints.map(
      (point) => `(${point.x}, ${point.y})`
    );

    if (numberOfPoints === 0) {
      return `Otoczka wypukła nie istnieje`;
    } else if (numberOfPoints === 1) {
      return `Otoczka wypukła to pojedynczy punkt: ${pointsToDisplay.toString()}`;
    } else if (numberOfPoints === 2) {
      return `Otoczka wypukła to odcinek:: ${pointsToDisplay.toString()}`;
    } else if (numberOfPoints === 3) {
      return `Otoczka wypukła to trójkąt: ${pointsToDisplay.toString()}`;
    } else {
      return `Otoczka wypukła to czworokąt: ${pointsToDisplay.toString()}`;
    }
  }

  public execute() {
    const convexHull = this.makeHull(this.points);
    const interpretatedResult = this.getResultInterpretation(convexHull);
    console.log(interpretatedResult);
    return convexHull;
  }
}
