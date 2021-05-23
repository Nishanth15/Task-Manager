import { authHeader } from '../helpers/auth-header';
// import { handleResponse } from '../helpers/handle-response';
import http from '../services/http-client';

const getProjects = async () => {
    return http
        .get('/Project', { headers: authHeader() })
        .then((response) => response.data);
};

const getProject = (id) => {
    if (id !== undefined) {
        return http
            .get('/Project/' + id, { headers: authHeader() })
            .then((response) => response.data);
    }
};

const addProject = (project) => {
    http.post('/Project/', project, { headers: authHeader() }).then(
        (response) => console.log(response.data)
    );
};

export const projectService = {
    getProjects,
    getProject,
    addProject,
};
