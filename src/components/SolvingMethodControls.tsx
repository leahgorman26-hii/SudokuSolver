import React from 'react';

interface SolvingMethodControlsProps {
  onSolvingMethodReset: () => void;
  onScanning: () => void;
  onEliminateRows: () => void;
  onNakedPair: () => void;
  onHiddenPair: () => void;
  onXwing: () => void;

  isScanningEnabled: boolean;
  isEliminateRowsEnabled: boolean;
  isNakedPairEnabled: boolean;
  isHiddenPairEnabled: boolean;
  isXwingEnabled: boolean;
}

export const SolvingMethodControls: React.FC<SolvingMethodControlsProps> = ({
  onSolvingMethodReset,
  onScanning,
  onEliminateRows,
  onNakedPair,
  onHiddenPair,
  onXwing,
  isScanningEnabled,
  isEliminateRowsEnabled,
  isNakedPairEnabled,
  isHiddenPairEnabled,
  isXwingEnabled,
}) => {

  // Function to get button style based on enabled state
  const getButtonStyle = (isEnabled: boolean): React.CSSProperties => ({
    padding: '8px 24px',
    fontSize: '20px',
    fontWeight: '600',
    backgroundColor: isEnabled ? '#22c55e' : '#ef4444', 
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  });

  const resetButtonStyle: React.CSSProperties = {
    padding: '8px 24px',
    fontSize: '20px',
    fontWeight: '600',
    backgroundColor: '#3b82f6', // Blue for reset button
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  };

  return (
    <div style={{ 
      display: 'flex', 
      gap: '16px', 
      marginTop: '24px',
      flexWrap: 'wrap',
      justifyContent: 'center'
    }}>
      <button
        onClick={onSolvingMethodReset}
        style={resetButtonStyle}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
      >
        Reset Methods
      </button>
      
      <button
        onClick={onScanning}
        style={getButtonStyle(isScanningEnabled)}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isScanningEnabled ? '#16a34a' : '#dc2626'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = isScanningEnabled ? '#22c55e' : '#ef4444'}
      >
        Scanning {isScanningEnabled ? '✓' : '✗'}
      </button>
      
      <button
        onClick={onEliminateRows}
        style={getButtonStyle(isEliminateRowsEnabled)}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isEliminateRowsEnabled ? '#16a34a' : '#dc2626'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = isEliminateRowsEnabled ? '#22c55e' : '#ef4444'}
      >
        Eliminate Rows {isEliminateRowsEnabled ? '✓' : '✗'}
      </button>
      
      <button
        onClick={onNakedPair}
        style={getButtonStyle(isNakedPairEnabled)}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isNakedPairEnabled ? '#16a34a' : '#dc2626'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = isNakedPairEnabled ? '#22c55e' : '#ef4444'}
      >
        Naked Pairs {isNakedPairEnabled ? '✓' : '✗'}
      </button>
      
      <button
        onClick={onHiddenPair}
        style={getButtonStyle(isHiddenPairEnabled)}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isHiddenPairEnabled ? '#16a34a' : '#dc2626'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = isHiddenPairEnabled ? '#22c55e' : '#ef4444'}
      >
        Hidden Pairs {isHiddenPairEnabled ? '✓' : '✗'}
      </button>
      
      <button
        onClick={onXwing}
        style={getButtonStyle(isXwingEnabled)}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isXwingEnabled ? '#16a34a' : '#dc2626'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = isXwingEnabled ? '#22c55e' : '#ef4444'}
      >
        X-Wing {isXwingEnabled ? '✓' : '✗'}
      </button>
    </div>
  );
};