import TopBar from './TopBar';
import SideNav from './SideBar';
import React, { useState } from 'react';

function Layout({ children }) {
    const [switchKey, setSwitchKey] = useState(true);

    const switch_sideBar = () => {
        setSwitchKey(switchKey ? false : true);
    };
    return (
        <div className="layout">
            {/* <TopBar /> */}

            <div
                className={
                    'sidebar ' + (switchKey ? 'sidebar_show' : 'sidebar_hide')
                }
            >
                <SideNav />
                <div className="sidebar_switch" onClick={switch_sideBar}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="64"
                        height="119"
                        viewBox="0 0 64 119"
                        fill="none"
                    >
                        <path
                            d="M59.5554 54.7287C62.0594 57.4168 62.0594 61.5832 59.5555 64.2713L28.122 98.0154C23.7893 102.667 16 99.6008 16 93.2441L16 25.7558C16 19.3992 23.7892 16.3333 28.122 20.9846L59.5554 54.7287Z"
                            fill="white"
                        />
                        <path
                            d="M37.3333 63.5H46.6667M37.3333 54.5H46.6667H37.3333ZM37.3333 59H46.6667H37.3333Z"
                            stroke="#2A8CFF"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </div>
            <div
                className={
                    'layout_main ' +
                    (switchKey ? 'layout_main_expand' : 'layout_main_shrink')
                }
            >
                {children}
            </div>
        </div>
    );
}

export default Layout;
