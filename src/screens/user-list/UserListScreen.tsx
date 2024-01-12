import React, {useEffect, useState, useRef} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {commonStyles} from '../../utility/commonStyles';
import Header from './components/Header';
import {Colors} from '../../utility/Colors';
import {MainRouteScreenProps} from '../../routes/types';
import {usersKey, usersDataRef} from '../../utility/database';
import {useRealm} from '../../realmDB';
import {useCurrentUser} from '../../hooks/useCurrentUser';

interface UserListScreenProps extends MainRouteScreenProps<'Dashboard'> {}

const UserListScreen = ({navigation}: UserListScreenProps) => {
  const [usersList, setUserList] = useState([]);
  const currentUser = useCurrentUser();
  const listenerRef = useRef(null);
  const {write, create} = useRealm();

  /* 
    Planning Realm DB
    Store data in realm from firebase
  */
  useEffect(() => {
    init();
    return removeUserListner;
  }, []);

  const init = () => {
    addedUsersListners();
  };

  const addedUsersListners = () => {};

  const removeUserListner = () => {
    usersDataRef.ref(`${usersKey}`).off('child_added', listenerRef.current!);
  };

  console.log('Data', currentUser);
  return (
    <View style={[commonStyles.flexOne, commonStyles.white]}>
      <Header />
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
