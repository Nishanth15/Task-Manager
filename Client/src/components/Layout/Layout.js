import TopBar from '../NavigationBar/TopBar';
import SideBar from '../NavigationBar/SideBar';
import React, { useState, useEffect } from 'react';
import withAuth from '../../_helpers/ProtectedRoute';

const url = 'http://localhost:5000/api/project';

function Layout({ children }) {
    // State
    const [switchKey, setSwitchKey] = useState(true);
    const [projects, setProjects] = useState([]);

    // LifeCycle Hooks
    useEffect(() => {
        getProjects();
    }, []);

    // Methods
    const switchSideBar = () => {
        console.log(switchKey);
        setSwitchKey(switchKey ? false : true);
    };

    const getProjects = async () => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => setProjects(data));
    };

    return (
        <div className="layout">
            {/* <TopBar /> */}
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
}

export default Layout;
