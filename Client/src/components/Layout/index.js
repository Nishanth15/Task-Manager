import SideBar from '../NavigationBar/SideBar';
import React, { useState, useEffect } from 'react';

//Services
import {projectService} from '../../services/project.service';


// const url = 'http://localhost:5000/api/project';

const Layout = ({ children }) => {
    // State
    const [switchKey, setSwitchKey] = useState(true);
    const [projects, setProjects] = useState([]);

    // LifeCycle Hooks
    useEffect(() => {
        projectService.getProjects().then((data) => setProjects(data));
    }, []);

    // Methods
    const switchSideBar = () => {
        setSwitchKey(switchKey ? false : true);
    };
    // const getProjects = async () => {
    //     fetch(url)
    //         .then((response) => response.json())
    //         .then((data) => setProjects(data));
    // };

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