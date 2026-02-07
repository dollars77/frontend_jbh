import api from "@/config/api";
import { TOKEN_KEY } from "@/config/token_key";

import Cookies from 'js-cookie'

const signin = async (username, password) => {
  return await api.post("/api/auth/signin", {
    username: username,
    password: password,
  }).then(res => {
    if (res.data.accessToken) {
      localStorage.setItem(`${TOKEN_KEY}`, JSON.stringify(res.data));
      Cookies.set(`${TOKEN_KEY}`, res.data.accessToken, { expires: 1 })
    }
       
    return res.data;
  })
}

const logout = () => {
  localStorage.removeItem(`${TOKEN_KEY}`);
  Cookies.remove(TOKEN_KEY)
     location.reload();
}

const register = (name, username, password) => {
  return api.post("/api/auth/signup", {
    name,
    username,
    password,
    roles: ["admin"]
  });
}

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem(`${TOKEN_KEY}`));
}

export {
  signin,
  logout,
  register,
  getCurrentUser
}