import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function Line() {
  return <View style={[styles.line]}></View>;
}

const styles = StyleSheet.create({
  line: {
    width: '100%',
    height: 2,
    backgroundColor: '#ddd',
  },
});
