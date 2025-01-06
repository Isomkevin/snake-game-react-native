// components/Controls.js
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { GAME_CONFIG } from '../constants';

export default function Controls({ onDirectionChange, styles }) {
  return (
    <View style={styles.controls}>
      <TouchableOpacity
        onPress={() => onDirectionChange(GAME_CONFIG.DIRECTIONS.UP)}
        style={[styles.controlButton, styles.topButton]}>
        <View style={styles.upArrow} />
      </TouchableOpacity>
      <View style={styles.middleControls}>
        <TouchableOpacity
          onPress={() => onDirectionChange(GAME_CONFIG.DIRECTIONS.LEFT)}
          style={[styles.controlButton, styles.leftButton]}>
          <View style={styles.leftArrow} />
        </TouchableOpacity>
        <View style={styles.centerSpace} />
        <TouchableOpacity
          onPress={() => onDirectionChange(GAME_CONFIG.DIRECTIONS.RIGHT)}
          style={[styles.controlButton, styles.rightButton]}>
          <View style={styles.rightArrow} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => onDirectionChange(GAME_CONFIG.DIRECTIONS.DOWN)}
        style={[styles.controlButton, styles.bottomButton]}>
        <View style={styles.downArrow} />
      </TouchableOpacity>
    </View>
  );
}