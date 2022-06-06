import axios from "axios";

export function setTokenToStorage(_token) {
  localStorage.setItem("token", _token);
}

export function getAuthToken() {
  return localStorage.getItem("token");
}

export async function getUserDataFromLocale() {
  return await localStorage.getItem("user");
}

export function clearToken() {
  return localStorage.removeItem("token");
}

export function clearLocaleStorage() {
  return localStorage.clear();
}

export async function checkAuth() {
  return await axios.get("/user/me");
}

export async function login(data) {
  return axios.post("/user/login", data);
}

import { setStoreAuth } from '@/store/slices/auth';
import { useDispatch } from 'react-redux';
import { resetAction } from '@/store';

export function useLogoutService() {
  const dispatch = useDispatch();

  const logoutRequest = async () => {
    await clearToken();
    await clearLocaleStorage();
    dispatch(resetAction);
  };

  return {
    logoutRequest,
  };
}

export function useLoginService() {
  const { meRequest } = useMeService();

  const loginRequest = async (data) => {
    const result = await login(data);
    await localStorage.setItem('token', result.data.token);
    await localStorage.setItem('user', JSON.stringify(result.data.data));
    meRequest();
  };

  return {
    loginRequest,
  };
}


async function setAuthUser({ dispatch, result }) {
  console.log('setStoreAuthlaniyor');
  dispatch(
    setStoreAuth({
      user: result.data.data,
      isLoggedIn: true,
    }),
  );
  console.log('setStoreAuthlamisiz');
}

export function useMeService() {
  const dispatch = useDispatch();

  const meRequest = async () => {
    const result = await checkAuth();
    await setAuthUser({ dispatch, result });
  };

  return {
    meRequest,
  };
}



