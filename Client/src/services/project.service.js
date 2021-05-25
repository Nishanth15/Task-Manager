import { authHeader } from '../helpers/auth-header';
import { BehaviorSubject } from 'rxjs';
import { handleResponse } from '../helpers/handle-response';
import http from '../services/http-client';

const projectsSubject = new BehaviorSubject([]);

const getProjects = async () => {
    return await http
        .get('/Project', { headers: authHeader() })
        .then((response) => (projectsSubject.next(response.data)));
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
        (response) => projectsSubject.next([...projectsSubject.getValue(),response.data])
    );
};

export const projectService = {
    getProjects,
    getProject,
    addProject,
    projects:projectsSubject.asObservable(),
};
