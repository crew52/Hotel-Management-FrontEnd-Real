import { Box, Button, Popper, MenuList, MenuItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useRef } from "react";

function Nav() {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const navigate = useNavigate();
    const [activeButton, setActiveButton] = useState("overview");
    const [selectedMenuItem, setSelectedMenuItem] = useState(null);

    const handleMouseEnter = () => {
        setOpen(true);
    };

    const handleMouseLeave = () => {
        setOpen(false);
    };

    const handleButtonClick = (buttonKey) => {
        setActiveButton(buttonKey);
        setSelectedMenuItem(null);
    };

    const handleMenuItemClick = (path, itemKey) => {
        setOpen(false);
        setActiveButton("employee");
        setSelectedMenuItem(itemKey);
        navigate(path);
    };

    const textButtonSx = (isActive) => ({
        color: "white",
        fontWeight: "bold",
        textTransform: "none",
        borderRadius: 2,
        backgroundColor: isActive ? "#FFB6C1" : "transparent",
        "&:hover": {
            backgroundColor: isActive ? "#FFB6C1" : "rgba(255, 182, 193, 0.3)",
        },
    });

    return (
        <section style={{ backgroundColor: "#007bff", padding: "5px 18px" }}>
            <nav
                style={{
                    display: "flex",
                    gap: "8px",
                    alignItems: "center",
                }}
            >
                <Button
                    variant="text"
                    sx={textButtonSx(activeButton === "overview")}
                    component={Link}
                    to="/admin"
                    onClick={() => handleButtonClick("overview")}
                >
                    Tổng quan
                </Button>
                <Button
                    variant="text"
                    sx={textButtonSx(activeButton === "rooms")}
                    component={Link}
                    to="/admin/rooms"
                    onClick={() => handleButtonClick("rooms")}
                >
                    Phòng
                </Button>
                <Button
                    variant="text"
                    sx={textButtonSx(activeButton === "goods")}
                    component={Link}
                    to="/admin/goods"
                    onClick={() => handleButtonClick("goods")}
                >
                    Hàng hóa
                </Button>
                <Button
                    variant="text"
                    sx={textButtonSx(activeButton === "transactions")}
                    component={Link}
                    to="/admin/transactions"
                    onClick={() => handleButtonClick("transactions")}
                >
                    Giao dịch
                </Button>
                <Button
                    variant="text"
                    sx={textButtonSx(activeButton === "partners")}
                    component={Link}
                    to="/admin/partners"
                    onClick={() => handleButtonClick("partners")}
                >
                    Đối tác
                </Button>
                <Box onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <Button
                        variant="text"
                        sx={textButtonSx(activeButton === "employee")}
                        ref={anchorRef}
                        onClick={() => handleButtonClick("employee")}
                    >
                        Nhân viên
                    </Button>
                    <Popper
                        open={open}
                        anchorEl={anchorRef.current}
                        placement="bottom-start"
                        disablePortal
                        style={{ zIndex: 9999 }}
                    >
                        <Box
                            sx={{
                                bgcolor: "white",
                                borderRadius: 1,
                                boxShadow: 3,
                                minWidth: 180,
                            }}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <MenuList dense>
                                <MenuItem
                                    onClick={() => handleMenuItemClick("/admin/employee", "employeeList")}
                                    sx={{
                                        color: "#000000",
                                        backgroundColor: selectedMenuItem === "employeeList" ? "rgba(255, 182, 193, 0.5)" : "transparent",
                                        "&:hover": {
                                            backgroundColor: selectedMenuItem === "employeeList" ? "rgba(255, 182, 193, 0.5)" : "rgba(255, 182, 193, 0.3)",
                                        },
                                    }}
                                >
                                    Nhân viên
                                </MenuItem>
                                <MenuItem
                                    onClick={() => handleMenuItemClick("/admin/employee/schedule", "schedule")}
                                    sx={{
                                        color: "#000000",
                                        backgroundColor: selectedMenuItem === "schedule" ? "rgba(255, 182, 193, 0.5)" : "transparent",
                                        "&:hover": {
                                            backgroundColor: selectedMenuItem === "schedule" ? "rgba(255, 182, 193, 0.5)" : "rgba(255, 182, 193, 0.3)",
                                        },
                                    }}
                                >
                                    Lịch làm việc
                                </MenuItem>
                                <MenuItem
                                    onClick={() => handleMenuItemClick("/admin/employee/attendance", "attendance")}
                                    sx={{
                                        color: "#000000",
                                        backgroundColor: selectedMenuItem === "attendance" ? "rgba(255, 182, 193, 0.5)" : "transparent",
                                        "&:hover": {
                                            backgroundColor: selectedMenuItem === "attendance" ? "rgba(255, 182, 193, 0.5)" : "rgba(255, 182, 193, 0.3)",
                                        },
                                    }}
                                >
                                    Chấm công
                                </MenuItem>
                                <MenuItem
                                    onClick={() => handleMenuItemClick("/admin/employee/payroll", "payroll")}
                                    sx={{
                                        color: "#000000",
                                        backgroundColor: selectedMenuItem === "payroll" ? "rgba(255, 182, 193, 0.5)" : "transparent",
                                        "&:hover": {
                                            backgroundColor: selectedMenuItem === "payroll" ? "rgba(255, 182, 193, 0.5)" : "rgba(255, 182, 193, 0.3)",
                                        },
                                    }}
                                >
                                    Bảng tính lương
                                </MenuItem>
                                <MenuItem
                                    onClick={() => handleMenuItemClick("/admin/employee/settings", "employeeSettings")}
                                    sx={{
                                        color: "#000000",
                                        backgroundColor: selectedMenuItem === "employeeSettings" ? "rgba(255, 182, 193, 0.5)" : "transparent",
                                        "&:hover": {
                                            backgroundColor: selectedMenuItem === "employeeSettings" ? "rgba(255, 182, 193, 0.5)" : "rgba(255, 182, 193, 0.3)",
                                        },
                                    }}
                                >
                                    Thiết lập nhân viên
                                </MenuItem>
                            </MenuList>
                        </Box>
                    </Popper>
                </Box>
                <Button
                    variant="text"
                    sx={textButtonSx(activeButton === "cashbook")}
                    component={Link}
                    to="/admin/cashbook"
                    onClick={() => handleButtonClick("cashbook")}
                >
                    Sổ quỹ
                </Button>
                <Button
                    variant="text"
                    sx={textButtonSx(activeButton === "reports")}
                    component={Link}
                    to="/admin/reports"
                    onClick={() => handleButtonClick("reports")}
                >
                    Báo cáo
                </Button>
            </nav>
        </section>
    );
}

export default Nav;