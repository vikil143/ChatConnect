import {JSX} from 'react';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {
  MaterialTopTabScreenProps,
  MaterialTopTabNavigationProp,
} from '@react-navigation/material-top-tabs';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

export type TabRoutesParams = {
  Messages: undefined;
  Users: undefined;
  ChatRoom: undefined;
};

export type TabRouteScreenProps<T extends keyof TabRoutesParams> =
  MaterialTopTabScreenProps<TabRoutesParams, T>;

export type TabRouteNavigationParam = {
  navigation: MaterialTopTabNavigationProp<TabRoutesParams>;
};

type ChatRoomParams = {
  color: string;
  username: string;
};

export type MainRoutesParams = {
  Dashboard: undefined;
  UserList: undefined;
  ChatRoom: ChatRoomParams;
  Login: undefined;
  OTP: {firebaseConfirmation: FirebaseAuthTypes.ConfirmationResult};
  Profile: undefined;
};

export type MainRouteScreenProps<T extends keyof MainRoutesParams> =
  StackScreenProps<MainRoutesParams, T>;

export type MainRouteNavigationParam = {
  navigation: StackNavigationProp<MainRoutesParams>;
};

export type TabDataItemParams = {
  route: keyof TabRoutesParams;
  component: ({}) => JSX.Element;
};

export type TabDataParams = Array<TabDataItemParams>;
