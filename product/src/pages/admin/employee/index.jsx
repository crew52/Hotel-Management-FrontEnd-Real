import React, { useState, useEffect } from 'react';
import {
    Grid, Box, Typography, Checkbox, FormControlLabel, Select, MenuItem, Button,
    IconButton, FormControl, InputBase, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper, Collapse, Menu, Dialog, DialogTitle, DialogContent, DialogActions,
    Snackbar, Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DownloadIcon from '@mui/icons-material/Download';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SearchIcon from '@mui/icons-material/Search';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EmployeeService from "../../../service/admin/employee.service.js";
import AddEmployeeDialog from "./AddEmployeeDialog.jsx";
import EditEmployeeDialog from "./EditEmployeeDialog.jsx";

// Hàm tạo dữ liệu nhân viên
function createEmployeeData(
    id, fullName, phone, idCard, address, position, note,
    user_id, start_date, device, dob, gender, email, facebook,
    branch, work_branch, department, login_account, image
) {
    return {
        id, fullName, phone, idCard, address, position, note,
        user_id, start_date, device, dob, gender, email, facebook,
        branch, work_branch, department, login_account, image,
        details: [
            { label: 'Ghi chú', value: note || 'Không có ghi chú' },
            { label: 'Ngày cập nhật', value: '2023-10-15' },
            { label: 'Trạng thái', value: 'Đang làm việc' },
        ],
    };
}

// Dữ liệu ảo
const mockEmployees = [
    createEmployeeData(
        1, 'Nguyễn Văn A', '0123456789', '123456789', 'Hà Nội', 'Nhân viên', 'Nhân viên xuất sắc',
        'NV001', '2023-01-01', 'iPhone 12', '1990-05-15', 'Nam', 'nguyenvana@gmail.com', 'fb.com/nguyenvana',
        'Chi nhánh HN', 'Chi nhánh HN', 'Phòng PV', 'nvana',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    ),
    createEmployeeData(
        2, 'Trần Thị B', '0987654321', '987654321', 'TP.HCM', 'Trưởng phòng', 'Cần cải thiện kỹ năng lãnh đạo',
        'TP002', '2022-06-10', 'Samsung S21', '1985-08-20', 'Nữ', 'tranthib@gmail.com', 'fb.com/tranthib',
        'Chi nhánh HCM', 'Chi nhánh HCM', 'Phòng AI', 'tthib',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    ),
    createEmployeeData(
        3, 'Lê Văn C', '0912345678', '456789123', 'Đà Nẵng', 'Nhân viên', 'Làm việc chăm chỉ',
        'NV003', '2023-03-15', 'Xiaomi 11', '1992-11-30', 'Nam', 'levanc@gmail.com', 'fb.com/levanc',
        'Chi nhánh DN', 'Chi nhánh DN', 'Phòng PV', 'lvanc',
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    ),
    createEmployeeData(
        4, 'Phạm Thị D', '0932145678', '789123456', 'Cần Thơ', 'Quản lý', 'Kỹ năng tốt',
        'QL004', '2021-09-01', 'Oppo Reno', '1988-02-25', 'Nữ', 'phamthid@gmail.com', 'fb.com/phamthid',
        'Chi nhánh CT', 'Chi nhánh CT', 'Phòng AI', 'pthid', null
    ),
];

// Component Row hiển thị từng hàng nhân viên
function Row({ row, selectedRows, handleRowSelect, selectedColumns, handleOpenEditDialog }) {
    const [open, setOpen] = useState(false);

    const columnOptions = [
        { label: 'Ảnh', key: 'image' },
        { label: 'Mã nhân viên', key: 'id' },
        { label: 'Tên nhân viên', key: 'fullName' },
        { label: 'Mã chấm công', key: 'user_id' },
        { label: 'Ngày sinh', key: 'dob' },
        { label: 'Giới tính', key: 'gender' },
        { label: 'Số CMND/CCCD', key: 'idCard' },
        { label: 'Ngày bắt đầu làm việc', key: 'start_date' },
        { label: 'Chi nhánh trực thuộc', key: 'branch' },
        { label: 'Chi nhánh làm việc', key: 'work_branch' },
        { label: 'Tài khoản KiotViet', key: 'login_account' },
        { label: 'Số điện thoại', key: 'phone' },
        { label: 'Tất cả chi nhánh', key: 'branch' },
        { label: 'Email', key: 'email' },
        { label: 'Facebook', key: 'facebook' },
        { label: 'Địa chỉ', key: 'address' },
        { label: 'Thiết bị di động', key: 'device' },
        { label: 'Ghi chú', key: 'note' },
        { label: 'Chức vụ', key: 'position' },
        { label: 'Phòng ban', key: 'department' },
    ];

    const detailedInfo = columnOptions
        .filter((option) => option.label !== 'Ảnh')
        .map((option) => ({
            label: option.label,
            value: row[option.key] || '-',
        }));

    const column2 = detailedInfo.slice(0, 9);
    const column3 = detailedInfo.slice(9);
    const placeholderImage = '';

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell sx={{ minWidth: 50, padding: '8px 16px', textAlign: 'left' }}>
                    <Checkbox
                        checked={selectedRows.includes(row.id)}
                        onChange={(e) => handleRowSelect(row.id, e)}
                        onClick={(e) => e.stopPropagation()}
                        size="small"
                    />
                </TableCell>
                <TableCell sx={{ minWidth: 50, padding: '8px 16px', textAlign: 'left' }}>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                {selectedColumns.map((col) => (
                    <TableCell
                        key={col}
                        align="left"
                        sx={{
                            fontSize: 13,
                            minWidth: 120,
                            maxWidth: 200,
                            padding: '8px 16px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                    >
                        {col === 'Ảnh' ? (
                            <img
                                src={row.image || placeholderImage}
                                alt="Employee"
                                style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                            />
                        ) : (
                            row[columnOptions.find((option) => option.label === col)?.key] || '-'
                        )}
                    </TableCell>
                ))}
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={selectedColumns.length + 2}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="subtitle1" gutterBottom component="div" sx={{ fontWeight: 'bold', fontSize: 14, mb: 5 }}>
                                Thông tin chi tiết
                            </Typography>
                            <Grid container spacing={8}>
                                <Grid item xs={4}>
                                    <Box>
                                        <Typography variant="body2" sx={{ fontSize: 13, fontWeight: 'bold' }}>
                                            Ảnh:
                                        </Typography>
                                        <img
                                            src={row.image || placeholderImage}
                                            alt="Employee"
                                            style={{ width: '150px', height: '150px', objectFit: 'cover', marginTop: '8px' }}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={4} sx={{ mr: 6 }}>
                                    {column2.map((info, index) => (
                                        <Box key={index} sx={{ mb: 2 }}>
                                            <Typography variant="body2" sx={{ fontSize: 13 }}>
                                                <strong>{info.label}:</strong> {info.value}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Grid>
                                <Grid item xs={4}>
                                    {column3.map((info, index) => (
                                        <Box key={index} sx={{ mb: 2 }}>
                                            <Typography variant="body2" sx={{ fontSize: 13 }}>
                                                <strong>{info.label}:</strong> {info.value}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Grid>
                            </Grid>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 3, mb: 7 }}>
                                <Button variant="contained" size="small" sx={{ backgroundColor: '#1976d2', textTransform: 'none', padding: '6px 12px', fontSize: '12px' }}>
                                    Lấy mã xác nhận
                                </Button>
                                <Button
                                    variant="contained"
                                    size="small"
                                    sx={{ backgroundColor: '#00c853', textTransform: 'none', padding: '6px 12px', fontSize: '12px' }}
                                    onClick={() => handleOpenEditDialog(row)} // Gọi hàm mở dialog và truyền dữ liệu nhân viên
                                >
                                    Cập nhật
                                </Button>
                                <Button variant="contained" size="small" sx={{ backgroundColor: '#d32f2f', textTransform: 'none', padding: '6px 12px', fontSize: '12px' }}>
                                    Ngừng làm việc
                                </Button>
                            </Box>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

// Component Employee chính
function Employee() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedColumns, setSelectedColumns] = useState([
        'Mã nhân viên', 'Tên nhân viên', 'Số điện thoại',
        'Số CMND/CCCD', 'Địa chỉ', 'Chức vụ', 'Ghi chú'
    ]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [employees, setEmployees] = useState(mockEmployees);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [openDialog, setOpenDialog] = useState(false);
    const [actionAnchorEl, setActionAnchorEl] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false); // Thêm trạng thái cho Edit dialog
    const [selectedEmployee, setSelectedEmployee] = useState(null); // Thêm trạng thái để lưu nhân viên được chọn

    const columnOptions = [
        { label: 'Ảnh', key: 'image' },
        { label: 'Mã nhân viên', key: 'id' },
        { label: 'Tên nhân viên', key: 'fullName' },
        { label: 'Mã chấm công', key: 'user_id' },
        { label: 'Ngày sinh', key: 'dob' },
        { label: 'Giới tính', key: 'gender' },
        { label: 'Số CMND/CCCD', key: 'idCard' },
        { label: 'Ngày bắt đầu làm việc', key: 'start_date' },
        { label: 'Chi nhánh trực thuộc', key: 'branch' },
        { label: 'Chi nhánh làm việc', key: 'work_branch' },
        { label: 'Tài khoản KiotViet', key: 'login_account' },
        { label: 'Số điện thoại', key: 'phone' },
        { label: 'Tất cả chi nhánh', key: 'branch' },
        { label: 'Email', key: 'email' },
        { label: 'Facebook', key: 'facebook' },
        { label: 'Địa chỉ', key: 'address' },
        { label: 'Thiết bị di động', key: 'device' },
        { label: 'Ghi chú', key: 'note' },
        { label: 'Chức vụ', key: 'position' },
        { label: 'Phòng ban', key: 'department' },
    ];

    // Lấy dữ liệu từ API hoặc fallback về dữ liệu ảo
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const res = await EmployeeService.getAllEmployee(page, size);
                const employees = res.data.content.map(emp => ({
                    id: emp.id,
                    fullName: emp.fullName,
                    phone: emp.phone,
                    idCard: emp.idCard,
                    address: emp.address,
                    position: emp.position,
                    note: emp.note,
                    user_id: emp.user?.userId || '',
                    start_date: emp.startDate,
                    device: emp.device || '-',
                    dob: emp.dob,
                    gender: emp.gender,
                    email: emp.email,
                    facebook: emp.facebook || '-',
                    branch: emp.branch,
                    work_branch: emp.workBranch || emp.branch,
                    department: emp.department,
                    login_account: emp.loginAccount || '-',
                    image: emp.imgUrl
                }));
                setEmployees(employees);
            } catch (error) {
                setEmployees(mockEmployees);
                setSnackbarMessage('Lấy danh sách nhân viên thất bại! Sử dụng dữ liệu ảo.');
                setSnackbarSeverity('warning');
                setOpenSnackbar(true);
            }
        };
        fetchEmployees();
    }, [page, size]);

    const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleColumnToggle = (label) => {
        setSelectedColumns((prev) =>
            prev.includes(label)
                ? prev.filter((col) => col !== label)
                : [...prev, label]
        );
    };

    const handleRowSelect = (id, event) => {
        event.stopPropagation();
        setSelectedRows((prev) =>
            prev.includes(id)
                ? prev.filter((rowId) => rowId !== id)
                : [...prev, id]
        );
    };

    const handleActionMenuClick = (event) => setActionAnchorEl(event.currentTarget);
    const handleActionMenuClose = () => setActionAnchorEl(null);

    const handleDeleteSelected = () => setOpenDialog(true);

    const confirmDelete = async () => {
        try {
            await Promise.all(selectedRows.map(id => EmployeeService.deleteEmployee(id)));
            setEmployees((prev) => prev.filter((emp) => !selectedRows.includes(emp.id)));
            setSelectedRows([]);
            setSnackbarMessage('Xóa nhân viên thành công!');
            setSnackbarSeverity('success');
        } catch (error) {
            setSnackbarMessage(`Xóa nhân viên thất bại: ${error.message}`);
            setSnackbarSeverity('error');
        } finally {
            setOpenSnackbar(true);
            setOpenDialog(false);
            setActionAnchorEl(null);
        }
    };

    const handleSnackbarClose = () => setOpenSnackbar(false);

    const handleOpenAddDialog = () => {
        setSelectedEmployee(null);
        setOpenAddDialog(true);
    };

    const handleCloseAddDialog = () => {
        setOpenAddDialog(false);
        setSelectedEmployee(null);
    };

    const handleOpenEditDialog = (employee) => {
        setSelectedEmployee(employee);
        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        setSelectedEmployee(null);
    };

    const fetchAllEmployees = async (page, size) => {
        try {
            const res = await EmployeeService.getAllEmployee(page, size);
            const employees = res.data.content.map(emp => ({
                id: emp.id,
                fullName: emp.fullName,
                phone: emp.phone,
                idCard: emp.idCard,
                address: emp.address,
                position: emp.position,
                note: emp.note,
                user_id: emp.user?.userId || '',
                start_date: emp.startDate,
                device: emp.device || '-',
                dob: emp.dob,
                gender: emp.gender,
                email: emp.email,
                facebook: emp.facebook || '-',
                branch: emp.branch,
                work_branch: emp.workBranch || emp.branch,
                department: emp.department,
                login_account: emp.loginAccount || '-',
                image: emp.imgUrl
            }));
            setEmployees(employees);
        } catch (error) {
            setEmployees(mockEmployees);
            setSnackbarMessage('Lấy danh sách nhân viên thất bại! Sử dụng dữ liệu ảo.');
            setSnackbarSeverity('warning');
            setOpenSnackbar(true);
        }
    };

    return (
        <Grid container spacing={0.5}>
            <Grid size={{ xs: 4, md: 2.4 }}>
                <Box sx={{ mt: 2 }}>
                    <Typography variant="h6" sx={{ ml: 2, mb: 0.5, fontWeight: 'bold' }}>Danh sách nhân viên</Typography>
                    <Typography color="textSecondary" sx={{ fontSize: 13, ml: 2, mb: 1 }}>Đã sử dụng nhân viên</Typography>
                </Box>

                <Box sx={{ marginLeft: 1, p: 1, border: '1px solid #e0e0e0', borderRadius: 2, mb: 3, boxShadow: 1 }}>
                    <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold', fontSize: 13 }}>Trạng thái nhân viên</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', fontSize: 13 }}>
                        <FormControlLabel control={<Checkbox defaultChecked size="small" />} label={<Typography sx={{ fontSize: 13 }}>Đang làm việc</Typography>} />
                        <FormControlLabel control={<Checkbox size="small" />} label={<Typography sx={{ fontSize: 13 }}>Đã nghỉ</Typography>} />
                    </Box>
                </Box>

                <Box sx={{ marginLeft: 1, p: 1, border: '1px solid #e0e0e0', borderRadius: 2, mb: 3, boxShadow: 1, backgroundColor: '#ffffff' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold', fontSize: 13 }}>Phòng ban</Typography>
                        <Box>
                            <IconButton size="small" sx={{ mr: 0.5 }}><AddIcon fontSize="small" /></IconButton>
                            <IconButton size="small"><ExpandLessIcon fontSize="small" /></IconButton>
                        </Box>
                    </Box>
                    <FormControl fullWidth size="small">
                        <Select displayEmpty defaultValue="" sx={{ borderRadius: 1, height: 32, ml: 1, mr: 1, mb: 2, backgroundColor: '#ffffff' }}>
                            <MenuItem value="" disabled>Chọn phòng ban</MenuItem>
                            <MenuItem value="Phòng PV">Phòng PV</MenuItem>
                            <MenuItem value="Phòng AI">Phòng AI</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{ marginLeft: 1, p: 1, border: '1px solid #e0e0e0', borderRadius: 2, mb: 3, boxShadow: 1, backgroundColor: '#ffffff' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="subtitle2" sx={{ mt: 1, ml: 1, mb: 1, fontWeight: 'bold', fontSize: 13 }}>Chức danh</Typography>
                        <Box>
                            <IconButton size="small" sx={{ mr: 0.5 }}><AddIcon fontSize="small" /></IconButton>
                            <IconButton size="small"><ExpandLessIcon fontSize="small" /></IconButton>
                        </Box>
                    </Box>
                    <FormControl fullWidth size="small">
                        <Select displayEmpty defaultValue="" sx={{ borderRadius: 1, height: 32, ml: 1, mr: 1, mb: 2, backgroundColor: '#ffffff' }}>
                            <MenuItem value="" disabled>Chọn chức danh</MenuItem>
                            <MenuItem value="Trưởng phòng">Trưởng phòng</MenuItem>
                            <MenuItem value="Nhân viên">Nhân viên</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{ ml: 1, p: 1.5, border: '1px solid #e0e0e0', borderRadius: 2, boxShadow: 1, backgroundColor: '#ffffff', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="subtitle2" sx={{ mb: 3, fontWeight: 'bold', fontSize: 13, height: 40 }}>Số bản ghi:</Typography>
                        <FormControl size="small" sx={{ width: 80, height: 24 }}>
                            <Select value={size} onChange={(e) => setSize(e.target.value)} sx={{ borderRadius: 1, height: 28 }}>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                                <MenuItem value={50}>50</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
            </Grid>

            <Grid size={{ xs: 6, md: 9.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', mt: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', width: 420, height: 26, border: '1px solid #e0e0e0', borderRadius: '6px', px: 1.5, py: 0.5, mt: 1, ml: 2, backgroundColor: '#ffffff', boxShadow: 1 }}>
                        <SearchIcon sx={{ fontSize: 20, color: 'gray', mr: 1 }} />
                        <InputBase placeholder="Tìm theo mã chấm công, tên nhân viên" sx={{ fontSize: 14, flex: 1 }} inputProps={{ 'aria-label': 'search employee' }} />
                    </Box>
                    {selectedRows.length > 0 && (
                        <>
                            <Button
                                variant="contained"
                                startIcon={<UploadFileIcon sx={{ fontSize: '16px' }} />}
                                size="small"
                                sx={{ backgroundColor: '#00b63e', textTransform: 'none', borderRadius: '8px', padding: '6px 8px', fontSize: '12px', '& .MuiButton-startIcon': { marginRight: '4px' } }}
                                onClick={handleActionMenuClick}
                            >
                                Thao tác
                            </Button>
                            <Menu anchorEl={actionAnchorEl} open={Boolean(actionAnchorEl)} onClose={handleActionMenuClose} disableAutoFocusItem={true}>
                                <MenuItem onClick={handleDeleteSelected}>Xóa</MenuItem>
                            </Menu>
                        </>
                    )}

                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon sx={{ fontSize: '16px' }} />}
                            size="small"
                            sx={{ backgroundColor: '#00b63e', textTransform: 'none', borderRadius: '8px', padding: '6px 10px', fontSize: '12px', '& .MuiButton-startIcon': { marginRight: '4px' } }}
                            onClick={handleOpenAddDialog}>
                            Nhân viên
                        </Button>
                        <Button variant="contained" startIcon={<UploadFileIcon sx={{ fontSize: '16px' }} />} size="small" sx={{ backgroundColor: '#00b63e', textTransform: 'none', borderRadius: '8px', padding: '4px 8px', fontSize: '12px', '& .MuiButton-startIcon': { marginRight: '4px' } }}>
                            Nhập file
                        </Button>
                        <Button variant="contained" startIcon={<DownloadIcon sx={{ fontSize: '16px' }} />} size="small" sx={{ backgroundColor: '#00b63e', textTransform: 'none', borderRadius: '8px', padding: '4px 8px', fontSize: '12px', '& .MuiButton-startIcon': { marginRight: '4px' } }}>
                            Xuất file
                        </Button>
                        <IconButton sx={{ padding: '2px' }} onClick={handleMenuClick}>
                            <AppRegistrationIcon sx={{ fontSize: '26px' }} />
                        </IconButton>
                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} PaperProps={{ style: { maxHeight: 400, width: 350 } }} disableAutoFocusItem={true}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1 }}>
                                <Box>
                                    {columnOptions.slice(0, 10).map((option) => (
                                        <FormControlLabel
                                            key={option.label}
                                            control={<Checkbox checked={selectedColumns.includes(option.label)} onChange={() => handleColumnToggle(option.label)} size="small" sx={{ p: 0.8 }} />}
                                            label={<Typography variant="body2" sx={{ fontSize: '12px' }}>{option.label}</Typography>}
                                            sx={{ '& .MuiFormControlLabel-label': { fontSize: '12px' }, ml: 1 }}
                                        />
                                    ))}
                                </Box>
                                <Box>
                                    {columnOptions.slice(10).map((option) => (
                                        <FormControlLabel
                                            key={option.label}
                                            control={<Checkbox checked={selectedColumns.includes(option.label)} onChange={() => handleColumnToggle(option.label)} size="small" sx={{ p: 0.8 }} />}
                                            label={<Typography variant="body2" sx={{ fontSize: '12px' }}>{option.label}</Typography>}
                                            sx={{ '& .MuiFormControlLabel-label': { fontSize: '12px' }, ml: 1 }}
                                        />
                                    ))}
                                </Box>
                            </Box>
                        </Menu>
                    </Box>
                </Box>

                <Box sx={{ mt: 3, ml: 2, border: '1px solid #e0e0e0', borderRadius: 1, boxShadow: 1, backgroundColor: '#ffffff' }}>
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead sx={{ backgroundColor: '#eaf2ff' }}>
                                <TableRow>
                                    <TableCell sx={{ minWidth: 50, padding: '8px 16px', textAlign: 'left' }} />
                                    <TableCell sx={{ minWidth: 50, padding: '8px 16px', textAlign: 'left' }} />
                                    {selectedColumns.map((col) => (
                                        <TableCell key={col} sx={{ fontWeight: 'bold', fontSize: 13, minWidth: 120, maxWidth: 200, padding: '8px 16px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {col}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {employees.map((employee) => (
                                    <Row
                                        key={employee.id}
                                        row={employee}
                                        selectedRows={selectedRows}
                                        handleRowSelect={handleRowSelect}
                                        selectedColumns={selectedColumns}
                                        handleOpenEditDialog={handleOpenEditDialog} // Truyền hàm mở dialog vào Row
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

                <Dialog open={openDialog} onClose={() => setOpenDialog(false)} disableRestoreFocus={true}>
                    <DialogTitle>Xác nhận xóa</DialogTitle>
                    <DialogContent>Bạn có chắc chắn muốn xóa {selectedRows.length} nhân viên?</DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(false)}>Hủy</Button>
                        <Button onClick={confirmDelete} color="error">Xóa</Button>
                    </DialogActions>
                </Dialog>

                <AddEmployeeDialog
                    open={openAddDialog}
                    onClose={handleCloseAddDialog}
                    fetchAllEmployees={() => fetchAllEmployees(page, size)}
                    employee={selectedEmployee}
                />

                <EditEmployeeDialog
                    open={openEditDialog}
                    onClose={handleCloseEditDialog}
                    employeeData={selectedEmployee}
                    fetchAllEmployees={() => fetchAllEmployees(page, size)}
                />

                <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                    <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>{snackbarMessage}</Alert>
                </Snackbar>
            </Grid>
        </Grid>
    );
}

export default Employee;