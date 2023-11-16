import Realm from 'realm';
import {createRealmContext} from '@realm/react';
import {ChatedRoom} from './chated-user';
import {CurrentUser} from './current-user';

const realmConfig: Realm.Configuration = {
  schema: [ChatedRoom, CurrentUser],
};

export const {RealmProvider, useRealm, useObject, useQuery} =
  createRealmContext(realmConfig);
