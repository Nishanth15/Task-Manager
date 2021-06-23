import './section.scss';
import Task from '../Task';
import AddNewSection from './AddSection';
import { projectService } from '../../services/project.service';
import { sectionService } from '../../services/section.service';
import { taskService } from '../../services/task.service';
import { sortBySectionOrder } from '../../helpers/sortby-section-order';
import {
    colors,
    GiCheckMark,
    HiOutlineDotsHorizontal,
    HiOutlinePlus,
    HiOutlineClock,
    HiOutlineUserAdd,
    RiFireFill,
} from '../../assets/static';
import { useState, useEffect } from 'react';
import { Button, DatePicker, Dropdown, Input, Menu } from 'antd';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const Section = ({ id }) => {
    const menuItem = [];
    const initialTaskData = {
        userId: '00000000-0000-0000-0000-000000000000',
        content: '',
        order: 1,
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
    const initialReOrderTask = {
        id: '',
        order: null,
    };

    const [sections, setSections] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [reOrderedTasks] = useState([]);
    const [addTaskForm, setAddTaskForm] = useState();
    const [newTask, setNewTask] = useState(initialTaskData);
    const [priorityCheck, setPriorityCheck] = useState({
        mode: '',
        task: newTask,
        index: 0,
    });

    useEffect(() => {
        getProjectData();
    }, [id]);

    const getProjectData = () => {
        projectService.getProjectData(id).then((data) => {
            setSections(data.projectData.sections);
            setTasks(data.projectData.items);
        });
    };

    const addTask = (sectionId) => {
        var sortItem = tasks
            .slice()
            .reverse()
            .find((item) => item.sectionId === sectionId);
        if (sortItem !== undefined) {
            newTask.order = sortItem.order + 1;
        }
        taskService.addTask(newTask).then((task) => {
            let newTasks = [...tasks];
            newTasks.push(task);
            var newSortedTasks = sortBySectionOrder(sections, newTasks);
            setTasks(newSortedTasks);
        });
        setAddTaskForm();
    };

    const editTask = (task, index, condition, param) => {
        if (condition === 'checked') task.checked = param;
        if (condition === 'priority') task.priority = param;
        if (condition === 'due') task.due = param;
        if (condition === 'drag') task.sectionId = param;
        taskService.editTask(task).then((task) => {
            let newTasks = [...tasks];
            newTasks[index] = task;
            setTasks(newTasks);
        });
    };

    const reorder = (list, sectionListIdx, startIndex, endIndex) => {
        const result = list;
        // console.log(result);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        if (startIndex !== endIndex) {
            var start, end, lastOrder;
            if (sectionListIdx.indexOf(endIndex) >= sectionListIdx.length / 2) {
                start = endIndex;
                end = sectionListIdx[sectionListIdx.length - 1];
                lastOrder = result[endIndex - 1].order;
                for (let i = start; i <= end; i++) {
                    result[i].order = ++lastOrder;
                    initialReOrderTask.id = result[i].id;
                    initialReOrderTask.order = result[i].order;
                    reOrderedTasks.push(initialReOrderTask);
                }
            } else {
                start = endIndex;
                end = sectionListIdx[0];
                lastOrder = result[endIndex + 1].order;
                for (let i = start; i >= end; i--) {
                    result[i].order = --lastOrder;
                    initialReOrderTask.id = result[i].id;
                    initialReOrderTask.order = result[i].order;
                    reOrderedTasks.push(initialReOrderTask);
                }
            }
        }
        return reOrderedTasks;
    };

    const move = (
        list,
        sectionListIdx,
        destinationSectionId,
        startIndex,
        endIndex
    ) => {
        const result = list;
        sectionListIdx.push(sectionListIdx[sectionListIdx.length - 1] + 1);
        // console.log(list.length);
        // console.log(sectionListIdx);
        console.log(startIndex);
        console.log(endIndex);
        const [removed] = result.splice(startIndex, 1);
        removed.sectionId = destinationSectionId;
        if (startIndex < endIndex) {
            result.splice(endIndex - 1, 0, removed);
            console.log('a');
        } else {
            result.splice(endIndex, 0, removed);
            console.log('b');
        }
        var start, end, lastOrder;
        if (sectionListIdx.indexOf(endIndex) >= sectionListIdx.length / 2) {
            if (
                startIndex < endIndex &&
                endIndex === sectionListIdx[sectionListIdx.length - 1]
            ) {
                start = endIndex - 1;
                end = sectionListIdx[sectionListIdx.length - 1] - 1;
                lastOrder = result[endIndex - 2].order;
                console.log(lastOrder);
            } else {
                start = endIndex;
                end = sectionListIdx[sectionListIdx.length - 1];
                lastOrder = result[endIndex - 1].order;
            }
            for (let i = start; i <= end; i++) {
                result[i].order = ++lastOrder;
                initialReOrderTask.id = result[i].id;
                initialReOrderTask.order = result[i].order;
                reOrderedTasks.push(initialReOrderTask);
                console.log(1);
            }
        } else {
            start = endIndex;
            end = sectionListIdx[0];
            lastOrder = result[endIndex + 1].order;
            for (let i = start; i >= end; i--) {
                result[i].order = --lastOrder;
                initialReOrderTask.id = result[i].id;
                initialReOrderTask.order = result[i].order;
                reOrderedTasks.push(initialReOrderTask);
                console.log(2);
            }
        }

        return reOrderedTasks;
    };

    // console.log(tasks);
    const onDragEnd = (result) => {
        const { source, destination, type } = result;
        if (!destination) return;

        // console.log(result);
        console.log(source);
        console.log(destination);
        var sectionDestinationIdx = [];
        var items = {};
        tasks.forEach((task, index) => {
            if (task.sectionId === destination.droppableId) {
                sectionDestinationIdx.push(index);
            }
        });
        if (
            type === 'tasks' &&
            source.droppableId === destination.droppableId
        ) {
            items = reorder(
                tasks,
                sectionDestinationIdx,
                source.index,
                destination.index
            );
        } else {
            items = move(
                tasks,
                sectionDestinationIdx,
                destination.droppableId,
                source.index,
                destination.index
            );
        }
        console.log(items);
        // setTasks(items);
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
        <div>
            <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
                <Droppable
                    droppableId={id}
                    direction="horizontal"
                    type="columns"
                >
                    {(provided, snapshot) => {
                        return (
                            <div
                                className="section_list"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {sections.map((section, index) => {
                                    return (
                                        <Draggable
                                            key={section.id}
                                            draggableId={section.id}
                                            index={index}
                                            type="task"
                                        >
                                            {(provided, snapshot) => {
                                                return (
                                                    <div
                                                        {...provided.draggableProps}
                                                        ref={provided.innerRef}
                                                        style={{
                                                            ...provided
                                                                .draggableProps
                                                                .style,
                                                        }}
                                                    >
                                                        <div className="section_item">
                                                            <div
                                                                className="section_header"
                                                                {...provided.dragHandleProps}
                                                            >
                                                                <div className="section_name">
                                                                    {
                                                                        section.name
                                                                    }
                                                                </div>
                                                                <HiOutlineDotsHorizontal className="section_menu" />
                                                            </div>
                                                            <Droppable
                                                                droppableId={
                                                                    section.id
                                                                }
                                                                type="tasks"
                                                            >
                                                                {(provided) => {
                                                                    return (
                                                                        <div
                                                                            className={`tasks ${
                                                                                tasks.length !==
                                                                                    0 &&
                                                                                'border-b border-t'
                                                                            }`}
                                                                            {...provided.droppableProps}
                                                                            ref={
                                                                                provided.innerRef
                                                                            }
                                                                        >
                                                                            <div>
                                                                                {tasks.map(
                                                                                    (
                                                                                        task,
                                                                                        index
                                                                                    ) => {
                                                                                        return (
                                                                                            <div
                                                                                                key={
                                                                                                    task.id
                                                                                                }
                                                                                            >
                                                                                                {task.sectionId ===
                                                                                                section.id ? (
                                                                                                    <Task
                                                                                                        index={
                                                                                                            index
                                                                                                        }
                                                                                                        task={
                                                                                                            task
                                                                                                        }
                                                                                                        projectId={
                                                                                                            id
                                                                                                        }
                                                                                                        menu={
                                                                                                            menu
                                                                                                        }
                                                                                                        editTask={
                                                                                                            editTask
                                                                                                        }
                                                                                                        setPriorityCheck={
                                                                                                            setPriorityCheck
                                                                                                        }
                                                                                                    ></Task>
                                                                                                ) : (
                                                                                                    ''
                                                                                                )}
                                                                                            </div>
                                                                                        );
                                                                                    }
                                                                                )}
                                                                            </div>
                                                                            {
                                                                                provided.placeholder
                                                                            }
                                                                        </div>
                                                                    );
                                                                }}
                                                            </Droppable>

                                                            <div className="add_task">
                                                                {addTaskForm ===
                                                                section.id ? (
                                                                    <div className="add_task_form">
                                                                        <div className="add_task_form_top">
                                                                            <Input
                                                                                className="form_control"
                                                                                value={
                                                                                    newTask.content
                                                                                }
                                                                                placeholder="Enter a task"
                                                                                onChange={(
                                                                                    event
                                                                                ) => {
                                                                                    setNewTask(
                                                                                        {
                                                                                            ...newTask,
                                                                                            content:
                                                                                                event
                                                                                                    .target
                                                                                                    .value,
                                                                                        }
                                                                                    );
                                                                                }}
                                                                            ></Input>
                                                                            <div className="add_task_">
                                                                                <div className="add_task_assign"></div>
                                                                                <div
                                                                                    className="add_task_actions"
                                                                                    onClick={() => {
                                                                                        setPriorityCheck(
                                                                                            {
                                                                                                mode: 'add',
                                                                                                task: newTask,
                                                                                                index: 0,
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
                                                                                            className="add_task_icon"
                                                                                            style={{
                                                                                                color: `${
                                                                                                    colors[
                                                                                                        newTask
                                                                                                            .priority
                                                                                                    ]
                                                                                                        .color
                                                                                                }`,
                                                                                            }}
                                                                                        />
                                                                                    </Dropdown>
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
                                                                                            // disabledDate={
                                                                                            //     disabledDate
                                                                                            // }
                                                                                            // open={
                                                                                            //     openDatePickerIdx ===
                                                                                            //     index
                                                                                            // }
                                                                                            // onClick={() =>
                                                                                            //     setOpenDatePickerIdx(
                                                                                            //         index
                                                                                            //     )
                                                                                            // }
                                                                                            // onChange={(date) => {
                                                                                            //     editTask(
                                                                                            //         task,
                                                                                            //         index,
                                                                                            //         'due',
                                                                                            //         new Date(
                                                                                            //             date
                                                                                            //         ).toISOString()
                                                                                            //     );
                                                                                            // setOpenDatePickerIdx(
                                                                                            //     false
                                                                                            // );
                                                                                            // }}
                                                                                            // onOpenChange={() =>
                                                                                            //     setOpenDatePickerIdx(
                                                                                            //         false
                                                                                            //     )
                                                                                            // }
                                                                                            // defaultValue={
                                                                                            //     task.due !== null
                                                                                            //         ? moment(
                                                                                            //               task.due
                                                                                            //           )
                                                                                            //         : ''
                                                                                            // }
                                                                                            renderExtraFooter={() => (
                                                                                                <div
                                                                                                    className="cursor-pointer flex justify-center text-gray-400"
                                                                                                    // onClick={() => {
                                                                                                    //     editTask(
                                                                                                    //         task,
                                                                                                    //         index,
                                                                                                    //         'due',
                                                                                                    //         null
                                                                                                    //     );
                                                                                                    //     setOpenDatePickerIdx(
                                                                                                    //         false
                                                                                                    //     );
                                                                                                    // }}
                                                                                                >
                                                                                                    No
                                                                                                    Date
                                                                                                </div>
                                                                                            )}
                                                                                            suffixIcon={
                                                                                                <div className="flex items-center hover:text-primary">
                                                                                                    <HiOutlineClock className="add_task_icon" />
                                                                                                    {/* {task.due !==
                                                                    null && (
                                                                    <div className="task_bottom_text">
                                                                        {UTCtoIST(
                                                                            task.due.toString()
                                                                        )}
                                                                    </div>
                                                                )} */}
                                                                                                </div>
                                                                                            }
                                                                                        />
                                                                                    </div>

                                                                                    <HiOutlineUserAdd className="add_task_icon " />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="add_task_form_button">
                                                                            <Button
                                                                                className="add_task_button"
                                                                                onClick={() => {
                                                                                    addTask(
                                                                                        addTaskForm
                                                                                    );
                                                                                    setNewTask(
                                                                                        initialTaskData
                                                                                    );
                                                                                }}
                                                                                disabled={
                                                                                    newTask
                                                                                        .content
                                                                                        .length <
                                                                                    1
                                                                                }
                                                                            >
                                                                                Add
                                                                                Task
                                                                            </Button>
                                                                            <Button
                                                                                type="link"
                                                                                onClick={() => {
                                                                                    setAddTaskForm();
                                                                                    setNewTask(
                                                                                        initialTaskData
                                                                                    );
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
                                                                            setAddTaskForm(
                                                                                section.id
                                                                            );
                                                                            setNewTask(
                                                                                {
                                                                                    ...newTask,
                                                                                    sectionId:
                                                                                        section.id,
                                                                                }
                                                                            );
                                                                        }}
                                                                    >
                                                                        <HiOutlinePlus className="h-5 w-5" />
                                                                        <div>
                                                                            Add
                                                                            Task
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            }}
                                        </Draggable>
                                    );
                                })}
                                <AddNewSection
                                    id={id}
                                    setSections={setSections}
                                ></AddNewSection>
                                {/* </DragDropContext> */}
                                {provided.placeholder}
                            </div>
                        );
                    }}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default Section;
