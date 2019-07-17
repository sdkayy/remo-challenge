export interface SelectionObject {
  width: number;
  height: number;
  index: number;
  hidden: boolean;
  highlighted: boolean;
  position: {
    x: number;
    y: number;
  };
}
