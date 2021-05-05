import Head from 'next/head';
import withAuth from '../../_helpers/ProtectedRoute';

function Calender() {
    return (
        <div>
            <Head>
                <title>Calender</title>
            </Head>
            <h2 className="text-5xl">Calender</h2>
        </div>
    );
}

export default Calender;
