import {HTTP_CLIENT, HTTP_CLIENT2} from '@utils/config';
import {ENDPOINTS} from '@utils/endpoints';

const getAllPosts = (skip: number) => {
  return HTTP_CLIENT.get(ENDPOINTS.ALLPOSTS + skip);
};
const likePost = (obj: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.LIKEPOST, obj);
};

const dislikePost = (id: string) => {
  return HTTP_CLIENT.get(ENDPOINTS.DISLIKEPOST + id);
};

const sharePost = (obj: any) => {
  return HTTP_CLIENT.post(ENDPOINTS.SHAREPOST, obj);
};
const deletePost = (id: string | undefined) => {
  return HTTP_CLIENT.delete(`${ENDPOINTS.DELETEPOST}${id}`);
};
const deleteSharePost = (id: string | undefined) => {
  return HTTP_CLIENT.delete(`${ENDPOINTS.DELETESHAREPOST}${id}`);
};
const createPost = (params: object) => {
  return HTTP_CLIENT2.post(ENDPOINTS.CREATEPOST, params);
};
const getPostComments = (id: string) => {
  return HTTP_CLIENT.get(ENDPOINTS.GETCOMMENTS + id);
};

export {
  getAllPosts,
  likePost,
  dislikePost,
  sharePost,
  deletePost,
  deleteSharePost,
  createPost,
  getPostComments,
};
