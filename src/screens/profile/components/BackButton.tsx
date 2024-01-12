import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../../utility/Colors';
import {MainRouteNavigationParam} from '../../../routes/types';
import WithoutFeedback from '../../../components/touchables/WithoutFeedback';

interface BackButtonProps extends MainRouteNavigationParam {}

export default function BackButton({navigation}: BackButtonProps) {
  return (
    <WithoutFeedback onPress={() => navigation.goBack()}>
      <View style={[styles.backButton]}>
        <Text style={[styles.back]}>Back</Text>
      </View>
    </WithoutFeedback>
  );
}

const styles = StyleSheet.create({
  back: {
    fontWeight: '800',
  },
  backButton: {
    backgroundColor: Colors.white,
    elevation: 5,
    margin: 15,
    padding: 15,
    alignItems: 'center',
  },
});
