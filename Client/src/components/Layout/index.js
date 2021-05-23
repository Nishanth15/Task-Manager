import SideBar from '../NavigationBar/SideBar';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

//Services
import { projectService } from '../../services/project.service';

const Layout = ({ children }) => {
    let history = useHistory();
    // State
    const [switchKey, setSwitchKey] = useState(true);
    const [projects, setProjects] = useState([]);

    // LifeCycle Hooks
    useEffect(() => {
        checkTokenAvailability();
        projectService.getProjects().then((data) => {
            setProjects(data);
        });

        return () => {
            setSwitchKey({});
            setProjects({});
        };
    }, []);

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
