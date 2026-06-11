import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, Animated } from 'react-native';
import { getStyles } from './styles';
import { useTheme } from '../../contexts/ThemeContext';

interface ToggleSwitchProps {
  value: boolean;
  onPress: () => void;
  disabled?: boolean;
  activeColor?: string;
}

export function ToggleSwitch({
  value,
  onPress,
  disabled = false,
  activeColor = '#3B82F6',
}: ToggleSwitchProps) {
  const thumbAnim = useRef(new Animated.Value(value ? 22 : 0)).current;
  const { colors } = useTheme();
  const styles = getStyles(colors);

  useEffect(() => {
    Animated.spring(thumbAnim, {
      toValue: value ? 22 : 0,
      friction: 5,
      tension: 300,
      useNativeDriver: true,
    }).start();
  }, [value]);

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={[
        styles.switchTrack,
        value ? { ...styles.switchTrackOn, backgroundColor: activeColor } : styles.switchTrackOff,
        disabled && styles.switchTrackDisabled,
      ]}
    >
      <Animated.View
        style={[
          styles.switchThumb,
          { transform: [{ translateX: thumbAnim }] },
        ]}
      />
    </TouchableOpacity>
  );
}