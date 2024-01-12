import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {commonStyles} from '../../../utility/commonStyles';
import {Colors} from '../../../utility/Colors';
import Spacing from '../../../components/spacing/Spacing';
import {MainRouteNavigationParam} from '../../../routes/types';
import WithoutFeedback from '../../../components/touchables/WithoutFeedback';

interface HeaderProps extends Partial<MainRouteNavigationParam> {}

const Header = ({navigation}: HeaderProps) => {
  return (
    <View style={[commonStyles.pA15, commonStyles.rowAlignCenter]}>
      <View style={[commonStyles.flexOne]}>
        <Text style={[styles.titleApp]}>Fire Chat</Text>
      </View>
      <Spacing />
      <View style={[styles.user]}>
        <WithoutFeedback onPress={() => navigation!.navigate('Profile')}>
          <Icon name="user" style={[styles.userIcon]} />
        </WithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  user: {},
  userIcon: {
    fontSize: 25,
  },
  titleApp: {
    color: Colors.primary,
    fontSize: 20,
  },
});
export default Header;
