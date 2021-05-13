import Calender from '../pages/Calender';
import Inbox from '../pages/Inbox';
import SignUp from '../pages/Onboard/sign-up';
import Project from '../pages/Project';

const routes = [
    {
        path: '/',
        title: 'Inbox',
        component: Inbox,
    },
    {
        path: '/inbox',
        title: 'Inbox',
        component: Inbox,
    },
    {
        path: '/calender',
        title: 'Calender',
        component: Calender,
    },
    {
        path: '/project/:id',
        title: 'Project',
        component: Project,
    },
];

export default routes;
