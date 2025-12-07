import React from 'react';
import type { Grid, Cell } from '../types/sudoku';
import { SudokuCell } from './SudokuCell';

interface SudokuGridProps {
  grid: Grid;
  givenGrid?: Grid;
  onCellChange: (row: number, col: number, value: Cell) => void;
}

export const SudokuGrid: React.FC<SudokuGridProps> = ({
  grid,
  givenGrid,
  onCellChange,
}) => {
  const isGivenCell = (row: number, col: number): boolean => {
    return givenGrid ? givenGrid[row][col] !== null : false;
  };

  return (
    <div className="inline-block bg-gray-800 p-2">
      <div className="grid grid-cols-9 gap-0 bg-white">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <SudokuCell
              key={`${rowIndex}-${colIndex}`}
              value={cell}
              row={rowIndex}
              col={colIndex}
              isGiven={isGivenCell(rowIndex, colIndex)}
              onChange={onCellChange}
            />
          ))
        )}
      </div>
    </div>
  );
};