import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {projectService} from '../../services/project.service';
const Project = () => {
    // const router = useLocation();
    const { id } = useParams();
    const projectURL = 'http://localhost:5000/api/Project/' + id;
    // const sectionURL = 'http://localhost:5000/api/section/';
    // const sectionURL = 'http://localhost:5000/api/section/';
    // const taskURL = 'http://localhost:5000/api/item/';

    const [project, setProject] = useState([]);
    const [sections, setSections] = useState([
        {
            id: 23412314,
            name: 'Welcome',
        },
    ]);
    const [tasks, setTasks] = useState([
        {
            id: 32232,
            content: 'Todo',
        },
        {
            id: 32233,
            content: 'Barge',
        },
        {
            id: 32234,
            content: 'Katang',
        },
        {
            id: 32236,
            content: 'Rabukya',
        },
    ]);

    useEffect(() => {
        var project = projectService.getProject(id);
        console.log(project);
        if(project!=null)
        setProject(project);
        // getSections();
        // getTasks();
    }, []);

    // const getProjects = () => {
    //     if (id !== undefined) {
    //         fetch(projectURL)
    //             .then((response) => response.json())
    //             .then((data) => setProject(data));
    //     }
    // };

    // const getSections = () => {
    //     if (id !== undefined) {
    //         fetch(sectionURL)
    //             .then((response) => response.json())
    //             .then((data) => setSections(data));
    //     }
    // };

    // const getTasks = () => {
    //     if (id !== undefined) {
    //         fetch(taskURL)
    //             .then((response) => response.json())
    //             .then((data) => setTasks(data));
    //     }
    // };

    // console.log(sections);
    // console.log(tasks);
    return (
        <div className="project">
            <div>
                <h1 className="project_title">{project.name}</h1>
            </div>

            <div className="section_list">
                {sections.map((section) => {
                    return (
                        <div className="section_item" key={section.id}>
                            <div className="section_name">{section.name}</div>
                            {tasks.map((task) => {
                                return (
                                    <div key={task.id}>
                                        <div className="task">
                                            {task.content}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Project;
