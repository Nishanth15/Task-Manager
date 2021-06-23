import '../../styles/project.scss';
import Section from '../../components/Section/index';
import { HiOutlineDotsHorizontal } from '../../assets/static';
import { projectService } from '../../services/project.service';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Project = () => {
    const { id } = useParams();

    const [project, setProject] = useState([]);

    useEffect(() => {
        getProject();
        if (project.length !== 0) document.title = project.name;
    }, [id, project]);

    const getProject = () => {
        projectService.projects.subscribe((projects) => {
            if (projects.length !== 0) {
                var data = projects.find((project) => project.id === id);
                if (data !== undefined) {
                    setProject(data);
                }
            }
        });
    };

    return (
        <div className="project">
            {project.length !== 0 ? (
                <div>
                    <div className="project_header">
                        <h1 className="project_title">{project.name}</h1>
                        <div>
                            <HiOutlineDotsHorizontal className="project_menu" />
                        </div>
                    </div>
                    <Section id={id}></Section>
                </div>
            ) : (
                <div className="project_header">
                    <h1 className="project_title">Project Not Found</h1>
                </div>
            )}
        </div>
    );
};

export default Project;
