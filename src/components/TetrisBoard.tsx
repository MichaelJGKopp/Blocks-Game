import React from 'react';
import { Box, Paper } from '@mui/material';
import { COLORS, Tetromino } from '../utils/gameUtils';

interface TetrisBoardProps {
  board: number[][];
  currentPiece: Tetromino;
  position: { x: number; y: number };
  gameOver: boolean;
  paused: boolean;
}

const TetrisBoard: React.FC<TetrisBoardProps> = ({
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

  return (
    <Paper 
      elevation={3}
      sx={{ 
        p: 1,
        bgcolor: 'black',
        border: '4px solid #333',
        boxShadow: '0 0 10px rgba(0, 255, 0, 0.5)',
        position: 'relative',
      }}
    >
      {/* Game board */}
      <Box 
        sx={{ 
          display: 'grid',
          gridTemplateRows: `repeat(${board.length}, 1fr)`,
          width: 'auto',
          height: 'auto',
          borderRadius: 1,
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
                  backgroundColor: COLORS[cell],
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxSizing: 'border-box',
                  boxShadow: cell !== 0 ? 'inset 0 0 8px rgba(255,255,255,0.5)' : 'none',
                  transition: 'background-color 0.1s ease',
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
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: gameOver ? '#ff0000' : '#00ff00',
            fontFamily: '"Press Start 2P", cursive',
            textShadow: gameOver 
              ? '0 0 5px #ff0000, 0 0 10px #ff0000'
              : '0 0 5px #00ff00, 0 0 10px #00ff00',
            zIndex: 10,
          }}
        >
          <Box
            sx={{
              fontSize: '2rem',
              textAlign: 'center',
              p: 2,
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

export default TetrisBoard;