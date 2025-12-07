import React from 'react';

interface ControlsProps {
  onSolve: () => void;
  onClear: () => void;
  onReset: () => void;
  isSolving?: boolean;
  hasSolution?: boolean;
}

export const Controls: React.FC<ControlsProps> = ({
  onSolve,
  onClear,
  onReset,
  isSolving = false,
  hasSolution = false,
}) => {
  const buttonBaseStyle: React.CSSProperties = {
    padding: '8px 24px',
    fontSize: '30px',
    fontWeight: '600',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  };

  const solveButtonStyle: React.CSSProperties = {
    ...buttonBaseStyle,
    backgroundColor: isSolving ? '#9ca3af' : '#2563eb',
    cursor: isSolving ? 'not-allowed' : 'pointer',
  };

  const resetButtonStyle: React.CSSProperties = {
    ...buttonBaseStyle,
    backgroundColor: '#eab308',
  };

  const clearButtonStyle: React.CSSProperties = {
    ...buttonBaseStyle,
    backgroundColor: '#ef4444',
  };

  return (
    <div style={{ 
      display: 'flex', 
      gap: '16px',  
      marginTop: '24px',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <button
        onClick={onSolve}
        disabled={isSolving}
        style={solveButtonStyle}
        onMouseEnter={(e) => {
          if (!isSolving) e.currentTarget.style.backgroundColor = '#1d4ed8';
        }}
        onMouseLeave={(e) => {
          if (!isSolving) e.currentTarget.style.backgroundColor = '#2563eb';
        }}
      >
        {isSolving ? 'Solving...' : 'Solve'}
      </button>
      
      <button
        onClick={onReset}
        style={resetButtonStyle}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ca8a04'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#eab308'}
      >
        Reset
      </button>
      
      <button
        onClick={onClear}
        style={clearButtonStyle}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ef4444'}
      >
        Clear All
      </button>
      
      {hasSolution && (
        <span style={{
          color: '#16a34a',
          fontWeight: '600',
          marginLeft: '8px'
        }}>
          ✓ Solved!
        </span>
      )}
    </div>
  );
};