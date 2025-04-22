import React, { useState, useEffect } from 'react';
import {
    Grid, Box, Typography, Checkbox, FormControlLabel, Select, MenuItem, Button,
    IconButton, FormControl, InputBase, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper, Collapse, Menu, Dialog, DialogTitle, DialogContent, DialogActions,
    Snackbar, Alert, Pagination, InputAdornment, CircularProgress
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
import PermissionGuard from "../../../components/PermissionGuard.jsx";
import { toast } from 'react-toastify';

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
        { label: 'Mã nhân viên', key: 'user_id' },
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
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>
                    <Checkbox
                        checked={selectedRows.includes(row.id)}
                        onChange={(e) => handleRowSelect(row.id, e)}
                        onClick={(e) => e.stopPropagation()}
                        size="small"
                    />
                </TableCell>
                {selectedColumns.map((column) => {
                    let value = '';
                    switch (column) {
                        case 'Mã nhân viên':
                            value = row.user_id;
                            break;
                        case 'Tên nhân viên':
                            value = row.fullName;
                            break;
                        case 'Số điện thoại':
                            value = row.phone;
                            break;
                        case 'Số CMND/CCCD':
                            value = row.idCard;
                            break;
                        case 'Địa chỉ':
                            value = row.address;
                            break;
                        case 'Chức vụ':
                            value = row.position;
                            break;
                        case 'Ghi chú':
                            value = row.note;
                            break;
                        default:
                            value = '';
                    }
                    return (
                        <TableCell key={column} sx={{ minWidth: '150px', maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {value}
                        </TableCell>
                    );
                })}
                <TableCell align="right">
                    <PermissionGuard permissions="EDIT_EMPLOYEE">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={(event) => {
                                event.stopPropagation();
                                handleOpenEditDialog(row);
                            }}
                            size="small"
                            sx={{ mr: 1 }}
                        >
                            Sửa
                        </Button>
                    </PermissionGuard>
                    </TableCell>
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
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleOpenEditDialog(row);
                                    }}
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
        </React.Fragment>
    );
}

// Component Employee chính
function Employee() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedColumns, setSelectedColumns] = useState([
        'Mã nhân viên', 'Tên nhân viên', 'Số điện thoại',
        'Số CMND/CCCD', 'Địa chỉ', 'Chức vụ'
    ]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    
    // Pagination
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    // Các column hiển thị có thể chọn
    const columnOptions = [
        { label: 'Mã nhân viên', key: 'user_id' },
        { label: 'Tên nhân viên', key: 'fullName' },
        { label: 'Số điện thoại', key: 'phone' },
        { label: 'Số CMND/CCCD', key: 'idCard' },
        { label: 'Địa chỉ', key: 'address' },
        { label: 'Chức vụ', key: 'position' },
        { label: 'Ghi chú', key: 'note' },
        { label: 'Email', key: 'email' },
        { label: 'Ngày sinh', key: 'dob' },
        { label: 'Giới tính', key: 'gender' },
        { label: 'Chi nhánh', key: 'branch' },
        { label: 'Phòng ban', key: 'department' }
    ];

    /**
     * Lấy dữ liệu nhân viên từ API với phân trang
     */
    const fetchEmployees = async (pageNum = page, pageSize = size, searchKeyword = '') => {
        setLoading(true);
        try {
            // Kiểm tra nếu đã có dữ liệu trong localStorage
            const cachedData = sessionStorage.getItem('employeeData');
            const timestamp = sessionStorage.getItem('employeeDataTimestamp');
            const now = new Date().getTime();
            
            // Chỉ sử dụng cache nếu dữ liệu lưu trữ chưa quá 5 phút
            if (cachedData && timestamp && (now - parseInt(timestamp) < 5 * 60 * 1000)) {
                try {
                    const parsedData = JSON.parse(cachedData);
                    setEmployees(parsedData.content || []);
                    setFilteredEmployees(parsedData.content || []);
                    setTotalPages(parsedData.totalPages || 1);
                    setTotalElements(parsedData.totalElements || 0);
                    setLoading(false);
                    console.log('Using cached employee data');
                    return;
                } catch (error) {
                    console.error('Error parsing cached data:', error);
                }
            }
            
            // Fetch mới nếu không có cache hoặc cache đã hết hạn
            const response = await EmployeeService.getAllEmployee(pageNum, pageSize, searchKeyword);
            if (response.data) {
                // Cập nhật state với dữ liệu mới
                const { content, totalPages, totalElements } = response.data;
                setEmployees(content || []);
                setFilteredEmployees(content || []);
                setTotalPages(totalPages || 1);
                setTotalElements(totalElements || 0);
                
                // Lưu vào cache
                sessionStorage.setItem('employeeData', JSON.stringify(response.data));
                sessionStorage.setItem('employeeDataTimestamp', new Date().getTime().toString());
            }
        } catch (error) {
            console.error('Error fetching employees:', error);
            // Hiển thị thông báo lỗi
            setSnackbarMessage('Không thể tải danh sách nhân viên');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
            
            // Fallback to mock data nếu API lỗi
            setEmployees(mockEmployees);
            setFilteredEmployees(mockEmployees);
        } finally {
            setLoading(false);
        }
    };

    // Tải dữ liệu khi component mount hoặc khi thay đổi trang
    useEffect(() => {
        fetchEmployees(page, size, searchTerm);
    }, [page, size]);

    // Xử lý tìm kiếm với debounce
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchEmployees(0, size, searchTerm);  // Reset về trang đầu tiên khi tìm kiếm
        }, 500);
        
        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    const handleColumnToggle = (label) => {
        setSelectedColumns(prev => 
            prev.includes(label)
                ? prev.filter(col => col !== label) 
                : [...prev, label]
        );
    };

    const handleRowSelect = (id) => {
        setSelectedRows(prev => 
            prev.includes(id)
                ? prev.filter(rowId => rowId !== id)
                : [...prev, id]
        );
    };

    const handleSelectAllRows = (event) => {
        if (event.target.checked) {
            setSelectedRows(filteredEmployees.map(emp => emp.id));
        } else {
            setSelectedRows([]);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage - 1); // MUI Pagination is 1-indexed, our API is 0-indexed
    };

    const handleChangeRowsPerPage = (event) => {
        setSize(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOpenAddDialog = () => {
        setSelectedEmployee(null);
        setOpenAddDialog(true);
    };

    const handleOpenEditDialog = (employee) => {
        setSelectedEmployee(employee);
        setOpenEditDialog(true);
    };

    const handleOpenDeleteDialog = () => {
        if (selectedRows.length === 0) {
            setSnackbarMessage('Vui lòng chọn ít nhất một nhân viên để xóa');
            setSnackbarSeverity('warning');
            setOpenSnackbar(true);
            return;
        }
        setOpenDeleteDialog(true);
    };

    const handleDeleteEmployees = async () => {
        try {
            setLoading(true);
            // Xóa nhiều nhân viên cùng lúc
            for (const id of selectedRows) {
                await EmployeeService.deleteEmployee(id);
            }
            
            setSnackbarMessage(`Đã xóa ${selectedRows.length} nhân viên thành công`);
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
            setSelectedRows([]);
            setOpenDeleteDialog(false);
            fetchEmployees(); // Tải lại dữ liệu
        } catch (error) {
            console.error('Error deleting employees:', error);
            setSnackbarMessage('Xóa nhân viên thất bại');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        } finally {
            setLoading(false);
        }
    };

    const handleEmployeeAdded = () => {
        setOpenAddDialog(false);
        fetchEmployees();
        setSnackbarMessage('Thêm nhân viên thành công!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
    };

    const handleEmployeeUpdated = () => {
        setOpenEditDialog(false);
        fetchEmployees();
        setSnackbarMessage('Cập nhật nhân viên thành công!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>Quản lý nhân viên</Typography>

            {/* Thanh công cụ và tìm kiếm */}
            <Grid container spacing={2} sx={{ mb: 3 }} alignItems="center">
                <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                        <PermissionGuard permissions="CREATE_EMPLOYEE">
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<AddIcon />}
                                onClick={handleOpenAddDialog}
                                sx={{ borderRadius: 2 }}
                                disabled={loading}
                            >
                                Thêm nhân viên
                            </Button>
                        </PermissionGuard>

                        <PermissionGuard permissions="DELETE_EMPLOYEE">
                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleOpenDeleteDialog}
                                disabled={selectedRows.length === 0 || loading}
                                sx={{ borderRadius: 2 }}
                            >
                                Xóa ({selectedRows.length})
                            </Button>
                        </PermissionGuard>
                        
                        <FormControl sx={{ minWidth: 120 }}>
                            <Select
                                displayEmpty
                                size="small"
                                value=""
                                disabled={loading}
                                renderValue={() => "Xuất/Nhập"}
                            >
                                <MenuItem value="">
                                    <em>Chọn thao tác</em>
                                </MenuItem>
                                <MenuItem value="export_excel">Xuất Excel</MenuItem>
                                <MenuItem value="import_excel">Nhập Excel</MenuItem>
                            </Select>
                        </FormControl>
                </Box>
            </Grid>

                <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        <IconButton 
                            onClick={() => setAnchorEl(event.currentTarget)}
                            disabled={loading}
                        >
                            <AppRegistrationIcon />
                        </IconButton>
                        
                        <Paper
                            component="form"
                            sx={{ display: 'flex', alignItems: 'center', width: 300, borderRadius: 2 }}
                        >
                        <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Tìm kiếm nhân viên..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                                disabled={loading}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                }
                            />
                            {loading && searchTerm && (
                                <CircularProgress size={20} sx={{ mr: 1 }} />
                            )}
                        </Paper>
                    </Box>
                </Grid>
            </Grid>

            {/* Menu chọn cột hiển thị */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                <Typography variant="subtitle2" sx={{ p: 2 }}>Chọn cột hiển thị</Typography>
                <Box sx={{ px: 2, maxHeight: 300, overflow: 'auto' }}>
                    {columnOptions.map(option => (
                                        <FormControlLabel
                                            key={option.label}
                            control={
                                <Checkbox
                                    checked={selectedColumns.includes(option.label)}
                                    onChange={() => handleColumnToggle(option.label)}
                                    size="small"
                                />
                            }
                            label={option.label}
                                        />
                                    ))}
                                </Box>
            </Menu>

            {/* Bảng hiển thị nhân viên */}
            <Paper sx={{ width: '100%', overflow: 'hidden', mb: 3 }}>
                <TableContainer component={Paper} sx={{ position: 'relative' }}>
                    {loading && (
                        <Box 
                            sx={{ 
                                position: 'absolute', 
                                top: 0, 
                                left: 0, 
                                right: 0, 
                                zIndex: 1, 
                                display: 'flex', 
                                justifyContent: 'center', 
                                p: 1, 
                                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                borderRadius: '4px 4px 0 0'
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <CircularProgress size={20} thickness={5} />
                                <Typography variant="caption">Đang tải dữ liệu...</Typography>
                            </Box>
                    </Box>
                    )}
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        indeterminate={selectedRows.length > 0 && selectedRows.length < filteredEmployees.length}
                                        checked={filteredEmployees.length > 0 && selectedRows.length === filteredEmployees.length}
                                        onChange={handleSelectAllRows}
                                        disabled={loading}
                                    />
                                </TableCell>
                                <TableCell>Chi tiết</TableCell>
                                {selectedColumns.map(column => (
                                    <TableCell key={column} sx={{ fontWeight: 'bold' }}>
                                        {column}
                                    </TableCell>
                                ))}
                                <TableCell align="right">Thao tác</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!loading && filteredEmployees.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={selectedColumns.length + 3} align="center">
                                        <Typography variant="body1" sx={{ my: 3 }}>Không có dữ liệu nhân viên</Typography>
                                        </TableCell>
                                </TableRow>
                            )}
                            
                            {!loading && filteredEmployees.map(employee => (
                                    <Row
                                        key={employee.id}
                                        row={employee}
                                        selectedRows={selectedRows}
                                        handleRowSelect={handleRowSelect}
                                        selectedColumns={selectedColumns}
                                        handleOpenEditDialog={handleOpenEditDialog}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                
                {/* Phân trang */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, py: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="body2">
                            Hiển thị {filteredEmployees.length} / {totalElements} nhân viên
                        </Typography>
                        
                        <FormControl size="small" sx={{ minWidth: 80 }}>
                            <Select
                                value={size}
                                onChange={handleChangeRowsPerPage}
                                disabled={loading}
                            >
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={25}>25</MenuItem>
                                <MenuItem value={50}>50</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    
                    <Pagination 
                        count={totalPages}
                        page={page + 1}
                        onChange={handleChangePage}
                        color="primary"
                        disabled={loading}
                    />
                </Box>
            </Paper>

            {/* Dialog thêm nhân viên */}
            <PermissionGuard permissions="CREATE_EMPLOYEE">
                <AddEmployeeDialog
                    open={openAddDialog}
                    onClose={() => setOpenAddDialog(false)}
                    onAddSuccess={handleEmployeeAdded}
                />
            </PermissionGuard>

            {/* Dialog chỉnh sửa nhân viên */}
            <PermissionGuard permissions="EDIT_EMPLOYEE">
                <EditEmployeeDialog
                    open={openEditDialog}
                    onClose={() => setOpenEditDialog(false)}
                    employee={selectedEmployee}
                    onEditSuccess={handleEmployeeUpdated}
                />
            </PermissionGuard>

            {/* Dialog xác nhận xóa nhân viên */}
            <PermissionGuard permissions="DELETE_EMPLOYEE">
                <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                    <DialogTitle>Xác nhận xóa</DialogTitle>
                    <DialogContent>
                        <Typography>
                            Bạn có chắc chắn muốn xóa {selectedRows.length} nhân viên đã chọn?
                        </Typography>
                        <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                            Lưu ý: Hành động này không thể hoàn tác.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDeleteDialog(false)} disabled={loading}>
                            Hủy
                        </Button>
                        <Button 
                            variant="contained" 
                            color="error" 
                            onClick={handleDeleteEmployees}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Xóa'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </PermissionGuard>

            {/* Thông báo */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={5000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert 
                    onClose={() => setOpenSnackbar(false)} 
                    severity={snackbarSeverity} 
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
                </Snackbar>
        </Box>
    );
}

export default Employee;