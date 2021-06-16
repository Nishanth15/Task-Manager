import http from '../services/http-client';
import { authHeader } from '../helpers/auth-header';

const addSection = async (section) => {
    return await http
        .post('/Section/', section, { headers: authHeader() })
        .then((response) => response.data);
};

const editSection = async (section) => {
    return await http
        .put('/Section/' + section.id, (section.id, section), {
            headers: authHeader(),
        })
        .then((response) => {
            return response.data;
        });
};

export const sectionService = {
    addSection,
    editSection,
};
