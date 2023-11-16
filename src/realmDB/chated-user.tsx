import Realm from 'realm';

class ChatedRoom extends Realm.Object<ChatedRoom> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  status!: string;
  lastMessage!: string;
  static schema = {
    name: 'ChatedRoom',
    properties: {
      _id: 'objectId',
      name: 'string',
      status: 'string',
      lastMessage: 'string',
    },
    primaryKey: '_id',
  };
}

export {ChatedRoom};
