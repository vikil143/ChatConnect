/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StyleSheet, View, StatusBar} from 'react-native';
import {RealmProvider} from './src/realmDB';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import RootNavigator from './src/routes/RootNavigator';
import {commonStyles} from './src/utility/commonStyles';
import {Colors} from './src/utility/Colors';

function App() {
  /*
    Planning for Chat App
    For Users 
    1. Store the data in realm DB from Firebase
    2. Create Login User who can see their dashboard
    
  */
  return (
    <GestureHandlerRootView style={[commonStyles.flexOne]}>
      <SafeAreaView style={[commonStyles.flexOne]}>
        <RealmProvider>
          <View style={[commonStyles.flexOne]}>
            <StatusBar
              backgroundColor={Colors.white}
              barStyle={'dark-content'}
            />
            <RootNavigator />
          </View>
        </RealmProvider>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
