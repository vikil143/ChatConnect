import React, {JSXElementConstructor, ReactElement} from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  ViewStyle,
  View,
  Modal,
  SafeAreaView,
} from 'react-native';
import {useBackHandler} from '../../hooks/useBackHandler';
import {commonStyles} from '../../utility/commonStyles';
import {ContainerStyles, HasChild} from '../../types';
import {Colors} from '../../utility/Colors';
// import Colors from '../utils/colors';
// import {SCREEN_HEIGHT} from '../utils/constants';

interface BottomSheetProps extends HasChild, Partial<ContainerStyles> {
  show: boolean;
  hide: () => void;
  takeHoleSpace?: boolean;
}

export default function BottomSheet({
  show,
  hide,
  children,
  containerStyle,
  takeHoleSpace,
}: BottomSheetProps) {
  useBackHandler(show, hide);
  return (
    <Modal
      visible={show}
      transparent
      animationType="slide"
      onRequestClose={hide}>
      <SafeAreaView style={[commonStyles.flexOne, styles.container]}>
        <TouchableWithoutFeedback onPress={hide}>
          {!takeHoleSpace ? (
            <View style={[commonStyles.flexOne, styles.backdrop]} />
          ) : (
            <View />
          )}
        </TouchableWithoutFeedback>
        <View style={[styles.mainContainer, containerStyle]}>{children}</View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  mainContainer: {
    backgroundColor: Colors.white,
    borderTopStartRadius: 32,
    borderTopEndRadius: 32,
    elevation: 10,
  },
});
