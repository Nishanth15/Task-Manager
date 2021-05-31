import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
    colors,
    HiOutlineDotsHorizontal,
    GiCheckMark,
    HiOutlinePencilAlt,
    HiOutlineTrash,
    HiOutlinePlus,
    HiOutlineViewGridAdd,
} from '../../assets/static';
import { projectService } from '../../services/project.service';

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
    const [tasks, setTask] = useState([
        {
            id: 32231,
            priority: 0,
            content: 'Todo',
            time: '12.30 AM - 2.45 PM',
            checked: 0,
        },
        {
            id: 32232,
            priority: 1,
            content: 'Barge',
            time: '09.30 AM - 11.45 AM',
            checked: 0,
        },
        {
            id: 32233,
            priority: 2,
            content: 'Katang',
            time: '2.30 PM - 4.25 PM',
            checked: 0,
        },
        {
            id: 32234,
            priority: 3,
            content: 'Rabukya',
            time: '06.40 AM - 8.15 PM',
            checked: 0,
        },
        // {
        //     id: 32235,
        //     priority: 3,
        //     content: 'Rabukya',
        //     time: '06.40 AM - 8.15 PM',
        //     checked: 0,
        // },
        // {
        //     id: 32236,
        //     priority: 3,
        //     content: 'Rabukya',
        //     time: '06.40 AM - 8.15 PM',
        //     checked: 0,
        // },
        // {
        //     id: 32237,
        //     priority: 3,
        //     content: 'Rabukya',
        //     time: '06.40 AM - 8.15 PM',
        //     checked: 0,
        // },
        // {
        //     id: 32238,
        //     priority: 3,
        //     content: 'Rabukya',
        //     time: '06.40 AM - 8.15 PM',
        //     checked: 0,
        // },
        // {
        //     id: 32239,
        //     priority: 3,
        //     content: 'Rabukya',
        //     time: '06.40 AM - 8.15 PM',
        //     checked: 0,
        // },
        // {
        //     id: 3223799,
        //     priority: 3,
        //     content: 'Rabukya',
        //     time: '06.40 AM - 8.15 PM',
        //     checked: 0,
        // },
        // {
        //     id: 32237999,
        //     priority: 3,
        //     content: 'Rabukya',
        //     time: '06.40 AM - 8.15 PM',
        //     checked: 0,
        // },
        // {
        //     id: 3223788,
        //     priority: 3,
        //     content: 'Rabukya',
        //     time: '06.40 AM - 8.15 PM',
        //     checked: 0,
        // },
        // {
        //     id: 3223777,
        //     priority: 3,
        //     content: 'Rabukya',
        //     time: '06.40 AM - 8.15 PM',
        //     checked: 0,
        // },
        // {
        //     id: 3223766,
        //     priority: 3,
        //     content: 'Rabukya',
        //     time: '06.40 AM - 8.15 PM',
        //     checked: 0,
        // },
    ]);

    useEffect(() => {
        getProject(id);
        // getSections();
        // getTasks();
    }, [id]);

    // const useScrollTop = () => {
    //     const [scrollTop, setScrollTop] = useState(0);
    //     const onScroll = (event) => setScrollTop(event.target.scrollTop);
    //     console.log(scrollTop);
    //     return [scrollTop, { onScroll }];
    // };

    // const [scrollTop, scrollProps] = useScrollTop();

    const check_task = (index) => {
        let prevTasks = tasks;
        prevTasks.forEach((task, i) => {
            if (i === index) {
                task.checked = 1;
                console.log(i);
            }
        });
        setTask(prevTasks);
        console.log(tasks);
    };

    const getProject = (id) => {
        projectService.getProject(id).then((data) => {
            setProject(data);
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
                            <div
                                className="tasks"
                                // ref={(divelement) => {
                                //     divElement = divelement;
                                // }}
                                // {...scrollProps}
                                // style={{
                                //     borderTop:
                                //         scrollTop > 0
                                //             ? 'solid 1px #ccc'
                                //             : 'solid 1px transparent',
                                // }}
                            >
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
                                <HiOutlinePlus className="h-5 w-5" />
                                <div>Add Task</div>
                            </div>
                        </div>
                    );
                })}

                <div className="add_section_item">
                    <HiOutlineViewGridAdd className="h-5 w-5" />
                    <div>Add Section</div>
                </div>
            </div>
        </div>
    );
};

export default Project;
