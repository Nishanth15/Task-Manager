import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import AddProjectModal from './AddProjectModal';
import { Dropdown } from 'semantic-ui-react';

// const url = 'http://localhost:5000/api/project';

function SideBar({ handleSwitchKey, projects }) {
    // State
    const router = useLocation();
    console.log(router.pathname);
    const [projectCollapse, setProjectCollapse] = useState(false);
    const [labelCollapse, setLabelCollapse] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    // Methods
    const onOpenModal = () => setOpenModal(true);
    const onCloseModal = () => {
        setOpenModal(false);
    };
    const switch_projectCollapse = () => {
        setProjectCollapse(projectCollapse ? false : true);
    };
    const switch_labelCollapse = () => {
        setLabelCollapse(labelCollapse ? false : true);
    };
    const trigger = (
        <span>
            <div className="user_icon">
                <img
                    src="src\assets\user.png"
                    alt=""
                    width={100}
                    height={100}
                ></img>
            </div>
            <div className="user_button">
                <div className="user_name">Nishanth</div>
                <svg
                    onClick={switch_projectCollapse}
                    xmlns="http://www.w3.org/2000/svg"
                    className={
                        'collapse_key ' + (projectCollapse ? 'active' : '')
                    }
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                </svg>
            </div>
        </span>
    );

    const options = [
        { key: 'user', text: 'Account', icon: 'user' },
        { key: 'settings', text: 'Settings', icon: 'settings' },
        { key: 'sign-out', text: 'Sign Out', icon: 'sign out' },
    ];

    return (
        <div>
            {/* logo */}
            <img
                className="logo"
                src="../assets/logo.svg"
                alt="taskManager"
                width="200"
            />

            {/* List */}
            <div className="sidebar_list">
                <ul>
                    <a href="/inbox">
                        <li
                            className={
                                'item inbox ' +
                                (router.pathname === '/inbox' ? 'active' : '')
                            }
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="sidebar_list_item_svg h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                />
                            </svg>

                            <p>Inbox</p>
                        </li>
                    </a>

                    <a href="/calender">
                        <li
                            className={
                                'item calender ' +
                                (router.pathname === '/calender'
                                    ? 'active'
                                    : '')
                            }
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="sidebar_list_item_svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>

                            <p>Calender</p>
                        </li>
                    </a>
                </ul>

                <div className={'item projects'}>
                    <div className="expansion_panel_header">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="sidebar_list_item_svg"
                            onClick={switch_projectCollapse}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                            />
                        </svg>
                        <p
                            className="header_name"
                            onClick={switch_projectCollapse}
                        >
                            Projects
                        </p>
                        <div className="keys">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="add_project"
                                onClick={onOpenModal}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                            </svg>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={
                                    'collapse_key ' +
                                    (projectCollapse ? 'active' : '')
                                }
                                onClick={switch_projectCollapse}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    </div>
                    <ul
                        className={
                            'expansion_panel_list ' +
                            (projectCollapse ? 'active' : '')
                        }
                    >
                        {projects.map((project) => {
                            return (
                                <a
                                    href={`/project/${project.id}`}
                                    key={project.id}
                                >
                                    <li
                                        className={
                                            'project_list_item ' +
                                            (router.pathname ===
                                            '/project/' + project.id
                                                ? 'active'
                                                : '')
                                        }
                                    >
                                        <div>
                                            <div className="projects_color"></div>
                                        </div>
                                        <div className="projects_button">
                                            <div className="item_name">
                                                {project.name}
                                            </div>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="item_setting"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                                                />
                                            </svg>
                                        </div>
                                    </li>
                                </a>
                            );
                        })}
                    </ul>
                </div>

                <div className={'item labels'}>
                    <div className="expansion_panel_header">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="sidebar_list_item_svg"
                            onClick={switch_labelCollapse}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                            />
                        </svg>
                        <p
                            className="header_name"
                            onClick={switch_labelCollapse}
                        >
                            Labels
                        </p>
                        <div className="keys">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="add_label"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                            </svg>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={
                                    'collapse_key ' +
                                    (labelCollapse ? 'active' : '')
                                }
                                onClick={switch_labelCollapse}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    </div>
                    <ul
                        className={
                            'expansion_panel_list ' +
                            (labelCollapse ? 'active' : '')
                        }
                    >
                        {projects.map((project) => {
                            return (
                                <a
                                    href={`/project/${project.id}`}
                                    key={project.id}
                                >
                                    <li
                                        className={
                                            'project_list_item ' +
                                            (router.pathname ===
                                            '/project/' + project.id
                                                ? 'active'
                                                : '')
                                        }
                                    >
                                        <div>
                                            <div className="projects_color"></div>
                                        </div>
                                        <div className="projects_button">
                                            <div className="item_name">
                                                {project.name}
                                            </div>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="item_setting"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                                                />
                                            </svg>
                                        </div>
                                    </li>
                                </a>
                            );
                        })}
                    </ul>
                </div>
            </div>

            {/* Modal */}
            <AddProjectModal open={openModal} close={onCloseModal} />

            {/* SwitchKey */}
            <div className="sidebar_switch" onClick={handleSwitchKey}>
                <div className="arrow-right">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="menu_icon"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </div>
            </div>

            {/* User Menu */}
            <div className="user_menu">
                <Dropdown
                    trigger={trigger}
                    options={options}
                    pointing="top left"
                    icon={null}
                />
                {/* <div className="user_icon">
                    <img
                        src="../../../public/user.png"
                        alt=""
                        width={100}
                        height={100}
                    />
                </div>
                <div className="user_button">
                    <div className="user_name">Nishanth</div>
                    <svg
                        onClick={switch_projectCollapse}
                        xmlns="http://www.w3.org/2000/svg"
                        className={
                            'collapse_key ' + (projectCollapse ? 'active' : '')
                        }
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                    </svg>
                </div> */}
            </div>
        </div>
    );
}

export default SideBar;
