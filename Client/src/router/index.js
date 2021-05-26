import SignIn from '../pages/Onboard/sign-in';
import SignUp from '../pages/Onboard/sign-up';
import Inbox from '../pages/Inbox';
import Calendar from '../pages/Calendar';
import Project from '../pages/Project';
import PageNotFound from '../pages/404NotFound';

const routes = [
    {
        path: '/inbox',
        title: 'Inbox',
        component: Inbox,
    },
    {
        path: '/calendar',
        title: 'Calendar',
        component: Calendar,
    },
    {
        path: '/project/:id',
        title: 'Project',
        component: Project,
    },
];

export default routes;
