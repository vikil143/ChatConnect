import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';
import {Colors} from '../../utility/Colors';

export default function DashboardCustomTabs(props: MaterialTopTabBarProps) {
  return (
    <View style={[styles.container]}>
      <Text>DashboardTabs</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.red,

    // paddingHorizontal: 30,
    // // width: '100%',
    // position: 'absolute',
    // left: 0,
    // right: 0,
    // top: SCREEN_HEIGHT * 0.85,
  },
});
