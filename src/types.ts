export interface SelectionObject {
  width: number;
  height: number;
  index: number;
  hidden: boolean;
  highlighted: boolean;
  // Starting position
  position: {
    x: number;
    y: number;
  };
  // Position over time
  deltaPosition: {
    x: number;
    y: number;
  };
}
