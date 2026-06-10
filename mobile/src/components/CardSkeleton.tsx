import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';

export default function CardSkeleton() {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacity]);

  return (
    <View className="bg-white rounded-2xl border border-gray-100 mb-5 p-4">
      <Animated.View style={{ opacity }} className="h-48 w-full bg-gray-200 rounded-xl mb-4" />
      <Animated.View style={{ opacity }} className="h-4 w-1/4 bg-gray-200 rounded mb-2" />
      <Animated.View style={{ opacity }} className="h-6 w-3/4 bg-gray-200 rounded mb-2" />
      <Animated.View style={{ opacity }} className="h-4 w-full bg-gray-200 rounded mb-4" />
      <Animated.View style={{ opacity }} className="h-10 w-full bg-gray-200 rounded-xl" />
    </View>
  );
}
