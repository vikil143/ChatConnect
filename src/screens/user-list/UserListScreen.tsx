import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {commonStyles} from '../../utility/commonStyles';
import Header from './components/Header';
import {Colors} from '../../utility/Colors';
import AppUsers from '../../components/users/AppUserBox';
import {MainRouteScreenProps} from '../../routes/types';
import {usersDataRef} from '../../utility/database';

interface UserListScreenProps extends MainRouteScreenProps<'Dashboard'> {}

const UserListScreen = ({navigation}: UserListScreenProps) => {
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    usersDataRef.once('value', snapshoot => {
      const tempData = snapshoot.val();

      const result = Object.values(tempData)
        .filter(item => !!item)
        .sort(function (a, b) {
          if (a.name < b.name) {
            return -1;
          } else if (a.name > b.name) {
            return 1;
          }
          // a must be equal to b
          return 0;
        });
      console.log('User List ', result);
      // const result = tempData

      setMessageList(result!);
    });
  }, []);

  return (
    <View style={[commonStyles.flexOne, commonStyles.white]}>
      <Header />
      <FlatList
        data={messageList}
        keyExtractor={(_, index) => `index_${index}`}
        renderItem={({index, item}) => {
          return (
            <AppUsers item={item} {...{navigation, index}} maxLengthNo={3} />
          );
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
