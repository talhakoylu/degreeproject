import { checkAuth, clearToken, getAuthToken } from '@/services/auth.service';
import { selectIsLoggedIn, setReady } from '@/store/slices/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLogoutService, useMeService } from '@/services/auth.service';

const AuthProvider = ({ children }) => {
  const Router = useRouter();
  const dispatch = useDispatch();
  const {meRequest} = useMeService();

  useEffect(() => {
    async function fetchMyAPI() {
      const token = getAuthToken();
      if (token) {
        try {
          await meRequest();
        } catch {
          await clearToken();
          await localStorage.removeItem('user')

         Router.replace('/dashboard/login');
        } finally {
          dispatch(setReady(true));
        }
      } else {
        dispatch(setReady(true));
      }
    }

    fetchMyAPI();
  }, []);

  return children;
};

export default AuthProvider;
