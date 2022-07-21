import api from "./api";
import TokenService from "./token.service";

const signup = async (username, password) => {
  const response = await api.post("/auth/register", {
    username,
    password,
  });
  
  // if (response.data.accessToken) {
  //   // localStorage.setItem("user", JSON.stringify(response.data));
  //   TokenService.setUser(response.data);
  // }
  return response.data;
};

const login = async (username, password) => {
  const response = await api.post("/auth/login", {
    username,
    password,
  });
  console.log('login response: ',response);
  if (response.data.accessToken) {
    // localStorage.setItem("user", JSON.stringify(response.data));
    TokenService.setUser(response.data);
  }
  console.log('respone data login ',response.data);
  return response.data;
};

const logout = () => {
  // localStorage.removeItem("user");
  TokenService.removeUser();
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
};

export default authService;
