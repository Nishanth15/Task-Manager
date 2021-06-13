import './sidebar.scss';
import {
    colors,
    FiInbox,
    FiCalendar,
    CgFolder,
    HiOutlineTag,
    HiOutlinePlus,
    HiChevronLeft,
    HiOutlineDotsHorizontal,
} from '../../../assets/static';
import AddProjectModal from '../../Modal/AddProjectModal';
import AddLabelModal from '../../Modal/AddLabelModal';
import logo from '../../../assets/images/logo.svg';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const SideBar = ({ handleSwitchKey, projects, labels, filters }) => {
    // State
    const router = useLocation();

    const [projectCollapse, setProjectCollapse] = useState(false);
    const [labelCollapse, setLabelCollapse] = useState(false);
    const [openProjectModal, setOpenProjectModal] = useState(false);
    const [openLabelModal, setOpenLabelModal] = useState(false);

    const onCloseModal = () => {
        setOpenProjectModal(false);
        setOpenLabelModal(false);
    };

    const switch_projectCollapse = () => {
        setProjectCollapse(projectCollapse ? false : true);
    };
    const switch_labelCollapse = () => {
        setLabelCollapse(labelCollapse ? false : true);
    };

    return (
        <div>
            {/* logo */}
            <img className="sidebar_logo" src={logo} alt="taskManager" width="200" />

            {/* List */}
            <div className="sidebar_list">
                <ul>
                    <Link to="/inbox">
                        <li
                            className={
                                'item inbox ' +
                                (router.pathname === '/inbox' ? 'active' : '')
                            }
                        >
                            <FiInbox className="sidebar_list_item_svg" />

                            <p className="header_name">Inbox</p>
                        </li>
                    </Link>

                    <Link to="/calendar">
                        <li
                            className={
                                'item calendar ' +
                                (router.pathname === '/calendar'
                                    ? 'active'
                                    : '')
                            }
                        >
                            <div className="relative">
                                <FiCalendar className="sidebar_list_item_svg "></FiCalendar>
                                <span className="calendar_date ">
                                    {new Date().getDate()}
                                </span>
                            </div>

                            <p className="header_name">Calender</p>
                        </li>
                    </Link>
                </ul>

                <div className={'item projects '}>
                    <div
                        className={
                            'expansion_panel_header ' +
                            (projectCollapse ? 'mb-4' : '')
                        }
                    >
                        <CgFolder
                            className="sidebar_list_item_svg"
                            onClick={switch_projectCollapse}
                        />
                        <p
                            className="header_name"
                            onClick={switch_projectCollapse}
                        >
                            Projects
                        </p>
                        <div className="keys">
                            <HiOutlinePlus
                                className="add_item"
                                onClick={() => setOpenProjectModal(true)}
                            />
                            <HiChevronLeft
                                className={
                                    'collapse_key ' +
                                    (projectCollapse ? 'active' : '')
                                }
                                onClick={switch_projectCollapse}
                            />
                        </div>
                    </div>
                    <ul
                        className={
                            'expansion_panel_list ' +
                            (projectCollapse ? 'active' : '')
                        }
                    >
                        {projects.length ? (
                            projects.map((project) => {
                                return (
                                    <Link
                                        to={`/project/${project.id}`}
                                        key={project.id}
                                    >
                                        <li
                                            className={
                                                'expansion_panel_list_item ' +
                                                (router.pathname ===
                                                '/project/' + project.id
                                                    ? 'active'
                                                    : '')
                                            }
                                        >
                                            <div className="div_color">
                                                <div
                                                    className="item_color"
                                                    style={{
                                                        background: `${
                                                            colors[
                                                                project.color
                                                            ].color
                                                        }`,
                                                    }}
                                                ></div>
                                            </div>
                                            <div className="item_name">
                                                {project.name}
                                            </div>
                                            <HiOutlineDotsHorizontal className="item_menu" />
                                        </li>
                                    </Link>
                                );
                            })
                        ) : (
                            <div className="expansion_panel_list_item_empty">
                                Project list is empty.
                            </div>
                        )}
                    </ul>
                </div>

                <div className={'item labels'}>
                    <div
                        className={
                            'expansion_panel_header ' +
                            (labelCollapse ? 'mb-4' : '')
                        }
                    >
                        <HiOutlineTag
                            className="sidebar_list_item_svg"
                            onClick={switch_labelCollapse}
                        />
                        <p
                            className="header_name"
                            onClick={switch_labelCollapse}
                        >
                            Labels
                        </p>
                        <div className="keys">
                            <HiOutlinePlus
                                className="add_item"
                                onClick={() => setOpenLabelModal(true)}
                            />
                            <HiChevronLeft
                                className={
                                    'collapse_key ' +
                                    (labelCollapse ? 'active' : '')
                                }
                                onClick={switch_labelCollapse}
                            />
                        </div>
                    </div>
                    <ul
                        className={
                            'expansion_panel_list ' +
                            (labelCollapse ? 'active' : '')
                        }
                    >
                        {projects.length ? (
                            projects.map((label) => {
                                return (
                                    <Link
                                        to={`/label/${label.id}`}
                                        key={label.id}
                                    >
                                        <li
                                            className={
                                                'expansion_panel_list_item ' +
                                                (router.pathname ===
                                                '/label/' + label.id
                                                    ? 'active'
                                                    : '')
                                            }
                                        >
                                            <div className="div_color">
                                                <div
                                                    className="item_color"
                                                    style={{
                                                        background: `${
                                                            colors[label.color]
                                                                .color
                                                        }`,
                                                    }}
                                                ></div>
                                            </div>
                                            <div className="item_name">
                                                {label.name}
                                            </div>
                                            <HiOutlineDotsHorizontal className="item_menu" />
                                        </li>
                                    </Link>
                                );
                            })
                        ) : (
                            <div className="expansion_panel_list_item_empty">
                                Label list is empty.
                            </div>
                        )}
                    </ul>
                </div>
            </div>

            {/* Modal */}
            <AddProjectModal open={openProjectModal} close={onCloseModal} />
            <AddLabelModal open={openLabelModal} close={onCloseModal} />

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
        </div>
    );
};

export default SideBar;
