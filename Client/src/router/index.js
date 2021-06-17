import { lazy } from 'react';
import Inbox from '../pages/Inbox';
import Calendar from '../pages/Calendar';
import Project from '../pages/Project';
import Label from '../pages/Label';
import Filter from '../pages/Filter';
// const Inbox = lazy(
//     () =>
//         new Promise((resolve, reject) =>
//             setTimeout(() => resolve(import('../pages/Inbox')), 1500)
//         )
// );
// const Calendar = lazy(
//     () =>
//         new Promise((resolve, reject) =>
//             setTimeout(() => resolve(import('../pages/Calendar')), 1500)
//         )
// );
// const Project = lazy(
//     () =>
//         new Promise((resolve, reject) =>
//             setTimeout(() => resolve(import('../pages/Project')), 1500)
//         )
// );
// const Label = lazy(
//     () =>
//         new Promise((resolve, reject) =>
//             setTimeout(() => resolve(import('../pages/Label')), 1500)
//         )
// );
// const Filter = lazy(
//     () =>
//         new Promise((resolve, reject) =>
//             setTimeout(() => resolve(import('../pages/Filter')), 1500)
//         )
// );
// import Inbox from '../pages/Inbox';

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
