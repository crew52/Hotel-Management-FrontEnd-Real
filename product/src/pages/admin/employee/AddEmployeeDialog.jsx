import React, { useState, useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Tabs, Tab,
    Grid, Box, Typography, TextField, FormControl, Select, MenuItem, RadioGroup, FormControlLabel,
    Radio, InputAdornment
} from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

function AddEmployeeDialog({ open, onClose, isEditMode }) {
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    // State to store provinces and districts
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');

    // Fetch provinces when component mounts
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await fetch('https://esgoo.net/api-tinhthanh/1/0.htm');
                const data = await response.json();
                if (data.error === 0) {
                    setProvinces(data.data);
                }
            } catch (error) {
                console.error('Error fetching provinces:', error);
            }
        };

        fetchProvinces();
    }, []);

    // Fetch districts when a province is selected
    useEffect(() => {
        const fetchDistricts = async () => {
            if (selectedProvince) {
                try {
                    const response = await fetch(`https://esgoo.net/api-tinhthanh/2/${selectedProvince}.htm`);
                    const data = await response.json();
                    if (data.error === 0) {
                        setDistricts(data.data);
                    }
                } catch (error) {
                    console.error('Error fetching districts:', error);
                }
            } else {
                setDistricts([]);
                setSelectedDistrict('');
            }
        };

        fetchDistricts();
    }, [selectedProvince]);

    const handleProvinceChange = (event) => {
        setSelectedProvince(event.target.value);
        setSelectedDistrict('');
    };

    // Handle district change
    const handleDistrictChange = (event) => {
        setSelectedDistrict(event.target.value);
    };

    // Handle close dialog (used for both "X" icon and "Bỏ qua" button)
    const handleClose = () => {
        onClose(); // Call the onClose prop to close the dialog
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            disableRestoreFocus={true}
            maxWidth={false}
            fullWidth
            sx={{
                '& .MuiDialog-paper': {
                    width: '80vw',
                    height: '90vh',
                    maxWidth: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '10px',
                },
            }}
        >
            <DialogTitle sx={{
                position: 'sticky',
                top: 0,
                zIndex: 1,
                backgroundColor: 'white',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                height: '70px',
                padding: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: 16, fontWeight: 'bold', color: '#333' }} variant="h6">
                        {isEditMode ? "Chỉnh sửa nhân viên" : "Thêm mới nhân viên"}
                    </Typography>
                    <IconButton
                        aria-label="close"
                        sx={{ color: (theme) => theme.palette.grey[500] }}
                        onClick={handleClose} // Add onClick to close the dialog
                    >
                        <ClearIcon />
                    </IconButton>
                </Box>
                <Tabs value={0} sx={{ fontSize: 12, minHeight: 34 }}>
                    <Tab label="Thông tin" sx={{ textTransform: 'none', minHeight: 34, height: 34, padding: '6px 12px', color: '#1976d2', fontWeight: 'bold' }} />
                    <Tab label="Thiết lập lương" sx={{ textTransform: 'none', minHeight: 34, height: 34, padding: '4px 12px', color: '#555' }} />
                </Tabs>
            </DialogTitle>

            <DialogContent sx={{ flex: 1, overflowY: 'auto', p: 2, mt: 2, backgroundColor: '#f5f5f5' }}>
                <Grid container spacing={2}>
                    <Grid size={2.5} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Box
                            sx={{
                                width: 144,
                                height: 144,
                                border: '1px dashed #ccc',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mb: 2,
                                mt: 3,
                                backgroundColor: '#f5f5f5',
                                borderRadius: '8px',
                            }}
                        >
                            <IconButton>
                                <CameraAltIcon sx={{ color: '#999' }} />
                            </IconButton>
                        </Box>
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                            sx={{ fontSize: 13 }}
                        >
                            Upload files
                            <VisuallyHiddenInput
                                type="file"
                                onChange={(event) => console.log(event.target.files)}
                                multiple
                            />
                        </Button>
                    </Grid>

                    <Grid size={9.2}>
                        <Box sx={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', borderRadius: '10px', p: 2, mb: 2 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2, mt: 1, color: '#333', fontSize: '16px' }}>
                                Thông tin khởi tạo
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid size={6}>
                                    <Grid container spacing={1} alignItems="center">
                                        <Grid size={4}>
                                            <Typography variant="body2" sx={{ mb: 0.5, color: '#555', whiteSpace: 'nowrap', fontSize: '14px', fontWeight: 'bold' }}>
                                                Tên nhân viên
                                            </Typography>
                                        </Grid>
                                        <Grid size={8}>
                                            <TextField
                                                placeholder="Nhập tên nhân viên"
                                                size="small"
                                                variant="outlined"
                                                sx={{
                                                    width: '100%',
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: '8px',
                                                        backgroundColor: '#f5f5f5',
                                                        '& fieldset': { borderColor: '#e0e0e0' },
                                                        '&:hover fieldset': { borderColor: '#1976d2' },
                                                        '&.Mui-focused fieldset': { borderColor: '#1976d2' }
                                                    }
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid size={6}>
                                    <Grid container spacing={1} alignItems="center">
                                        <Grid size={4}>
                                            <Typography variant="body2" sx={{ mb: 0.5, color: '#555', whiteSpace: 'nowrap', fontSize: '14px', fontWeight: 'bold' }}>
                                                Số điện thoại
                                            </Typography>
                                        </Grid>
                                        <Grid size={8}>
                                            <TextField
                                                placeholder="Nhập số điện thoại"
                                                size="small"
                                                variant="outlined"
                                                sx={{
                                                    width: '100%',
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: '8px',
                                                        backgroundColor: '#f5f5f5',
                                                        '& fieldset': { borderColor: '#e0e0e0' },
                                                        '&:hover fieldset': { borderColor: '#1976d2' },
                                                        '&.Mui-focused fieldset': { borderColor: '#1976d2' }
                                                    }
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>

                        <Box sx={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', borderRadius: '10px', p: 2, mb: 2 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2, mt: 1, color: '#333', fontSize: '16px' }}>
                                Thông tin công việc
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid size={6}>
                                    <Grid container spacing={1} alignItems="center">
                                        <Grid size={4}>
                                            <Typography variant="body2" sx={{ mb: 0.5, color: '#555', whiteSpace: 'nowrap', fontSize: '14px', fontWeight: 'bold' }}>
                                                Ngày bắt đầu làm việc
                                            </Typography>
                                        </Grid>
                                        <Grid size={8}>
                                            <TextField
                                                placeholder="Nhập ngày bắt đầu làm việc"
                                                size="small"
                                                variant="outlined"
                                                type="date"
                                                sx={{
                                                    width: '100%',
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: '8px',
                                                        backgroundColor: '#f5f5f5',
                                                        '& fieldset': { borderColor: '#e0e0e0' },
                                                        '&:hover fieldset': { borderColor: '#1976d2' },
                                                        '&.Mui-focused fieldset': { borderColor: '#1976d2' }
                                                    }
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid size={6}>
                                    <Grid container spacing={1} alignItems="center">
                                        <Grid size={4}>
                                            <Typography variant="body2" sx={{ mb: 0.5, color: '#555', whiteSpace: 'nowrap', fontSize: '14px', fontWeight: 'bold' }}>
                                                Phòng ban
                                            </Typography>
                                        </Grid>
                                        <Grid size={8}>
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <FormControl fullWidth size="small">
                                                    <Select
                                                        displayEmpty
                                                        variant="outlined"
                                                        sx={{
                                                            borderRadius: '8px',
                                                            backgroundColor: '#f5f5f5',
                                                            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' },
                                                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#1976d2' },
                                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#1976d2' }
                                                        }}
                                                    >
                                                        <MenuItem value="" disabled>Chọn phòng ban</MenuItem>
                                                        <MenuItem value="Front Desk">Front Desk</MenuItem>
                                                        <MenuItem value="Phòng IT">Phòng IT</MenuItem>
                                                        <MenuItem value="Phòng HR">Phòng HR</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{
                                                        borderRadius: '8px',
                                                        borderColor: '#e0e0e0',
                                                        minWidth: '40px',
                                                        padding: '0 8px'
                                                    }}
                                                >
                                                    +
                                                </Button>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid size={6}>
                                    <Grid container spacing={1} alignItems="center">
                                        <Grid size={4}>
                                            <Typography variant="body2" sx={{ mb: 0.5, color: '#555', whiteSpace: 'nowrap', fontSize: '14px', fontWeight: 'bold' }}>
                                                Chức danh
                                            </Typography>
                                        </Grid>
                                        <Grid size={8}>
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <FormControl fullWidth size="small">
                                                    <Select
                                                        displayEmpty
                                                        variant="outlined"
                                                        sx={{
                                                            borderRadius: '8px',
                                                            backgroundColor: '#f5f5f5',
                                                            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' },
                                                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#1976d2' },
                                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#1976d2' }
                                                        }}
                                                    >
                                                        <MenuItem value="" disabled>Chọn chức danh</MenuItem>
                                                        <MenuItem value="Receptionist">Receptionist</MenuItem>
                                                        <MenuItem value="Trưởng phòng">Trưởng phòng</MenuItem>
                                                        <MenuItem value="Nhân viên">Nhân viên</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{
                                                        borderRadius: '8px',
                                                        borderColor: '#e0e0e0',
                                                        minWidth: '40px',
                                                        padding: '0 8px'
                                                    }}
                                                >
                                                    +
                                                </Button>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid size={6}>
                                    <Grid container spacing={1} alignItems="center">
                                        <Grid size={4}>
                                            <Typography variant="body2" sx={{ mb: 0.5, color: '#555', whiteSpace: 'nowrap', fontSize: '14px', fontWeight: 'bold' }}>
                                                Tài khoản đăng nhập
                                            </Typography>
                                        </Grid>
                                        <Grid size={8}>
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <FormControl fullWidth size="small">
                                                    <Select
                                                        displayEmpty
                                                        variant="outlined"
                                                        sx={{
                                                            borderRadius: '8px',
                                                            backgroundColor: '#f5f5f5',
                                                            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' },
                                                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#1976d2' },
                                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#1976d2' }
                                                        }}
                                                    >
                                                        <MenuItem value="" disabled>Chọn tài khoản</MenuItem>
                                                        <MenuItem value="Account1">Tài khoản 1</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{
                                                        borderRadius: '8px',
                                                        borderColor: '#e0e0e0',
                                                        minWidth: '40px',
                                                        padding: '0 8px'
                                                    }}
                                                >
                                                    +
                                                </Button>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid size={12}>
                                    <Grid container spacing={1} alignItems="flex-start">
                                        <Grid size={2}>
                                            <Typography variant="body2" sx={{ mb: 0.5, color: '#555', whiteSpace: 'nowrap', fontSize: '14px', fontWeight: 'bold' }}>
                                                Ghi chú
                                            </Typography>
                                        </Grid>
                                        <Grid size={10}>
                                            <TextField
                                                multiline
                                                minRows={4}
                                                variant="outlined"
                                                placeholder=""
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <EditIcon fontSize="small" sx={{ color: '#999' }} />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                sx={{
                                                    width: '100%',
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: '8px',
                                                        backgroundColor: '#f5f5f5',
                                                        '& fieldset': { borderColor: '#e0e0e0' },
                                                        '&:hover fieldset': { borderColor: '#1976d2' },
                                                        '&.Mui-focused fieldset': { borderColor: '#1976d2' }
                                                    }
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>

                        <Box sx={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', borderRadius: '10px', p: 2, mb: 2 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2, mt: 1, color: '#333', fontSize: '16px' }}>
                                Thông tin cá nhân
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid size={6}>
                                    <Grid container spacing={1} alignItems="center">
                                        <Grid size={4}>
                                            <Typography variant="body2" sx={{ mb: 0.5, color: '#555', whiteSpace: 'nowrap', fontSize: '14px', fontWeight: 'bold' }}>
                                                Số CMND/CCCD
                                            </Typography>
                                        </Grid>
                                        <Grid size={8}>
                                            <TextField
                                                placeholder="Nhập Số CMND/CCCD"
                                                size="small"
                                                variant="outlined"
                                                sx={{
                                                    width: '100%',
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: '8px',
                                                        backgroundColor: '#f5f5f5',
                                                        '& fieldset': { borderColor: '#e0e0e0' },
                                                        '&:hover fieldset': { borderColor: '#1976d2' },
                                                        '&.Mui-focused fieldset': { borderColor: '#1976d2' }
                                                    }
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid size={6}>
                                    <Grid container spacing={1} alignItems="center">
                                        <Grid size={4}>
                                            <Typography variant="body2" sx={{ mb: 0.5, color: '#555', whiteSpace: 'nowrap', fontSize: '14px', fontWeight: 'bold' }}>
                                                Ngày sinh
                                            </Typography>
                                        </Grid>
                                        <Grid size={8}>
                                            <TextField
                                                placeholder="Nhập ngày sinh"
                                                size="small"
                                                variant="outlined"
                                                type="date"
                                                sx={{
                                                    width: '100%',
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: '8px',
                                                        backgroundColor: '#f5f5f5',
                                                        '& fieldset': { borderColor: '#e0e0e0' },
                                                        '&:hover fieldset': { borderColor: '#1976d2' },
                                                        '&.Mui-focused fieldset': { borderColor: '#1976d2' }
                                                    }
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={1} alignItems="center">
                                    <Grid item xs={2}>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                mb: 0.5,
                                                color: '#555',
                                                whiteSpace: 'nowrap',
                                                fontSize: '14px',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            Giới tính
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={10} sx={{ml:15}}>
                                        <FormControl>
                                            <RadioGroup row sx={{ columnGap: 4 }}>
                                                <FormControlLabel value="MALE" control={<Radio size="small" />} label="Nam" />
                                                <FormControlLabel value="FEMALE" control={<Radio size="small" />} label="Nữ" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>

                        <Box sx={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', borderRadius: '10px', p: 2, mb: 2 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2, mt: 1, color: '#333', fontSize: '16px' }}>
                                Thông tin liên hệ
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid size={6}>
                                    <Grid container spacing={1} alignItems="center">
                                        <Grid size={4}>
                                            <Typography variant="body2" sx={{ mb: 0.5, color: '#555', whiteSpace: 'nowrap', fontSize: '14px', fontWeight: 'bold' }}>
                                                Địa chỉ
                                            </Typography>
                                        </Grid>
                                        <Grid size={8}>
                                            <TextField
                                                placeholder=""
                                                size="small"
                                                variant="outlined"
                                                sx={{
                                                    width: '100%',
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: '8px',
                                                        backgroundColor: '#f5f5f5',
                                                        '& fieldset': { borderColor: '#e0e0e0' },
                                                        '&:hover fieldset': { borderColor: '#1976d2' },
                                                        '&.Mui-focused fieldset': { borderColor: '#1976d2' }
                                                    }
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid size={6}>
                                    <Grid container spacing={1} alignItems="center">
                                        <Grid size={4}>
                                            <Typography variant="body2" sx={{ mb: 0.5, color: '#555', whiteSpace: 'nowrap', fontSize: '14px', fontWeight: 'bold' }}>
                                                Khu vực
                                            </Typography>
                                        </Grid>
                                        <Grid size={8}>
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <FormControl fullWidth size="small">
                                                    <Select
                                                        displayEmpty
                                                        variant="outlined"
                                                        value={selectedProvince}
                                                        onChange={handleProvinceChange}
                                                        sx={{
                                                            borderRadius: '8px',
                                                            backgroundColor: '#f5f5f5',
                                                            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' },
                                                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#1976d2' },
                                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#1976d2' }
                                                        }}
                                                    >
                                                        <MenuItem value="" disabled>Chọn Tỉnh/TP</MenuItem>
                                                        {provinces.map((province) => (
                                                            <MenuItem key={province.id} value={province.id}>
                                                                {province.full_name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                                <FormControl fullWidth size="small">
                                                    <Select
                                                        displayEmpty
                                                        variant="outlined"
                                                        value={selectedDistrict}
                                                        onChange={handleDistrictChange}
                                                        disabled={!selectedProvince}
                                                        sx={{
                                                            borderRadius: '8px',
                                                            backgroundColor: '#f5f5f5',
                                                            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' },
                                                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#1976d2' },
                                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#1976d2' }
                                                        }}
                                                    >
                                                        <MenuItem value="" disabled>Chọn Quận/Huyện</MenuItem>
                                                        {districts.map((district) => (
                                                            <MenuItem key={district.id} value={district.id}>
                                                                {district.full_name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid size={6}>
                                    <Grid container spacing={1} alignItems="center">
                                        <Grid size={4}>
                                            <Typography variant="body2" sx={{ mb: 0.5, color: '#555', whiteSpace: 'nowrap', fontSize: '14px', fontWeight: 'bold' }}>
                                                Email
                                            </Typography>
                                        </Grid>
                                        <Grid size={8}>
                                            <TextField
                                                placeholder=""
                                                size="small"
                                                variant="outlined"
                                                sx={{
                                                    width: '100%',
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: '8px',
                                                        backgroundColor: '#f5f5f5',
                                                        '& fieldset': { borderColor: '#e0e0e0' },
                                                        '&:hover fieldset': { borderColor: '#1976d2' },
                                                        '&.Mui-focused fieldset': { borderColor: '#1976d2' }
                                                    }
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid size={6}>
                                    <Grid container spacing={1} alignItems="center">
                                        <Grid size={4}>
                                            <Typography variant="body2" sx={{ mb: 0.5, color: '#555', whiteSpace: 'nowrap', fontSize: '14px', fontWeight: 'bold' }}>
                                                Phương thức
                                            </Typography>
                                        </Grid>
                                        <Grid size={8}>
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <FormControl fullWidth size="small">
                                                    <Select
                                                        displayEmpty
                                                        variant="outlined"
                                                        sx={{
                                                            borderRadius: '8px',
                                                            backgroundColor: '#f5f5f5',
                                                            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' },
                                                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#1976d2' },
                                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#1976d2' }
                                                        }}
                                                    >
                                                        <MenuItem value="" disabled>Chọn Phương thức</MenuItem>
                                                        <MenuItem value="Facebook">Facebook</MenuItem>
                                                        <MenuItem value="Zalo">Zalo</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions sx={{ position: 'sticky', bottom: 0, left: 0, backgroundColor: 'white', boxShadow: '0 -1px 3px rgba(0, 0, 0, 0.1)', zIndex: 1, p: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ textTransform: 'none', mr: 1, borderRadius: '8px' }}
                >
                    {isEditMode ? "Cập nhật" : "Lưu"}
                </Button>
                <Button
                    variant="outlined"
                    size="small"
                    sx={{ textTransform: 'none', borderColor: '#e0e0e0', color: '#555', borderRadius: '8px' }}
                    onClick={handleClose}
                >
                    Bỏ qua
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddEmployeeDialog;