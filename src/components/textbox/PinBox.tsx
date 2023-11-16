import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import {Colors} from '../../utility/Colors';
import {SCREEN_WIDTH} from '../../utility/constants';

interface PinBoxProps {
  number?: number;
  value: string;
  onChangeText: (text: string) => void;
}

export default function PinBox({number = 4, value, onChangeText}: PinBoxProps) {
  const SIZE = (SCREEN_WIDTH - 80) / number;

  const handleOnChageText = (evt: string) => {
    console.log('Evt ', evt);
    // if (value.length < number + 1) {
    //   onChangeText(text);
    // }
  };

  return (
    <View style={[styles.pinContainer]}>
      {new Array(number).fill(0).map((item, index) => {
        return (
          <View style={[styles.pin, {width: SIZE, height: SIZE}]}>
            <Text style={[styles.pinText]}>{value[index]}</Text>
          </View>
        );
      })}
      <TextInput
        style={[styles.textInput]}
        keyboardType="number-pad"
        onChangeText={handleOnChageText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  pinText: {
    color: Colors.black,
    fontSize: 16,
  },
  textInput: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0,
  },
  pin: {
    borderWidth: 1,
    marginHorizontal: 5,
    borderRadius: 8,
    borderColor: Colors.darkGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinContainer: {
    flexDirection: 'row',
  },
});
