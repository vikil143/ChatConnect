import Realm from 'realm';
import {StyleSheet, View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
// import 'react-native-get-random-values';
// import Realm from 'realm';
import TextBox from '../../components/textbox/TextBox';
import Spacing from '../../components/spacing/Spacing';
import {Colors} from '../../utility/Colors';
import PrimaryOpacityButton from '../../components/buttons/PrimaryOpacity';
import {MainRouteScreenProps} from '../../routes/types';
import Loader from '../../components/loader/Loader';
import {usersKey, usersDataRef} from '../../utility/database';
import {useRealm} from '../../realmDB';
import ErrorMessage from '../../components/error/ErrorMessage';
import {getUUID} from '../../utility/helpers';
import {CurrentUser} from '../../realmDB/current-user';
import {useCurrentUser} from '../../hooks/useCurrentUser';

interface LoginScreenProps extends MainRouteScreenProps<'Login'> {}

export default function LoginScreen({navigation}: LoginScreenProps) {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [user, setUser] = useState();
  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const [loader, setLoader] = useState(false);
  const [errorMessageName, setErrorMessageName] = useState('');
  const [errorMessageStatus, setErrorMessageStatus] = useState('');
  const [update, forceUpdate] = useState(false);
  const currentUser = useCurrentUser();
  const {write, create} = useRealm();

  // Handle user state changes
  function onAuthStateChanged(user: any) {
    setUser(user);
  }

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  const handleValidate = async () => {
    let isValide = true;
    // Once because its calling from submit
    // const data = await usersDataRef.ref(usersKey).once('value');
    // const isUserIsPresent = Object.values(data.val()).findIndex(
    //   (item, index) => item.name === name,
    // );

    // console.log('log data', isUserIsPresent);
    // if (isUserIsPresent >= 0) {
    //   setErrorMessageName('User Name was already present');
    //   isValide = false;
    // }

    if (name.trim() === '') {
      setErrorMessageName('Please enter name');
      isValide = false;
    }

    if (status.trim() === '') {
      setErrorMessageStatus('Please enter status');
      isValide = false;
    }

    if (isValide) {
      setErrorMessageName('');
      setErrorMessageStatus('');
    }
    return isValide;
  };

  // Handle the button press
  async function onSubmit() {
    const isValide = await handleValidate();
    if (isValide) {
      try {
        const currentUser = {
          name,
          status,
          // _id: new Realm.BSON.ObjectId(),
        };

        write(() => {
          create('CurrentUser', currentUser);
        });

        // forceUpdate();

        // const currentUser = {
        //   name,
        //   status,
        //   id: getUUID(),
        // };
        // usersDataRef.ref(`${usersKey}/${name}`).set(currentUser);
        // // usersDataRef.ref(`${usersKey}`).once
        // write(() => {
        //   create(CurrentUser.name, currentUser);
        // });
        // navigation.navigate('Dashboard');
        //
        //
        //
      } catch (error) {
      } finally {
      }
    }
  }

  async function confirmCode() {
    try {
      await confirm?.confirm(status);
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  return (
    <View style={[styles.container]}>
      <View>
        <View>
          <Text style={[styles.bigText]}>Create </Text>
          <Text style={[styles.bigText]}>UserName and Status</Text>
          <Text style={[styles.bigText]}>To Add Account!</Text>
        </View>
        <Spacing />
        <Spacing />
        <Spacing />
        <Spacing />
      </View>
      <View>
        <View style={[styles.inputBox]}>
          <TextBox
            name="name"
            value={name}
            placeholder="Enter user name"
            onChangeValue={(_, text) => setName(text)}
          />
        </View>
        <ErrorMessage message={errorMessageName}></ErrorMessage>
        <Spacing />
        <View style={[styles.inputBox]}>
          <TextBox
            name="name"
            value={status}
            placeholder="Enter Staus"
            onChangeValue={(_, text) => setStatus(text)}
          />
        </View>
        <ErrorMessage message={errorMessageStatus}></ErrorMessage>
        <Spacing />
        <PrimaryOpacityButton
          onPress={() => onSubmit()}
          title="Proceed to app"></PrimaryOpacityButton>
      </View>
      <View>
        <Text>{JSON.stringify(currentUser)}</Text>
        {/* {currentUser.map((item, index) => (
          <Text>ONe</Text>
        ))} */}
      </View>
      {/* <Spacing />
      <Spacing />
      <Spacing />
      <Spacing />
      <Spacing />
      <Spacing />
      <Spacing />
      <Spacing /> */}
      <Loader isVisible={loader}></Loader>
    </View>
  );
}

const styles = StyleSheet.create({
  bigText: {
    fontSize: 26,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  inputBox: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    elevation: 5,
    borderRadius: 8,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 15,
    justifyContent: 'center',
  },
});
