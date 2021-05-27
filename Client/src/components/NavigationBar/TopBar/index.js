import { useHistory } from 'react-router-dom';
import { Menu, Dropdown } from 'antd';
import {
    HiOutlineLogout,
    HiChevronDown,
    IoNotifications,
} from '../../../assets/static';
import user_image from '../../../assets/images/user.png';
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
                <div className="flex" onClick={logout}>
                    <HiOutlineLogout className="h-5 w-5 mr-3" />
                    <span>Log Out</span>
                </div>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="top_menu">
            <div className="left_menu">Search</div>
            <div className="right_menu">
                <IoNotifications className="w-5 h-5" />
                <Dropdown
                    overlay={menu}
                    trigger={['click']}
                    placement="topCenter"
                    arrow
                >
                    <div className="user_button">
                        <div className="user_name">
                            Nishanth
                            <HiChevronDown className="w-5 h-5" />
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
