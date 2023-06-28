import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import FIcon from 'react-native-vector-icons/Feather';
import {Colors} from '../../../utility/Colors';
import Spacing from '../../../components/spacing/Spacing';
import OpacityButton from '../../../components/touchables/OpacityButton';

interface HeaderProps {
  color: string;
  username: string;
  onPress: () => void;
}

export default function Header({color, username, onPress}: HeaderProps) {
  return (
    <View style={[styles.container]}>
      <OpacityButton onPress={onPress}>
        <MIcon name="arrow-back-ios" size={25} />
      </OpacityButton>
      <Spacing size={2} />
      <View style={[styles.profilePic, {backgroundColor: color}]}>
        <FIcon name="user" size={30} color={Colors.white} />
      </View>
      <Spacing size={7} />
      <View>
        <Text style={[styles.username]}>{username}</Text>
        <Text>{'Online'}</Text>
      </View>
    </View>
  );
}

const P_SIZE = 45;

const styles = StyleSheet.create({
  username: {
    fontSize: 18,
    color: Colors.black,
  },
  profilePic: {
    width: P_SIZE,
    height: P_SIZE,
    borderRadius: P_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 15,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
