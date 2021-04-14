function TopBar() {
    return (
        <div className="p-3 container-fluid header">
            <div className="row">
                <img
                    className="logo pt-14 mx-auto"
                    src="/logo.svg"
                    alt="taskManager"
                    width="200"
                />
            </div>
        </div>
    );
}

export default TopBar;
