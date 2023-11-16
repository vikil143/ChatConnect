import {firebase} from '@react-native-firebase/database';

const usersDataRef = firebase
  .app()
  .database('https://message-app-f76bc-default-rtdb.firebaseio.com/')
  .ref('/users');

const chatedUserDataRef = firebase
  .app()
  .database('https://message-app-f76bc-default-rtdb.firebaseio.com/')
  .ref('/chated-user');

export {usersDataRef, chatedUserDataRef};
