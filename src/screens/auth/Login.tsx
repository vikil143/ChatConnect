import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import TextBox from '../../components/textbox/TextBox';
import Spacing from '../../components/spacing/Spacing';
import {Colors} from '../../utility/Colors';
import PrimaryOpacityButton from '../../components/buttons/PrimaryOpacity';

interface LoginScreenProps {}

export default function LoginScreen({}: LoginScreenProps) {
  const [phoneNo, setPhoneNo] = useState('');

  const onSubmit = async () => {
    auth()
      .signInWithPhoneNumber(phoneNo)
      .then(() => console.log('OTP send'))
      .catch(error => console.log('Error was ', error));
  };

  return (
    <View style={[styles.container]}>
      <View>
        <View style={[styles.inputBox]}>
          <TextBox
            name="name"
            value={phoneNo}
            placeholder="Enter mobile number"
            onChangeValue={(_, text) => setPhoneNo(text)}
            keyboardType="number-pad"
          />
        </View>
        <Spacing />
        <PrimaryOpacityButton
          onPress={onSubmit}
          title="Login"></PrimaryOpacityButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    backgroundColor: Colors.lightWhite,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.white,
    padding: 15,
  },
});
