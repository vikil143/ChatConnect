import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {MainRouteScreenProps} from '../../routes/types';
import PinBox from '../../components/textbox/PinBox';
import Spacing from '../../components/spacing/Spacing';
import {commonStyles} from '../../utility/commonStyles';

interface OTPProps extends MainRouteScreenProps<'OTP'> {}

export default function OTPScreen({navigation, route}: OTPProps) {
  const [pin, setPin] = useState('');
  const {firebaseConfirmation} = route.params;

  const onChangeText = (text: string) => setPin(text);

  return (
    <View style={[styles.container]}>
      <View>
        <View style={[commonStyles.row]}>
          <Spacing size={3} />
          <Text>Enter OTP</Text>
        </View>
        <Spacing size={3} />
        <View style={[styles.boxContainer]}>
          <PinBox value={pin} number={6} onChangeText={onChangeText} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  boxContainer: {
    alignItems: 'center',
  },

  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
