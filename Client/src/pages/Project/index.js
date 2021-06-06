import '../../styles/project.scss';
import {
    colors,
    HiOutlineDotsHorizontal,
    GiCheckMark,
    HiOutlinePencilAlt,
    HiOutlineTrash,
    HiOutlinePlus,
    HiOutlineViewGridAdd,
} from '../../assets/static';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { projectService } from '../../services/project.service';
import { Button, Input } from 'antd';

const Project = () => {
    const { id } = useParams();

    const [project, setProject] = useState([]);
    const [sections, setSections] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [addSection, setAddSection] = useState(false);

    useEffect(() => {
        getProject();
        getProjectData();
    }, [id]);

    const check_task = (index) => {
        let prevTasks = tasks;
        prevTasks.forEach((task, i) => {
            if (i === index) {
                task.checked = 1;
                console.log(i);
            }
        });
        setTasks(prevTasks);
        console.log(tasks);
    };

    const getProject = () => {
        projectService.projects.subscribe((projects) => {
            if (projects.length !== 0) {
                var data = projects.find((project) => project.id === id);
                console.log(data);
                setProject(data);
            }
        });
    };

    const getProjectData = () => {
        projectService.getProjectData(id).then((data) => {
            setSections(data.projectData.sections);
            setTasks(data.projectData.items);
            console.log(sections, tasks);
        });
    };

    return (
        <div className="project">
            <div className="project_header">
                <h1 className="project_title">{project.name}</h1>
                <div>
                    <HiOutlineDotsHorizontal className="project_menu" />
                </div>
            </div>

            <div className="section_list">
                {sections.map((section) => {
                    return (
                        <div className="section_item" key={section.id}>
                            <div className="section_header">
                                <div className="section_name">
                                    {section.name}
                                </div>
                                <HiOutlineDotsHorizontal className="section_menu" />
                            </div>
                            <div className="tasks">
                                {tasks.map((task, index) => {
                                    return (
                                        <div key={task.id}>
                                            <div className="task">
                                                <div
                                                    className="task_priority"
                                                    style={{
                                                        backgroundColor: `${
                                                            colors[
                                                                task.priority
                                                            ].color
                                                        }`,
                                                    }}
                                                ></div>
                                                <div className="task_top">
                                                    <div
                                                        className={
                                                            'task_checkbox ' +
                                                            (task.checked === 1
                                                                ? 'checked'
                                                                : '')
                                                        }
                                                        onClick={() =>
                                                            check_task(index)
                                                        }
                                                    >
                                                        <div className="task_checkbox_circle">
                                                            <GiCheckMark className="task_checkbox_checkmark" />
                                                        </div>
                                                    </div>
                                                    <div className="task_content">
                                                        {task.content}
                                                    </div>
                                                    <HiOutlineDotsHorizontal className="task_menu" />
                                                </div>

                                                <div className="task_bottom">
                                                    <HiOutlinePencilAlt className="task_edit" />
                                                    <HiOutlineTrash className="task_delete" />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="add_task">
                                <div className="add_task_button">
                                    <HiOutlinePlus className="h-5 w-5" />
                                    <div>Add Task</div>
                                </div>
                            </div>
                        </div>
                    );
                })}
                {addSection ? (
                    <div className="add_section_form">
                        <Input className="form_control"></Input>
                        <div className="add_section_form_button">
                            <Button className="add_section_button">
                                Add Section
                            </Button>
                            <Button
                                type="link"
                                onClick={() => {
                                    setAddSection(false);
                                }}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div
                        className="add_section_item"
                        onClick={() => {
                            setAddSection(true);
                        }}
                    >
                        <HiOutlineViewGridAdd className="h-5 w-5" />
                        <div>Add Section</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Project;
