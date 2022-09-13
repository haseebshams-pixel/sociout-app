const BASE_URL = 'https://sociout-dev.herokuapp.com/api/';
// const BASE_URL = 'http://localhost:8000/api/';
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
};

export {BASE_URL, ENDPOINTS};
