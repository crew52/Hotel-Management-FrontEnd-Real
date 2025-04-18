import React, { useState } from 'react';
import {
    Grid, Box, Typography, Checkbox, FormControlLabel, Select, MenuItem, Button,
    IconButton, FormControl, InputBase, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper, Collapse, Menu
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DownloadIcon from '@mui/icons-material/Download';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SearchIcon from '@mui/icons-material/Search';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// Hàm tạo dữ liệu nhân viên tĩnh
function createEmployeeData(id, fullName, phone, idCard, address, position, note) {
    return {
        id,
        fullName,
        phone,
        idCard,
        address,
        position,
        note,
        details: [
            { label: 'Ghi chú', value: note || 'Không có ghi chú' },
            { label: 'Ngày cập nhật', value: '2023-10-15' },
            { label: 'Trạng thái', value: 'Đang làm việc' },
        ],
    };
}

// Dữ liệu nhân viên mẫu
const employees = [
    createEmployeeData(1, 'Nguyễn Văn A', '0123456789', '123456789', 'Hà Nội', 'Nhân viên', 'Nhân viên xuất sắc'),
    createEmployeeData(2, 'Trần Thị B', '0987654321', '987654321', 'TP.HCM', 'Trưởng phòng', 'Cần cải thiện kỹ năng lãnh đạo'),
];

// Component Row để hiển thị từng dòng nhân viên với checkbox và khả năng mở rộng
function Row(props) {
    const { row, selectedRows, handleRowSelect } = props;
    const [open, setOpen] = useState(false);

    return (
        <React.Fragment>
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
                <TableCell align="left" sx={{ fontSize: 13 }}>{row.id}</TableCell>
                <TableCell align="left" sx={{ fontSize: 13 }}>{row.fullName}</TableCell>
                <TableCell align="left" sx={{ fontSize: 13 }}>{row.phone}</TableCell>
                <TableCell align="left" sx={{ fontSize: 13 }}>{row.idCard}</TableCell>
                <TableCell align="left" sx={{ fontSize: 13 }}>{row.address}</TableCell>
                <TableCell align="left" sx={{ fontSize: 13 }}>{row.position}</TableCell>
                <TableCell align="left" sx={{ fontSize: 13 }}>{row.note || '-'}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="subtitle1" gutterBottom component="div" sx={{ fontWeight: 'bold', fontSize: 13 }}>
                                Thông tin chi tiết
                            </Typography>
                            <Table size="small" aria-label="employee details">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold', fontSize: 13 }}>Thông tin</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', fontSize: 13 }}>Giá trị</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.details.map((detail, index) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row" sx={{ fontSize: 13 }}>
                                                {detail.label}
                                            </TableCell>
                                            <TableCell sx={{ fontSize: 13 }}>{detail.value}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

function Employee() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedColumns, setSelectedColumns] = useState([
        'Mã nhân viên', 'Tên nhân viên', 'Số điện thoại',
        'Số CMND/CCCD', 'Địa chỉ', 'Chức vụ', 'Ghi chú'
    ]);
    const [selectedRows, setSelectedRows] = useState([]);

    const columnOptions = [
        { label: 'Mã nhân viên', key: 'id' },
        { label: 'Tên nhân viên', key: 'fullName' },
        { label: 'Số điện thoại', key: 'phone' },
        { label: 'Số CMND/CCCD', key: 'idCard' },
        { label: 'Địa chỉ', key: 'address' },
        { label: 'Chức vụ', key: 'position' },
        { label: 'Ghi chú', key: 'note' },
        { label: 'Mã chấm công', key: 'user_id' },
        { label: 'Ngày và tạm ứng', key: 'start_date' },
        { label: 'Thiết bị di động', key: 'device' },
        { label: 'Ngày sinh', key: 'dob' },
        { label: 'Giới tính', key: 'gender' },
        { label: 'Email', key: 'email' },
        { label: 'Facebook', key: 'facebook' },
        { label: 'Chi nhánh trực thuộc', key: 'branch' },
        { label: 'Chi nhánh làm việc', key: 'work_branch' },
        { label: 'Phòng ban', key: 'department' },
        { label: 'Ngày bắt đầu làm việc', key: 'start_date' },
        { label: 'Tài khoản đăng nhập', key: 'login_account' },
    ];

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

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

    return (
        <Grid container spacing={0.5}>
            <Grid size={{ xs: 4, md: 2.4 }}>
                <Box sx={{ mt: 2 }}>
                    <Typography variant="h6" sx={{ ml: 2, mb: 0.5, fontWeight: 'bold' }}>
                        Danh sách nhân viên
                    </Typography>
                    <Typography color="textSecondary" sx={{ fontSize: 13, ml: 2, mb: 1 }}>
                        Đã sử dụng nhân viên
                    </Typography>
                </Box>

                <Box sx={{ marginLeft: 1, p: 1, border: '1px solid #e0e0e0', borderRadius: 2, mb: 3, boxShadow: 1 }}>
                    <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold', fontSize: 13 }}>
                        Trạng thái nhân viên
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', fontSize: 13 }}>
                        <FormControlLabel
                            control={<Checkbox defaultChecked size="small" />}
                            label={<Typography sx={{ fontSize: 13 }}>Đang làm việc</Typography>}
                        />
                        <FormControlLabel
                            control={<Checkbox size="small" />}
                            label={<Typography sx={{ fontSize: 13 }}>Đã nghỉ</Typography>}
                        />
                    </Box>
                </Box>

                <Box sx={{ marginLeft: 1, p: 1, border: '1px solid #e0e0e0', borderRadius: 2, mb: 3, boxShadow: 1, backgroundColor: '#ffffff' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold', fontSize: 13 }}>
                            Phòng ban
                        </Typography>
                        <Box>
                            <IconButton size="small" sx={{ mr: 0.5 }}>
                                <AddIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small">
                                <ExpandLessIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    </Box>
                    <FormControl fullWidth size="small">
                        <Select
                            displayEmpty
                            defaultValue=""
                            sx={{
                                borderRadius: 1,
                                height: 32,
                                ml: 1,
                                mr: 1,
                                mb: 2,
                                backgroundColor: '#ffffff',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#ffffff',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#388e3c',
                                    boxShadow: '0 0 0 2px rgba(56, 142, 60, 0.2)',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#388e3c',
                                    boxShadow: '0 0 0 2px rgba(56, 142, 60, 0.3)',
                                },
                            }}
                        >
                            <MenuItem value="" disabled>Chọn phòng ban</MenuItem>
                            <MenuItem value="Phòng PV">Phòng PV</MenuItem>
                            <MenuItem value="Phòng AI">Phòng AI</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{ marginLeft: 1, p: 1, border: '1px solid #e0e0e0', borderRadius: 2, mb: 3, boxShadow: 1, backgroundColor: '#ffffff' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="subtitle2" sx={{ mt: 1, ml: 1, mb: 1, fontWeight: 'bold', fontSize: 13 }}>
                            Chức danh
                        </Typography>
                        <Box>
                            <IconButton size="small" sx={{ mr: 0.5 }}>
                                <AddIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small">
                                <ExpandLessIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    </Box>
                    <FormControl fullWidth size="small">
                        <Select
                            displayEmpty
                            defaultValue=""
                            sx={{
                                borderRadius: 1,
                                height: 32,
                                ml: 1,
                                mr: 1,
                                mb: 2,
                                backgroundColor: '#ffffff',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#ffffff',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#388e3c',
                                    boxShadow: '0 0 0 2px rgba(56, 142, 60, 0.2)',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#388e3c',
                                    boxShadow: '0 0 0 2px rgba(56, 142, 60, 0.3)',
                                },
                            }}
                        >
                            <MenuItem value="" disabled>Chọn chức danh</MenuItem>
                            <MenuItem value="Trưởng phòng">Trưởng phòng</MenuItem>
                            <MenuItem value="Nhân viên">Nhân viên</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{ ml: 1, p: 1.5, border: '1px solid #e0e0e0', borderRadius: 2, boxShadow: 1, backgroundColor: '#ffffff', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="subtitle2" sx={{ mb: 3, fontWeight: 'bold', fontSize: 13, height: 40 }}>
                            Số bản ghi:
                        </Typography>
                        <FormControl size="small" sx={{ width: 80, height: 24 }}>
                            <Select value={10} sx={{ borderRadius: 1, height: 28 }}>
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
                        <InputBase
                            placeholder="Tìm theo mã chấm công, tên nhân viên"
                            sx={{ fontSize: 14, flex: 1 }}
                            inputProps={{ 'aria-label': 'search employee' }}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon sx={{ fontSize: '16px' }} />}
                            size="small"
                            sx={{
                                backgroundColor: '#00b63e',
                                textTransform: 'none',
                                borderRadius: '8px',
                                padding: '6px 10px',
                                fontSize: '12px',
                                '& .MuiButton-startIcon': { marginRight: '4px' },
                            }}
                        >
                            Nhân viên
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<UploadFileIcon sx={{ fontSize: '16px' }} />}
                            size="small"
                            sx={{
                                backgroundColor: '#00b63e',
                                textTransform: 'none',
                                borderRadius: '8px',
                                padding: '4px 8px',
                                fontSize: '12px',
                                '& .MuiButton-startIcon': { marginRight: '4px' },
                            }}
                        >
                            Nhập file
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<DownloadIcon sx={{ fontSize: '16px' }} />}
                            size="small"
                            sx={{
                                backgroundColor: '#00b63e',
                                textTransform: 'none',
                                borderRadius: '8px',
                                padding: '4px 8px',
                                fontSize: '12px',
                                '& .MuiButton-startIcon': { marginRight: '4px' },
                            }}
                        >
                            Xuất file
                        </Button>
                        <IconButton sx={{ padding: '2px' }} onClick={handleMenuClick}>
                            <AppRegistrationIcon sx={{ fontSize: '26px' }} />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            PaperProps={{
                                style: { maxHeight: 400, width: 350 },
                            }}
                            disableAutoFocusItem={true}
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1 }}>
                                <Box>
                                    {columnOptions.slice(0, 10).map((option) => (
                                        <FormControlLabel
                                            key={option.label}
                                            control={
                                                <Checkbox
                                                    checked={selectedColumns.includes(option.label)}
                                                    onChange={() => handleColumnToggle(option.label)}
                                                    size="small"
                                                    sx={{ p: 0.8 }}
                                                />
                                            }
                                            label={
                                                <Typography variant="body2" sx={{ fontSize: '12px' }}>
                                                    {option.label}
                                                </Typography>
                                            }
                                            sx={{
                                                '& .MuiFormControlLabel-label': { fontSize: '12px' },
                                                ml: 1,
                                            }}
                                        />
                                    ))}
                                </Box>
                                <Box>
                                    {columnOptions.slice(10).map((option) => (
                                        <FormControlLabel
                                            key={option.label}
                                            control={
                                                <Checkbox
                                                    checked={selectedColumns.includes(option.label)}
                                                    onChange={() => handleColumnToggle(option.label)}
                                                    size="small"
                                                    sx={{ p: 0.8 }}
                                                />
                                            }
                                            label={
                                                <Typography variant="body2" sx={{ fontSize: '12px' }}>
                                                    {option.label}
                                                </Typography>
                                            }
                                            sx={{
                                                '& .MuiFormControlLabel-label': { fontSize: '12px' },
                                                ml: 1,
                                            }}
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
                                        <TableCell key={col} sx={{ fontWeight: 'bold', fontSize: 13, padding: '8px 16px', textAlign: 'left' }}>
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
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Grid>
        </Grid>
    );
}

export default Employee;