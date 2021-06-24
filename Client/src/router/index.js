import Inbox from '../pages/Inbox';
import Calendar from '../pages/Calendar';
import Project from '../pages/Project';
import Label from '../pages/Label';
import Filter from '../pages/Filter';

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
    {
        path: '/label/:id',
        title: 'Label',
        component: Label,
    },
    {
        path: '/filter/:id',
        title: 'Filter',
        component: Filter,
    },
];

export default routes;
