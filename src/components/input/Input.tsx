import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TextInputProps,
  StyleProp,
  TextStyle,
} from 'react-native';
import React from 'react';
import {Colors} from '../../utility/Colors';
import {ContainerStyles} from '../../types';

interface InputProps extends TextInputProps, Partial<ContainerStyles> {
  textInputStyle?: StyleProp<TextStyle>;
}

export default function Input({
  textInputStyle,
  containerStyle,
  ...props
}: InputProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput {...props} style={[styles.input, textInputStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.black,
    borderRadius: 5,
  },
  container: {},
});
