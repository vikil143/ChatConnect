import {useObject, useQuery} from '../realmDB';
import {CurrentUser} from '../realmDB/current-user';

export const useCurrentUser = () => {
  const user = useQuery(CurrentUser);

  return user;
};
