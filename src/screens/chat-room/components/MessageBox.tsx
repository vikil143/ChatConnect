import {StyleSheet, Text, View, ViewStyle, TextStyle} from 'react-native';
import React from 'react';
import {Colors} from '../../../utility/Colors';
import {SCREEN_WIDTH} from '../../../utility/constants';
import {commonStyles} from '../../../utility/commonStyles';
import {formatDateByTime, getFormattedDate} from '../../../utility/helpers';
import Spacing from '../../../components/spacing/Spacing';
import ImageBox from './ImageBox';

interface MessageBoxProps {
  userId: number;
  message?: string;
  image?: string;
  isCurrentUser: boolean;
  color: string;
  isShowDate: boolean;
  date: Date;
  isLastDate: boolean;
  isNotFirst: boolean;
  data: {
    userId: number;
    message?: string;
    image?: string;
    date: Date;
  }[];
  index: number;
  showImage: (image: {uri: string; width: number; height: number}) => void;
}

export default function MessageBox({
  message,
  image,
  isCurrentUser,
  color,
  isShowDate,
  date,
  isLastDate,
  index,
  data,
  isNotFirst,
  showImage,
}: MessageBoxProps) {
  const containerStyles: ViewStyle = {
    justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
  };

  const messageRootContainerStyle: ViewStyle = {
    alignItems: isCurrentUser ? 'flex-end' : 'flex-start',
  };

  const messageContainerStyle: ViewStyle = {
    backgroundColor: isCurrentUser ? color : Colors.white,
    marginRight: !isCurrentUser ? SCREEN_WIDTH * 0.2 : 0,
    marginLeft: isCurrentUser ? SCREEN_WIDTH * 0.2 : 0,
    borderTopLeftRadius: !isCurrentUser ? 0 : 10,
    borderTopRightRadius: isCurrentUser ? 0 : 10,
    padding: !!image ? 5 : 10,
    paddingHorizontal: !!image ? 5 : 15,
  };

  const textContainerStyle: TextStyle = {
    color: isCurrentUser ? Colors.white : Colors.black,
  };

  // console.log('Message Box', data[index], isShowDate, index, data[index - 1]);
  return (
    <View>
      {isLastDate && (
        <View
          style={[
            commonStyles.rowAlignCenter,
            commonStyles.justifyCenter,
            commonStyles.overflowHide,
            styles.mV,
            styles.mH,
          ]}>
          <View style={[styles.line]}></View>
          <View style={[styles.dateContainer]}>
            <Text style={[styles.dateText]}>{getFormattedDate(date)}</Text>
          </View>
          <View style={[styles.line]}></View>
        </View>
      )}
      <View style={[styles.container, containerStyles]}>
        <View style={[messageRootContainerStyle]}>
          <View style={[styles.messageContainer, messageContainerStyle]}>
            {!!image ? (
              <ImageBox showImage={showImage} {...{image}}></ImageBox>
            ) : (
              <Text style={[styles.messageTextContainer, textContainerStyle]}>
                {message}
              </Text>
            )}
          </View>
          <Spacing size={1} />
          <View style={[commonStyles.row]}>
            <Spacing size={3} />
            <Text style={[styles.timeFormater]}>{formatDateByTime(date)}</Text>
            <Spacing size={3} />
          </View>
        </View>
      </View>
      {isShowDate && isNotFirst && (
        <View
          style={[
            commonStyles.rowAlignCenter,
            commonStyles.justifyCenter,
            commonStyles.overflowHide,
            styles.mV,
            styles.mH,
          ]}>
          <View style={[styles.line]}></View>
          <View style={[styles.dateContainer]}>
            <Text style={[styles.dateText]}>
              {getFormattedDate(data[index - 1].date)}
            </Text>
          </View>
          <View style={[styles.line]}></View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  timeFormater: {
    fontSize: 11,
  },
  mH: {
    marginHorizontal: 10,
  },
  line: {
    width: '100%',
    height: 1,
    opacity: 0.2,
    backgroundColor: Colors.darkGrey,
  },
  dateText: {
    color: Colors.darkGrey,
    fontWeight: 'bold',
    opacity: 0.4,
    fontSize: 12,
  },
  mV: {
    marginVertical: 3,
  },
  dateContainer: {
    padding: 5,
    paddingHorizontal: 20,
    // backgroundColor: Colors.primary,
  },
  messageTextContainer: {
    fontSize: 15,
  },
  messageContainer: {
    // padding: 10,
    borderRadius: 10,
    // paddingHorizontal: 15,
  },
  container: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 5,
  },
});
