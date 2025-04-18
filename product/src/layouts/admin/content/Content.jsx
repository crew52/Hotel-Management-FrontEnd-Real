import { Outlet } from "react-router-dom";

function Content() {
    return (
        <section style={{ padding: "20px", flex: 1, minHeight: "calc(100vh - 150px)" }}>
            <Outlet />
        </section>
    );
}

export default Content;