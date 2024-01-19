import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {Colors} from '../../../utility/Colors';
import {clamp} from '../../../utility/animatedHelper';
import {commonStyles} from '../../../utility/commonStyles';

const CORNERSIZE = 30;

const MIDDLE = 30;

interface EditSquareProps {
  size: number;
  imageWidth: number;
  imageHeight: number;
  onStop: (width: number, height: number, x: number, y: number) => void;
}

export default function EditSquare({
  size,
  imageWidth,
  imageHeight,
  onStop,
}: EditSquareProps) {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  // Used this option to remember the position of x and y
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);

  const width = useSharedValue(size);
  const height = useSharedValue(size);

  const offsetWidth = useSharedValue(0);
  const offsetHeight = useSharedValue(0);

  // Used for set opposite origin fixed
  const boxTranslateX = useSharedValue(0);
  const offsetBoxTranslateX = useSharedValue(0);

  const origin = useSharedValue({
    x: 0,
    y: 0,
  });
  const opacity = useSharedValue(0);

  // Used for blink Horizontal and vertical lines
  const opacityOfHVLines = useSharedValue(0);

  useEffect(() => {
    if (imageHeight === 0) return;
    y.value = Math.abs((size - imageHeight) / 2);
    opacity.value = withTiming(1);
  }, [imageHeight]);

  const onGestureStop = (width: number, height: number, x: number, y: number) =>
    onStop(width, height, x, y);

  const gesture = Gesture.Pan()
    .onStart(() => {
      offsetX.value = x.value;
      offsetY.value = y.value;
      opacityOfHVLines.value = withTiming(1);
    })
    .onChange(e => {
      x.value = clamp(
        offsetX.value + e.translationX,
        0,
        imageWidth - width.value,
      );
      y.value = clamp(
        offsetY.value + e.translationY,
        0,
        imageHeight - height.value,
      );
    })
    .onEnd(() => {
      opacityOfHVLines.value = 0;
      runOnJS(onGestureStop)(width.value, height.value, x.value, y.value);
    });

  const leftGestrure = Gesture.Pan()
    .onStart(() => {
      offsetWidth.value = width.value;
      offsetHeight.value = height.value;
      origin.value.x = size;
      origin.value.y = 0;
      opacityOfHVLines.value = withTiming(1);
    })
    .onChange(e => {
      console.log('Left Gesture ', origin.value.x);
      const changesWidth = offsetWidth.value - e.translationX;
      const changesHeight = offsetHeight.value - e.translationX;
      boxTranslateX.value = offsetBoxTranslateX.value + e.translationX;
      width.value = clamp(changesWidth, size * 0.45, size);
      height.value = clamp(changesHeight, size * 0.45, size);
    })
    .onEnd(() => {
      opacityOfHVLines.value = 0;
      runOnJS(onGestureStop)(width.value, height.value, x.value, y.value);
    });

  const rightGesture = Gesture.Pan()
    .onStart(() => {
      offsetWidth.value = width.value;
      offsetHeight.value = height.value;
      origin.value.x = -size;
      origin.value.y = 0;
      opacityOfHVLines.value = withTiming(1);
    })
    .onChange(e => {
      console.log('right Gesture ', origin.value.x);
      const changesWidth = offsetWidth.value + e.translationX;
      const changesHeight = offsetHeight.value + e.translationX;
      width.value = clamp(changesWidth, size * 0.45, size);
      height.value = clamp(changesHeight, size * 0.45, size);
    })
    .onEnd(() => {
      opacityOfHVLines.value = 0;
      runOnJS(onGestureStop)(width.value, height.value, x.value, y.value);
    });

  const topGesture = Gesture.Pan()
    .onStart(() => {
      offsetWidth.value = width.value;
      offsetHeight.value = height.value;
      origin.value.x = 0;
      origin.value.y = size;
      opacityOfHVLines.value = withTiming(1);
    })
    .onChange(e => {
      console.log('top Gesture ', origin.value.y);

      width.value = clamp(
        offsetWidth.value - e.translationY,
        size * 0.45,
        size,
      );
      height.value = clamp(
        offsetHeight.value - e.translationY,
        size * 0.45,
        size,
      );
    })
    .onEnd(() => {
      opacityOfHVLines.value = 0;
      runOnJS(onGestureStop)(width.value, height.value, x.value, y.value);
    });

  const bottomGesture = Gesture.Pan()
    .onStart(() => {
      offsetHeight.value = height.value;
      offsetWidth.value = width.value;
      origin.value.x = 0;
      origin.value.y = -size;
      opacityOfHVLines.value = withTiming(1);
    })
    .onChange(e => {
      console.log('bottom Gesture ', origin.value.y);
      width.value = clamp(
        offsetWidth.value + e.translationY,
        size * 0.45,
        size,
      );
      height.value = clamp(
        offsetHeight.value + e.translationY,
        size * 0.45,
        size,
      );
    })
    .onEnd(() => {
      opacityOfHVLines.value = 0;
      runOnJS(onGestureStop)(width.value, height.value, x.value, y.value);
    });

  const leftLineStyle = useAnimatedStyle(() => {
    return {
      left: width.value / 3,
      opacity: opacityOfHVLines.value,
    };
  });

  const rightLineStyle = useAnimatedStyle(() => {
    return {
      right: width.value / 3,
      opacity: opacityOfHVLines.value,
    };
  });

  const topLineStyle = useAnimatedStyle(() => {
    return {
      top: height.value / 3,
      opacity: opacityOfHVLines.value,
    };
  });

  const bottomLineStyle = useAnimatedStyle(() => {
    return {
      bottom: height.value / 3,
      opacity: opacityOfHVLines.value,
    };
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: width.value,
      height: height.value,
      opacity: opacity.value,
      transform: [
        {translateX: x.value},
        {translateY: y.value},
        {translateX: origin.value.x},
        {translateY: origin.value.y},
        // {translateX: boxTranslateX.value},
        // {translateY: boxTranslateY.value},
        {translateX: -origin.value.x},
        {translateY: -origin.value.y},
      ],
    };
  });

  const mTopStyle = useAnimatedStyle(() => {
    return {
      left: width.value / 2 - MIDDLE / 2,
    };
  });

  const mBottomStyle = useAnimatedStyle(() => {
    return {
      left: width.value / 2 - MIDDLE / 2,
    };
  });

  const mLeftStyle = useAnimatedStyle(() => {
    return {
      top: height.value / 2 - MIDDLE / 2,
    };
  });

  const mRightStyle = useAnimatedStyle(() => {
    return {
      top: height.value / 2 - MIDDLE / 2,
    };
  });

  return (
    <View style={[styles.container]}>
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            {
              // width: size,
              // height: size,
              borderWidth: 2.5,
              borderColor: 'rgba(255, 255, 255, 0.7)',
              position: 'absolute',
            },
            animatedStyle,
          ]}>
          <GestureDetector gesture={leftGestrure}>
            <Animated.View
              style={[
                styles.lineOne,
                {width: size * 0.2, height: '100%', left: -size * 0.1},
              ]}
            />
          </GestureDetector>
          <GestureDetector gesture={rightGesture}>
            <Animated.View
              style={[
                styles.lineTwo,
                {width: size * 0.2, height: '100%', right: -size * 0.1},
              ]}
            />
          </GestureDetector>
          <GestureDetector gesture={topGesture}>
            <Animated.View
              style={[
                styles.lineThree,
                {width: '100%', height: size * 0.2, top: -size * 0.1},
              ]}
            />
          </GestureDetector>
          <GestureDetector gesture={bottomGesture}>
            <Animated.View
              style={[
                styles.lineFour,
                {width: '100%', height: size * 0.2, bottom: -size * 0.1},
              ]}
            />
          </GestureDetector>
          <Animated.View style={[styles.vLine, leftLineStyle]} />
          <Animated.View style={[styles.vLine, rightLineStyle]} />
          <Animated.View style={[styles.hLine, topLineStyle]} />
          <Animated.View style={[styles.hLine, bottomLineStyle]} />

          <View style={[styles.corner, styles.leftTopH]}></View>
          <View style={[styles.corner, styles.leftTopV]}></View>
          <View style={[styles.corner, styles.leftBottomH]}></View>
          <View style={[styles.corner, styles.leftBottomV]}></View>

          <View style={[styles.corner, styles.rigthTopH]}></View>
          <View style={[styles.corner, styles.rightTopV]}></View>
          <View style={[styles.corner, styles.rightBottomH]}></View>
          <View style={[styles.corner, styles.rightBottomV]}></View>

          <Animated.View style={[styles.middle, styles.mTop, mTopStyle]} />
          <Animated.View
            style={[styles.middle, styles.mBottom, mBottomStyle]}
          />
          <Animated.View style={[styles.middle, styles.mLeft, mLeftStyle]} />
          <Animated.View style={[styles.middle, styles.mRight, mRightStyle]} />
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  mRight: {
    width: 6,
    height: MIDDLE,
    right: -2.5,
  },
  mLeft: {
    width: 6,
    height: MIDDLE,
    left: -2.5,
  },
  mTop: {
    width: MIDDLE,
    height: 6,
    top: -2.5,
  },
  mBottom: {
    width: MIDDLE,
    height: 6,
    bottom: -2.5,
  },
  middle: {
    backgroundColor: Colors.white,
    position: 'absolute',
  },
  rightBottomV: {
    height: CORNERSIZE,
    width: 6,
    bottom: -2.5,
    right: -2.5,
  },
  rightBottomH: {
    height: 6,
    width: CORNERSIZE,
    bottom: -2.5,
    right: -2.5,
  },
  rightTopV: {
    height: CORNERSIZE,
    width: 6,
    top: -2.5,
    right: -2.5,
  },
  rigthTopH: {
    height: 6,
    width: CORNERSIZE,
    top: -2.5,
    right: -2.5,
  },
  leftBottomV: {
    height: CORNERSIZE,
    width: 6,
    bottom: -2.5,
    left: -2.5,
  },
  leftBottomH: {
    height: 6,
    width: CORNERSIZE,
    bottom: -2.5,
    left: -2.5,
  },
  leftTopH: {
    height: 6,
    width: CORNERSIZE,
    top: -2.5,
    left: -2.5,
  },
  leftTopV: {
    height: CORNERSIZE,
    width: 6,
    top: -2.5,
    left: -2.5,
  },
  corner: {
    backgroundColor: Colors.white,
    position: 'absolute',
  },
  backDrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  hLine: {
    width: '100%',
    height: 1,
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  vLine: {
    width: 1,
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  lineFour: {
    position: 'absolute',
  },
  lineThree: {
    position: 'absolute',
  },
  lineTwo: {
    position: 'absolute',
  },
  lineOne: {
    position: 'absolute',
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
    overflow: 'hidden',
    // justifyContent: 'center',
  },
});
