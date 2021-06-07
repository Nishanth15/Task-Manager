import '../../styles/project.scss';
import {
    colors,
    GiCheckMark,
    TiFlowChildren,
    HiOutlineDotsHorizontal,
    HiOutlinePencilAlt,
    HiOutlineTrash,
    HiOutlinePlus,
    HiOutlineViewGridAdd,
    HiOutlineUserAdd,
    HiOutlineClock,
    RiFireFill,
} from '../../assets/static';
import { projectService } from '../../services/project.service';
import { sectionService } from '../../services/section.service';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Dropdown, Input, Menu } from 'antd';
import { taskService } from '../../services/task.service';

const Project = () => {
    const initialSectionData = {
        name: '',
        order: 0,
        projectId: '',
    };
    const initialTaskData = {
        content: '',
        order: 0,
        userId: '00000000-0000-0000-0000-000000000000',
        projectId: '',
        sectionId: '',
        parentId: '00000000-0000-0000-0000-000000000000',
        priority: 3,
        due: null,
    };

    const { id } = useParams();
    const [project, setProject] = useState([]);
    const [sections, setSections] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [addSectionForm, setAddSectionForm] = useState(false);
    const [addTaskForm, setAddTaskForm] = useState();
    const [newSection, setNewSection] = useState(initialSectionData);
    const [newTask, setNewTask] = useState(initialTaskData);

    useEffect(() => {
        getProject();
        getProjectData();
    }, [id]);

    const check_task = (index) => {
        let prevTasks = tasks;
        prevTasks.forEach((task, i) => {
            if (i === index) {
                task.checked = 1;
                // console.log(i);
            }
        });
        setTasks(prevTasks);
        // console.log(tasks);
    };

    const handleMenuClick = (e) => {
        setNewTask({
            ...newTask,
            priority: e.key,
        });
    };

    const getProject = () => {
        projectService.projects.subscribe((projects) => {
            if (projects.length !== 0) {
                var data = projects.find((project) => project.id === id);
                // console.log(data);
                setProject(data);
            }
        });
    };

    const getProjectData = () => {
        projectService.getProjectData(id).then((data) => {
            setSections(data.projectData.sections);
            setTasks(data.projectData.items);
            // console.log(sections, tasks);
        });
    };

    const addSection = () => {
        // console.log(newSection);
        sectionService.addSection(newSection).then((section) => {
            console.log(section);
            setSections((sections) => [...sections, section]);
        });
        setNewSection(initialSectionData);
        setAddSectionForm(false);
    };

    const addTask = () => {
        console.log(newTask);
        taskService.addTask(newTask).then((task) => {
            console.log(task);
            setTasks((tasks) => [...tasks, task]);
        });
        setNewTask(initialTaskData);
        setAddTaskForm();
    };

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item
                key="0"
                className="flex items-center space-x-2"
                icon={
                    <RiFireFill
                        className="add_task_icon"
                        style={{
                            color: `${colors[0].color}`,
                        }}
                    />
                }
            >
                Priority 1
            </Menu.Item>
            <Menu.Item
                key="1"
                className="flex items-center space-x-2"
                icon={
                    <RiFireFill
                        className="add_task_icon"
                        style={{
                            color: `${colors[1].color}`,
                        }}
                    />
                }
            >
                Priority 2
            </Menu.Item>
            <Menu.Item
                key="2"
                className="flex items-center space-x-2"
                icon={
                    <RiFireFill
                        className="add_task_icon"
                        style={{
                            color: `${colors[2].color}`,
                        }}
                    />
                }
            >
                Priority 3
            </Menu.Item>
            <Menu.Item
                key="3"
                className="flex items-center space-x-2"
                icon={
                    <RiFireFill
                        className="add_task_icon"
                        style={{
                            color: `${colors[3].color}`,
                        }}
                    />
                }
            >
                Priority 4
            </Menu.Item>
        </Menu>
    );

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
                                className={`tasks ${
                                    tasks.length !== 0
                                        ? 'border-b border-t'
                                        : 'border-t'
                                }`}
                            >
                                {tasks.map((task, index) => {
                                    return (
                                        <div key={task.id}>
                                            <div className="task">
                                                {/* <div
                                                    className="task_priority"
                                                    style={{
                                                        backgroundColor: `${
                                                            colors[
                                                                task.priority
                                                            ].color
                                                        }`,
                                                    }}
                                                ></div> */}
                                                <div className="task_top">
                                                    <div className="task_top_left">
                                                        <div
                                                            className={
                                                                'task_checkbox ' +
                                                                (task.checked ===
                                                                1
                                                                    ? 'checked'
                                                                    : '')
                                                            }
                                                            onClick={() =>
                                                                check_task(
                                                                    index
                                                                )
                                                            }
                                                        >
                                                            <div className="task_checkbox_circle">
                                                                <GiCheckMark className="task_checkbox_checkmark" />
                                                            </div>
                                                        </div>
                                                        <div className="task_content">
                                                            {task.content}
                                                        </div>
                                                    </div>

                                                    <HiOutlineDotsHorizontal className="task_menu" />
                                                </div>

                                                <div className="task_bottom">
                                                    <div className="task_bottom_left">
                                                        <div className="subtask_icon">
                                                            <TiFlowChildren className="task_bottom_icon" />
                                                            <div className="task_bottom_text">
                                                                0/3
                                                            </div>
                                                        </div>
                                                        <div className="priority_icon">
                                                            <RiFireFill
                                                                className="task_bottom_icon"
                                                                style={{
                                                                    color: `${
                                                                        colors[
                                                                            task
                                                                                .priority
                                                                        ].color
                                                                    }`,
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="due_icon">
                                                            <HiOutlineClock className="task_bottom_icon" />
                                                            <div className="task_bottom_text">
                                                                {Date(
                                                                    task.due
                                                                ).split(
                                                                    ' '
                                                                )[2] +
                                                                    ' ' +
                                                                    Date(
                                                                        task.due
                                                                    ).split(
                                                                        ' '
                                                                    )[1]}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="task_bottom_right">
                                                        <HiOutlineUserAdd className="task_bottom_icon mr-1" />
                                                        {/* <HiOutlinePencilAlt className="task_bottom_icon" />
                                                        <HiOutlineTrash className="task_bottom_icon" /> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="add_task">
                                {addTaskForm === section.id ? (
                                    <div className="add_task_form">
                                        <div className="add_task_form_top">
                                            <Input
                                                className="form_control"
                                                value={newTask.content}
                                                placeholder="Enter a task"
                                                onChange={(event) => {
                                                    setNewTask({
                                                        ...newTask,
                                                        content:
                                                            event.target.value,
                                                        projectId: id,
                                                        sectionId: addTaskForm,
                                                        priority:
                                                            newTask.priority,
                                                    });
                                                }}
                                            ></Input>
                                            <div className="add_task_">
                                                <div className="add_task_assign"></div>
                                                <div className="add_task_actions">
                                                    <Dropdown
                                                        overlay={menu}
                                                        trigger={['click']}
                                                        overlayStyle={{
                                                            width: 110,
                                                        }}
                                                        placement="bottomCenter"
                                                    >
                                                        <RiFireFill
                                                            className="add_task_icon"
                                                            style={{
                                                                color: `${
                                                                    colors[
                                                                        newTask
                                                                            .priority
                                                                    ].color
                                                                }`,
                                                            }}
                                                        />
                                                    </Dropdown>
                                                    <HiOutlineUserAdd className="add_task_icon " />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="add_task_form_button">
                                            <Button
                                                className="add_task_button"
                                                onClick={addTask}
                                                disabled={
                                                    newTask.content.length < 1
                                                }
                                            >
                                                Add Task
                                            </Button>
                                            <Button
                                                type="link"
                                                onClick={() => {
                                                    setNewTask(initialTaskData);
                                                    setAddTaskForm();
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        className="add_task_item"
                                        onClick={() => {
                                            setAddTaskForm(section.id);
                                        }}
                                    >
                                        <HiOutlinePlus className="h-5 w-5" />
                                        <div>Add Task</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
                <div className="add_section">
                    {addSectionForm ? (
                        <div className="add_section_form">
                            <Input
                                className="form_control"
                                value={newSection.name}
                                onChange={(event) => {
                                    setNewSection({
                                        ...newSection,
                                        name: event.target.value,
                                        projectId: id,
                                    });
                                }}
                            ></Input>
                            <div className="add_section_form_button">
                                <Button
                                    className="add_section_button"
                                    onClick={addSection}
                                    disabled={newSection.name.length < 1}
                                >
                                    Add Section
                                </Button>
                                <Button
                                    type="link"
                                    onClick={() => {
                                        setNewSection(initialSectionData);
                                        setAddSectionForm(false);
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
                                setAddSectionForm(true);
                            }}
                        >
                            <HiOutlineViewGridAdd className="h-5 w-5" />
                            <div>Add Section</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Project;
