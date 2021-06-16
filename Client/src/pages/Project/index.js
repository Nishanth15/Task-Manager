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
        getProjectData();
    }, [id]);

    const getProject = () => {
        projectService.projects.subscribe((projects) => {
            if (projects.length !== 0) {
                var data = projects.find((project) => project.id === id);
                setProject(data);
            }
        });
    };

    const getProjectData = () => {
        projectService.getProjectData(id).then((data) => {});
    };

    return (
        <div className="project">
            <div className="project_header">
                <h1 className="project_title">{project.name}</h1>
                <div>
                    <HiOutlineDotsHorizontal className="project_menu" />
                </div>
            </div>
            <Section id={id}></Section>
        </div>
    );
};

export default Project;
