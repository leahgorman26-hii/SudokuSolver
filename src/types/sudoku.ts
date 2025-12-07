//Type definitions (Grid, Cell, etc.)

export type Cell = number | null;
export type Grid = Cell[][];
export interface Position {
  row: number;
  col: number;
}