import React from 'react';
import { Paper, Box, Typography } from '@mui/material';
import { Block } from '../utils/gameUtils';

interface ScorePanelProps {
  score: number;
  level: number;
  lines: number;
  nextPiece: Block;
  darkMode: boolean;
}

const ScorePanel: React.FC<ScorePanelProps> = ({ score, level, lines, nextPiece, darkMode }) => {
  // Helper function to center the block in the preview
  const getPreviewShape = () => {
    const shape = nextPiece.shape;
    
    // Make sure we're using the actual shape value and not just color
    // This ensures the shape shown in the preview matches exactly what comes next
    return shape.map(row => row.map(cell => cell !== 0 ? 1 : 0));
  };

  const previewShape = getPreviewShape();
  
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
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Score section */}
      <Paper 
        elevation={darkMode ? 3 : 2}
        sx={{ 
          p: 2,
          bgcolor: darkMode ? '#111' : '#f8f9fa',
          border: darkMode ? '2px solid #333' : '2px solid #e9ecef',
          boxShadow: darkMode 
            ? '0 0 10px rgba(0, 255, 0, 0.5)' 
            : '0 0 10px rgba(173, 216, 230, 0.5)',
          width: 200,
          borderRadius: darkMode ? 0 : 16,
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontFamily: darkMode ? '"Press Start 2P", cursive' : '"Poppins", sans-serif',
              color: darkMode ? '#00ff00' : '#6c757d',
              fontSize: darkMode ? '0.9rem' : '1rem',
              mb: 1,
              fontWeight: darkMode ? 400 : 600,
              textShadow: darkMode ? '0 0 3px #00ff00' : 'none',
            }}
          >
            SCORE
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              fontFamily: darkMode ? '"Press Start 2P", cursive' : '"Poppins", sans-serif',
              color: darkMode ? '#ffffff' : '#495057',
              letterSpacing: '1px',
              fontSize: darkMode ? '1rem' : '1.2rem',
              fontWeight: darkMode ? 400 : 500,
            }}
          >
            {score.toString().padStart(6, '0')}
          </Typography>
        </Box>
        
        <Box sx={{ mb: 2 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontFamily: darkMode ? '"Press Start 2P", cursive' : '"Poppins", sans-serif',
              color: darkMode ? '#00ff00' : '#6c757d',
              fontSize: darkMode ? '0.9rem' : '1rem',
              mb: 1,
              fontWeight: darkMode ? 400 : 600,
              textShadow: darkMode ? '0 0 3px #00ff00' : 'none',
            }}
          >
            LEVEL
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              fontFamily: darkMode ? '"Press Start 2P", cursive' : '"Poppins", sans-serif',
              color: darkMode ? '#ffffff' : '#495057',
              letterSpacing: '1px',
              fontSize: darkMode ? '1rem' : '1.2rem',
              fontWeight: darkMode ? 400 : 500,
            }}
          >
            {level.toString().padStart(2, '0')}
          </Typography>
        </Box>
        
        <Box>
          <Typography 
            variant="h6" 
            sx={{ 
              fontFamily: darkMode ? '"Press Start 2P", cursive' : '"Poppins", sans-serif',
              color: darkMode ? '#00ff00' : '#6c757d',
              fontSize: darkMode ? '0.9rem' : '1rem',
              mb: 1,
              fontWeight: darkMode ? 400 : 600,
              textShadow: darkMode ? '0 0 3px #00ff00' : 'none',
            }}
          >
            LINES
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              fontFamily: darkMode ? '"Press Start 2P", cursive' : '"Poppins", sans-serif',
              color: darkMode ? '#ffffff' : '#495057',
              letterSpacing: '1px',
              fontSize: darkMode ? '1rem' : '1.2rem',
              fontWeight: darkMode ? 400 : 500,
            }}
          >
            {lines.toString().padStart(3, '0')}
          </Typography>
        </Box>
      </Paper>

      {/* Next piece preview */}
      <Paper 
        elevation={darkMode ? 3 : 2}
        sx={{ 
          p: 2,
          bgcolor: darkMode ? '#111' : '#f8f9fa',
          border: darkMode ? '2px solid #333' : '2px solid #e9ecef',
          boxShadow: darkMode
            ? '0 0 10px rgba(0, 255, 0, 0.5)' 
            : '0 0 10px rgba(173, 216, 230, 0.5)',
          width: 200,
          borderRadius: darkMode ? 0 : 16,
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            fontFamily: darkMode ? '"Press Start 2P", cursive' : '"Poppins", sans-serif',
            color: darkMode ? '#00ff00' : '#6c757d',
            fontSize: darkMode ? '0.9rem' : '1rem',
            mb: 2,
            fontWeight: darkMode ? 400 : 600,
            textShadow: darkMode ? '0 0 3px #00ff00' : 'none',
          }}
        >
          NEXT BLOCK
        </Typography>

        <Box 
          sx={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: 1,
            minHeight: '100px', // Ensuring enough vertical space
            bgcolor: darkMode ? 'black' : '#eaeaea', // Match main game board background
            border: darkMode ? '1px solid #333' : '1px solid #dee2e6',
            borderRadius: darkMode ? 0 : 8,
          }}
        >
          <Box
            sx={{ 
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: 'auto', 
              height: 'auto',
            }}
          >
            {previewShape.map((row, rowIndex) => (
              <Box 
                key={`next-row-${rowIndex}`}
                sx={{ 
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%'
                }}
              >
                {row.map((cell, cellIndex) => (
                  <Box 
                    key={`next-cell-${rowIndex}-${cellIndex}`}
                    sx={{
                      width: 25,
                      height: 25,
                      backgroundColor: cell !== 0 
                        ? (darkMode 
                            ? neonColors[nextPiece.color as keyof typeof neonColors] 
                            : pastelColors[nextPiece.color as keyof typeof pastelColors])
                        : 'transparent',
                      // Simple borders matching the main game board
                      border: cell !== 0 
                        ? (darkMode 
                            ? '2px solid rgba(255,255,255,0.3)' 
                            : '1px solid rgba(0,0,0,0.15)')
                        : 'none',
                      boxSizing: 'border-box',
                      borderRadius: darkMode ? 0 : 0.5, // Match main board block's borderRadius
                    }}
                  />
                ))}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Game controls instructions */}
        <Box 
          mt={3}
          sx={{
            p: 1.5,
            bgcolor: darkMode ? 'rgba(0,0,0,0.6)' : 'rgba(240, 240, 245, 0.6)',
            border: darkMode ? '1px solid #333' : '1px solid #dee2e6',
            borderRadius: darkMode ? 0 : 8,
          }}
        >
          <Typography 
            variant="body2" 
            sx={{ 
              fontFamily: darkMode ? '"Press Start 2P", cursive' : '"Poppins", sans-serif',
              color: darkMode ? '#00ff00' : '#6c757d',
              fontSize: darkMode ? '0.8rem' : '0.7rem', // Increased font size in night mode
              mb: 1.5,
              fontWeight: darkMode ? 400 : 600,
              textShadow: darkMode ? '0 0 3px #00ff00' : 'none',
            }}
          >
            CONTROLS
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              fontFamily: darkMode ? 'monospace' : '"Poppins", sans-serif',
              color: darkMode ? '#ffffff' : '#6c757d',
              fontSize: darkMode ? '0.8rem' : '0.7rem', // Increased font size in night mode
              mb: 0.8,
              letterSpacing: darkMode ? '0.05em' : 'normal',
              textShadow: darkMode ? '0 0 2px rgba(255,255,255,0.5)' : 'none',
            }}
          >
            ← → : Move
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              fontFamily: darkMode ? 'monospace' : '"Poppins", sans-serif',
              color: darkMode ? '#ffffff' : '#6c757d',
              fontSize: darkMode ? '0.8rem' : '0.7rem', // Increased font size in night mode
              mb: 0.8,
              letterSpacing: darkMode ? '0.05em' : 'normal',
              textShadow: darkMode ? '0 0 2px rgba(255,255,255,0.5)' : 'none',
            }}
          >
            ↑ : Rotate
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              fontFamily: darkMode ? 'monospace' : '"Poppins", sans-serif',
              color: darkMode ? '#ffffff' : '#6c757d',
              fontSize: darkMode ? '0.8rem' : '0.7rem', // Increased font size in night mode
              mb: 0.8,
              letterSpacing: darkMode ? '0.05em' : 'normal',
              textShadow: darkMode ? '0 0 2px rgba(255,255,255,0.5)' : 'none',
            }}
          >
            ↓ : Soft Drop
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              fontFamily: darkMode ? 'monospace' : '"Poppins", sans-serif',
              color: darkMode ? '#ffffff' : '#6c757d', 
              fontSize: darkMode ? '0.8rem' : '0.7rem', // Increased font size in night mode
              mb: 0.8,
              letterSpacing: darkMode ? '0.05em' : 'normal',
              textShadow: darkMode ? '0 0 2px rgba(255,255,255,0.5)' : 'none',
            }}
          >
            SPACE : Hard Drop
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              fontFamily: darkMode ? 'monospace' : '"Poppins", sans-serif',
              color: darkMode ? '#ffffff' : '#6c757d',
              fontSize: darkMode ? '0.8rem' : '0.7rem', // Increased font size in night mode
              letterSpacing: darkMode ? '0.05em' : 'normal',
              textShadow: darkMode ? '0 0 2px rgba(255,255,255,0.5)' : 'none',
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