import React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import UserListScreen from '../screens/user-list/UserListScreen';
import ChatRoom from '../screens/chat-room/ChatRoom';
import {commonStyles} from '../utility/commonStyles';
import DashboardTabsNavigator from './DashboardTabs';
import {MainRoutesParams} from './types';

const Stack = createStackNavigator<MainRoutesParams>();

const DashboardTabScreen = () => {
  return (
    <View style={[commonStyles.flexOne]}>
      <DashboardTabsNavigator />
    </View>
  );
};

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name="Dashboard" component={DashboardTabScreen} />
        <Stack.Screen name="UserList" component={UserListScreen} />
        <Stack.Screen name="ChatRoom" component={ChatRoom} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
