import './modal.scss';
import { useState } from 'react';
import { Button, Modal, Select, Input } from 'antd';
import { GiCheckMark } from '../../assets/static';
import { projectService } from '../../services/project.service';
import { colors } from '../../assets/static/index';

const AddProjectModal = ({ open, close }) => {
    const initialProjectData = {
        name: '',
        color: colors[0].value,
        viewType: 0,
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
        setProjectModal(initialProjectData);
        close();
    };

    const handleOk = () => {
        console.log(projectModal);
        projectService.addProject(projectModal);
        resetForm();
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
                                maxLength="100"
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
                                {colors.map((option) => {
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
                                                'view_checkbox ' +
                                                (projectModal.viewType === 0
                                                    ? 'checked'
                                                    : '')
                                            }
                                        >
                                            <div className="view_checkbox_circle">
                                                <GiCheckMark className="view_checkbox_checkmark" />
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
                                                'view_checkbox ' +
                                                (projectModal.viewType === 1
                                                    ? 'checked'
                                                    : '')
                                            }
                                        >
                                            <div className="view_checkbox_circle">
                                                <GiCheckMark className="view_checkbox_checkmark" />
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
