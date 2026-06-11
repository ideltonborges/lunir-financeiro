import React, { useRef, useEffect } from 'react';
import { View, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './styles';

interface SlideItemProps {
  item: any;
  index: number;
  currentSlide: number;
}

export const SlideItem = ({ item, index, currentSlide }: SlideItemProps) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(20)).current;
  const descOpacity = useRef(new Animated.Value(0)).current;
  const descTranslateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    if (currentSlide === index) {
      scaleAnim.setValue(0);
      titleOpacity.setValue(0);
      titleTranslateY.setValue(20);
      descOpacity.setValue(0);
      descTranslateY.setValue(20);

      Animated.parallel([
        Animated.spring(scaleAnim, { toValue: 1, friction: 4, tension: 100, useNativeDriver: true, delay: 150 }),
        Animated.timing(titleOpacity, { toValue: 1, duration: 400, useNativeDriver: true, delay: 300 }),
        Animated.timing(titleTranslateY, { toValue: 0, duration: 400, useNativeDriver: true, delay: 300 }),
        Animated.timing(descOpacity, { toValue: 1, duration: 400, useNativeDriver: true, delay: 400 }),
        Animated.timing(descTranslateY, { toValue: 0, duration: 400, useNativeDriver: true, delay: 400 }),
      ]).start();
    }
  }, [currentSlide, index]);

  return (
    <View style={styles.slide}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <LinearGradient colors={item.colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.iconContainer}>
          <item.icon size={80} color="#fff" />
        </LinearGradient>
      </Animated.View>
      <Animated.Text style={[styles.title, { opacity: titleOpacity, transform: [{ translateY: titleTranslateY }] }]}>
        {item.title}
      </Animated.Text>
      <Animated.Text style={[styles.description, { opacity: descOpacity, transform: [{ translateY: descTranslateY }] }]}>
        {item.description}
      </Animated.Text>
    </View>
  );
};