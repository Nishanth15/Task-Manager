import '../styles/global.scss';
import ProtectedRoute from '../_helpers/ProtectedRoute';
import { useRouter } from "next/router";
import { useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import Signin from '../pages/user/sign-in';
import Signup from '../pages/user/sign-up';
import Unauthorized from '../pages/unauthorized';
import NotFound from '../pages/not-found';

const MyApp = ({ Component, pageProps }) => {
const router = useRouter();


switch(router.asPath){
    case '/user/sign-in':{
        useEffect(() => {
            router.push('/user/sign-in', undefined, { shallow: true });
          }, [])
          return (<Signin />);
        }
    case '/user/sign-up':{
        useEffect(() => {
            router.push('/user/sign-up', undefined, { shallow: true });
          }, [])
          return (<Signup />);
    }
    case '/unauthorized':{
        useEffect(() => {
            router.push('/unauthorized', undefined, { shallow: true });
          }, [])
          return (<Unauthorized />);
    }
    case '/404':{
        useEffect(() => {
            router.push('/not-found', undefined, { shallow: true });
          }, [])
          return (<NotFound />);
    }
    case '/not-found':{
        useEffect(() => {
            router.push('/not-found', undefined, { shallow: true });
          }, [])
          return (<NotFound />);
    }
    default :{
    return (
        <Layout>
            <ProtectedRoute component={Component} {...pageProps}>
            </ProtectedRoute>
        </Layout>
      
    );
    }
    }    
};

export default MyApp;
