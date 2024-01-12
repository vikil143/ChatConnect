import React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import ChatRoom from '../screens/chat-room/ChatRoom';
import {commonStyles} from '../utility/commonStyles';
import DashboardTabsNavigator from './DashboardTabs';
import {MainRoutesParams} from './types';
import LoginScreen from '../screens/auth/Login';
import ProfileMainScreen from '../screens/profile/MainScreen';

const MainStack = createStackNavigator<MainRoutesParams>();

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
      <MainStack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        {/* <MainStack.Group>
          <MainStack.Screen name="Login" component={LoginScreen} />
        </MainStack.Group> */}
        <MainStack.Group>
          <MainStack.Screen name="Dashboard" component={DashboardTabScreen} />
          <MainStack.Screen name="ChatRoom" component={ChatRoom} />
          <MainStack.Screen name="Profile" component={ProfileMainScreen} />
        </MainStack.Group>
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
