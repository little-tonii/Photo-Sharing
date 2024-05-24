const PREFIX_API = "http://localhost:8080";

const API = {
  LOGIN: `${PREFIX_API}/api/user/login`,
  REGISTER: `${PREFIX_API}/api/user/register`,
  LOGOUT: `${PREFIX_API}/api/user/logout`,
  UPDATE_PROFILE: `${PREFIX_API}/api/user`,
  GET_USER: `${PREFIX_API}/api/user`,
  CREATE_POST: `${PREFIX_API}/api/post`,
  GET_ACCESS_TOKEN: `${PREFIX_API}/api/user/refresh`,
  AVATAR: `${PREFIX_API}/public/images`,
  PHOTO: `${PREFIX_API}/public/images`,
  SUGGEST_USERS: `${PREFIX_API}/api/user/suggestion`,
  NEW_FEEDS: `${PREFIX_API}/api/post/newfeeds`,
  FOLLOW_USER: `${PREFIX_API}/api/action/follow`,
  UNFOLLOW_USER: `${PREFIX_API}/api/action/unfollow`,
  GET_COMMENT_ON_POST: `${PREFIX_API}/api/comment`,
  COMMENT_ON_POST: `${PREFIX_API}/api/comment`,
  GET_POST: `${PREFIX_API}/api/post`,
  LIKE_POST: `${PREFIX_API}/api/action/like`,
};

export { API };
