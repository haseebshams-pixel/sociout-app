const BASE_URL = 'https://sociout-dev.herokuapp.com/api/';
// const BASE_URL = 'http://localhost:8000/api/';

const PHOTO_URL = 'https://storage.googleapis.com/sociout-data/';

const ENDPOINTS = {
  LOGIN: 'users/signin',
  SIGNUP: 'users/signup',
  ALLPOSTS: 'posts/skiping/',
  GETUSER: 'users/',
  LIKEPOST: 'likes/like',
  DISLIKEPOST: 'likes/unlike/',
  SHAREPOST: 'posts/share',
  GETUSERPOST: 'posts/user/skiping',
  GETUSERFRIENDS: 'friends/user/',
  GETUSERREQUESTS: 'friends/pending',
  REMOVEFRIEND: 'friends/remove/',
  SENDREQUEST: 'friends/request/',
  ACCEPTREQUEST: 'friends/confirm/',
  REJECTREQUEST: 'friends/reject/',
  USERSOCIALNETWORK: 'friends/user/socialCircle/',
  GETFRIENDSHIPSTATUS: 'friends/check/',
  GETJOBS: 'jobs/search',
  EDITUSERPROFILE: 'users/mobile-edit',
};

export {BASE_URL, ENDPOINTS, PHOTO_URL};
