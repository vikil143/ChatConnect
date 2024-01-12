import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {commonStyles} from '../../../utility/commonStyles';
import Sheet from './Sheet';
import WithoutFeedback from '../../../components/touchables/WithoutFeedback';

interface ItemProps {
  name: string;
}

export default function Item({name}: ItemProps) {
  const [value, setValue] = useState(name);
  const [sheet, setSheet] = useState(false);

  const hideSheet = () => setSheet(false);

  const showSheet = () => setSheet(true);

  return (
    <>
      <WithoutFeedback onPress={showSheet}>
        <View style={[styles.itemContainer]}>
          <Text>{value}</Text>
          <View style={[commonStyles.flexOne]} />
          <MIcon name="arrow-forward-ios" size={15} />
        </View>
      </WithoutFeedback>
      <Sheet name={value} setName={setValue} show={sheet} hide={hideSheet} />
    </>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    padding: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
