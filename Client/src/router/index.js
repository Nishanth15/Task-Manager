import Calender from '../pages/Calender';
import Inbox from '../pages/Inbox';
import Project from '../pages/Project';

const routes = [
    {
        path: '/register',
        title: 'Register',
        component: Inbox,
    },
    {
        path: '/login',
        title: 'Login',
        component: Inbox,
    },
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
