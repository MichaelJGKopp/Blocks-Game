import React from 'react';
import { Box, Paper } from '@mui/material';
import { Block } from '../utils/gameUtils';

interface BlocksBoardProps {
  board: number[][];
  currentPiece: Block;
  position: { x: number; y: number };
  gameOver: boolean;
  paused: boolean;
  darkMode: boolean;
}

const BlocksBoard: React.FC<BlocksBoardProps> = ({
  board,
  currentPiece,
  position,
  gameOver,
  paused,
  darkMode,
}) => {
  // Create a display board combining the current board and active piece
  const createDisplayBoard = () => {
    // Create a copy of the board
    const displayBoard = board.map(row => [...row]);
    
    // Add the current piece to the display board
    currentPiece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          const boardY = y + position.y;
          const boardX = x + position.x;
          
          if (boardY >= 0 && boardY < board.length && boardX >= 0 && boardX < board[0].length) {
            displayBoard[boardY][boardX] = currentPiece.color;
          }
        }
      });
    });
    
    return displayBoard;
  };

  const displayBoard = createDisplayBoard();

  // Pastel color mapping for light mode blocks with increased contrast
  const pastelColors = {
    1: '#2CC6D0', // Brighter cyan
    2: '#4169E1', // Royal blue
    3: '#FF9347', // Brighter orange
    4: '#FFD700', // Gold (brighter yellow)
    5: '#3CB043', // Brighter green
    6: '#9370DB', // Medium purple
    7: '#FF5555'  // Brighter red
  };

  // Neon color mapping for dark mode / retro blocks
  const neonColors = {
    1: '#00ffff', // Neon cyan
    2: '#0000ff', // Neon blue
    3: '#ff7f00', // Neon orange
    4: '#ffff00', // Neon yellow
    5: '#00ff00', // Neon green
    6: '#bf00ff', // Neon purple
    7: '#ff0000'  // Neon red
  };

  return (
    <Paper 
      elevation={darkMode ? 3 : 2}
      sx={{ 
        p: 1,
        bgcolor: darkMode ? 'black' : '#eaeaea',
        border: darkMode 
          ? '4px solid #333' 
          : '4px solid #d0d0d0',
        boxShadow: darkMode 
          ? '0 0 10px rgba(0, 255, 0, 0.5)' 
          : '0 0 10px rgba(0, 0, 0, 0.2)',
        position: 'relative',
        borderRadius: darkMode ? 0 : 4,
      }}
    >
      {/* Game board */}
      <Box 
        sx={{ 
          display: 'grid',
          gridTemplateRows: `repeat(${board.length}, 1fr)`,
          width: 'auto',
          height: 'auto',
          borderRadius: darkMode ? 0 : 2,
          overflow: 'hidden',
        }}
      >
        {displayBoard.map((row, rowIndex) => (
          <Box 
            key={`row-${rowIndex}`}
            sx={{ 
              display: 'grid',
              gridTemplateColumns: `repeat(${row.length}, 1fr)`,
            }}
          >
            {row.map((cell, cellIndex) => (
              <Box
                key={`cell-${rowIndex}-${cellIndex}`}
                sx={{
                  width: 30,
                  height: 30,
                  backgroundColor: cell !== 0 
                    ? (darkMode 
                        ? neonColors[cell as keyof typeof neonColors] 
                        : pastelColors[cell as keyof typeof pastelColors])
                    : darkMode 
                        ? '#111' 
                        : '#d8d8d8',
                  // Simple borders - thicker in dark mode for better visibility
                  border: cell !== 0 
                    ? (darkMode 
                        ? '2px solid rgba(255,255,255,0.3)' 
                        : '1px solid rgba(0,0,0,0.15)')
                    : (darkMode 
                        ? '1px solid #222' 
                        : '1px solid rgba(0,0,0,0.1)'),
                  boxSizing: 'border-box',
                  borderRadius: darkMode ? 0 : 0.5,
                }}
              />
            ))}
          </Box>
        ))}
      </Box>

      {/* Game state overlays */}
      {(gameOver || paused) && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: darkMode 
              ? 'rgba(0, 0, 0, 0.7)' 
              : 'rgba(248, 249, 250, 0.8)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: gameOver 
              ? (darkMode ? '#ff0000' : '#dc3545') 
              : (darkMode ? '#00ff00' : '#20c997'),
            fontFamily: darkMode 
              ? '"Press Start 2P", cursive' 
              : '"Poppins", sans-serif',
            borderRadius: darkMode ? 0 : 2,
            zIndex: 10,
          }}
        >
          <Box
            sx={{
              fontSize: darkMode ? '1.5rem' : '1.8rem',
              textAlign: 'center',
              p: 2,
              fontWeight: darkMode ? 400 : 600,
              animation: 'pulse 1.5s infinite',
              textShadow: darkMode ? (gameOver 
                ? '0 0 5px #ff0000, 0 0 10px #ff0000' 
                : '0 0 5px #00ff00, 0 0 10px #00ff00') : 'none',
              '@keyframes pulse': {
                '0%': {
                  opacity: 0.7,
                },
                '50%': {
                  opacity: 1,
                },
                '100%': {
                  opacity: 0.7,
                },
              },
            }}
          >
            {gameOver ? 'GAME OVER' : 'PAUSED'}
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default BlocksBoard;