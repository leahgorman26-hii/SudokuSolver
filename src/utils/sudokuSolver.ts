//Actual algorithms

import type { Grid } from '../types/sudoku';
import { cloneGrid, findEmptyCell } from './gridHelpers';
import { isValidPlacement } from './validator';

/**
 * Solves a Sudoku puzzle using backtracking algorithm
 * Returns a solved grid or null if no solution exists
 */

export function solveSudoku(grid: Grid): Grid | null {
  // Clone the grid to avoid mutating the original
  const gridCopy = cloneGrid(grid);

  // Try to solve the cloned grid
  if (solve(gridCopy)) {
    return gridCopy;
  }

  return null; // No solution found
}

/**
 * Recursive backtracking helper function
 * Modifies the grid in place
 */

function solve(grid: Grid): boolean {
  // Find the next empty cell
  const emptyCell = findEmptyCell(grid);

  // If no empty cell, puzzle is solved!
  if (emptyCell === null) {
    return true;
  }

  const { row, col } = emptyCell;

  // Try numbers 1-9
  for (let num = 1; num <= 9; num++) {
    // Check if this number is valid in this position
    if (isValidPlacement(grid, row, col, num)) {
      // Place the number
      grid[row][col] = num;

      // Recursively try to solve the rest
      if (solve(grid)) {
        return true; // Solution found!
      }

      // If we get here, this number didn't work
      // Backtrack: remove the number and try the next one
      grid[row][col] = null;
    }
  }

  // No number worked, need to backtrack further
  return false;
}

/**
 * Optional: Validates if a puzzle has a unique solution
 * Useful for puzzle generation or validation
 */

export function hasUniqueSolution(grid: Grid): boolean {
  const gridCopy = cloneGrid(grid);
  let solutionCount = 0;

  const countSolutions = (g: Grid): void => {
    if (solutionCount > 1) return; // Early exit if multiple solutions found

    const emptyCell = findEmptyCell(g);

    if (emptyCell === null) {
      solutionCount++;
      return;
    }

    const { row, col } = emptyCell;

    for (let num = 1; num <= 9; num++) {
      if (isValidPlacement(g, row, col, num)) {
        g[row][col] = num;
        countSolutions(g);
        g[row][col] = null;
      }
    }
  };

  countSolutions(gridCopy);
  return solutionCount === 1;
}


export function makePencilGrid() {

  var i: number;
  var j: number;
  var k: number;

  var pencils: number[][][]=new Array(10);

  for (i = 1; i < 10; i++) {
    pencils[i]=new Array(10);
    for (j = 1; j < 10; j++) {
      pencils[i][j]=new Array(10);
      for (k = 1; k <10; k++) {
        pencils[i][j][k]=1;
      }
    }
  }
  console.log(pencils);
  console.log("HIIII:");
}