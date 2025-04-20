import React from 'react';
import { Box, Paper } from '@mui/material';
import { COLORS, Block } from '../utils/gameUtils';

interface BlocksBoardProps {
  board: number[][];
  currentPiece: Block;
  position: { x: number; y: number };
  gameOver: boolean;
  paused: boolean;
}

const BlocksBoard: React.FC<BlocksBoardProps> = ({
  board,
  currentPiece,
  position,
  gameOver,
  paused,
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

  // Pastel color mapping for blocks
  const pastelColors = {
    1: '#a8e6cf', // Pastel cyan/mint
    2: '#aac4ff', // Pastel blue
    3: '#ffd3b6', // Pastel orange
    4: '#fdffb6', // Pastel yellow
    5: '#bde0fe', // Pastel green/blue
    6: '#d8bbff', // Pastel purple
    7: '#ffadad'  // Pastel red/pink
  };

  return (
    <Paper 
      elevation={3}
      sx={{ 
        p: 1,
        bgcolor: '#f8f9fa',
        border: '4px solid #e9ecef',
        boxShadow: '0 0 10px rgba(173, 216, 230, 0.5)',
        position: 'relative',
        borderRadius: 4,
      }}
    >
      {/* Game board */}
      <Box 
        sx={{ 
          display: 'grid',
          gridTemplateRows: `repeat(${board.length}, 1fr)`,
          width: 'auto',
          height: 'auto',
          borderRadius: 2,
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
                  backgroundColor: cell !== 0 ? pastelColors[cell as keyof typeof pastelColors] : 'rgba(240, 240, 245, 0.6)',
                  border: '1px solid rgba(222,226,230,0.5)',
                  boxSizing: 'border-box',
                  boxShadow: cell !== 0 ? 'inset 0 0 4px rgba(255,255,255,0.8)' : 'none',
                  transition: 'background-color 0.1s ease',
                  borderRadius: 0.5,
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
            backgroundColor: 'rgba(248, 249, 250, 0.8)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: gameOver ? '#dc3545' : '#20c997',
            fontFamily: '"Poppins", sans-serif',
            borderRadius: 2,
            zIndex: 10,
          }}
        >
          <Box
            sx={{
              fontSize: '1.8rem',
              textAlign: 'center',
              p: 2,
              fontWeight: 600,
              animation: 'pulse 1.5s infinite',
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