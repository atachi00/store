import axios from "axios";
import { getToken, logout } from "../utils/auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  timeout: 30000,
});

// токен подставляется автоматически в каждый запрос
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// если сервер ответил 401 (токен истёк) - выходим и отправляем на логин
api.interceptors.response.use(
  (response) => response,
  (err) => {
    const isLogin = err.config?.url === "/login"; // там 401 = неверный пароль
    if (err.response?.status === 401 && !isLogin) {
      logout();
      window.location.href = "/";
    }
    return Promise.reject(err);
  },
);

export default api;
