import Realm from 'realm';

class CurrentUser extends Realm.Object<CurrentUser> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  status!: string;
  static schema = {
    name: 'CurrentUser',
    properties: {
      _id: 'objectId',
      name: 'string',
      status: 'string',
    },
    primaryKey: '_id',
  };
}

export {CurrentUser};
