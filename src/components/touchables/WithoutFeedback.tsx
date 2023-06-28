import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
} from 'react-native';
import React from 'react';

interface WithoutFeedbackProps extends TouchableWithoutFeedbackProps {}

export default function WithoutFeedback({
  children,
  ...props
}: WithoutFeedbackProps) {
  return (
    <TouchableWithoutFeedback {...props}>{children}</TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({});
