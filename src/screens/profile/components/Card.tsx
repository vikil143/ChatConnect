import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import MIIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SCREEN_WIDTH} from '../../../utility/constants';
import {Colors} from '../../../utility/Colors';
import {MainRouteNavigationParam} from '../../../routes/types';
import WithoutFeedback from '../../../components/touchables/WithoutFeedback';

interface CardProps extends MainRouteNavigationParam {}

export default function Card({navigation}: CardProps) {
  return (
    <View>
      <Image
        source={require('../../../assets/images/photo_three.jpg')}
        style={[styles.image]}
      />
      <WithoutFeedback onPress={() => navigation.goBack()}>
        <View style={[styles.crossBox]}>
          <MIIcon name="plus" color={Colors.white} size={40} />
        </View>
      </WithoutFeedback>
      <View style={[styles.editBox]}>
        <MIcon name="edit" color={Colors.white} size={30} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
