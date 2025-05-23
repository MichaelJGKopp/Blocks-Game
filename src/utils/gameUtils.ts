// Block types
export type BlockType = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z';

// Block piece with shape and color
export interface Block {
  shape: number[][];
  color: number;  // Color represented by a number 1-7
  type: BlockType;
}

// Block shapes defined as matrices
export const BLOCKS: Record<BlockType, Block> = {
  I: {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: 1, // Cyan
    type: 'I',
  },
  J: {
    shape: [
      [2, 0, 0],
      [2, 2, 2],
      [0, 0, 0],
    ],
    color: 2, // Blue
    type: 'J',
  },
  L: {
    shape: [
      [0, 0, 3],
      [3, 3, 3],
      [0, 0, 0],
    ],
    color: 3, // Orange
    type: 'L',
  },
  O: {
    shape: [
      [4, 4],
      [4, 4],
    ],
    color: 4, // Yellow
    type: 'O',
  },
  S: {
    shape: [
      [0, 5, 5],
      [5, 5, 0],
      [0, 0, 0],
    ],
    color: 5, // Green
    type: 'S',
  },
  T: {
    shape: [
      [0, 6, 0],
      [6, 6, 6],
      [0, 0, 0],
    ],
    color: 6, // Purple
    type: 'T',
  },
  Z: {
    shape: [
      [7, 7, 0],
      [0, 7, 7],
      [0, 0, 0],
    ],
    color: 7, // Red
    type: 'Z',
  },
};

// Color mapping for the blocks
export const COLORS = [
  'transparent',   // 0: Empty cell
  '#00ffff',       // 1: Cyan (I)
  '#0000ff',       // 2: Blue (J)
  '#ff7f00',       // 3: Orange (L)
  '#ffff00',       // 4: Yellow (O)
  '#00ff00',       // 5: Green (S)
  '#800080',       // 6: Purple (T)
  '#ff0000',       // 7: Red (Z)
];

// Create an empty game board
export const createEmptyBoard = (width: number, height: number): number[][] => {
  return Array(height).fill(null).map(() => Array(width).fill(0));
};

// Track the last generated block type to avoid repeats
let lastBlockType: BlockType | null = null;

// Generate a random block piece, ensuring it's not the same as the previous one
export const generateRandomPiece = (): Block => {
  const blockTypes: BlockType[] = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
  
  // If we have a previous block type, filter it out from possible options
  const availableTypes = lastBlockType 
    ? blockTypes.filter(type => type !== lastBlockType) 
    : blockTypes;
  
  // Pick a random type from available options
  const randomIndex = Math.floor(Math.random() * availableTypes.length);
  const randomType = availableTypes[randomIndex];
  
  // Update the last block type for next time
  lastBlockType = randomType;
  
  // Create a deep copy to ensure no references are shared
  return JSON.parse(JSON.stringify(BLOCKS[randomType]));
};

// Rotate a matrix (for block rotation)
export const rotateMatrix = (matrix: number[][]): number[][] => {
  const size = matrix.length;
  const rotated: number[][] = [];
  
  for (let i = 0; i < size; i++) {
    rotated.push([]);
    for (let j = 0; j < size; j++) {
      rotated[i][j] = matrix[size - j - 1][i];
    }
  }
  
  return rotated;
};

// Check for collisions
export const checkCollision = (
  piece: number[][],
  board: number[][],
  position: { x: number, y: number }
): boolean => {
  for (let y = 0; y < piece.length; y++) {
    for (let x = 0; x < piece[y].length; x++) {
      if (piece[y][x] !== 0) {
        const boardX = x + position.x;
        const boardY = y + position.y;
        
        // Check for collision with board boundaries or existing pieces
        if (
          boardX < 0 || 
          boardX >= board[0].length || 
          boardY >= board.length ||
          (boardY >= 0 && board[boardY][boardX] !== 0)
        ) {
          return true;
        }
      }
    }
  }
  
  return false;
};