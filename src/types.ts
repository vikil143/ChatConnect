import {ReactNode} from 'react';
import {ViewStyle, TextStyle as RNTextStyle} from 'react-native';

// This folder is for common used types in the app

// Commonly used childrens
export type HasChild = {
  children: ReactNode;
};

export type ContainerStyles = {
  containerStyle: ViewStyle | ViewStyle[];
};

export type TextStyles = {
  containerStyle: RNTextStyle | RNTextStyle[];
};

export type OnPress = {
  onPress: () => void;
};
