import './modal.scss';
import { colors } from '../../assets/static/index';
import { useState } from 'react';
import { Button, Modal, Select, Input } from 'antd';

const AddLabelModal = ({ open, close }) => {
    const initialLabelData = {
        name: '',
        color: colors[0].value,
        isFavorite: false,
    };
    const { Option } = Select;

    const [labelModal, setLabelModal] = useState(initialLabelData);

    const switch_favorites = () => {
        setLabelModal({
            ...labelModal,
            isFavorite: labelModal.isFavorite ? false : true,
        });
    };

    const resetForm = async () => {
        setLabelModal(initialLabelData);
        close();
    };

    const handleOk = () => {
        console.log(labelModal);
        resetForm();
    };

    return (
        <div>
            <Modal
                title="Add Label"
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
                        disabled={labelModal.name.length < 1}
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
                                value={labelModal.name}
                                onChange={(event) => {
                                    setLabelModal({
                                        ...labelModal,
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
                                value={labelModal.color}
                                onChange={(value) => {
                                    setLabelModal({
                                        ...labelModal,
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
                            <label>
                                <div
                                    className={
                                        'favorite_switch ' +
                                        (labelModal.isFavorite ? 'active' : '')
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

export default AddLabelModal;
