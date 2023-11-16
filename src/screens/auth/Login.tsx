import {StyleSheet, View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import TextBox from '../../components/textbox/TextBox';
import Spacing from '../../components/spacing/Spacing';
import {Colors} from '../../utility/Colors';
import PrimaryOpacityButton from '../../components/buttons/PrimaryOpacity';
import {MainRouteScreenProps} from '../../routes/types';
import Loader from '../../components/loader/Loader';
import {usersDataRef} from '../../utility/database';
import {useRealm} from '../../realmDB';
import ErrorMessage from '../../components/error/ErrorMessage';
import {CurrentUser} from '../../realmDB/current-user';
import {ChatedRoom} from '../../realmDB/chated-user';

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
  const {write, create} = useRealm();

  // Handle user state changes
  function onAuthStateChanged(user: any) {
    setUser(user);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const handleValidate = async () => {
    let isValide = true;
    // Once because its calling from submit
    const data = await usersDataRef.once('value');
    const isUserIsPresent = Object.values(data.val()).findIndex(
      (item, index) => item.name === name,
    );
    console.log('log data', isUserIsPresent);
    if (isUserIsPresent >= 0) {
      setErrorMessageName('User Name was already present');
      isValide = false;
    }

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
        // Created USer here
        const newRef = usersDataRef.push();
        newRef.set({
          name: name,
          status: status,
          id: newRef.key,
        });

        write(() => {
          create(CurrentUser.schema.name, {
            name: name,
            status: status,
            id: newRef.key,
          });
          create(ChatedRoom.schema.name, {
            name: name,
            status: status,
            id: newRef.key,
            lastMessage: '',
          });
          navigation.navigate('Dashboard');
        });
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
      <Spacing />
      <Spacing />
      <Spacing />
      <Spacing />
      <Spacing />
      <Spacing />
      <Spacing />
      <Spacing />
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
