import { useHistory } from 'react-router-dom';
import { Input, Menu, Dropdown } from 'antd';
import {
    HiOutlineLogout,
    HiChevronDown,
    HiSearch,
    FiBell,
    FiActivity,
    HiCog,
} from '../../../assets/static';
import user_image from '../../../assets/images/Ellipse.png';
import { authenticationService } from '../../../services/auth.service';

const TopBar = () => {
    const history = useHistory();

    const logout = () => {
        authenticationService.logout();
        history.push('/signin');
    };

    const menu = (
        <Menu>
            <Menu.Item>
                <div className="flex p-1">
                    <HiCog className="topbar_svg mr-3" />
                    <span>Setting</span>
                </div>
            </Menu.Item>
            <Menu.Item>
                <div className="flex p-1">
                    <FiActivity className="topbar_svg mr-3" />
                    <span>Activity log</span>
                </div>
            </Menu.Item>
            <Menu.Item>
                <div className="flex p-1" onClick={logout}>
                    <HiOutlineLogout className="topbar_svg mr-3" />
                    <span>Log Out</span>
                </div>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="top_menu">
            <div className="left_menu">
                <Input
                    type="text"
                    className="searchbar"
                    placeholder="Search"
                    prefix={<HiSearch className="topbar_svg" />}
                />
            </div>

            <div className="right_menu">
                <FiBell className="topbar_svg" />
                <Dropdown
                    overlay={menu}
                    trigger={['click']}
                    overlayStyle={{ width: 200 }}
                    placement="bottomRight"
                    arrow
                >
                    <div className="user_button">
                        <div className="user_name">
                            Nishanth
                            <HiChevronDown className="topbar_svg" />
                        </div>
                        <div className="user_image">
                            <img
                                src={user_image}
                                alt=""
                                width={100}
                                height={100}
                            ></img>
                        </div>
                    </div>
                </Dropdown>
            </div>
        </div>
    );
};

export default TopBar;
