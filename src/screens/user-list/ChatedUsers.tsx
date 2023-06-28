import {StyleSheet, View, FlatList} from 'react-native';
import React from 'react';
import Header from './components/Header';
import {commonStyles} from '../../utility/commonStyles';
import {Colors} from '../../utility/Colors';
import UserTextBox from '../../components/users/UserTextBox';
import {MainRouteScreenProps} from '../../routes/types';

interface ChatedUsersScreenProps extends MainRouteScreenProps<'Dashboard'> {}

export default function ChatedUsersScreen({
  navigation,
}: ChatedUsersScreenProps) {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <View style={[commonStyles.flexOne, commonStyles.white]}>
      <Header />
      <FlatList
        data={data}
        contentContainerStyle={{paddingBottom: 60}}
        renderItem={({item, index}) => {
          return (
            <UserTextBox
              {...{item, index, navigation}}
              maxLengthNo={data.length - 1}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    height: 400,
    width: '100%',
    backgroundColor: Colors.red,
  },
});
