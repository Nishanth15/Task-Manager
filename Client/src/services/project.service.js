import { authHeader } from '../helpers/auth-header';
import { handleResponse } from '../helpers/handle-response';

const url = 'https://localhost:44373/api/Project';

const getProjects = async () => {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(url, requestOptions).then((response) => response.json());
};

export const projectService = {
    getProjects,
};
