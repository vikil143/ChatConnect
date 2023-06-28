import {StyleSheet, View, Text} from 'react-native';
import React, {useRef} from 'react';
import FIcon from 'react-native-vector-icons/Feather';
import {randomNumber} from '../../utility/helpers';
import {Colors, PostColors} from '../../utility/Colors';
import Spacing from '../spacing/Spacing';
import {commonStyles} from '../../utility/commonStyles';
import OpacityButton from '../touchables/OpacityButton';
import {MainRouteNavigationParam} from '../../routes/types';

interface UserTextBoxProps extends MainRouteNavigationParam {
  maxLengthNo: number;
  index: number;
}

export default function UserTextBox({
  maxLengthNo,
  index,
  navigation,
}: UserTextBoxProps) {
  let specificInt = useRef(randomNumber(0, maxLengthNo));

  return (
    <OpacityButton
      onPress={() =>
        navigation.navigate('ChatRoom', {
          color: PostColors[specificInt.current],
          username: 'User ' + index + 1,
        })
      }>
      <View style={[styles.container, commonStyles.alignCenter]}>
        <View
          style={[
            styles.profilePic,
            {backgroundColor: PostColors[specificInt.current]},
          ]}>
          <FIcon name="user" size={30} color={Colors.white} />
        </View>
        <Spacing size={5} />
        <View style={[commonStyles.flexOne, commonStyles.justifyCenter]}>
          <Text style={[styles.userTitle]}>
            {'User '}
            {index + 1}
          </Text>
          <Spacing size={2} />
          <Text style={[styles.messageText]}>Hello, There</Text>
        </View>
        <Spacing size={5} />
        <View style={[commonStyles.alightRight, commonStyles.justifyCenter]}>
          <Text style={[styles.timeText]}>12:22</Text>
          <Spacing size={2} />
          <View style={[styles.notify]}>
            <Text style={[styles.notifyText]}>1</Text>
          </View>
        </View>
      </View>
    </OpacityButton>
  );
}

const SIZE = 60;
const N_SIZE = 18;

const styles = StyleSheet.create({
  messageText: {
    color: Colors.grey,
    fontSize: 13,
  },
  notifyText: {
    color: Colors.white,
    fontSize: 8,
  },
  notify: {
    backgroundColor: Colors.red,
    width: N_SIZE,
    height: N_SIZE,
    borderRadius: N_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
  },
  userTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.black,
  },
  profilePic: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
  },
});
