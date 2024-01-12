import {StyleSheet, View} from 'react-native';
import React from 'react';
import {commonStyles} from '../../utility/commonStyles';
import {Colors} from '../../utility/Colors';
import Card from './components/Card';
import Item from './components/Item';
import Line from '../../components/line/Line';
import OnlineCard from './components/OnlineCard';
import BackButton from './components/BackButton';
import Spacing from '../../components/spacing/Spacing';
import {MainRouteScreenProps} from '../../routes/types';

interface ProfileScrenProps extends MainRouteScreenProps<'Profile'> {}

export default function ProfileMainScreen({navigation}: ProfileScrenProps) {
  return (
    <View style={[commonStyles.flexOne, styles.container]}>
      <Card navigation={navigation} />
      <Item name="Vikil25" />
      <Line />
      <OnlineCard />
      <Line />
      <Item name="Busy" />
      <Line />
      <View style={[commonStyles.flexOne]} />
      <BackButton navigation={navigation} />
      <Spacing size={5} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
