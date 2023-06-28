import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {commonStyles} from '../../utility/commonStyles';
import Header from './components/Header';
import {Colors} from '../../utility/Colors';

const UserListScreen = () => {
  return (
    <View style={[commonStyles.flexOne, commonStyles.white]}>
      <Header />
      <FlatList
        data={[1, 2, 3, 4]}
        ItemSeparatorComponent={() => <View style={{padding: 10}} />}
        renderItem={({}) => {
          return <View style={[styles.box]} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    height: 400,
    width: '100%',
    backgroundColor: Colors.red,
  },
});

export default UserListScreen;
