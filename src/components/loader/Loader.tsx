import {StyleSheet, View, Modal, ActivityIndicator} from 'react-native';
import React from 'react';
import {Colors} from '../../utility/Colors';

interface LoaderProps {
  isVisible: boolean;
}

export default function Loader({isVisible}: LoaderProps) {
  return (
    <Modal visible={isVisible} transparent>
      <View style={[styles.container]}>
        <View style={[styles.box]}>
          <ActivityIndicator color={Colors.primary} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 80,
    height: 80,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
