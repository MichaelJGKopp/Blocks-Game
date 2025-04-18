import { useState, useEffect, useCallback } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Box, Typography, Container } from '@mui/material';
import './App.css';
import TetrisBoard from './components/TetrisBoard';
import GameControls from './components/GameControls';
import ScorePanel from './components/ScorePanel';
import { generateRandomPiece, rotateMatrix, checkCollision, createEmptyBoard, Tetromino } from './utils/gameUtils';

// Create a retro-themed dark theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00ff00', // Neon green for that retro feel
    },
    secondary: {
      main: '#ff00ff', // Neon pink
    },
    background: {
      default: '#000000',
      paper: '#111111',
    },
  },
  typography: {
    fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2rem',
      letterSpacing: '0.1em',
      textShadow: '0 0 5px #00ff00, 0 0 10px #00ff00',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
          padding: '10px 20px',
          '&:hover': {
            boxShadow: '0 0 10px #00ff00',
          },
        },
      },
    },
  },
});

// Game settings
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const INITIAL_DROP_TIME = 1000; // 1 second
const SPEED_INCREMENT = 50; // ms faster per level

function App() {
  // Game state
  const [board, setBoard] = useState(createEmptyBoard(BOARD_WIDTH, BOARD_HEIGHT));
  const [currentPiece, setCurrentPiece] = useState(generateRandomPiece());
  const [position, setPosition] = useState({ x: Math.floor(BOARD_WIDTH / 2) - 2, y: 0 });
  const [nextPiece, setNextPiece] = useState(generateRandomPiece());
  const [dropTime, setDropTime] = useState(INITIAL_DROP_TIME);
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState(0);

  // Handle completed lines
  const clearLines = useCallback(() => {
    let linesCleared = 0;
    const newBoard = board.reduce((acc: number[][], row: number[]) => {
      if (row.every((cell: number) => cell !== 0)) {
        linesCleared++;
        acc.unshift(Array(BOARD_WIDTH).fill(0));
      } else {
        acc.push(row);
      }
      return acc;
    }, []);

    if (linesCleared > 0) {
      // Update score - classic scoring system
      const scoreIncrement = (() => {
        switch (linesCleared) {
          case 1: return 40 * level;
          case 2: return 100 * level;
          case 3: return 300 * level;
          case 4: return 1200 * level; // Tetris!
          default: return 0;
        }
      })();

      setScore(prev => prev + scoreIncrement);
      setLines(prev => {
        const newLines = prev + linesCleared;
        // Level up every 10 lines
        if (Math.floor(newLines / 10) > Math.floor(prev / 10)) {
          setLevel(Math.floor(newLines / 10) + 1);
          setDropTime(Math.max(100, INITIAL_DROP_TIME - SPEED_INCREMENT * Math.floor(newLines / 10)));
        }
        return newLines;
      });
      
      setBoard(newBoard);
    }
  }, [board, level]);

  // Merge the current tetromino into the board
  const mergePieceToBoard = useCallback(() => {
    const newBoard = [...board];
    
    currentPiece.shape.forEach((row: number[], y: number) => {
      row.forEach((value: number, x: number) => {
        if (value !== 0) {
          const boardY = y + position.y;
          const boardX = x + position.x;
          if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
            newBoard[boardY][boardX] = currentPiece.color;
          }
        }
      });
    });
    
    setBoard(newBoard);
    setCurrentPiece(nextPiece);
    setNextPiece(generateRandomPiece());
    setPosition({ x: Math.floor(BOARD_WIDTH / 2) - 2, y: 0 });
    
    // Check for game over
    if (checkCollision(nextPiece.shape, newBoard, { x: Math.floor(BOARD_WIDTH / 2) - 2, y: 0 })) {
      setGameOver(true);
    }
    
    // Check for completed lines
    clearLines();
  }, [board, currentPiece, nextPiece, position, clearLines]);

  // Move the piece down
  const movePieceDown = useCallback(() => {
    if (!gameOver && !paused) {
      const newPosition = { ...position, y: position.y + 1 };
      if (checkCollision(currentPiece.shape, board, newPosition)) {
        // If collision, lock the piece in place
        mergePieceToBoard();
      } else {
        setPosition(newPosition);
      }
    }
  }, [position, currentPiece, board, gameOver, paused, mergePieceToBoard]);

  // Move the piece left or right
  const movePieceHorizontal = useCallback((direction: number) => {
    if (!gameOver && !paused) {
      const newPosition = { ...position, x: position.x + direction };
      if (!checkCollision(currentPiece.shape, board, newPosition)) {
        setPosition(newPosition);
      }
    }
  }, [position, currentPiece, board, gameOver, paused]);

  // Rotate the piece
  const rotatePiece = useCallback(() => {
    if (!gameOver && !paused) {
      const rotatedPiece = { ...currentPiece, shape: rotateMatrix(currentPiece.shape) };
      
      // Check if the rotation causes collisions
      if (!checkCollision(rotatedPiece.shape, board, position)) {
        setCurrentPiece(rotatedPiece);
      }
    }
  }, [currentPiece, board, position, gameOver, paused]);

  // Drop the piece instantly (hard drop)
  const dropPiece = useCallback(() => {
    if (!gameOver && !paused) {
      let newY = position.y;
      while (!checkCollision(currentPiece.shape, board, { ...position, y: newY + 1 })) {
        newY++;
      }
      setPosition({ ...position, y: newY });
      mergePieceToBoard();
    }
  }, [position, currentPiece, board, gameOver, paused, mergePieceToBoard]);

  // Reset the game
  const resetGame = () => {
    setBoard(createEmptyBoard(BOARD_WIDTH, BOARD_HEIGHT));
    setCurrentPiece(generateRandomPiece());
    setNextPiece(generateRandomPiece());
    setPosition({ x: Math.floor(BOARD_WIDTH / 2) - 2, y: 0 });
    setDropTime(INITIAL_DROP_TIME);
    setGameOver(false);
    setPaused(false);
    setScore(0);
    setLevel(1);
    setLines(0);
  };

  // Toggle pause state
  const togglePause = () => {
    if (!gameOver) {
      setPaused(!paused);
    }
  };

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (gameOver) return;
      
      switch (event.key) {
        case 'ArrowLeft':
          movePieceHorizontal(-1);
          break;
        case 'ArrowRight':
          movePieceHorizontal(1);
          break;
        case 'ArrowDown':
          movePieceDown();
          break;
        case 'ArrowUp':
          rotatePiece();
          break;
        case ' ':
          dropPiece();
          break;
        case 'p':
        case 'P':
          togglePause();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [movePieceDown, movePieceHorizontal, rotatePiece, dropPiece, gameOver, togglePause]);

  // Auto drop
  useEffect(() => {
    if (!gameOver && !paused) {
      const interval = setInterval(() => {
        movePieceDown();
      }, dropTime);
      
      return () => {
        clearInterval(interval);
      };
    }
  }, [movePieceDown, dropTime, gameOver, paused]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        background: 'radial-gradient(circle, #111111 0%, #000000 100%)',
      }}>
        <Typography variant="h1" component="h1" 
          sx={{ 
            fontFamily: '"Press Start 2P", cursive',
            color: theme.palette.primary.main,
            mb: 4,
            textAlign: 'center',
          }}>
          RETRO TETRIS
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 4 }}>
          <ScorePanel score={score} level={level} lines={lines} nextPiece={nextPiece} />
          
          <TetrisBoard 
            board={board} 
            currentPiece={currentPiece} 
            position={position} 
            gameOver={gameOver}
            paused={paused}
          />
          
          <GameControls 
            onReset={resetGame} 
            onPause={togglePause} 
            onMove={movePieceHorizontal} 
            onRotate={rotatePiece} 
            onDrop={dropPiece}
            paused={paused}
            gameOver={gameOver}
            onMoveDown={movePieceDown}
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
