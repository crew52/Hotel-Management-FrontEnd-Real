import React, { useState, useEffect } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Chip,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    InputAdornment,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventIcon from '@mui/icons-material/Event';
import DeleteIcon from '@mui/icons-material/Delete';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchBar from './SearchBar';
import ViewModeButtons from './ViewModeButtons';
import ActionButtons from './ActionButtons';
import { StatusBar } from './StatusBar';
import RoomViewService from '../../../service/admin/room.service.js';

// Dữ liệu ảo (giữ nguyên)
const mockRooms = [
    {
        id: 1,
        status: 'AVAILABLE',
        isClean: true,
        roomCategory: {
            code: 'VIP01',
            name: 'Phòng VIP 1',
            description: 'Phòng sang trọng, view đẹp',
            hourlyPrice: 200000,
            dailyPrice: 1000000,
            overnightPrice: 800000,
        },
        startDate: [2025, 4, 21],
        checkInDuration: 2,
    },
    {
        id: 2,
        status: 'IN_USE',
        isClean: false,
        roomCategory: {
            code: 'STD01',
            name: 'Phòng Tiêu Chuẩn 1',
            description: 'Phòng tiêu chuẩn, đầy đủ tiện nghi',
            hourlyPrice: 150000,
            dailyPrice: 600000,
            overnightPrice: 500000,
        },
        startDate: [2025, 4, 20],
        checkInDuration: 1,
    },
    {
        id: 3,
        status: 'CHECKOUT_SOON',
        isClean: false,
        roomCategory: {
            code: 'VIP02',
            name: 'Phòng VIP 2',
            description: 'Phòng VIP, có bồn tắm',
            hourlyPrice: 250000,
            dailyPrice: 1200000,
            overnightPrice: 900000,
        },
        startDate: [2025, 4, 19],
        checkInDuration: 2,
    },
    {
        id: 4,
        status: 'UPCOMING',
        isClean: true,
        roomCategory: {
            code: 'STD02',
            name: 'Phòng Tiêu Chuẩn 2',
            description: 'Phòng tiêu chuẩn, giá rẻ',
            hourlyPrice: 120000,
            dailyPrice: 500000,
            overnightPrice: 400000,
        },
        startDate: [2025, 4, 22],
        checkInDuration: 3,
    },
    {
        id: 5,
        status: 'MAINTENANCE',
        isClean: false,
        roomCategory: {
            code: 'ECO01',
            name: 'Phòng Kinh Tế 1',
            description: 'Phòng giá rẻ, đang bảo trì',
            hourlyPrice: 100000,
            dailyPrice: 400000,
            overnightPrice: 300000,
        },
    },
    {
        id: 6,
        status: 'OVERDUE',
        isClean: false,
        roomCategory: {
            code: 'VIP03',
            name: 'Phòng VIP 3',
            description: 'Phòng VIP, quá hạn trả',
            hourlyPrice: 300000,
            dailyPrice: 1500000,
            overnightPrice: 1100000,
        },
        startDate: [2025, 4, 18],
        checkInDuration: 1,
    },
];

export default function SchematicView({ onBookingOpen, onFilterOpen, onViewModeChange }) {
    const [anchorElSearch, setAnchorElSearch] = useState(null);
    const [anchorElPriceTable, setAnchorElPriceTable] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [rooms, setRooms] = useState([]);
    const [allRooms, setAllRooms] = useState([]);
    const [activeFilter, setActiveFilter] = useState('ALL');
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);

    // State cho dialog
    const [customerInfo, setCustomerInfo] = useState('');
    const [roomType, setRoomType] = useState('');
    const [roomNumber, setRoomNumber] = useState('203');
    const [checkInTime, setCheckInTime] = useState('21 Thg 04, 11:05');
    const [checkOutTime, setCheckOutTime] = useState('21 Thg 04, 12:05');
    const [duration, setDuration] = useState('1 giờ');
    const [roomPrice, setRoomPrice] = useState(180000);
    const [additionalServices, setAdditionalServices] = useState(180000);
    const [customerPayment, setCustomerPayment] = useState(0);
    const [note, setNote] = useState('');

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const res = await RoomViewService.getAllRoomView();
                const roomData = res.data.content || [];
                if (roomData.length > 0) {
                    setRooms(roomData);
                    setAllRooms(roomData);
                } else {
                    setRooms(mockRooms);
                    setAllRooms(mockRooms);
                }
            } catch (err) {
                console.error('Không thể tải danh sách phòng từ API, sử dụng dữ liệu ảo:', err);
                setRooms(mockRooms);
                setAllRooms(mockRooms);
            }
        };
        fetchRooms();
    }, []);

    const handleSearchClick = (event) => {
        setAnchorElSearch(event.currentTarget);
    };

    const handleSearchClose = () => {
        setAnchorElSearch(null);
    };

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handlePriceTableClick = (event) => {
        setAnchorElPriceTable(event.currentTarget);
    };

    const handlePriceTableClose = () => {
        setAnchorElPriceTable(null);
    };

    const getStatusLabelAndColor = (status, isClean) => {
        if (status === 'CHECKOUT_SOON') {
            return { label: 'Chưa dọn', textColor: '#FF6F61', backgroundColor: '#FFEBEE' };
        }
        return {
            label: isClean ? 'Đã dọn' : 'Chưa dọn',
            textColor: isClean ? '#66BB6A' : '#FF6F61',
            backgroundColor: isClean ? '#E8F5E9' : '#FFEBEE',
        };
    };

    const getRoomStatusCounts = () => {
        const counts = {
            soonCheckIn: 0,
            inUse: 0,
            soonCheckOut: 0,
            overdue: 0,
            available: 0,
            maintenance: 0,
        };

        allRooms.forEach((room) => {
            switch (room.status) {
                case 'AVAILABLE':
                    counts.available += 1;
                    break;
                case 'UPCOMING':
                    counts.soonCheckIn += 1;
                    break;
                case 'IN_USE':
                    counts.inUse += 1;
                    break;
                case 'CHECKOUT_SOON':
                    counts.soonCheckOut += 1;
                    break;
                case 'MAINTENANCE':
                    counts.maintenance += 1;
                    break;
                case 'OVERDUE':
                    counts.overdue += 1;
                    break;
                default:
                    break;
            }
        });

        return counts;
    };

    const getRoomBackgroundColor = (status) => {
        switch (status) {
            case 'IN_USE':
                return '#279656';
            case 'CHECKOUT_SOON':
                return '#FFFFFF';
            case 'AVAILABLE':
                return '#FFFFFF';
            default:
                return '#FFFFFF';
        }
    };

    const handleStatusFilter = (status) => {
        try {
            setActiveFilter(status);
            if (status === 'ALL') {
                setRooms(allRooms);
            } else {
                const filteredRooms = allRooms.filter((room) => room.status === status);
                setRooms(filteredRooms);
            }
        } catch (error) {
            console.error('Lỗi khi lọc phòng từ API, sử dụng dữ liệu ảo:', error);
            setActiveFilter(status);
            if (status === 'ALL') {
                setRooms(allRooms);
            } else {
                const filteredRooms = allRooms.filter((room) => room.status === status);
                setRooms(filteredRooms);
            }
        }
    };

    const handleCardClick = (room) => {
        setSelectedRoom(room);
        setOpenDialog(true);
        setRoomType(room.roomCategory?.name || 'Không có loại phòng');
        setRoomNumber(room.roomCategory?.code || '203');
        setRoomPrice(room.roomCategory?.hourlyPrice || 180000);
        setAdditionalServices(room.roomCategory?.hourlyPrice || 180000);
        if (room.startDate) {
            setCheckInTime(`${room.startDate[2]} Thg ${room.startDate[1]}, 11:05`);
            setCheckOutTime(`${room.startDate[2]} Thg ${room.startDate[1]}, 12:05`);
        }
        if (room.checkInDuration) {
            setDuration(`${room.checkInDuration} giờ`);
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedRoom(null);
        setCustomerInfo('');
        setRoomType('');
        setRoomNumber('');
        setCheckInTime('21 Thg 04, 11:05');
        setCheckOutTime('21 Thg 04, 12:05');
        setDuration('1 giờ');
        setRoomPrice(180000);
        setAdditionalServices(180000);
        setCustomerPayment(0);
        setNote('');
    };

    const handleDeleteRoom = () => {
        alert('Chức năng xóa phòng đang phát triển');
    };

    const statusCounts = getRoomStatusCounts();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    p: 0.9,
                    backgroundColor: '#f5f5f5',
                    borderRadius: 2,
                }}
            >
                <ViewModeButtons viewMode="Sơ đồ" onViewModeChange={onViewModeChange} />
                <SearchBar
                    searchValue={searchValue}
                    onSearchChange={handleSearchChange}
                    anchorEl={anchorElSearch}
                    onSearchClick={handleSearchClick}
                    onSearchClose={handleSearchClose}
                />
                <ActionButtons
                    onFilterOpen={onFilterOpen}
                    anchorElPriceTable={anchorElPriceTable}
                    onPriceTableClick={handlePriceTableClick}
                    onPriceTableClose={handlePriceTableClose}
                    onBookingOpen={onBookingOpen}
                />
            </Box>

            <Box
                sx={{
                    mt: 1,
                    p: 2,
                    backgroundColor: '#f0f1f3',
                    borderRadius: 2,
                    height: 600,
                    overflowY: 'auto',
                }}
            >
                <StatusBar
                    statusCounts={statusCounts}
                    variant="schematic"
                    onStatusFilter={handleStatusFilter}
                    totalRooms={allRooms.length}
                    activeFilter={activeFilter}
                />
                {rooms.length > 0 ? (
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 2, mt: 2 }}>
                        {rooms.map((room) => {
                            const statusInfo = getStatusLabelAndColor(room.status, room.isClean);
                            const backgroundColor = getRoomBackgroundColor(room.status);
                            const roomCategory = room.roomCategory || {};
                            return (
                                <Card
                                    key={room.id}
                                    sx={{
                                        borderRadius: 4,
                                        position: 'relative',
                                        backgroundColor: backgroundColor,
                                        color: backgroundColor === '#FFFFFF' ? 'inherit' : '#FFFFFF',
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                        border: '1px solid #e0e0e0',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => handleCardClick(room)}
                                >
                                    <CardContent sx={{ p: 1.5 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                            <Chip
                                                label={statusInfo.label}
                                                size="small"
                                                sx={{
                                                    backgroundColor: statusInfo.backgroundColor,
                                                    color: statusInfo.textColor,
                                                    fontWeight: 'bold',
                                                    fontSize: '0.75rem',
                                                }}
                                            />
                                            <IconButton size="small" sx={{ color: backgroundColor === '#FFFFFF' ? 'inherit' : '#FFFFFF' }}>
                                                <MoreVertIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                        <Box sx={{ mb: 1 }}>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    textAlign: 'left',
                                                    color: backgroundColor === '#FFFFFF' ? 'inherit' : '#FFFFFF',
                                                    fontWeight: 'bold',
                                                    fontSize: '1.1rem',
                                                }}
                                            >
                                                {roomCategory.code || 'N/A'}
                                            </Typography>
                                        </Box>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                mb: 1,
                                                color: backgroundColor === '#FFFFFF' ? '#757575' : '#FFFFFF',
                                                fontSize: '0.85rem',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                            }}
                                        >
                                            {roomCategory.name || 'Không có loại phòng'}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                mb: 2,
                                                color: backgroundColor === '#FFFFFF' ? '#757575' : '#FFFFFF',
                                                fontSize: '0.75rem',
                                                fontStyle: 'italic',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                            }}
                                        >
                                            {roomCategory.description || 'Không có mô tả'}
                                        </Typography>
                                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                <AccessTimeIcon fontSize="small" sx={{ color: backgroundColor === '#FFFFFF' ? 'inherit' : '#FFFFFF' }} />
                                                <Typography
                                                    variant="body2"
                                                    sx={{ color: backgroundColor === '#FFFFFF' ? 'inherit' : '#FFFFFF', fontSize: '0.85rem' }}
                                                >
                                                    {roomCategory.hourlyPrice?.toLocaleString('vi-VN', { style: 'decimal' }) || '0'}đ
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                <WbSunnyIcon fontSize="small" sx={{ color: backgroundColor === '#FFFFFF' ? 'inherit' : '#FFFFFF' }} />
                                                <Typography
                                                    variant="body2"
                                                    sx={{ color: backgroundColor === '#FFFFFF' ? 'inherit' : '#FFFFFF', fontSize: '0.85rem' }}
                                                >
                                                    {roomCategory.dailyPrice?.toLocaleString('vi-VN', { style: 'decimal' }) || '0'}đ
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                <Brightness2Icon fontSize="small" sx={{ color: backgroundColor === '#FFFFFF' ? 'inherit' : '#FFFFFF' }} />
                                                <Typography
                                                    variant="body2"
                                                    sx={{ color: backgroundColor === '#FFFFFF' ? 'inherit' : '#FFFFFF', fontSize: '0.85rem' }}
                                                >
                                                    {roomCategory.overnightPrice?.toLocaleString('vi-VN', { style: 'decimal' }) || '0'}đ
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </Box>
                ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'calc(100% - 40px)', mt: 2 }}>
                        <Typography variant="body1">Không có dữ liệu phòng để hiển thị.</Typography>
                    </Box>
                )}
            </Box>

            {/* Dialog được chia thành 4 dòng */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="lg" fullWidth>
                <DialogTitle sx={{
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    pb: 1,
                    borderBottom: '1px solid #e0e0e0'
                }}>
                    Đặt/Nhận phòng nhanh
                </DialogTitle>
                <DialogContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' , width:600,mt:2}}>
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexGrow: 1  }}>
                                <TextField
                                    fullWidth
                                    placeholder="Nhập mã, Tên, SĐT khách hàng"
                                    variant="outlined"
                                    value={customerInfo}
                                    onChange={(e) => setCustomerInfo(e.target.value)}
                                    size="small"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            backgroundColor: '#f5f5f5',
                                            '& fieldset': {
                                                borderColor: '#e0e0e0',
                                            },
                                            fontSize:13,
                                            height:32
                                        },
                                        '& .MuiInputBase-input': { fontSize: '0.875rem' }
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon fontSize="small" />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <PersonIcon fontSize="small" />
                                    <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>1</Typography>

                                </Box>
                            </Box>

                        </Box>


                        <Box sx={{
                            p: 1,
                            backgroundColor: '#f5f5f5',
                            borderRadius: 1,
                        }}>
                            <Grid container spacing={10}>
                                <Grid item xs={1.33}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography
                                            sx={{
                                                fontSize: '0.75rem',
                                                color: 'inherit',
                                            }}
                                        >
                                            Hạng phòng
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={1.33}>
                                    <Box sx={{ textAlign: 'center' ,ml:8 }}>
                                        <Typography
                                            sx={{
                                                fontSize: '0.75rem',
                                                color: '#4CAF50', // Làm nổi bật "Phòng 1"
                                            }}
                                        >
                                            Phòng 1
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={1.33}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography
                                            sx={{
                                                fontSize: '0.75rem',
                                                color: 'inherit',
                                            }}
                                        >
                                            Hình thức
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={1.33}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography
                                            sx={{
                                                fontSize: '0.75rem',
                                                color: 'inherit',
                                            }}
                                        >
                                            Nhận
                                        </Typography>
                                    </Box>
                                </Grid>

                                <Grid item xs={1.33}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography
                                            sx={{
                                                fontSize: '0.75rem',
                                                color: 'inherit',
                                            }}
                                        >
                                            Trả phòng
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={1.33}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography
                                            sx={{
                                                fontSize: '0.75rem',
                                                color: 'inherit',
                                            }}
                                        >
                                            Dự kiện
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={1.33}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography
                                            sx={{
                                                fontSize: '0.75rem',
                                                color: 'inherit',
                                            }}
                                        >
                                            Thanh tiền
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>

                        {/* Dòng 3: Thông tin đặt phòng - Sắp xếp như bảng */}
                        <Box sx={{
                            p: 1.5,
                            backgroundColor: '#fff',
                            borderRadius: 1,
                        }}>
                            <Grid container spacing={1} alignItems="center">
                                <Grid item xs={12} container spacing={1} sx={{ mb: 1 }}>
                                    <Typography sx={{
                                        height:24,
                                        width:160 ,
                                        fontSize:13 ,
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',}}>
                                        Hạng phòng con heo con ...
                                    </Typography>
                                    <Grid item xs={1.33}></Grid>

                                    <Grid item xs={1.33}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel sx={{ fontSize: '0.875rem' }}>Phòng</InputLabel>
                                            <Select
                                                value={roomNumber}
                                                label="Phòng"
                                                sx={{ fontSize:13,
                                                    height:32 ,}}
                                            >
                                                <MenuItem value={roomNumber} sx={{ fontSize:13,
                                                    height:32  }}>
                                                    Phòng 01
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>


                                    <Grid item xs={1.33}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel sx={{  fontSize:13 }}>Hình thức</InputLabel>
                                            <Select
                                                value="Giờ"
                                                label="Hình thức"
                                                sx={{ fontSize:13,
                                                    height:32  }}
                                            >
                                                <MenuItem value="Giờ"
                                                          sx={{
                                                              fontSize:13,
                                                               height:32 }}>
                                                    Giờ</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>


                                    <TextField
                                        value={checkInTime}
                                        variant="outlined"
                                        sx={{
                                            height: '32px',
                                            '& .MuiInputBase-root': {
                                                height: '32px',
                                                fontSize: 13,
                                                display: 'flex',
                                                alignItems: 'center',
                                            },
                                            '& .MuiInputBase-input': {
                                                height: '36px',
                                                padding: '0 8px',
                                                lineHeight: '36px',
                                            },
                                        }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <EventIcon fontSize="small" />
                                                    <AccessTimeIcon fontSize="small" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />


                                    <Grid item xs={1.33}>
                                        <TextField
                                            value={checkInTime}
                                            variant="outlined"
                                            sx={{
                                                height: '32px',
                                                '& .MuiInputBase-root': {
                                                    height: '32px',
                                                    fontSize: 13,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                },
                                                '& .MuiInputBase-input': {
                                                    height: '36px',
                                                    padding: '0 8px',
                                                    lineHeight: '36px',
                                                },
                                            }}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <EventIcon fontSize="small" />
                                                        <AccessTimeIcon fontSize="small" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={1.33}>
                                        <TextField
                                            value="1 giờ"
                                            variant="standard"
                                            sx={{
                                                '& .MuiInputBase-root': {
                                                    height: '32px',
                                                    width:100,
                                                    fontSize: 13,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    border: 'none',
                                                },
                                                '& .MuiInputBase-input': {
                                                    padding: '0 8px',
                                                    textAlign: 'right',
                                                },
                                                '& .MuiInput-underline:before': {
                                                    borderBottom: 'none',
                                                },
                                                '& .MuiInput-underline:after': {
                                                    borderBottom: 'none',
                                                },
                                                '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                                                    borderBottom: 'none',
                                                },
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={1.33}>
                                        <TextField
                                            value="180,000"
                                            variant="standard"
                                            sx={{
                                                '& .MuiInputBase-root': {
                                                    height: '32px',
                                                    fontSize: 13,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    border: 'none',
                                                },
                                                '& .MuiInputBase-input': {
                                                    padding: '0 8px',
                                                    textAlign: 'right',
                                                },
                                                '& .MuiInput-underline:before': {
                                                    borderBottom: 'none',
                                                },
                                                '& .MuiInput-underline:after': {
                                                    borderBottom: 'none',
                                                },
                                                '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                                                    borderBottom: 'none',
                                                },
                                            }}
                                        />
                                    </Grid>
                                </Grid>

                                {/* Dòng bổ sung: Nút, Ghi chú, và Thông tin thanh toán */}
                                <Grid item xs={12} container spacing={1}>
                                    <Grid item xs={12} container spacing={1}>
                                        <Grid item xs={8} container spacing={1}>

                                            <Grid item xs={8}>
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    placeholder="Nhập ghi chú..."
                                                    value={note}
                                                    onChange={(e) => setNote(e.target.value)}
                                                    sx={{
                                                        '& .MuiInputBase-input': {
                                                            fontSize: '0.875rem',
                                                            height: '32px',
                                                            padding: '0 10px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                        },
                                                    }}
                                                />
                                            </Grid>


                                        </Grid>
                                    </Grid>


                                    <Grid item xs={8}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'flex-end',
                                            }}
                                        >
                                            <Box sx={{ textAlign: 'right' }}>
                                                <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.875rem' }}>
                                                    Khách cần trả
                                                </Typography>
                                                <Typography variant="h6" color="error" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                                                    {additionalServices.toLocaleString('vi-VN')}đ
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.875rem' }}>
                                                    Khách thanh toán
                                                </Typography>
                                                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                                                    {customerPayment.toLocaleString('vi-VN')}đ
                                                    <CreditCardIcon sx={{ fontSize: '1rem', ml: 0.5, verticalAlign: 'middle' }} />
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Grid>

                                </Grid>
                            </Grid>
                        </Box>

                        {/* Dòng 4: Nút hành động */}
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                            <Button
                                variant="contained"
                                sx={{
                                    fontSize: '0.875rem',
                                    backgroundColor: '#4CAF50',
                                    '&:hover': { backgroundColor: '#45A049' }
                                }}
                            >
                                Thêm tùy chọn
                            </Button>
                            <Button
                                variant="contained"
                                sx={{
                                    fontSize: '0.875rem',
                                    backgroundColor: '#1976D2',
                                    '&:hover': { backgroundColor: '#1565C0' }
                                }}
                                onClick={() => alert('Chức năng nhận phòng đang phát triển')}
                            >
                                Nhận phòng
                            </Button>
                            <Button
                                variant="contained"
                                sx={{
                                    fontSize: '0.875rem',
                                    backgroundColor: '#FF6F61',
                                    '&:hover': { backgroundColor: '#E57373' }
                                }}
                                onClick={() => alert('Chức năng đặt trước đang phát triển')}
                            >
                                Đặt trước
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    );
}