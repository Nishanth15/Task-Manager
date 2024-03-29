import { useEffect } from 'react';

const Label = () => {
    useEffect(() => {
        document.title = 'Label';
    }, []);
    return (
        <div className="h-full">
            <h1 className="text-2xl">Label</h1>
        </div>
    );
};

export default Label;
