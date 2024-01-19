import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import MIIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SCREEN_WIDTH} from '../../../utility/constants';
import {Colors} from '../../../utility/Colors';
import {MainRouteNavigationParam} from '../../../routes/types';
import WithoutFeedback from '../../../components/touchables/WithoutFeedback';

interface CardProps extends MainRouteNavigationParam {
  openImagePicker: () => void;
  image: {
    uri?: string;
    width: number;
    height: number;
    actaulWidth: number;
    actualHeight: number;
    x: number;
    y: number;
  };
}

export default function Card({navigation, openImagePicker, image}: CardProps) {
  return (
    <View style={[styles.container]}>
      <Image
        source={
          !!image.uri
            ? {uri: image.uri}
            : require('../../../assets/images/photo_three.jpg')
        }
        style={[
          styles.image,
          !!image.uri
            ? {
                width: SCREEN_WIDTH + (image.actaulWidth - image.width),
                height:
                  (SCREEN_WIDTH + (image.actaulWidth - image.width)) *
                  (image.actualHeight / image.actaulWidth),
                top: -image.y,
                left: -image.x,
              }
            : {},
        ]}
      />
      <WithoutFeedback onPress={() => navigation.goBack()}>
        <View style={[styles.crossBox]}>
          <MIIcon name="plus" color={Colors.white} size={40} />
        </View>
      </WithoutFeedback>
      <WithoutFeedback onPress={openImagePicker}>
        <View style={[styles.editBox]}>
          <MIcon name="edit" color={Colors.white} size={30} />
        </View>
      </WithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
    overflow: 'hidden',
  },
  crossBox: {
    position: 'absolute',
    top: 15,
    left: 15,
    transform: [{rotate: '45deg'}],
  },
  editBox: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  image: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
  },
});
