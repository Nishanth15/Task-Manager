import {
    colors,
    HiOutlinePlus,
    HiOutlineClock,
    HiOutlineUserAdd,
    RiFireFill,
    IoClose,
} from '../../assets/static';
import moment from 'moment';
import { useState } from 'react';
import { Button, DatePicker, Dropdown, Input } from 'antd';
const AddTask = ({
    sectionId,
    newTask,
    setNewTask,
    setPriorityCheck,
    menu,
    addTask,
    initialTaskData,
}) => {
    const [addTaskForm, setAddTaskForm] = useState();
    const [openDatePickerIdx, setOpenDatePickerIdx] = useState(false);
    const disabledDate = (current) => {
        return current && current < moment().subtract(1, 'days');
    };

    const UTCtoIST = (date) => {
        var d = new Date(date);
        d.setHours(d.getHours() + 5);
        d.setMinutes(d.getMinutes() + 30);
        return d.toString().split(' ')[1] + ' ' + d.toString().split(' ')[2];
    };

    return (
        <div>
            {addTaskForm === sectionId ? (
                <div className="add_task_form">
                    <div className="add_task_form_top">
                        <Input
                            className="form_control"
                            value={newTask.content}
                            placeholder="Enter a task"
                            onChange={(event) => {
                                setNewTask({
                                    ...newTask,
                                    content: event.target.value,
                                });
                            }}
                        ></Input>

                        <div className="add_task_bottom">
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
                                                colors[newTask.priority].color
                                            }`,
                                        }}
                                    />
                                </Dropdown>
                                <div className="due_icon">
                                    <DatePicker
                                        bordered={false}
                                        allowClear={false}
                                        showToday={false}
                                        disabledDate={disabledDate}
                                        open={openDatePickerIdx}
                                        onClick={() =>
                                            setOpenDatePickerIdx(
                                                openDatePickerIdx ? false : true
                                            )
                                        }
                                        onChange={(date) => {
                                            setNewTask({
                                                ...newTask,
                                                due: date,
                                            });

                                            setOpenDatePickerIdx(false);
                                        }}
                                        onOpenChange={() =>
                                            setOpenDatePickerIdx(false)
                                        }
                                        renderExtraFooter={() => (
                                            <div
                                                className="cursor-pointer flex justify-center text-gray-400"
                                                onClick={() => {
                                                    setNewTask({
                                                        ...newTask,
                                                        due: null,
                                                    });
                                                    setOpenDatePickerIdx(false);
                                                }}
                                            >
                                                No Date
                                            </div>
                                        )}
                                        suffixIcon={
                                            <div className="flex items-center hover:text-primary">
                                                {openDatePickerIdx ? (
                                                    <IoClose className="add_task_icon" />
                                                ) : (
                                                    <HiOutlineClock className="add_task_icon" />
                                                )}
                                                {newTask.due !== null && (
                                                    <div className="task_bottom_text">
                                                        {UTCtoIST(
                                                            newTask.due.toString()
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        }
                                    />
                                </div>
                            </div>
                            <div className="add_task_assign">
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
                            disabled={newTask.content.length < 1}
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
                        setAddTaskForm(sectionId);
                        setNewTask({
                            ...newTask,
                            sectionId: sectionId,
                        });
                    }}
                >
                    <HiOutlinePlus className="h-5 w-5" />
                    <div>Add Task</div>
                </div>
            )}
        </div>
    );
};

export default AddTask;
