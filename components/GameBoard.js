// components/GameBoard.js
import React from 'react';
import { View } from 'react-native';
import { GAME_CONFIG } from '../constants';

export default function GameBoard({ snake, food, styles }) {
  return (
    <View style={styles.gameArea}>
      <View
        style={[
          styles.food,
          { 
            left: food.x * GAME_CONFIG.CELL_SIZE, 
            top: food.y * GAME_CONFIG.CELL_SIZE,
            backgroundColor: GAME_CONFIG.COLORS.FOOD 
          },
        ]}
      />
      {snake.map((segment, index) => (
        <View
          key={index}
          style={[
            styles.snakeSegment,
            {
              left: segment.x * GAME_CONFIG.CELL_SIZE,
              top: segment.y * GAME_CONFIG.CELL_SIZE,
              backgroundColor: index === 0 
                ? GAME_CONFIG.COLORS.SNAKE_HEAD 
                : GAME_CONFIG.COLORS.SNAKE_BODY,
            },
          ]}
        />
      ))}
    </View>
  );
}