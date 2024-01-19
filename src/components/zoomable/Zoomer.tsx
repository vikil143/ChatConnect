import {StyleSheet} from 'react-native';
import React from 'react';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import {HasChild} from '../../types';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../utility/constants';
import {clamp} from '../../utility/animatedHelper';

interface ZoomerProps extends HasChild {}

export default function Zoomer({children}: ZoomerProps) {
  const [show, setShow] = React.useState(false);
  const [layout, setLayout] = React.useState({
    width: 0,
    height: 0,
  });

  const offsetScale = React.useRef({
    x: 0,
    y: 0,
  }).current;
  const scale = React.useRef({
    x: useSharedValue(1),
    y: useSharedValue(1),
  }).current;
  const focal = React.useRef({
    x: useSharedValue(0),
    y: useSharedValue(0),
  }).current;

  const origin = React.useRef({
    x: -layout.width / 2,
    y: -layout.height / 2,
  }).current;

  const panTranslate = React.useRef({
    x: useSharedValue(0),
    y: useSharedValue(0),
  }).current;

  React.useEffect(() => {
    if (show) {
      scale.x.value = withTiming(scale.x.value * 2);
      scale.y.value = withTiming(scale.y.value * 2);
    } else {
      scale.x.value = withTiming(1);
      scale.y.value = withTiming(1);
    }
  }, [show]);

  // React.useEffect(() => {
  //     console.log("Screen width",SCREEN_WIDTH,SCREEN_HEIGHT,SCREEN_HEIGHT / SCREEN_WIDTH)
  // },[show])

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(e => {
      focal.x.value = withTiming(e.x + origin.x);
      runOnJS(setShow)(!show);
    });

  // const panGesture = Gesture.Pan().onUpdate(() => {});

  const pinchGesture = Gesture.Pinch()
    .onChange(e => {
      focal.x.value = e.focalX + origin.x + offsetScale.x;
      focal.y.value = e.focalY + origin.y + offsetScale.y;
      scale.x.value = clamp(scale.x.value * e.scaleChange, 0.8, 4);
      scale.y.value = clamp(scale.y.value * e.scaleChange, 0.8, 4);
    })
    .onEnd(() => {
      offsetScale.x = focal.x.value;
      offsetScale.y = focal.y.value;
      // scale.x.value = withTiming(1);
      // scale.y.value = withTiming(1);
    });

  const gesture = Gesture.Simultaneous(doubleTapGesture, pinchGesture);

  const imageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        // {translateX: focal.x.value},
        // {translateY: focal.y.value},
        {scaleX: scale.x.value},
        {scaleY: scale.y.value},
        // {translateX: -focal.x.value},
        // {translateY: -focal.y.value},
      ],
    };
  });

  console.log('Layer zoomer', layout.width, layout.height);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={imageStyle}
        onLayout={e =>
          setLayout({
            ...layout,
            width: e.nativeEvent.layout.width,
            height: e.nativeEvent.layout.height,
          })
        }>
        {children}
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({});
