import Head from 'next/head';
import withAuth from '../../_helpers/ProtectedRoute';

function Inbox() {
    return (
        <div>
            <Head>
                <title>Inbox</title>
            </Head>
            <h1 className="text-5xl">Inbox</h1>
        </div>
    );
}

export default Inbox;
