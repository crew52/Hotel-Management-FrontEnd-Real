import { Box } from "@mui/material";
import {Outlet, useLocation} from "react-router-dom";
import Appbar from "../appbar/Appbar.jsx";
import Nav from "../nav/Nav.jsx";
import Content from "../content/Content.jsx";
import Footer from "../footer/Footer.jsx";

export function LayoutAdmin() {
    const location = useLocation();
    const isIndexRoute = location.pathname === '/admin';

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                overflowY: "auto",
                margin: 0,
                padding: 0,
                "&::-webkit-scrollbar": {
                    width: "8px",
                },
                "&::-webkit-scrollbar-track": {
                    backgroundColor: "#f1f1f1",
                    borderRadius: "4px",
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#c1c1c1",
                    borderRadius: "4px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                    backgroundColor: "#a8a8a8",
                },
            }}>

            <Appbar/>
            <Nav/>
            {isIndexRoute ? <Content /> : <Outlet />}
            <Footer/>

        </Box>
    );
}
