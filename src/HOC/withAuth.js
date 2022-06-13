import { authValue } from '@/store/slices/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const Router = useRouter();
    const [verified, setVerified] = useState(false);
    const auth = useSelector(authValue);

    useEffect(() => {
      if (auth.isReady) {
        if (auth.isLoggedIn === false) {
          Router.replace('/dashboard/login');
        } else {
          setVerified(true);
        }
      }
    }, [auth.isReady]);

    if (verified) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };
};

export default withAuth;
