import {HTTP_CLIENT} from '@utils/config';
import {ENDPOINTS} from '@utils/endpoints';

const getUser = (id: string) => {
  return HTTP_CLIENT.get(ENDPOINTS.GETUSER + id);
};
const getUserPost = (id: string) => {
  return HTTP_CLIENT.get(ENDPOINTS.GETUSERPOST + id);
};
const getUserFriends = (id: string) => {
  return HTTP_CLIENT.get(ENDPOINTS.GETUSERFRIENDS + id);
};
const getUserRequests = () => {
  return HTTP_CLIENT.get(ENDPOINTS.GETUSERREQUESTS);
};
const removeFriend = (id: string) => {
  return HTTP_CLIENT.get(ENDPOINTS.REMOVEFRIEND + id);
};
const sendRequest = (id: string) => {
  return HTTP_CLIENT.get(ENDPOINTS.SENDREQUEST + id);
};
export {
  getUser,
  getUserPost,
  getUserFriends,
  getUserRequests,
  removeFriend,
  sendRequest,
};
