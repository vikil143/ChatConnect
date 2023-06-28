import {StyleSheet} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {SCREEN_WIDTH} from '../utility/constants';
import {Colors} from '../utility/Colors';
import {TabRoutesParams} from './types';
import {TabData} from './data';

const Tab = createMaterialTopTabNavigator<TabRoutesParams>();

export default function DashboardTabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          textTransform: 'none',
          fontWeight: '700',
        },
        tabBarContentContainerStyle: {
          elevation: 0,
        },
        tabBarAndroidRipple: {color: 'transparent'},
        tabBarStyle: {
          width: SCREEN_WIDTH * 0.7,
          transform: [
            {translateX: SCREEN_WIDTH / 2 - (SCREEN_WIDTH * 0.7) / 2},
          ],
          bottom: 15,
          position: 'absolute',
          zIndex: 1,
          left: 0,
          right: 0,
          backgroundColor: Colors.lightWhite,
          elevation: 0,
        },
        tabBarIndicatorStyle: {
          backgroundColor: Colors.white,
          elevation: 5,
          position: 'relative',
          height: '80%',
          width: '90%',
        },
        tabBarIndicatorContainerStyle: {
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          width: '50%',
          alignItems: 'center',
        },
      }}>
      {TabData.map((item, index) => {
        return (
          <Tab.Screen
            key={'route' + index}
            name={item.route}
            component={item.component}
          />
        );
      })}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
