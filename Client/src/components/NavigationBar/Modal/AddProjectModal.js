import { useState } from 'react';
import { Dropdown, Modal } from 'semantic-ui-react';

const AddProjectModal = ({ open, close }) => {
    const initialProjectData = {
        name: '',
        color: 'Important',
        view: {
            listView: true,
            boardView: false,
        },
        isFavorite: false,
    };

    const [projectModal, setProjectModal] = useState(initialProjectData);
    const [favorite, setFavorite] = useState(projectModal.isFavorite);

    const switch_list_view = () => {
        setProjectModal({
            ...projectModal,
            view: {
                listView: true,
                boardView: false,
            },
        });
    };
    const switch_board_view = () => {
        setProjectModal({
            ...projectModal,
            view: {
                listView: false,
                boardView: true,
            },
        });
    };
    const switch_favorites = () => {
        setFavorite(favorite ? false : true);
    };

    const resetForm = () => {
        setProjectModal(initialProjectData);
        close();
    };

    // const addProjectData = () => {
    //     setProjectModal({
    //         projectModal: {
    //             name: projectName,
    //         },
    //     });
    // };

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

    return (
        <div>
            <Modal open={open} size="tiny" closeOnDimmerClick={false}>
                <div className="modal">
                    {/* header */}
                    <header className="modal_header">
                        <h1>Add Project</h1>
                    </header>

                    {/* body */}
                    <form className="modal_form">
                        <section className="modal_form_section">
                            <div className="form_field">
                                <label>Name</label>
                                <input
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
                                <Dropdown
                                    placeholder="Select Color"
                                    selection
                                    floating
                                    icon=""
                                    options={tagOptions}
                                    defaultValue={tagOptions[0].value}
                                    onChange={(event) =>
                                        setProjectModal({
                                            ...projectModal,
                                            color: event.target.value,
                                        })
                                    }
                                ></Dropdown>
                            </div>
                            <div className="form_field">
                                <label>View</label>
                                <div className="radio_group">
                                    <div
                                        className="radio_option"
                                        onClick={switch_list_view}
                                    >
                                        <span className="radio_button">
                                            <div
                                                className={
                                                    'task_checkbox ' +
                                                    (projectModal.view.listView
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
                                        onClick={switch_board_view}
                                    >
                                        <span className="radio_button">
                                            <div
                                                className={
                                                    'task_checkbox ' +
                                                    (projectModal.view.boardView
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
                                            (favorite ? 'active' : '')
                                        }
                                        onClick={switch_favorites}
                                    >
                                        <span className="favorite_switch_circle" />
                                    </div>
                                    Add to favorites
                                </label>
                            </div>
                        </section>

                        {/* footer */}
                        <footer className="modal_footer">
                            <button
                                type="button"
                                className="footer_button"
                                onClick={resetForm}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={projectModal.name.length < 1}
                                className="footer_button footer_button_blue"
                                aria-disabled="true"
                                // onClick={addProjectData}
                            >
                                Add
                            </button>
                        </footer>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default AddProjectModal;
