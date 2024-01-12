import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {commonStyles} from '../../../utility/commonStyles';
import {Colors} from '../../../utility/Colors';
import Spacing from '../../../components/spacing/Spacing';

interface OnlineCardProps {}

export default function OnlineCard({}: OnlineCardProps) {
  return (
    <>
      <View style={[styles.itemContainer]}>
        <View style={[styles.online]} />
        <Spacing />
        <Text>Avalible</Text>
        <View style={[commonStyles.flexOne]} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  online: {
    width: 10,
    height: 10,
    backgroundColor: Colors.online,
    borderRadius: 10,
  },
  itemContainer: {
    padding: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
