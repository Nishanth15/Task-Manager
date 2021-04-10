import Head from 'next/head';
import TopBar from '../components/TopBar.js';
export default function Home() {
    return (
        <div>
            <Head>
                <title>TaskManager</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <TopBar></TopBar>
        </div>
    );
}
