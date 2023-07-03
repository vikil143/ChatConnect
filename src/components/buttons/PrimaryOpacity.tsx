import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import React from 'react';
import {Colors} from '../../utility/Colors';
import {ContainerStyles, OnPress} from '../../types';

interface PrimaryOpacityButtonProps
  extends Partial<ContainerStyles>,
    Partial<OnPress> {
  title: string;
}

export default function PrimaryOpacityButton({
  title,
  containerStyle,
  onPress,
}: PrimaryOpacityButtonProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, containerStyle]}>
        <Text style={[styles.text]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  container: {
    padding: 10,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
