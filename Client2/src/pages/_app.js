import { useRouter } from 'next/router';
import Layout from '../components/Layout/Layout';

import Signin from './signin';

const MyApp = ({ Component, pageProps }) => {
    const router = useRouter();
    if (router.asPath === '/signin') return <Signin />;

    return (
        <>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    );
};

export default MyApp;
