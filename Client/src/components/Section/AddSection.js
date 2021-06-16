import { useState, useEffect } from 'react';
import { Button, Input } from 'antd';
import { HiOutlineViewGridAdd } from '../../assets/static';
import { sectionService } from '../../services/section.service';
const AddNewSection = ({ id, setSections }) => {
    const initialSectionData = {
        name: '',
        order: 0,
        projectId: null,
    };
    const [newSection, setNewSection] = useState(initialSectionData);
    const [addSectionForm, setAddSectionForm] = useState(false);

    const addSection = () => {
        sectionService.addSection(newSection).then((section) => {
            setSections((sections) => [...sections, section]);
        });
        setAddSectionForm(false);
    };
    return (
        <div>
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
    );
};

export default AddNewSection;
