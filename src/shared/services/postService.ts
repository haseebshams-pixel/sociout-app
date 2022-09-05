import {HTTP_CLIENT} from '@utils/config';
import {ENDPOINTS} from '@utils/endpoints';

const getAllPosts = (skip: number) => {
  return HTTP_CLIENT.get(ENDPOINTS.ALLPOSTS + skip);
};

export {getAllPosts};
