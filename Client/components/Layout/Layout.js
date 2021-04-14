import TopBar from './TopBar';
import SideNav from './SideBar';

function Layout({ children }) {
    return (
        <div className="layout">
            {/* <TopBar /> */}
            <SideNav />
            {children}
        </div>
    );
}

export default Layout;
