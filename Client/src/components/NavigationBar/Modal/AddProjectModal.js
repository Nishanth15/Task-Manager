import { useState } from 'react';
import { Button, Modal, Select, Input } from 'antd';
import { projectService } from '../../../services/project.service';

const tagOptions = [
    {
        key: '0',
        label: 'Red',
        value: 0,
        color: 'red',
    },
    {
        key: '1',
        label: 'Blue',
        value: 1,
        color: 'blue',
    },
    {
        key: '2',
        label: 'Green',
        value: 2,
        color: 'green',
    },
    {
        key: '3',
        label: 'Black',
        value: 3,
        color: 'black',
    },
    {
        key: '4',
        label: 'Purple',
        value: 4,
        color: 'purple',
    },
    {
        key: '5',
        label: 'Orange',
        value: 5,
        color: 'orange',
    },
    {
        key: '6',
        label: 'Yellow',
        value: 6,
        color: 'yellow',
    },
    {
        key: '7',
        label: 'Pink',
        value: 7,
        color: 'pink',
    },
];

const AddProjectModal = ({ open, close }) => {
    const initialProjectData = {
        name: '',
        color: tagOptions[0].value,
        viewType: 0,
        parentId: null,
        isFavorite: false,
    };
    const { Option } = Select;

    const [projectModal, setProjectModal] = useState(initialProjectData);

    const switch_view = (viewType) => {
        setProjectModal({
            ...projectModal,
            viewType: viewType,
        });
    };
    const switch_favorites = () => {
        setProjectModal({
            ...projectModal,
            isFavorite: projectModal.isFavorite ? false : true,
        });
    };

    const resetForm = async () => {
        // console.log(projectModal);
        setProjectModal(initialProjectData);
        close();
    };

    const handleOk = () => {
        console.log(projectModal);
        projectService.addProject(projectModal);
        close();
    };

    return (
        <div>
            <Modal
                title="Add Project"
                visible={open}
                onOk={handleOk}
                closable={false}
                width={400}
                footer={[
                    <Button key="back" onClick={resetForm}>
                        Cancel
                    </Button>,
                    <Button
                        key="submit"
                        disabled={projectModal.name.length < 1}
                        type="primary"
                        onClick={handleOk}
                    >
                        Add
                    </Button>,
                ]}
            >
                <form className="modal_form">
                    <section className="modal_form_section">
                        <div className="form_field">
                            <label>Name</label>
                            <Input
                                className="form_control"
                                name="name"
                                autoComplete="off"
                                value={projectModal.name}
                                onChange={(event) => {
                                    setProjectModal({
                                        ...projectModal,
                                        name: event.target.value,
                                    });
                                }}
                            />
                        </div>
                        <div className="form_field">
                            <label>Color</label>
                            <Select
                                className="form_control"
                                showArrow={false}
                                placeholder="Select one color"
                                value={projectModal.color}
                                onChange={(value) => {
                                    setProjectModal({
                                        ...projectModal,
                                        color: value,
                                    });
                                }}
                            >
                                {tagOptions.map((option) => {
                                    return (
                                        <Option
                                            key={option.key}
                                            value={option.value}
                                            label={open.label}
                                        >
                                            <div className="flex items-center">
                                                <div
                                                    className="h-2.5 w-2.5 rounded-full mr-2"
                                                    style={{
                                                        background: `${option.color}`,
                                                    }}
                                                ></div>
                                                <div>{option.label}</div>
                                            </div>
                                        </Option>
                                    );
                                })}
                            </Select>
                        </div>
                        <div className="form_field">
                            <label>View</label>
                            <div className="radio_group">
                                <div
                                    className="radio_option"
                                    onClick={() => switch_view(0)}
                                >
                                    <span className="radio_button">
                                        <div
                                            className={
                                                'task_checkbox ' +
                                                (projectModal.viewType === 0
                                                    ? 'checked'
                                                    : '')
                                            }
                                        >
                                            <div className="task_checkbox_circle">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
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
                                    </span>
                                    List
                                </div>
                                <div
                                    className="radio_option"
                                    onClick={() => switch_view(1)}
                                >
                                    <span className="radio_button">
                                        <div
                                            className={
                                                'task_checkbox ' +
                                                (projectModal.viewType === 1
                                                    ? 'checked'
                                                    : '')
                                            }
                                        >
                                            <div className="task_checkbox_circle">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6"
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
                                    </span>
                                    Board
                                </div>
                            </div>
                        </div>
                        <div className="form_field">
                            <label>
                                <div
                                    className={
                                        'favorite_switch ' +
                                        (projectModal.isFavorite
                                            ? 'active'
                                            : '')
                                    }
                                    onClick={switch_favorites}
                                >
                                    <span className="favorite_switch_circle" />
                                </div>
                                Add to favorites
                            </label>
                        </div>
                    </section>
                </form>
            </Modal>
        </div>
    );
};

export default AddProjectModal;
