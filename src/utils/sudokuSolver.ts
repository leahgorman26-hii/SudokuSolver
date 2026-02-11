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
  makePencilGrid() 
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

function SolveSudoku(Sudoku:number[][]) {
  var loopCounter: number;
  loopCounter=0;

  var pencils: number[][][];
  //makes pencil grid full of 1's 
  pencils=makePencilGrid();

  var num: number;
  var i: number;
  var j: number;
  var ActiveNumber: number;
  var Alone: boolean;

  var solved: boolean;
  solved=false;
  while(solved==false && loopCounter<100) { 
    for(num=0;num<9;num++)
    {
      for(i=0;i<9;i++)
      {
        for(j=0;j<9;j++)
        {
          ActiveNumber=Sudoku[i][j];
          if(ActiveNumber!=0)
          {
            // If alone in the row/columnor/box 
            //if true then place
            Alone=checkAloneRowColumnBox(pencils, i, j, num);            
            if (Alone==true)
            {
              Sudoku[i][j]=num;
            }

            //remove 1's if number present in row of column
            //rename??
            checkRowColumn(Sudoku, i, j, ActiveNumber)

            //remove 1's if number present in box
            //rename??
            checkBox(Sudoku, i, j, ActiveNumber)
          }
        }
      }
    }
    loopCounter++;
    solved=Solved(Sudoku);
  }
}


export function makePencilGrid() {

  var i: number;
  var j: number;
  var k: number;

  var pencils: number[][][]=new Array(9);

  for (i = 0; i < 9; i++) {
    pencils[i]=new Array(9);
    for (j = 0; j < 9; j++) {
      pencils[i][j]=new Array(10);
      for (k = 0; k <9; k++) {
        pencils[i][j][k]=1;
      }
    }
  }
  return pencils;
  //const x = pencils.length;            // 2
  //const y = pencils[0].length;         // 2
  //const z = pencils[0][0].length;      // 2
  //console.log(x);
  //console.log(y);
  //console.log(z);
  //console.log(pencils);
  //console.log("HIIII:");
}

export function checkRowColumn(sudoku: number[][], i: number, j: number, num: number) {
// need to pass in i, j and sudoku
var boxValue: number;
var k: number;
var l: number;

for (k = 0; k < 2; k++) {
  for (l = 0; l < 9; l++) {
    if(k==0)
    {
      boxValue= sudoku[i][l];
      if(boxValue==num){
        return false; //don't place 
      }
    }
    if(k==1){
      boxValue=sudoku[l][j];
      if(boxValue==num){
         return false; //don't place
      }
    }   
  }
}
 return true; //can be placed
}

//
export function checkBox(sudoko:number[][], i : number, j:number, num:number){
//check box and remove pencils for that box if present 
var a: number;
var b: number;

var m: number;
var n: number;

var boxValue: number;
var counter: number;
counter=0;

var modRow: number;
var modColumn: number;

modRow= i % 3 ;
modColumn= j % 3 ;

a=0;
b=0;

//find corner
a=i-modRow;
b=j-modColumn;

for (m = 0; m < 3; m++) {
  for (n = 0; n < 3; n++) {
    boxValue=sudoko[a+m][b+n];
    if(boxValue==num){
      //return false;
      counter++;
    }
  }
}
if(counter>1)
{
  return false
}
else
{
  return true;
}
}

export function checkAloneRowColumnBox(pencils:number[][][], i : number, j:number, num:number){
var valuebox: number;
var countInstanceRow: number;
var countInstanceColumn: number;
var countInstanceBox: number;

var k: number;
var boxValueRow: number;
var boxValueColumn: number;
var boxValueBox: number;

countInstanceRow=0;
countInstanceColumn=0;
countInstanceBox=0;

//row and column check
for (k = 0; k < 9; k++) {
  boxValueRow=pencils[num][i][k];
  boxValueColumn=pencils[num][k][j];

  if(boxValueRow==1){
    countInstanceRow++;
  }

    if(boxValueColumn==1){
    countInstanceColumn++;
  }
}

//box check
var a: number;
var b: number;

var m: number;
var n: number;

var modRow: number;
var modColumn: number;

modRow= i % 3 ;
modColumn= j % 3 ;

//find corner
a=i-modRow;
b=j-modColumn;

for (m = 0; m < 3; m++) {
  for (n = 0; n < 3; n++) {
    boxValueBox=pencils[num][a+m][b+n];
    if(boxValueBox==1){
      countInstanceBox++;
    }
  }
}


if ((countInstanceRow==1)||(countInstanceColumn==1)||(countInstanceBox==1)){
  return true;
}
else{
  return false;
}

}


export function removePencils(pencils:number[][][], i : number, j:number, num:number){
var m: number;
var n: number;

for (m = 0; m < 9; m++) {
  //remove pencils in row and column
  pencils[num][i][m]=0; 
  pencils[num][m][j]=0;
  //remove pencils in that position for all numbers
  pencils[m][i][j]=0;  
}

//remove box
var a: number;
var b: number;
var modRow: number;
var modColumn: number;

modRow= i % 3 ;
modColumn= j % 3 ;

//find corner
a=i-modRow;
b=j-modColumn;

for (m = 0; m < 3; m++) {
  for (n = 0; n < 3; n++) {
    pencils[num][a+m][b+n]=0;
  }
}
}

export function Solved(Sudoku:number[][]){

  var i: number;
  var j: number;

  for( i=0; i<9;i++)
  {
    for( j=0; j<9;j++)
    {
        if(Sudoku[i][j]==0)
        {
            return false
        }
    }
  }
  return true
}

