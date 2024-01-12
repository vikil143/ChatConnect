import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BottomSheet from '../../../components/modal/BottomSheet';
import {Colors} from '../../../utility/Colors';

interface ProfileSheetProps {
  show: boolean;
  hide: () => void;
}

export default function ProfileSheet({show, hide}: ProfileSheetProps) {
  return (
    <BottomSheet show={show} takeHoleSpace hide={hide}>
      <View style={[styles.box]}>
        <Text>Re Animated Modal</Text>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  box: {
    height: 400,
    width: '100%',
    backgroundColor: Colors.white,
  },
});
