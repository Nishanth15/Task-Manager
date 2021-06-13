import http from '../services/http-client';
import { authHeader } from '../helpers/auth-header';

const addTask = async (task) => {
    return await http
        .post('/Item/', task, { headers: authHeader() })
        .then((response) => {
            // console.log(response.data);
            return response.data;
        });
};
const editTask = async (task) => {
    return await http
        .put('/Item/' + task.id, (task.id, task), { headers: authHeader() })
        .then((response) => {
            return response.data;
        });
};

export const taskService = {
    addTask,
    editTask,
};
