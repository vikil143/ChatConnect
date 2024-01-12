import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import React, {JSXElementConstructor, ReactElement} from 'react';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {commonStyles} from '../../utility/commonStyles';
import {ContainerStyles, HasChild} from '../../types';
import {Colors} from '../../utility/Colors';
import {SCREEN_WIDTH} from '../../utility/constants';
import {useBackHandler} from '../../hooks/useBackHandler';

interface ModalProps extends Partial<ContainerStyles> {
  show: boolean;
  hide: () => void;
  children: ReactElement<any, string | JSXElementConstructor<any>>;
}

export default function ReAnimModal({
  show,
  hide,
  children,
  containerStyle,
}: ModalProps) {
  useBackHandler(show, hide);
  return (
    <View
      style={[StyleSheet.absoluteFillObject, styles.container]}
      pointerEvents="box-none">
      {show && (
        <View style={[StyleSheet.absoluteFillObject, styles.container]}>
          <TouchableWithoutFeedback onPress={hide}>
            <Animated.View
              entering={FadeIn}
              exiting={FadeOut}
              style={[
                StyleSheet.absoluteFillObject,
                commonStyles.flexOne,
                styles.backDrop,
              ]}
            />
          </TouchableWithoutFeedback>
          <Animated.View style={[styles.box]}>
            <View style={[styles.otherPart, containerStyle]}>
              {React.cloneElement(children, {hide})}
            </View>
          </Animated.View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sideWhiteSp: {
    height: '100%',
    width: '100%',
  },
  whiteBg: {
    backgroundColor: Colors.white,
  },
  otherPart: {
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  sideHeader: {
    flex: 1,
    // backgroundColor: Colors.white,
  },
  headerContainer: {
    flexDirection: 'row',
  },
  box: {
    width: SCREEN_WIDTH - 30,
  },
  backDrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    // left: 0,
    // right: 0,
    // bottom: 0,
    // top: 0,
  },
});
