import SideBar from '../NavigationBar/SideBar';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

//Services
import { projectService } from '../../services/project.service';
import { authenticationService } from '../../services/auth.service';

const Layout = ({ children }) => {
    let history = useHistory();
    // State
    const [switchKey, setSwitchKey] = useState(true);
    const [projects, setProjects] = useState([]);

    // LifeCycle Hooks
    useEffect(() => {
        if (projects.length === 0) {
            projectService.getProjects().then(() => {
                projectService.projects.subscribe((value) => {
                    setProjects(value);
                    console.log(value);
                });
            });
        }
    }, [projects]);

    useEffect(() => {
        checkTokenAvailability();
    });

    // Methods
    function checkTokenAvailability() {
        if (
            localStorage.getItem('accessToken') !== '' &&
            localStorage.getItem('accessToken') != null
        ) {
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
    }

    const switchSideBar = () => {
        setSwitchKey(switchKey ? false : true);
    };

    return (
        <div className="layout">
            <div
                className={
                    'sidebar ' + (switchKey ? 'sidebar_show' : 'sidebar_hide')
                }
            >
                <SideBar handleSwitchKey={switchSideBar} projects={projects} />
            </div>

            <div
                className={
                    'main_content ' +
                    (switchKey ? 'main_content_expand' : 'main_content_shrink')
                }
            >
                {children}
            </div>
        </div>
    );
};

export default Layout;
