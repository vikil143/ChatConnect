import React from 'react';
import {View} from 'react-native';

interface Props {
  size?: number;
}

function Spacing({size = 10}: Props) {
  return <View style={{padding: size}} />;
}

export default Spacing;
