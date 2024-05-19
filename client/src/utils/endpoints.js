const PREFIX_API = "http://localhost:8080";

const API = {
  LOGIN: `${PREFIX_API}/api/user/login`,
  REGISTER: `${PREFIX_API}/api/user/register`,
  LOGOUT: `${PREFIX_API}/api/user/logout`,
  GET_USER: `${PREFIX_API}/api/user`,
  CREATE_POST: `${PREFIX_API}/api/post`,
  GET_ACCESS_TOKEN: `${PREFIX_API}/api/user/refresh`,
  AVATAR: `${PREFIX_API}/public/images`,
  PHOTO: `${PREFIX_API}/public/images`,
  SUGGEST_USERS: `${PREFIX_API}/api/user/suggestion`,
};

export { API };
