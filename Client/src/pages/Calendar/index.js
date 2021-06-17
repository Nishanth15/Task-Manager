import { useEffect } from 'react';

const Calendar = () => {
    useEffect(() => {
        document.title = 'Calendar';
    }, []);
    return (
        <div className="h-full">
            <h1 className="text-2xl">Calender</h1>
        </div>
    );
};

export default Calendar;
