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
  onMoveDown: () => void; // Added for proper down movement
}

const GameControls: React.FC<GameControlsProps> = ({
  onReset,
  onPause,
  onMove,
  onRotate,
  onDrop,
  paused,
  gameOver,
  onMoveDown, // Added for proper down movement
}) => {
  const buttonSx = {
    minWidth: 0,
    width: '100%',
    height: '100%',
    p: 1.5,
    fontSize: '1rem',
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

  const actionButtonSx = {
    ...buttonSx,
    backgroundColor: paused ? 'rgba(255, 0, 0, 0.1)' : 'rgba(0, 255, 0, 0.1)',
    '&:hover': {
      backgroundColor: paused ? 'rgba(255, 0, 0, 0.2)' : 'rgba(0, 255, 0, 0.2)',
      boxShadow: paused ? '0 0 10px #ff0000' : '0 0 10px #00ff00',
    },
  };

  return (
    <Paper
      elevation={3}
      sx={{ 
        p: 2,
        bgcolor: '#111',
        border: '2px solid #333',
        boxShadow: '0 0 10px rgba(0, 255, 0, 0.5)',
        width: '100%',
        maxWidth: 240,
      }}
    >
      {/* Action buttons (Reset/Pause) */}
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={6} component="div">
            <Button 
              variant="contained" 
              onClick={onReset}
              startIcon={<RefreshIcon />}
              sx={buttonSx}
            >
              Reset
            </Button>
          </Grid>
          <Grid item xs={6} component="div">
            <Button 
              variant="contained" 
              onClick={onPause}
              startIcon={paused ? <PlayArrowIcon /> : <PauseIcon />}
              sx={actionButtonSx}
              disabled={gameOver}
            >
              {paused ? 'Play' : 'Pause'}
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Direction controls - Cross layout */}
      <Box sx={{ mb: 3 }}>
        {/* Top row - Up button */}
        <Box display="flex" justifyContent="center" mb={1}>
          <Box width="33%">
            <Button
              fullWidth
              variant="contained"
              onClick={() => onRotate()}
              sx={buttonSx}
            >
              <KeyboardArrowUpIcon />
            </Button>
          </Box>
        </Box>
        
        {/* Middle row - Left and Right buttons */}
        <Box display="flex" justifyContent="center" mb={1}>
          <Box width="33%" mr={1}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => onMove(-1)}
              sx={buttonSx}
            >
              <KeyboardArrowLeftIcon />
            </Button>
          </Box>
          <Box width="33%" ml={1}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => onMove(1)}
              sx={buttonSx}
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
              sx={buttonSx}
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
          sx={{
            ...buttonSx,
            backgroundColor: 'rgba(255, 255, 0, 0.1)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 0, 0.2)',
              boxShadow: '0 0 10px #ffff00',
            },
          }}
        >
          Hard Drop
        </Button>
      </Box>
    </Paper>
  );
};

export default GameControls;