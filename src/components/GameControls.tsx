import React from 'react';
import { Box, Button, Paper, Grid } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RefreshIcon from '@mui/icons-material/Refresh';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';

interface GameControlsProps {
  onReset: () => void;
  onPause: () => void;
  onMove: (direction: number) => void;
  onRotate: () => void;
  onDrop: () => void;
  paused: boolean;
  gameOver: boolean;
  onMoveDown: () => void;
  darkMode: boolean;
}

const GameControls: React.FC<GameControlsProps> = ({
  onReset,
  onPause,
  onMove,
  onRotate,
  onDrop,
  paused,
  gameOver,
  onMoveDown,
  darkMode,
}) => {
  // Light mode button styles
  const lightButtonSx = {
    minWidth: 0,
    width: '100%',
    height: '100%',
    p: 1.5,
    fontSize: '1rem',
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 500,
    color: '#495057',
    backgroundColor: '#e9ecef',
    border: 'none',
    borderRadius: 8,
    transition: 'all 0.2s',
    boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
    '&:hover': {
      backgroundColor: '#dee2e6',
      boxShadow: '0px 4px 8px rgba(0,0,0,0.15)',
      transform: 'translateY(-2px)',
    },
    '&:active': {
      backgroundColor: '#ced4da',
      transform: 'translateY(0)',
    },
  };

  // Light mode action button styles (play/pause)
  const lightActionButtonSx = {
    ...lightButtonSx,
    backgroundColor: paused ? '#ffcad4' : '#a8e6cf',
    color: paused ? '#e63946' : '#087f5b',
    '&:hover': {
      backgroundColor: paused ? '#ffb3c1' : '#8bd8bd',
      boxShadow: '0px 4px 8px rgba(0,0,0,0.15)',
      transform: 'translateY(-2px)',
    },
  };

  // Dark mode retro button styles
  const darkButtonSx = {
    minWidth: 0,
    width: '100%',
    height: '100%',
    p: 1.5,
    fontSize: '0.8rem',
    fontFamily: '"Press Start 2P", cursive',
    color: '#ffffff',
    backgroundColor: 'rgba(0, 255, 0, 0.1)',
    border: '2px solid #333',
    borderRadius: 0,
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: 'rgba(0, 255, 0, 0.2)',
      boxShadow: '0 0 10px #00ff00',
    },
    '&:active': {
      backgroundColor: 'rgba(0, 255, 0, 0.3)',
      transform: 'scale(0.95)',
    },
  };

  // Dark mode action button styles (play/pause)
  const darkActionButtonSx = {
    ...darkButtonSx,
    backgroundColor: paused ? 'rgba(255, 0, 0, 0.1)' : 'rgba(0, 255, 0, 0.1)',
    '&:hover': {
      backgroundColor: paused ? 'rgba(255, 0, 0, 0.2)' : 'rgba(0, 255, 0, 0.2)',
      boxShadow: paused ? '0 0 10px #ff0000' : '0 0 10px #00ff00',
    },
  };

  // Use appropriate styles based on theme mode
  const buttonSx = darkMode ? darkButtonSx : lightButtonSx;
  const actionButtonSx = darkMode ? darkActionButtonSx : lightActionButtonSx;

  return (
    <Paper
      elevation={darkMode ? 3 : 2}
      sx={{ 
        p: 2,
        bgcolor: darkMode ? '#111' : '#f8f9fa',
        border: darkMode ? '2px solid #333' : '2px solid #e9ecef',
        boxShadow: darkMode 
          ? '0 0 10px rgba(0, 255, 0, 0.5)' 
          : '0 0 10px rgba(173, 216, 230, 0.5)',
        width: '100%',
        maxWidth: 240,
        borderRadius: darkMode ? 0 : 16,
      }}
    >
      {/* Action buttons (Reset/Pause) */}
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={darkMode ? 1 : 2} justifyContent="center">
          <Box sx={{ width: '50%', px: 1 }}>
            <Button 
              variant="contained" 
              onClick={onReset}
              startIcon={<RefreshIcon />}
              sx={buttonSx}
              fullWidth
            >
              Reset
            </Button>
          </Box>
          <Box sx={{ width: '50%', px: 1 }}>
            <Button 
              variant="contained" 
              onClick={onPause}
              startIcon={paused ? <PlayArrowIcon /> : <PauseIcon />}
              sx={actionButtonSx}
              disabled={gameOver}
              fullWidth
            >
              {paused ? 'Play' : 'Pause'}
            </Button>
          </Box>
        </Grid>
      </Box>

      {/* Direction controls - Cross layout */}
      <Box sx={{ mb: 3 }}>
        {/* Top row - Up button */}
        <Box display="flex" justifyContent="center" mb={darkMode ? 1 : 1.5}>
          <Box width="33%">
            <Button
              fullWidth
              variant="contained"
              onClick={() => onRotate()}
              sx={darkMode 
                ? buttonSx 
                : {...lightButtonSx, backgroundColor: '#bde0fe', color: '#1d3557'}
              }
            >
              <KeyboardArrowUpIcon />
            </Button>
          </Box>
        </Box>
        
        {/* Middle row - Left and Right buttons */}
        <Box display="flex" justifyContent="center" mb={darkMode ? 1 : 1.5}>
          <Box width="33%" mr={darkMode ? 1 : 1.5}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => onMove(-1)}
              sx={darkMode 
                ? buttonSx 
                : {...lightButtonSx, backgroundColor: '#bde0fe', color: '#1d3557'}
              }
            >
              <KeyboardArrowLeftIcon />
            </Button>
          </Box>
          <Box width="33%" ml={darkMode ? 1 : 1.5}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => onMove(1)}
              sx={darkMode 
                ? buttonSx 
                : {...lightButtonSx, backgroundColor: '#bde0fe', color: '#1d3557'}
              }
            >
              <KeyboardArrowRightIcon />
            </Button>
          </Box>
        </Box>
        
        {/* Bottom row - Down button */}
        <Box display="flex" justifyContent="center">
          <Box width="33%">
            <Button
              fullWidth
              variant="contained"
              onClick={() => onMoveDown()}
              sx={darkMode 
                ? buttonSx 
                : {...lightButtonSx, backgroundColor: '#bde0fe', color: '#1d3557'}
              }
            >
              <KeyboardArrowDownIcon />
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Hard drop button */}
      <Box>
        <Button
          variant="contained"
          onClick={onDrop}
          startIcon={<VerticalAlignBottomIcon />}
          fullWidth
          sx={darkMode
            ? {
                ...darkButtonSx,
                backgroundColor: 'rgba(255, 255, 0, 0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 0, 0.2)',
                  boxShadow: '0 0 10px #ffff00',
                },
              }
            : {
                ...lightButtonSx,
                backgroundColor: '#ffd3b6',
                color: '#e76f51',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: '#ffcad4',
                  boxShadow: '0px 4px 8px rgba(0,0,0,0.15)',
                  transform: 'translateY(-2px)',
                },
              }
          }
        >
          Hard Drop
        </Button>
      </Box>
    </Paper>
  );
};

export default GameControls;