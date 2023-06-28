import React from 'react';
import {View, Text, Insets, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {commonStyles} from '../../../utility/commonStyles';
import {Colors} from '../../../utility/Colors';
import Spacing from '../../../components/spacing/Spacing';

const Header = () => {
  return (
    <View style={[commonStyles.pA15, commonStyles.rowAlignCenter]}>
      <View style={[commonStyles.flexOne]}>
        <Text style={[styles.titleApp]}>Fire Chat</Text>
      </View>
      <Spacing />
      <View>
        <Icon name="add" style={[styles.addIcon]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addIcon: {
    fontSize: 25,
  },
  titleApp: {
    color: Colors.primary,
    fontSize: 20,
  },
});
export default Header;
