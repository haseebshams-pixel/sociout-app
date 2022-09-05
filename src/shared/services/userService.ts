import {HTTP_CLIENT} from '@utils/config';
import {ENDPOINTS} from '@utils/endpoints';

const getUser = (id: string) => {
  return HTTP_CLIENT.get(ENDPOINTS.GETUSER + id);
};

export {getUser};
