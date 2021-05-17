import { useState } from 'react';
import { Button, Modal, Select, Input } from 'antd';

const tagOptions = [
    {
        key: '0',
        text: 'Red',
        value: 'Red',
        label: { color: 'red', empty: true, circular: true },
    },
    {
        key: '1',
        text: 'Blue',
        value: 'Blue',
        label: { color: 'blue', empty: true, circular: true },
    },
    {
        key: '2',
        text: 'Green',
        value: 'Green',
        label: { color: 'green', empty: true, circular: true },
    },
    {
        key: '3',
        text: 'Black',
        value: 'Black',
        label: { color: 'black', empty: true, circular: true },
    },
    {
        key: '4',
        text: 'Purple',
        value: 'Purple',
        label: { color: 'purple', empty: true, circular: true },
    },
    {
        key: '5',
        text: 'Orange',
        value: 'Orange',
        label: { color: 'orange', empty: true, circular: true },
    },
    {
        key: '6',
        text: 'Yellow',
        value: 'Yellow',
        label: { color: 'yellow', empty: true, circular: true },
    },
    {
        key: '7',
        text: 'Pink',
        value: 'Pink',
        label: { color: 'pink', empty: true, circular: true },
    },
];

const AddProjectModal = ({ open, close }) => {
    const initialProjectData = {
        name: '',
        color: tagOptions[0].value,
        view: 'list',
        isFavorite: false,
    };
    const { Option } = Select;

    const [projectModal, setProjectModal] = useState(initialProjectData);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const switch_view = () => {
        setProjectModal({
            ...projectModal,
            view: projectModal.view === 'list' ? 'board' : 'list',
        });
    };
    const switch_favorites = () => {
        setProjectModal({
            ...projectModal,
            isFavorite: projectModal.isFavorite ? false : true,
        });
    };

    const resetForm = async () => {
        console.log(projectModal);
        setProjectModal(initialProjectData);
        close();
    };

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            console.log(projectModal);
            close();
            setConfirmLoading(false);
        }, 2000);
    };

    return (
        <div>
            <Modal
                title="Add Project"
                visible={open}
                style={{ borderRadius: '10px' }}
                confirmLoading={confirmLoading}
                onOk={handleOk}
                closable={false}
                width={450}
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
                <div className="modal">
                    <form className="modal_form">
                        <section className="modal_form_section">
                            <div className="form_field">
                                <label>Name</label>
                                <Input
                                    className="form_control"
                                    maxLength={120}
                                    name="name"
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
                                    style={{
                                        width: '100%',
                                    }}
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
                                                label={option.value}
                                            >
                                                <div className="demo-option-label-item flex items-center">
                                                    <div
                                                        className="h-2.5 w-2.5 rounded-full mr-2"
                                                        style={{
                                                            background: `${option.label.color}`,
                                                        }}
                                                    ></div>
                                                    <div>{option.text}</div>
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
                                        onClick={switch_view}
                                    >
                                        <span className="radio_button">
                                            <div
                                                className={
                                                    'task_checkbox ' +
                                                    (projectModal.view ===
                                                    'list'
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
                                        List
                                    </div>
                                    <div
                                        className="radio_option"
                                        onClick={switch_view}
                                    >
                                        <span className="radio_button">
                                            <div
                                                className={
                                                    'task_checkbox ' +
                                                    (projectModal.view ===
                                                    'board'
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
                                <label>Favorite</label>
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
                </div>
            </Modal>
        </div>
    );
};

export default AddProjectModal;
