import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { styles } from './globalStyles';
import { GAME_CONFIG } from './constants';
import { getInitialSnake, getRandomPosition, getOppositeDirection } from './utils';
import GameBoard from './components/GameBoard';
import Controls from './components/Controls';

const App = () => {
  const [snake, setSnake] = useState([]);
  const [direction, setDirection] = useState(GAME_CONFIG.DIRECTIONS.RIGHT);
  const [food, setFood] = useState({ x: 0, y: 0 });
  const [isGameOver, setIsGameOver] = useState(true);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const generateFood = useCallback((currentSnake) => {
    const snakePositions = new Set(
      currentSnake.map((segment) => `${segment.x},${segment.y}`)
    );

    let newFood;
    do {
      newFood = getRandomPosition(GAME_CONFIG.GRID_SIZE);
    } while (snakePositions.has(`${newFood.x},${newFood.y}`));

    setFood(newFood);
  }, []);

  const initializeGame = useCallback(() => {
    const initialSnake = getInitialSnake(
      GAME_CONFIG.GRID_SIZE,
      GAME_CONFIG.INITIAL_SNAKE_LENGTH
    );
    setSnake(initialSnake);
    setDirection(GAME_CONFIG.DIRECTIONS.RIGHT);
    setScore(0);
    setIsGameOver(false);
    setIsPaused(false);
    generateFood(initialSnake);
  }, [generateFood]);

  const checkCollision = useCallback(
    (head) => {
      return (
        head.x < 0 ||
        head.x >= GAME_CONFIG.GRID_SIZE ||
        head.y < 0 ||
        head.y >= GAME_CONFIG.GRID_SIZE ||
        snake.slice(1).some((segment) => segment.x === head.x && segment.y === head.y)
      );
    },
    [snake]
  );

  const handleGameOver = useCallback(() => {
    setIsGameOver(true);
    setHighScore((prev) => Math.max(prev, score));
    Alert.alert(
      'Game Over!',
      `Score: ${score}\nHigh Score: ${Math.max(highScore, score)}`,
      [
        { text: 'Play Again', onPress: initializeGame },
        { text: 'Close', style: 'cancel' },
      ]
    );
  }, [score, highScore, initializeGame]);

  const moveSnake = useCallback(() => {
    if (isGameOver || isPaused) return;

    const newSnake = [...snake];
    const head = { ...newSnake[0] };

    switch (direction) {
      case GAME_CONFIG.DIRECTIONS.UP:
        head.y -= 1;
        break;
      case GAME_CONFIG.DIRECTIONS.DOWN:
        head.y += 1;
        break;
      case GAME_CONFIG.DIRECTIONS.LEFT:
        head.x -= 1;
        break;
      case GAME_CONFIG.DIRECTIONS.RIGHT:
        head.x += 1;
        break;
    }

    if (checkCollision(head)) {
      handleGameOver();
      return;
    }

    newSnake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      setScore((prevScore) => prevScore + GAME_CONFIG.POINTS_PER_FOOD);
      generateFood(newSnake);
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }, [
    snake,
    direction,
    food,
    isGameOver,
    isPaused,
    checkCollision,
    generateFood,
    handleGameOver
  ]);

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  const handleControl = useCallback((newDirection) => {
    if (getOppositeDirection(newDirection) !== direction) {
      setDirection(newDirection);
    }
  }, [direction]);

  useEffect(() => {
    if (!isGameOver && !isPaused) {
      const interval = setInterval(moveSnake, GAME_CONFIG.GAME_SPEED);
      return () => clearInterval(interval);
    }
  }, [isGameOver, isPaused, moveSnake]);

  return (
    <View style={styles.container}>
      <Text style={styles.scoreText}>Score: {score}</Text>
      <Text style={styles.highScoreText}>High Score: {highScore}</Text>

      <GameBoard snake={snake} food={food} styles={styles} />

      {!isGameOver && (
        <TouchableOpacity style={styles.startButton} onPress={togglePause}>
          <Text style={styles.startButtonText}>
            {isPaused ? 'Resume' : 'Pause'}
          </Text>
        </TouchableOpacity>
      )}

      {isGameOver && (
        <TouchableOpacity style={styles.startButton} onPress={initializeGame}>
          <Text style={styles.startButtonText}>Start Game</Text>
        </TouchableOpacity>
      )}

      <Controls onDirectionChange={handleControl} styles={styles} />
    </View>
  );
};

export default App;