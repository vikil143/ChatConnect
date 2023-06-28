import ChatedUsersScreen from '../screens/user-list/ChatedUsers';
import UserListScreen from '../screens/user-list/UserListScreen';
import {TabDataParams} from './types';

export const TabData: TabDataParams = [
  {
    route: 'Messages',
    component: ChatedUsersScreen,
  },
  {
    route: 'Users',
    component: UserListScreen,
  },
];
