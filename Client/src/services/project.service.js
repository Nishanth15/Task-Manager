import http from '../services/http-client';
import { authHeader } from '../helpers/auth-header';
import { BehaviorSubject } from 'rxjs';
import { sortBySectionOrder } from '../helpers/sortby-section-order';

const projectsSubject = new BehaviorSubject([]);

const getProjects = async () => {
    return await http
        .get('/Project', { headers: authHeader() })
        .then((response) => projectsSubject.next(response.data));
};

const getProjectData = async (id) => {
    if (id !== undefined) {
        return await http
            .get('/Project/' + id, { headers: authHeader() })
            .then((response) => {
                response.data.projectData.items = sortBySectionOrder(
                    response.data.projectData.sections,
                    response.data.projectData.items
                );
                return response.data;
            });
    }
};

const addProject = async (project) => {
    await http
        .post('/Project/', project, { headers: authHeader() })
        .then((response) =>
            projectsSubject.next([...projectsSubject.getValue(), response.data])
        );
};

export const projectService = {
    getProjects,
    getProjectData,
    addProject,
    projects: projectsSubject.asObservable(),
};
