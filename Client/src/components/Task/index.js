import './task.scss';
import {
    colors,
    GiCheckMark,
    TiFlowChildren,
    HiOutlineDotsHorizontal,
    HiOutlinePencilAlt,
    HiOutlineTrash,
    HiOutlineUserAdd,
    HiOutlineClock,
    RiFireFill,
    IoClose,
} from '../../assets/static';
import { useState } from 'react';
import moment from 'moment';
import { DatePicker, Dropdown } from 'antd';
import { Draggable } from 'react-beautiful-dnd';

const Task = ({ index, task, menu, editTask, setPriorityCheck }) => {
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
            <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => {
                    return (
                        <div
                            className="task"
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            style={{
                                cursor: 'pointer',
                                transform: snapshot.isDragging
                                    ? 'rotate(20deg)'
                                    : '',
                                ...provided.draggableProps.style,
                            }}
                        >
                            <div className="task_top">
                                <div className="task_top_left">
                                    <div
                                        className={
                                            'task_checkbox ' +
                                            (task.checked === true
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
                                            setPriorityCheck({
                                                mode: 'edit',
                                                task: task,
                                                index: index,
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
                                                className="task_bottom_icon"
                                                style={{
                                                    color: `${
                                                        colors[task.priority]
                                                            .color
                                                    }`,
                                                }}
                                            />
                                        </Dropdown>
                                    </div>
                                    <div className="due_icon">
                                        <DatePicker
                                            bordered={false}
                                            allowClear={false}
                                            showToday={false}
                                            disabledDate={disabledDate}
                                            open={openDatePickerIdx === index}
                                            onClick={() =>
                                                setOpenDatePickerIdx(
                                                    openDatePickerIdx === false
                                                        ? index
                                                        : false
                                                )
                                            }
                                            onChange={(date) => {
                                                editTask(
                                                    task,
                                                    index,
                                                    'due',
                                                    new Date(date).toISOString()
                                                );
                                                setOpenDatePickerIdx(false);
                                            }}
                                            onOpenChange={() =>
                                                setOpenDatePickerIdx(false)
                                            }
                                            defaultValue={
                                                task.due !== null
                                                    ? moment(task.due)
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
                                                    No Date
                                                </div>
                                            )}
                                            suffixIcon={
                                                <div className="flex items-center hover:text-primary">
                                                    {openDatePickerIdx ===
                                                    index ? (
                                                        <IoClose className="task_bottom_icon" />
                                                    ) : (
                                                        <HiOutlineClock className="task_bottom_icon" />
                                                    )}
                                                    {task.due !== null && (
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
                                    <HiOutlinePencilAlt className="task_bottom_icon" />
                                    <HiOutlineTrash className="task_bottom_icon" />
                                </div>
                            </div>
                        </div>
                    );
                }}
            </Draggable>
        </div>
    );
};

export default Task;
