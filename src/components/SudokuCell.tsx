import React, { useRef } from 'react';
import type { Cell } from '../types/sudoku';

interface SudokuCellProps {
  value: Cell;
  row: number;
  col: number;
  isGiven?: boolean;
  onChange: (row: number, col: number, value: Cell) => void;
}

export const SudokuCell: React.FC<SudokuCellProps> = ({
  value,
  row,
  col,
  isGiven = false,
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    if (input === '') {
      onChange(row, col, null);
      return;
    }

    const num = parseInt(input);
    if (!isNaN(num) && num >= 1 && num <= 9) {
      onChange(row, col, num);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Clear cell on backspace/delete
    if (e.key === 'Backspace' || e.key === 'Delete') {
      onChange(row, col, null);
      e.preventDefault();
      return;
    }

    // Arrow key navigation
    let nextRow = row;
    let nextCol = col;

    switch (e.key) {
      case 'ArrowUp':
        nextRow = Math.max(0, row - 1);
        e.preventDefault();
        break;
      case 'ArrowDown':
        nextRow = Math.min(8, row + 1);
        e.preventDefault();
        break;
      case 'ArrowLeft':
        nextCol = Math.max(0, col - 1);
        e.preventDefault();
        break;
      case 'ArrowRight':
        nextCol = Math.min(8, col + 1);
        e.preventDefault();
        break;
      default:
        return; // Don't do anything for other keys
    }

    // Find and focus the next cell
    const nextCell = document.querySelector(
      `input[data-row="${nextRow}"][data-col="${nextCol}"]`
    ) as HTMLInputElement;
    
    if (nextCell) {
      nextCell.focus();
      nextCell.select(); // Selects the content for easy replacement
    }
  };

  return (
    <input
      ref={inputRef}
      type="text"
      inputMode="numeric"
      value={value ?? ''}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      disabled={isGiven}
      maxLength={1}
      data-row={row}
      data-col={col}
      style={{
        //fontSize: '30px',
        backgroundColor: '#435eb9ff',
        width: '47px',
        height: '47px',
        minWidth: '47px',
        minHeight: '47px',
         //<!-- Seperator between with 3x3 boxes-->
        borderRight: col % 3 === 2 && col !== 8 ? '3px solid black' : '3px solid #ffffffff',
        borderBottom: row % 3 === 2 && row !== 8 ? '3px solid black' : '3px solid #ffffffff',
        borderTop: '2px solid #000000ff',
        borderLeft: '2px solid #000000ff',
        
        textAlign: 'center',        // Centers horizontally
        fontSize: '30px',           // Makes number visible
        
      }}

      className={`
      text-center text-xl font-semibold border
      focus:outline-none focus:ring-2 focus:ring-blue-500
      ${isGiven 
        ? 'bg-white text-white cursor-not-allowed font-bold' 
        : 'bg-white text-blue-600'
      }
      ${col % 3 === 2 && col !== 8 ? 'border-r-2 border-r-gray-800' : ''}
      ${row % 3 === 2 && row !== 8 ? 'border-b-2 border-b-gray-800' : ''}
      `}
    />
  );
};