import {HTTP_CLIENT} from '@utils/config';
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

export {getAllPosts, likePost, dislikePost, sharePost};
