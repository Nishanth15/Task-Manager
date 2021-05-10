import Calender from '../pages/calender';
import Inbox from '../pages/inbox';
import Project from '../pages/project';

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
