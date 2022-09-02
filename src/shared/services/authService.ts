import {HTTP_CLIENT} from '@utils/config';
import {ENDPOINTS} from '@utils/endpoints';

const registerUser = (params: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.SIGNUP, params);
};

const loginUser = (params: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.LOGIN, params);
};
export {registerUser, loginUser};
