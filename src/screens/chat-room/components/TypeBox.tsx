import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import TextBox from '../../../components/textbox/TextBox';
import {Colors} from '../../../utility/Colors';
import {commonStyles} from '../../../utility/commonStyles';
import OpacityButton from '../../../components/touchables/OpacityButton';
import {MessageData} from '../types';

interface TypeBoxProps {
  color: string;
  sendMessage: (msgObj: MessageData) => void;
}

export default function TypeBox({color, sendMessage}: TypeBoxProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (message.trim() !== '') {
      sendMessage({
        date: new Date(),
        userId: 1,
        message,
      });
      setMessage('');
    }
  };

  return (
    <View style={[styles.container]}>
      <View style={[styles.inputBox]}>
        <View style={[commonStyles.flexOne]}>
          <TextBox
            name="name"
            value={message}
            placeholder="Type here..."
            onChangeValue={(_, text) => setMessage(text)}
          />
        </View>
        <OpacityButton onPress={handleSubmit}>
          <MIcon name="send" color={color} size={25} />
        </OpacityButton>
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
    backgroundColor: Colors.white,
    padding: 8,
    paddingHorizontal: 12,
  },
});
