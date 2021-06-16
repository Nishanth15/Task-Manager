import './layout.scss';
import SideBar from '../NavigationBar/SideBar';
import TopBar from '../NavigationBar/TopBar';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

//Services
import { projectService } from '../../services/project.service';
import { authenticationService } from '../../services/auth.service';

const Layout = ({ children }) => {
    let history = useHistory();
    const token = localStorage.getItem('accessToken');
    // State
    const [switchKey, setSwitchKey] = useState(true);
    const [projects, setProjects] = useState([]);
    const [labels] = useState([]);
    const [filters] = useState([]);
    const [userData, setUserData] = useState({});

    // LifeCycle Hooks
    useEffect(() => {
        if (token !== '' && token != null) {
            let tokenExpiresAt = new Date(
                localStorage.getItem('tokenExpiresAt')
            );
            let currentTime = new Date(Date.now());
            if (tokenExpiresAt <= currentTime) {
                history.push('/login');
            }
        } else {
            authenticationService.logout();
        }
        if (projects.length === 0) {
            projectService.getProjects().then(() => {
                projectService.projects.subscribe((value) => {
                    setProjects(value);
                });
            });
        }
        setUserData(JSON.parse(atob(token.split('.')[1])));
    }, [token, history, projects]);

    // Methods
    const switchSideBar = () => {
        setSwitchKey(switchKey ? false : true);
    };

    return (
        <div className="layout">
            <div className="left_side">
                <div
                    className={
                        'sidebar ' +
                        (switchKey ? 'sidebar_show' : 'sidebar_hide')
                    }
                >
                    <SideBar
                        handleSwitchKey={switchSideBar}
                        projects={projects}
                        labels={labels}
                        filters={filters}
                    />
                </div>
            </div>
            <div
                className={
                    'right_side ' +
                    (switchKey ? 'right_side_expand' : 'right_side_shrink')
                }
            >
                <div
                    className={
                        'topbar ' +
                        (switchKey ? 'topbar_expand' : 'topbar_shrink')
                    }
                >
                    <TopBar userData={userData}></TopBar>
                </div>
                <div
                    className={
                        'main_content ' +
                        (switchKey
                            ? 'main_content_expand'
                            : 'main_content_shrink')
                    }
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;
