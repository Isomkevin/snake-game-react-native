import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { styles } from './globalStyles';
import { GAME_CONFIG } from './constants';

const { GRID_SIZE, CELL_SIZE, GAME_SPEED, INITIAL_SNAKE_LENGTH } = GAME_CONFIG;

const App = () => {
  const [snake, setSnake] = useState([]);
  const [direction, setDirection] = useState('RIGHT');
  const [food, setFood] = useState({ x: 0, y: 0 });
  const [isGameOver, setIsGameOver] = useState(true);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // Initialize game state
  const initializeGame = useCallback(() => {
    const initialSnake = Array.from(
      { length: INITIAL_SNAKE_LENGTH },
      (_, i) => ({
        x: Math.floor(GRID_SIZE / 4) - i,
        y: Math.floor(GRID_SIZE / 2),
      })
    );
    setSnake(initialSnake);
    setDirection('RIGHT');
    setScore(0);
    setIsGameOver(false);
    generateFood(initialSnake);
  }, []);

  // Generate food in a valid position
  const generateFood = useCallback((currentSnake) => {
    const snakePositions = new Set(
      currentSnake.map((segment) => `${segment.x},${segment.y}`)
    );

    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (snakePositions.has(`${newFood.x},${newFood.y}`));

    setFood(newFood);
  }, []);

  // Check for collisions
  const checkCollision = useCallback(
    (head) => {
      // Wall collision
      if (
        head.x < 0 ||
        head.x >= GRID_SIZE ||
        head.y < 0 ||
        head.y >= GRID_SIZE
      ) {
        return true;
      }

      // Self collision
      for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
          return true;
        }
      }

      return false;
    },
    [snake]
  );

  // Move snake
  const moveSnake = useCallback(() => {
    if (isGameOver) return;

    const newSnake = [...snake];
    const head = { ...newSnake[0] };

    switch (direction) {
      case 'UP':
        head.y -= 1;
        break;
      case 'DOWN':
        head.y += 1;
        break;
      case 'LEFT':
        head.x -= 1;
        break;
      case 'RIGHT':
        head.x += 1;
        break;
    }

    if (checkCollision(head)) {
      handleGameOver();
      return;
    }

    newSnake.unshift(head);

    // Check if food is eaten
    if (head.x === food.x && head.y === food.y) {
      setScore((prevScore) => prevScore + 10);
      generateFood(newSnake);
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }, [snake, direction, food, isGameOver, checkCollision, generateFood]);

  // Handle game over
  const handleGameOver = () => {
    setIsGameOver(true);
    setHighScore((prev) => Math.max(prev, score));
    Alert.alert(
      'Game Over!',
      `Score: ${score}\nHigh Score: ${Math.max(highScore, score)}`,
      [
        { text: 'Play Again', onPress: initializeGame },
        { text: 'Close', style: 'cancel' }, // This button acts as the "X" or close
      ]
    );
  };

  // Game loop
  useEffect(() => {
    if (!isGameOver) {
      const interval = setInterval(moveSnake, GAME_SPEED);
      return () => clearInterval(interval);
    }
  }, [isGameOver, moveSnake]);

  // Handle direction changes
  const handleControl = (newDirection) => {
    const opposites = {
      UP: 'DOWN',
      DOWN: 'UP',
      LEFT: 'RIGHT',
      RIGHT: 'LEFT',
    };

    if (opposites[newDirection] !== direction) {
      setDirection(newDirection);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.scoreText}>Score: {score}</Text>
      <Text style={styles.highScoreText}>High Score: {highScore}</Text>

      <View style={styles.gameArea}>
        {/* Food */}
        <View
          style={[
            styles.food,
            { left: food.x * CELL_SIZE, top: food.y * CELL_SIZE },
          ]}
        />

        {/* Snake */}
        {snake.map((segment, index) => (
          <View
            key={index}
            style={[
              styles.snakeSegment,
              {
                left: segment.x * CELL_SIZE,
                top: segment.y * CELL_SIZE,
                backgroundColor: index === 0 ? '#32CD32' : '#228B22',
              },
            ]}
          />
        ))}
      </View>

      {/* Start Button */}
      {isGameOver && (
        <TouchableOpacity style={styles.startButton} onPress={initializeGame}>
          <Text style={styles.startButtonText}>Start Game</Text>
        </TouchableOpacity>
      )}

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          onPress={() => handleControl('UP')}
          style={[styles.controlButton, styles.topButton]}>
          <View style={styles.upArrow} />
        </TouchableOpacity>
        <View style={styles.middleControls}>
          <TouchableOpacity
            onPress={() => handleControl('LEFT')}
            style={[styles.controlButton, styles.leftButton]}>
            <View style={styles.leftArrow} />
          </TouchableOpacity>
          <View style={styles.centerSpace} />
          <TouchableOpacity
            onPress={() => handleControl('RIGHT')}
            style={[styles.controlButton, styles.rightButton]}>
            <View style={styles.rightArrow} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => handleControl('DOWN')}
          style={[styles.controlButton, styles.bottomButton]}>
          <View style={styles.downArrow} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;
