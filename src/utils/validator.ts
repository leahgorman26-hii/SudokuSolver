import type { Grid, Cell } from '../types/sudoku';

/**
 * Checks if a number is valid in a specific position
 * according to Sudoku rules (row, column, and 3x3 box)
 */
export function isValidPlacement(
  grid: Grid,
  row: number,
  col: number,
  num: number
): boolean {
  // Check if num is valid (1-9)
  if (num < 1 || num > 9) {
    return false;
  }

  // Check row
  if (isInRow(grid, row, num)) {
    return false;
  }

  // Check column
  if (isInColumn(grid, col, num)) {
    return false;
  }

  // Check 3x3 box
  if (isInBox(grid, row, col, num)) {
    return false;
  }

  return true;
}

/**
 * Checks if a number exists in the given row
 */
function isInRow(grid: Grid, row: number, num: number): boolean {
  return grid[row].includes(num);
}

/**
 * Checks if a number exists in the given column
 */
function isInColumn(grid: Grid, col: number, num: number): boolean {
  for (let row = 0; row < 9; row++) {
    if (grid[row][col] === num) {
      return true;
    }
  }
  return false;
}

/**
 * Checks if a number exists in the 3x3 box containing the given position
 */
function isInBox(grid: Grid, row: number, col: number, num: number): boolean {
  // Find the top-left corner of the 3x3 box
  const boxStartRow = Math.floor(row / 3) * 3;
  const boxStartCol = Math.floor(col / 3) * 3;

  // Check all cells in the 3x3 box
  for (let r = boxStartRow; r < boxStartRow + 3; r++) {
    for (let c = boxStartCol; c < boxStartCol + 3; c++) {
      if (grid[r][c] === num) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Optional: Validates the entire grid for any rule violations
 * Useful for checking user input before solving
 */
export function isValidGrid(grid: Grid): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const value = grid[row][col];
      
      // Skip empty cells
      if (value === null) continue;
      
      // Temporarily remove the value to check if it's valid in this position
      grid[row][col] = null;
      const isValid = isValidPlacement(grid, row, col, value);
      grid[row][col] = value;
      
      if (!isValid) {
        return false;
      }
    }
  }
  return true;
}