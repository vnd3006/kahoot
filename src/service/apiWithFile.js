import axios from "axios";
import TokenService from "./token.service";

const instance = axios.create({
  baseURL: "http://localhost:3030",
  
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Before making request, do the following
instance.interceptors.request.use(
  (config) => {
   
    const token = TokenService.getLocalAccessToken();

    if (token) {
      config.headers["x-webnc-kahoot-access-token"] = token;
    }

    return config;
  },
  (error) => {

    return Promise.reject(error);
  }
);

// With response data, do the following
instance.interceptors.response.use(
  (res) => {
  
    return res;
  },
  async (err) => {
    console.log('Error: ',err);
    const originalConfig = err.config;

    if (err.response) {
      // access token expired
      if (err.response.status === 401 && err.response.data.message!="refreshToken is revoked!"&& !originalConfig._retry) {
        // handle infinite loop
        originalConfig._retry = true;

        try {
          const rs = await instance.post("/auth/refresh", {
            accessToken: TokenService.getLocalAccessToken(),
            refreshToken: TokenService.getLocalRefreshToken(),
          });

          const { accessToken } = rs.data;
          TokenService.updateNewAccessToken(accessToken);

          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }

      // refresh token expired
    }

    return Promise.reject(err);
  }
);

export default instance;