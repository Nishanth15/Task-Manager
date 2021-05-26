import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { projectService } from '../../services/project.service';
import { colors } from '../../assets/static/index';

const Project = () => {
    const { id } = useParams();

    const [project, setProject] = useState([]);
    const [sections] = useState([
        {
            id: 1,
            name: 'To Do',
        },
        {
            id: 2,
            name: 'On Going',
        },
        {
            id: 3,
            name: 'Done',
        },
    ]);
    const [tasks] = useState([
        {
            id: 32232,
            priority: 0,
            content: 'Todo',
        },
        {
            id: 32233,
            priority: 1,
            content: 'Barge',
        },
        {
            id: 32234,
            priority: 2,
            content: 'Katang',
        },
        {
            id: 32236,
            priority: 3,
            content: 'Rabukya',
        },
    ]);

    useEffect(() => {
        getProject(id);
        // getSections();
        // getTasks();
    }, [id]);

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
                            <div className="section_header">
                                <div className="section_name">
                                    {section.name}
                                </div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="section_menu"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                                    />
                                </svg>
                            </div>
                            {tasks.map((task) => {
                                return (
                                    <div key={task.id}>
                                        <div
                                            className="task"
                                            style={{
                                                // borderColor: `${
                                                //     colors[task.priority].color
                                                // }`,
                                                backgroundColor: `${
                                                    colors[task.priority]
                                                        .light_color
                                                }`,
                                            }}
                                        >
                                            <div
                                                className="task_top"
                                                style={{
                                                    borderBottom: `1px dotted ${
                                                        colors[task.priority]
                                                            .color
                                                    }`,
                                                }}
                                            >
                                                <div
                                                    className="task_priority"
                                                    style={{
                                                        // borderColor: `${
                                                        //     colors[
                                                        //         task.priority
                                                        //     ].color
                                                        // }`,
                                                        backgroundColor: `${
                                                            colors[
                                                                task.priority
                                                            ].color
                                                        }`,
                                                    }}
                                                ></div>
                                                <div className="task_checkbox">
                                                    <div
                                                        className="task_checkbox_circle"
                                                        style={{
                                                            borderColor: `${
                                                                colors[
                                                                    task
                                                                        .priority
                                                                ].color
                                                            }`,
                                                            backgroundColor: `${
                                                                colors[
                                                                    task
                                                                        .priority
                                                                ].light_color
                                                            }`,
                                                        }}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            style={{
                                                                color: `${
                                                                    colors[
                                                                        task
                                                                            .priority
                                                                    ].color
                                                                }`,
                                                            }}
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M5 13l4 4L19 7"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="task_content">
                                                    {task.content}
                                                </div>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="task_menu"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                                                    />
                                                </svg>
                                            </div>
                                            <div className="task_bottom">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            <div className="add_task">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                    />
                                </svg>
                                <div>Add Task</div>
                            </div>
                        </div>
                    );
                })}
                <div className="add_section_item">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <div>Add Section</div>
                </div>
            </div>
        </div>
    );
};

export default Project;
