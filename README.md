# Snake Game in React Native

A modern implementation of the classic Snake game built using **React Native** and **Expo**. The game is responsive, interactive, and designed for mobile platforms.

## Features
- 🎮 **Dynamic Gameplay**: Move the snake to eat food and grow, avoiding collisions.
- 🏆 **High Score Tracking**: Keeps track of your highest score across sessions.
- ⏸️ **Pause/Resume**: Pause the game at any point and resume when ready.
- 🐍 **Customizable Grid**: Adjustable game configurations for grid size, snake speed, and initial length.

## Screenshots
*(Include screenshots or GIFs of the game interface to showcase the gameplay.)*

## Installation

### Prerequisites
Ensure you have the following installed on your development environment:
- **Node.js** (latest LTS version)
- **Expo CLI**: Install via `npm install -g expo-cli`
- A mobile device or emulator for testing (Expo Go app recommended)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/Isomkevin/snake-game-react-native.git
   cd snake-game-react-native
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   expo start
   ```

4. Scan the QR code in the Expo Go app to run the game on your mobile device.

## File Structure
```
├── components
│   ├── Controls.js      # Handles directional controls
│   ├── GameBoard.js     # Renders the snake and food
├── globalStyles.js      # Common styles for the app
├── constants.js         # Game configuration values
├── utils.js             # Helper functions for the game logic
├── App.js               # Main entry point
```

## Key Code Highlights

### Game Configuration (`constants.js`)
Customizable parameters for grid size, snake speed, and initial settings:
```javascript
export const GAME_CONFIG = {
  GRID_SIZE: 20,
  CELL_SIZE: 15,
  GAME_SPEED: 150,
  INITIAL_SNAKE_LENGTH: 3,
  POINTS_PER_FOOD: 10,
  DIRECTIONS: {
    UP: 'UP',
    DOWN: 'DOWN',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
  },
};
```

### Game Over Alert
Displays a game-over message with options to play again or close:
```javascript
Alert.alert(
  'Game Over!',
  `Score: ${score}\nHigh Score: ${Math.max(highScore, score)}`,
  [
    { text: 'Play Again', onPress: initializeGame },
    { text: 'Close', style: 'cancel' },
  ]
);
```

## How to Play
1. Tap **Start Game** to begin.
2. Use the on-screen controls to move the snake.
3. Avoid collisions with the walls or yourself.
4. Try to beat your high score!

## Customization
Modify the game settings in `constants.js` to customize gameplay:
- **Grid Size**: Change `GRID_SIZE` for a larger or smaller play area.
- **Snake Speed**: Adjust `GAME_SPEED` for faster or slower gameplay.
- **Initial Length**: Set `INITIAL_SNAKE_LENGTH` for a longer or shorter starting snake.

## Future Enhancements
- 🎨 **Theme Support**: Add light/dark mode themes.
- 📈 **Advanced Stats**: Track more detailed gameplay statistics.
- 🌎 **Online Leaderboard**: Compete with players worldwide.
- 🕹️ **Multiplayer Mode**: Play against friends in real-time.

## Contributing
Contributions are welcome! Feel free to:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

## License
This project is licensed under the [MIT License](LICENSE).

---