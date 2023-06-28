import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import React from 'react';

interface OpacityButtonProps extends TouchableOpacityProps {}

export default function OpacityButton({
  children,
  ...props
}: OpacityButtonProps) {
  return <TouchableOpacity {...props}>{children}</TouchableOpacity>;
}

const styles = StyleSheet.create({});
