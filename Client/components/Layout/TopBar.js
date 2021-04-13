function TopBar() {
    return (
        <div className="p-3 container-fluid header">
            <div className="row">
                <img
                    className="pl-2 my-auto"
                    src="/logo.png"
                    alt="taskManager"
                    width={200}
                />
            </div>
        </div>
    );
}

export default TopBar;
