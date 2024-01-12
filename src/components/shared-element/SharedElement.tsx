import {
  LayoutChangeEvent,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import React, {
  useState,
  JSXElementConstructor,
  ReactElement,
  useRef,
} from 'react';
import Animated from 'react-native-reanimated';
import {ContainerStyles} from '../../types';

interface SharedElementProps extends Partial<ContainerStyles> {
  children: ReactElement<any, string | JSXElementConstructor<any>>;
}

function SharedElement({children, containerStyle}: SharedElementProps) {
  const [show, setShow] = useState(false);
  const layoutSharedRef = useRef({
    width: 0,
    height: 0,
  }).current;
  const layoutStickyRef = useRef({
    width: 0,
    height: 0,
  }).current;

  const showModal = () => setShow(true);

  const hideModal = () => setShow(false);

  const onLayoutOfSharedItem = (e: LayoutChangeEvent) => {
    layoutSharedRef.height = e.nativeEvent.layout.height;
    layoutSharedRef.width = e.nativeEvent.layout.width;
  };

  const onLayoutOfStickyItem = (e: LayoutChangeEvent) => {
    layoutStickyRef.height = e.nativeEvent.layout.height;
    layoutStickyRef.width = e.nativeEvent.layout.width;
  };

  console.log('Shared Element ', layoutSharedRef, layoutStickyRef);
  return (
    <>
      <TouchableWithoutFeedback onPress={showModal}>
        <View onLayout={onLayoutOfSharedItem} style={[containerStyle]}>
          {children}
        </View>
      </TouchableWithoutFeedback>
      {/* <Animated.View>{children}</Animated.View> */}
      <Modal transparent visible={show} onRequestClose={hideModal}>
        <View style={[styles.container]}>
          <Animated.View>{React.cloneElement(children, {})}</Animated.View>
        </View>
      </Modal>
    </>
  );
}

export default SharedElement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
