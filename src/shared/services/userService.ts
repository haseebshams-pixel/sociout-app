import {HTTP_CLIENT} from '@utils/config';
import {ENDPOINTS} from '@utils/endpoints';

const getUser = (id: string) => {
  return HTTP_CLIENT.get(ENDPOINTS.GETUSER + id);
};
const getUserPost = (id: string, skip: number) => {
  return HTTP_CLIENT.get(`${ENDPOINTS.GETUSERPOST}/${id}/${skip}`);
};
const getUserFriends = (id: string) => {
  return HTTP_CLIENT.get(ENDPOINTS.GETUSERFRIENDS + id);
};
const getUserRequests = () => {
  return HTTP_CLIENT.get(ENDPOINTS.GETUSERREQUESTS);
};
const getUserSocialNetwork = (id: string) => {
  return HTTP_CLIENT.get(ENDPOINTS.USERSOCIALNETWORK + id);
};
const removeFriend = (id: string) => {
  return HTTP_CLIENT.get(ENDPOINTS.REMOVEFRIEND + id);
};
const sendRequest = (id: string) => {
  return HTTP_CLIENT.get(ENDPOINTS.SENDREQUEST + id);
};
const acceptRequest = (id: string) => {
  return HTTP_CLIENT.get(ENDPOINTS.ACCEPTREQUEST + id);
};
const rejectRequest = (id: string) => {
  return HTTP_CLIENT.get(ENDPOINTS.REJECTREQUEST + id);
};
const getFriendShipStatus = (id: string) => {
  return HTTP_CLIENT.get(ENDPOINTS.GETFRIENDSHIPSTATUS + id);
};
const editUserProfile = (params: any) => {
  return HTTP_CLIENT.put(ENDPOINTS.EDITUSERPROFILE, params);
};
export {
  getUser,
  getUserPost,
  getUserFriends,
  getUserRequests,
  removeFriend,
  sendRequest,
  acceptRequest,
  rejectRequest,
  getUserSocialNetwork,
  getFriendShipStatus,
  editUserProfile,
};
