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
import { taskService } from '../../services/task.service';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { Button, DatePicker, Dropdown, Input, Menu } from 'antd';

const Project = () => {
    const { id } = useParams();
    const menuItem = [];

    const initialSectionData = {
        name: '',
        order: 0,
        projectId: null,
    };
    const initialTaskData = {
        userId: '00000000-0000-0000-0000-000000000000',
        content: '',
        order: 0,
        projectId: id,
        sectionId: null,
        parentId: null,
        priority: 3,
        checked: false,
        addedby: '00000000-0000-0000-0000-000000000000',
        assignedBy: null,
        responsibleTo: null,
        due: null,
    };
    const [project, setProject] = useState([]);
    const [sections, setSections] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [addSectionForm, setAddSectionForm] = useState(false);
    const [addTaskForm, setAddTaskForm] = useState();
    const [newSection, setNewSection] = useState(initialSectionData);
    const [newTask, setNewTask] = useState(initialTaskData);
    const [openDatePickerIdx, setOpenDatePickerIdx] = useState('');
    const [priorityCheck, setPriorityCheck] = useState({
        mode: '',
        task: newTask,
        index: 0,
    });

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
        projectService.getProjectData(id).then((data) => {
            setSections(data.projectData.sections);
            setTasks(data.projectData.items);
        });
    };

    const addSection = () => {
        sectionService.addSection(newSection).then((section) => {
            setSections((sections) => [...sections, section]);
        });
        setAddSectionForm(false);
    };

    const addTask = () => {
        taskService.addTask(newTask).then((task) => {
            setTasks((tasks) => [...tasks, task]);
        });
        setAddTaskForm();
    };

    const editTask = (task, index, condition, param) => {
        if (condition === 'checked') task.checked = param;
        if (condition === 'priority') task.priority = param;
        if (condition === 'due') task.due = param;
        taskService.editTask(task).then((task) => {
            let newTasks = [...tasks];
            newTasks[index] = task;
            setTasks(newTasks);
        });
    };

    const handleMenuClick = (e) => {
        if (priorityCheck.mode === 'add') {
            setNewTask((prev) => ({
                ...prev,
                priority: e.key,
            }));
        } else if (
            priorityCheck.mode === 'edit' &&
            priorityCheck.task.priority !== e.key
        ) {
            editTask(
                priorityCheck.task,
                priorityCheck.index,
                'priority',
                e.key
            );
        }
    };

    const disabledDate = (current) => {
        return current && current < moment().subtract(1, 'days');
    };

    const UTCtoIST = (date) => {
        var d = new Date(date);
        d.setHours(d.getHours() + 5);
        d.setMinutes(d.getMinutes() + 30);
        return d.toString().split(' ')[1] + ' ' + d.toString().split(' ')[2];
    };

    for (let i = 0; i < 4; i++) {
        menuItem.push(
            <Menu.Item
                key={i}
                className={
                    'flex items-center space-x-2 ' +
                    (priorityCheck.task.priority === i
                        ? 'bg-active_background'
                        : '')
                }
                icon={
                    <RiFireFill
                        className="add_task_icon"
                        style={{
                            color: `${colors[i].color}`,
                        }}
                    />
                }
            >
                <div className="w-26 flex items-center justify-between">
                    <div>Priority {i + 1}</div>
                    <GiCheckMark
                        className={
                            priorityCheck.task.priority === i
                                ? 'text-primary'
                                : 'hidden '
                        }
                    />
                </div>
            </Menu.Item>
        );
    }

    const menu = <Menu onClick={handleMenuClick}>{menuItem}</Menu>;

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
                                            {task.sectionId === section.id ? (
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
                                                                    true
                                                                        ? 'checked'
                                                                        : '')
                                                                }
                                                                onClick={() => {
                                                                    editTask(
                                                                        task,
                                                                        index,
                                                                        'checked',
                                                                        !task.checked
                                                                    );
                                                                }}
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
                                                            <div
                                                                className="priority_icon"
                                                                onClick={() => {
                                                                    setPriorityCheck(
                                                                        {
                                                                            mode: 'edit',
                                                                            task: task,
                                                                            index: index,
                                                                        }
                                                                    );
                                                                }}
                                                            >
                                                                <Dropdown
                                                                    overlay={
                                                                        menu
                                                                    }
                                                                    trigger={[
                                                                        'click',
                                                                    ]}
                                                                    overlayStyle={{
                                                                        width: 150,
                                                                    }}
                                                                    placement="bottomCenter"
                                                                >
                                                                    <RiFireFill
                                                                        className="task_bottom_icon"
                                                                        style={{
                                                                            color: `${
                                                                                colors[
                                                                                    task
                                                                                        .priority
                                                                                ]
                                                                                    .color
                                                                            }`,
                                                                        }}
                                                                    />
                                                                </Dropdown>
                                                            </div>
                                                            <div className="due_icon">
                                                                <DatePicker
                                                                    bordered={
                                                                        false
                                                                    }
                                                                    allowClear={
                                                                        false
                                                                    }
                                                                    showToday={
                                                                        false
                                                                    }
                                                                    disabledDate={
                                                                        disabledDate
                                                                    }
                                                                    open={
                                                                        openDatePickerIdx ===
                                                                        index
                                                                    }
                                                                    onClick={() =>
                                                                        setOpenDatePickerIdx(
                                                                            index
                                                                        )
                                                                    }
                                                                    onChange={(
                                                                        date
                                                                    ) => {
                                                                        editTask(
                                                                            task,
                                                                            index,
                                                                            'due',
                                                                            new Date(
                                                                                date
                                                                            ).toISOString()
                                                                        );
                                                                        setOpenDatePickerIdx(
                                                                            false
                                                                        );
                                                                    }}
                                                                    onOpenChange={() =>
                                                                        setOpenDatePickerIdx(
                                                                            false
                                                                        )
                                                                    }
                                                                    defaultValue={
                                                                        task.due !==
                                                                        null
                                                                            ? moment(
                                                                                  task.due
                                                                              )
                                                                            : ''
                                                                    }
                                                                    renderExtraFooter={() => (
                                                                        <div
                                                                            className="cursor-pointer flex justify-center text-gray-400"
                                                                            onClick={() => {
                                                                                editTask(
                                                                                    task,
                                                                                    index,
                                                                                    'due',
                                                                                    null
                                                                                );
                                                                                setOpenDatePickerIdx(
                                                                                    false
                                                                                );
                                                                            }}
                                                                        >
                                                                            No
                                                                            Date
                                                                        </div>
                                                                    )}
                                                                    suffixIcon={
                                                                        <div className="flex items-center hover:text-primary">
                                                                            <HiOutlineClock className="task_bottom_icon" />
                                                                            {task.due !==
                                                                                null && (
                                                                                <div className="task_bottom_text">
                                                                                    {UTCtoIST(
                                                                                        task.due.toString()
                                                                                    )}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="task_bottom_right">
                                                            <HiOutlineUserAdd className="task_bottom_icon mr-1" />
                                                            {/* <HiOutlinePencilAlt className="task_bottom_icon" />
                                                        <HiOutlineTrash className="task_bottom_icon" /> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                ''
                                            )}
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
                                                    });
                                                }}
                                            ></Input>
                                            <div className="add_task_">
                                                <div className="add_task_assign"></div>
                                                <div
                                                    className="add_task_actions"
                                                    onClick={() => {
                                                        setPriorityCheck({
                                                            mode: 'add',
                                                            task: newTask,
                                                            index: 0,
                                                        });
                                                    }}
                                                >
                                                    <Dropdown
                                                        overlay={menu}
                                                        trigger={['click']}
                                                        overlayStyle={{
                                                            width: 150,
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
                                                onClick={() => {
                                                    addTask(addTaskForm);
                                                    setNewTask(initialTaskData);
                                                }}
                                                disabled={
                                                    newTask.content.length < 1
                                                }
                                            >
                                                Add Task
                                            </Button>
                                            <Button
                                                type="link"
                                                onClick={() => {
                                                    setAddTaskForm();
                                                    setNewTask(initialTaskData);
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
                                            setNewTask({
                                                ...newTask,
                                                sectionId: section.id,
                                            });
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
                                setNewSection(initialSectionData);
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
