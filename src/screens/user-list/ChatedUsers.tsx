import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from './components/Header';
import {commonStyles} from '../../utility/commonStyles';
import {Colors} from '../../utility/Colors';
import UserTextBox from '../../components/users/UserTextBox';
import {MainRouteScreenProps} from '../../routes/types';
import ReAnimModal from '../../components/modal/ReAnimModal';
import BottomSheet from '../../components/modal/BottomSheet';
import ProfileSheet from './components/ProfileSheet';

interface ChatedUsersScreenProps extends MainRouteScreenProps<'Dashboard'> {}

export default function ChatedUsersScreen({
  navigation,
}: ChatedUsersScreenProps) {
  const [modal, setModal] = useState(false);
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // // Handle user state changes
  // function onAuthStateChanged(user) {
  //   console.log('On Auth Change', user);
  //   // setUser(user);
  //   // if (initializing) setInitializing(false);
  // }

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  // const signIn = () => {
  //   auth()
  //     .signInAnonymously()
  //     .then(() => {
  //       console.log('User signed in anonymously');
  //     })
  //     .catch(error => {
  //       if (error.code === 'auth/operation-not-allowed') {
  //         console.log('Enable anonymous in your firebase console.');
  //       }

  //       console.error(error);
  //     });
  // };

  return (
    <View style={[commonStyles.flexOne, commonStyles.white]}>
      <Header navigation={navigation}></Header>
      <FlatList
        data={data}
        contentContainerStyle={{paddingBottom: 60}}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <UserTextBox
              {...{item, index, navigation}}
              maxLengthNo={data.length - 1}
            />
          );
        }}
      />
      <ProfileSheet show={modal} hide={() => setModal(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 20,
  },
});
