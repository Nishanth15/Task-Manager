import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { projectService } from '../../services/project.service';
const Project = () => {
    const { id } = useParams();

    const [project, setProject] = useState([]);
    const [sections] = useState([
        {
            id: 23412314,
            name: 'Welcome',
        },
    ]);
    const [tasks] = useState([
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
        getProject(id);
        // getSections();
        // getTasks();
    }, []);

    const getProject = (id) => {
        projectService.getProject(id).then((data) => {
            setProject(data);
            console.log(data);
        });
    };

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
