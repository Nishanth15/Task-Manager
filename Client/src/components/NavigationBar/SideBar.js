import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const url = 'http://localhost:5000/api/project';

function SideBar() {
    const router = useRouter();

    const [projectCollapse, setProjectCollapse] = useState(false);
    const [labelCollapse, setLabelCollapse] = useState(false);
    const [projects, setProjects] = useState([]);

    const switch_labelCollapse = () => {
        setLabelCollapse(labelCollapse ? false : true);
    };
    const switch_projectCollapse = () => {
        setProjectCollapse(projectCollapse ? false : true);
    };
    const getProjects = async () => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => setProjects(data));
    };
    useEffect(() => {
        getProjects();
    }, []);

    return (
        <div>
            <img
                className="logo"
                src="/logo.svg"
                alt="taskManager"
                width="200"
            />
            <div className="sidebar_list">
                <ul>
                    <Link href="/inbox">
                        <li
                            className={
                                'item inbox ' +
                                (router.asPath === '/inbox' ? 'active' : '')
                            }
                        >
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
                                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                />
                            </svg>

                            <p>Inbox</p>
                        </li>
                    </Link>

                    <Link href="/calender">
                        <li
                            className={
                                'item calender ' +
                                (router.asPath === '/calender' ? 'active' : '')
                            }
                        >
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
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>

                            <p>Calender</p>
                        </li>
                    </Link>

                    <div className="collapse_item">
                        <div
                            className={'item projects'}
                            onClick={switch_projectCollapse}
                        >
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
                                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                                />
                            </svg>
                            <div className="expansion_panel_header">
                                <p>Projects</p>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={
                                        'collapes_key ' +
                                        (projectCollapse ? 'active' : '')
                                    }
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

                        <div
                            className={
                                'expansion_panel_list ' +
                                (projectCollapse ? 'active' : '')
                            }
                        >
                            <ul className="projects_list">
                                {projects.map((project) => {
                                    return (
                                        <Link
                                            href={`/project/${project.id}`}
                                            key={project.id}
                                        >
                                            <li
                                                className={
                                                    'project_list_item ' +
                                                    (router.asPath ===
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
                                                    <div className="item_setting">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </li>
                                        </Link>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>

                    <Link href="/label">
                        <li
                            className={'item labels'}
                            onClick={switch_labelCollapse}
                        >
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
                                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                />
                            </svg>

                            <div className="expansion_panel_header">
                                <p>Label</p>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={
                                        'collapes_key ' +
                                        (labelCollapse ? 'active' : '')
                                    }
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
                        </li>
                    </Link>
                </ul>
            </div>

            <div className="user_menu">
                <div className="user_icon">
                    <Image src="/user.png" width={100} height={100}></Image>
                </div>
                <h5 className="user_name">Nishanth</h5>
            </div>
        </div>
    );
}

export default SideBar;
