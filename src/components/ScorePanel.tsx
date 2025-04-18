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
            bgcolor: 'rgba(0,0,0,0.4)',
            border: '1px solid #333',
          }}
        >
          <Grid 
            container 
            spacing={0}
            sx={{ 
              width: 'auto', 
              height: 'auto',
            }}
          >
            {nextPiece.shape.map((row, rowIndex) => (
              <Grid key={`next-row-${rowIndex}`} container item xs={12} component="div">
                {row.map((cell, cellIndex) => (
                  <Grid item key={`next-cell-${rowIndex}-${cellIndex}`} component="div">
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
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