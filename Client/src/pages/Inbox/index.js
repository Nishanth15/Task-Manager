import { useEffect } from 'react';

const Inbox = () => {
    useEffect(() => {
        document.title = 'Inbox';
    }, []);
    return (
        <div className="h-full">
            <h1 className="text-2xl">Inbox</h1>
        </div>
    );
};

export default Inbox;
