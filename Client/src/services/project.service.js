import { authHeader } from '../helpers/auth-header';
import { handleResponse } from '../helpers/handle-response';

const url = 'http://localhost:5000/api/project';

const getProjects = async () => {
    const requestOptions = { method: 'GET', headers: authHeader() };
    fetch(url, requestOptions).then(handleResponse);
};

export const projectService = {
    getProjects,
};
