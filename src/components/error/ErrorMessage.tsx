import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({message}: ErrorMessageProps) {
  return (
    <View style={{}}>
      {message && <Text style={[styles.messageText]}>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  messageText: {
    color: 'red',
  },
});
