import {StyleSheet, View, FlatList} from 'react-native';
import React from 'react';
import Header from './components/Header';
import {commonStyles} from '../../utility/commonStyles';
import {Colors} from '../../utility/Colors';
import UserTextBox from '../../components/users/UserTextBox';
import {MainRouteScreenProps} from '../../routes/types';

interface ChatedUsersScreenProps extends MainRouteScreenProps<'Dashboard'> {}

export default function ChatedUsersScreen({
  navigation,
}: ChatedUsersScreenProps) {
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
      <Header />
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
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 20,
  },
  box: {
    height: 400,
    width: '100%',
    backgroundColor: Colors.red,
  },
});
