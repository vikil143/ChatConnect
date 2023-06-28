import {StyleSheet, View, TextInput, TextInputProps} from 'react-native';
import React from 'react';

interface TextBoxProps extends TextInputProps {
  name: string;
  onChangeValue: (name: string, value: string) => void;
}

export default function TextBox({
  value,
  onChangeValue,
  name,
  ...props
}: TextBoxProps) {
  return (
    <View style={[styles.container]}>
      <TextInput
        value={value}
        onChangeText={text => onChangeValue(name, text)}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
