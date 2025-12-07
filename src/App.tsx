import React, { useState } from 'react';
import type { Grid, Cell } from './types/sudoku';
import { SudokuGrid } from './components/SudokuGrid';
import { Controls } from './components/Controls';
import { SolvingMethodControls } from './components/SolvingMethodControls';
import { createEmptyGrid, cloneGrid, isGridComplete } from './utils/gridHelpers';
import { isValidGrid } from './utils/validator';
import './App.css';
import { solveSudoku } from './utils/sudokuSolver';

function App() {
  const [grid, setGrid] = useState<Grid>(createEmptyGrid());
  const [givenGrid, setGivenGrid] = useState<Grid>(createEmptyGrid());
  const [isSolving, setIsSolving] = useState(false);
  const [hasSolution, setHasSolution] = useState(false);
  const [error, setError] = useState<string>('');
  
  // Toggle states for solving methods (all start as true/enabled)
  const [isEliminateRowsEnabled, setIsEliminateRowsEnabled] = useState(true);
  const [isNakedPairEnabled, setIsNakedPairEnabled] = useState(true);
  const [isHiddenPairEnabled, setIsHiddenPairEnabled] = useState(true);
  const [isXwingEnabled, setIsXwingEnabled] = useState(true);
  const [isScanningEnabled, setIsScanningEnabled] = useState(true);

  const handleCellChange = (row: number, col: number, value: Cell) => {
    const newGrid = cloneGrid(grid);
    newGrid[row][col] = value;
    setGrid(newGrid);
    setHasSolution(false);
    setError('');
  };

  const handleSolve = () => {
    setError('');
    setIsSolving(true);
    setHasSolution(false);

    // Validate grid first
    if (!isValidGrid(grid)) {
      setError('Invalid puzzle! Check for duplicate numbers.');
      setIsSolving(false);
      return;
    }

    // Save the current grid as the "given" grid
    setGivenGrid(cloneGrid(grid));

    // Small delay to show "Solving..." state
    setTimeout(() => {
      // You can pass the enabled methods to your solver
      const solution = solveSudoku(grid);//, {
       // eliminateRows: isEliminateRowsEnabled,
       // nakedPair: isNakedPairEnabled,
        //hiddenPair: isHiddenPairEnabled,
       // xwing: isXwingEnabled,
        //scanning: isScanningEnabled
      //});
      
      if (solution) {
        setGrid(solution);
        setHasSolution(true);
      } else {
        setError('No solution exists for this puzzle!');
      }
      
      setIsSolving(false);
    }, 100);
  };

  const handleReset = () => {
    setGrid(cloneGrid(givenGrid));
    setHasSolution(false);
    setError('');
  };

  const handleClear = () => {
    setGrid(createEmptyGrid());
    setGivenGrid(createEmptyGrid());
    setHasSolution(false);
    setError('');
  };

  const handleSolvingMethodReset = () => {
    // Reset all methods to enabled (true)
    setIsEliminateRowsEnabled(true);
    setIsNakedPairEnabled(true);
    setIsHiddenPairEnabled(true);
    setIsXwingEnabled(true);
    setIsScanningEnabled(true);
  };

  // Toggle handlers - flip the boolean value
  const handleToggleScanning = () => {
    setIsScanningEnabled(!isScanningEnabled);
  };

  const handleToggleEliminateRows = () => {
    setIsEliminateRowsEnabled(!isEliminateRowsEnabled);
  };

  const handleToggleNakedPair = () => {
    setIsNakedPairEnabled(!isNakedPairEnabled);
  };

  const handleToggleHiddenPair = () => {
    setIsHiddenPairEnabled(!isHiddenPairEnabled);
  };

  const handleToggleXwing = () => {
    setIsXwingEnabled(!isXwingEnabled);
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f3f4f6',
      padding: '0px'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 className="title">Sudoku Solver</h1>
        
        <SudokuGrid
          grid={grid}
          givenGrid={givenGrid}
          onCellChange={handleCellChange}
        />
        
        <Controls
          onSolve={handleSolve}
          onClear={handleClear}
          onReset={handleReset}
          isSolving={isSolving}
          hasSolution={hasSolution}
        />
        
        <SolvingMethodControls
          onEliminateRows={handleToggleEliminateRows}
          onNakedPair={handleToggleNakedPair}
          onHiddenPair={handleToggleHiddenPair}
          onXwing={handleToggleXwing}
          onScanning={handleToggleScanning}
          onSolvingMethodReset={handleSolvingMethodReset}
          // Pass the toggle states to the component
          isEliminateRowsEnabled={isEliminateRowsEnabled}
          isNakedPairEnabled={isNakedPairEnabled}
          isHiddenPairEnabled={isHiddenPairEnabled}
          isXwingEnabled={isXwingEnabled}
          isScanningEnabled={isScanningEnabled}
        />
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <div className="instructions">
          <p>Enter numbers 1-9 in the grid, then click Solve!</p>
        </div>
      </div>
    </div>
  );
}

export default App;