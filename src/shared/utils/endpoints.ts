const BASE_URL = 'https://sociout-dev.herokuapp.com/api/';
//const BASE_URL = 'http://localhost:8000/api/';
const ENDPOINTS = {
  LOGIN: 'users/signin',
  SIGNUP: 'users/signup',
  ALLPOSTS: 'posts/skiping/',
  GETUSER: 'users/',
  LIKEPOST: 'likes/like',
  DISLIKEPOST: 'likes/unlike/',
  SHAREPOST: 'posts/share',
};

export {BASE_URL, ENDPOINTS};
