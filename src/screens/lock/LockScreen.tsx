import {StyleSheet, View} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {GestureDetector} from 'react-native-gesture-handler';
import {commonStyles} from '../../utility/commonStyles';
import {SCREEN_WIDTH} from '../../utility/constants';

interface LockScreenProps {}

export default function LockScreen({}: LockScreenProps) {
  const lineStyle = useAnimatedStyle(() => {
    return {};
  });

  return (
    <View style={[commonStyles.flexOne, styles.container]}>
      <View style={[styles.box]}>
        <Animated.View style={[styles.dot]} />
        <Animated.View style={[styles.dot]} />
        <Animated.View style={[styles.dot]} />
      </View>
    </View>
  );
}

const SIZE = 30;

const styles = StyleSheet.create({
  dot: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE,
    backgroundColor: 'orange',
  },
  box: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
    backgroundColor: 'red',
  },
  container: {
    justifyContent: 'center',
  },
});
