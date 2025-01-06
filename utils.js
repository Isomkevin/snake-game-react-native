// utils.js
export const getInitialSnake = (gridSize, length) => {
  return Array.from({ length }, (_, i) => ({
    x: Math.floor(gridSize / 4) - i,
    y: Math.floor(gridSize / 2),
  }));
};

export const getRandomPosition = (gridSize) => ({
  x: Math.floor(Math.random() * gridSize),
  y: Math.floor(Math.random() * gridSize),
});

export const getOppositeDirection = (direction) => {
  const opposites = {
    UP: 'DOWN',
    DOWN: 'UP',
    LEFT: 'RIGHT',
    RIGHT: 'LEFT',
  };
  return opposites[direction];
};