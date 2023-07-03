import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {commonStyles} from '../../utility/commonStyles';
import Header from './components/Header';
import {Colors} from '../../utility/Colors';
import AppUsers from '../../components/users/AppUserBox';
import {MainRouteScreenProps} from '../../routes/types';

interface UserListScreenProps extends MainRouteScreenProps<'Dashboard'> {}

const UserListScreen = ({navigation}: UserListScreenProps) => {
  return (
    <View style={[commonStyles.flexOne, commonStyles.white]}>
      <Header />
      <FlatList
        data={[1, 2, 3, 4]}
        renderItem={({index}) => {
          return <AppUsers {...{navigation, index}} maxLengthNo={3} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    height: 400,
    width: '100%',
    backgroundColor: Colors.red,
  },
});

export default UserListScreen;
