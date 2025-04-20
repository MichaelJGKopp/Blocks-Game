import React from 'react';
import { Paper, Box, Typography, Grid } from '@mui/material';
import { COLORS, Tetromino } from '../utils/gameUtils';

interface ScorePanelProps {
  score: number;
  level: number;
  lines: number;
  nextPiece: Tetromino;
}

const ScorePanel: React.FC<ScorePanelProps> = ({ score, level, lines, nextPiece }) => {
  // Helper function to center the tetromino in the preview
  const getPreviewShape = () => {
    const shape = nextPiece.shape;
    
    // Find the actual dimensions of the piece (excluding empty rows/cols)
    let minRow = shape.length;
    let maxRow = 0;
    let minCol = shape[0].length;
    let maxCol = 0;
    
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x] !== 0) {
          minRow = Math.min(minRow, y);
          maxRow = Math.max(maxRow, y);
          minCol = Math.min(minCol, x);
          maxCol = Math.max(maxCol, x);
        }
      }
    }
    
    // Extract the actual shape without empty borders
    const trimmedShape = [];
    for (let y = minRow; y <= maxRow; y++) {
      const row = [];
      for (let x = minCol; x <= maxCol; x++) {
        row.push(shape[y][x]);
      }
      trimmedShape.push(row);
    }
    
    return trimmedShape;
  };

  const previewShape = getPreviewShape();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Score section */}
      <Paper 
        elevation={3}
        sx={{ 
          p: 2,
          bgcolor: '#111',
          border: '2px solid #333',
          boxShadow: '0 0 10px rgba(0, 255, 0, 0.5)',
          width: 200,
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontFamily: '"Press Start 2P", cursive',
              color: '#00ff00',
              fontSize: '0.9rem',
              mb: 1,
              textShadow: '0 0 3px #00ff00',
            }}
          >
            SCORE
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              fontFamily: '"Press Start 2P", cursive',
              color: '#ffffff',
              letterSpacing: '1px',
              fontSize: '1.2rem',
            }}
          >
            {score.toString().padStart(6, '0')}
          </Typography>
        </Box>
        
        <Box sx={{ mb: 2 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontFamily: '"Press Start 2P", cursive',
              color: '#00ff00',
              fontSize: '0.9rem',
              mb: 1,
              textShadow: '0 0 3px #00ff00',
            }}
          >
            LEVEL
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              fontFamily: '"Press Start 2P", cursive',
              color: '#ffffff',
              letterSpacing: '1px',
              fontSize: '1.2rem',
            }}
          >
            {level.toString().padStart(2, '0')}
          </Typography>
        </Box>
        
        <Box>
          <Typography 
            variant="h6" 
            sx={{ 
              fontFamily: '"Press Start 2P", cursive',
              color: '#00ff00',
              fontSize: '0.9rem',
              mb: 1,
              textShadow: '0 0 3px #00ff00',
            }}
          >
            LINES
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              fontFamily: '"Press Start 2P", cursive',
              color: '#ffffff',
              letterSpacing: '1px',
              fontSize: '1.2rem',
            }}
          >
            {lines.toString().padStart(3, '0')}
          </Typography>
        </Box>
      </Paper>

      {/* Next piece preview */}
      <Paper 
        elevation={3}
        sx={{ 
          p: 2,
          bgcolor: '#111',
          border: '2px solid #333',
          boxShadow: '0 0 10px rgba(0, 255, 0, 0.5)',
          width: 200,
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            fontFamily: '"Press Start 2P", cursive',
            color: '#00ff00',
            fontSize: '0.9rem',
            mb: 2,
            textShadow: '0 0 3px #00ff00',
          }}
        >
          NEXT PIECE
        </Typography>

        <Box 
          sx={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: 1,
            minHeight: '100px', // Ensuring enough vertical space
            bgcolor: 'rgba(0,0,0,0.4)',
            border: '1px solid #333',
          }}
        >
          <Grid 
            container 
            justifyContent="center"
            alignItems="center"
            sx={{ 
              width: 'auto', 
              height: 'auto',
            }}
          >
            {previewShape.map((row, rowIndex) => (
              <Grid key={`next-row-${rowIndex}`} container item xs={12} justifyContent="center" component="div">
                {row.map((cell, cellIndex) => (
                  <Grid item key={`next-cell-${rowIndex}-${cellIndex}`} component="div">
                    <Box
                      sx={{
                        width: 25,
                        height: 25,
                        backgroundColor: cell !== 0 ? COLORS[nextPiece.color] : 'transparent',
                        border: cell !== 0 ? '1px solid rgba(255,255,255,0.3)' : 'none',
                        boxSizing: 'border-box',
                        boxShadow: cell !== 0 ? 'inset 0 0 5px rgba(255,255,255,0.5)' : 'none',
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Game controls instructions */}
        <Box mt={3}>
          <Typography 
            variant="body2" 
            sx={{ 
              fontFamily: '"Press Start 2P", cursive',
              color: '#aaa',
              fontSize: '0.6rem',
              mb: 1,
            }}
          >
            CONTROLS
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              fontFamily: 'monospace',
              color: '#aaa',
              fontSize: '0.6rem',
              mb: 0.5,
            }}
          >
            ← → : Move
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              fontFamily: 'monospace',
              color: '#aaa',
              fontSize: '0.6rem',
              mb: 0.5,
            }}
          >
            ↑ : Rotate
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              fontFamily: 'monospace',
              color: '#aaa',
              fontSize: '0.6rem',
              mb: 0.5,
            }}
          >
            ↓ : Soft Drop
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              fontFamily: 'monospace',
              color: '#aaa',
              fontSize: '0.6rem',
              mb: 0.5,
            }}
          >
            SPACE : Hard Drop
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              fontFamily: 'monospace',
              color: '#aaa',
              fontSize: '0.6rem',
            }}
          >
            P : Pause
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default ScorePanel;