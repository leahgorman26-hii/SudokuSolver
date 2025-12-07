//Initialize grid, check complete, etc.

import type{ Grid, Cell } from '../types/sudoku.ts';


/**
 * Creates a 9x9 grid filled with null values
 */
export function createEmptyGrid(): Grid {
  return Array(9).fill(null).map(() => Array(9).fill(null));
}

/**
 * Deep clones a grid to avoid mutation issues
 */
export function cloneGrid(grid: Grid): Grid {
  return grid.map(row => [...row]);
}

/**
 * Checks if the grid is completely filled (no null values)
 */
export function isGridComplete(grid: Grid): boolean {
  return grid.every(row => row.every(cell => cell !== null));
}

/**
 * Checks if the grid has any values at all
 */
export function isGridEmpty(grid: Grid): boolean {
  return grid.every(row => row.every(cell => cell === null));
}

/**
 * Finds the next empty cell in the grid
 * Returns null if grid is complete
 */// needed for recurrsively solving
export function findEmptyCell(grid: Grid): { row: number; col: number } | null {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === null) {
        return { row, col };
      }
    }
  }
  return null;
}

//returning all Empty Cells
export function findAllEmptyCells(grid: Grid): { row: number; col: number }[] {
  const emptyCells: { row: number; col: number }[] = [];
  
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === null) {
        emptyCells.push({ row, col });
      }
    }
  }
  
  return emptyCells;
}

/**
 * Optional: Create a grid from a string or array
 * Useful for testing with predefined puzzles
 * Example: "530070000600195000..." where 0 = empty
 */
export function gridFromString(str: string): Grid {
  if (str.length !== 81) {
    throw new Error('Invalid grid string: must be 81 characters');
  }
  
  const grid: Grid = createEmptyGrid();
  for (let i = 0; i < 81; i++) {
    const row = Math.floor(i / 9);
    const col = i % 9;
    const value = parseInt(str[i]);
    grid[row][col] = value === 0 ? null : value;
  }
  return grid;
}

/**
 * Optional: Convert grid to string for debugging/sharing
 */
export function gridToString(grid: Grid): string {
  return grid.flat().map(cell => cell ?? 0).join('');
}