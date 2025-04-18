import { Routes, Route } from "react-router-dom";
import { Typography } from "@mui/material";
import { LayoutAdmin } from "../../layouts/admin/home/index.jsx";
import { LayoutEmployee } from "../../layouts/employee/index.jsx";
import Overview from "../../pages/admin/overview/index.jsx";
import Room from "../../pages/admin/room/index.jsx";
import Employee from "../../pages/admin/employee/index.jsx";


const OverviewContent = () => (
    <section style={{ padding: "20px" }}>
        <Overview/>
    </section>
);

const RoomsContent = () => (
    <section style={{ padding: "20px" }}>
        <Room/>
    </section>
);

const GoodsContent = () => (
    <section style={{ padding: "20px" }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
            Danh sách hàng hóa
        </Typography>
        <Typography>Đây là nội dung danh sách hàng hóa.</Typography>
    </section>
);

const TransactionsContent = () => (
    <section style={{ padding: "20px" }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
            Danh sách giao dịch
        </Typography>
        <Typography>Đây là nội dung danh sách giao dịch.</Typography>
    </section>
);

const PartnersContent = () => (
    <section style={{ padding: "20px" }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
            Danh sách đối tác
        </Typography>
        <Typography>Đây là nội dung danh sách đối tác.</Typography>
    </section>
);

const EmployeeContent = () => (
    <section style={{ padding: "20px" }}>
        <Employee/>
    </section>
);

const EmployeeScheduleContent = () => (
    <section style={{ padding: "20px" }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
            Lịch làm việc
        </Typography>
        <Typography>Đây là nội dung lịch làm việc.</Typography>
    </section>
);

const EmployeeAttendanceContent = () => (
    <section style={{ padding: "20px" }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
            Chấm công
        </Typography>
        <Typography>Đây là nội dung chấm công.</Typography>
    </section>
);

const EmployeePayrollContent = () => (
    <section style={{ padding: "20px" }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
            Bảng tính lương
        </Typography>
        <Typography>Đây là nội dung bảng tính lương.</Typography>
    </section>
);

const EmployeeSettingsContent = () => (
    <section style={{ padding: "20px" }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
            Thiết lập nhân viên
        </Typography>
        <Typography>Đây là nội dung thiết lập nhân viên.</Typography>
    </section>
);

const CashbookContent = () => (
    <section style={{ padding: "20px" }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
            Sổ quỹ
        </Typography>
        <Typography>Đây là nội dung sổ quỹ.</Typography>
    </section>
);

const ReportsContent = () => (
    <section style={{ padding: "20px" }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
            Báo cáo
        </Typography>
        <Typography>Đây là nội dung báo cáo.</Typography>
    </section>
);

function RoutersAdmin() {
    return (
        <Routes>
            <Route path="/admin" element={<LayoutAdmin />}>
                <Route index element={<OverviewContent />} />
                <Route path="rooms" element={<RoomsContent />} />
                <Route path="goods" element={<GoodsContent />} />
                <Route path="transactions" element={<TransactionsContent />} />
                <Route path="partners" element={<PartnersContent />} />
                <Route path="employee" element={<EmployeeContent />} />
                <Route path="employee/schedule" element={<EmployeeScheduleContent />} />
                <Route path="employee/attendance" element={<EmployeeAttendanceContent />} />
                <Route path="employee/payroll" element={<EmployeePayrollContent />} />
                <Route path="employee/settings" element={<EmployeeSettingsContent />} />
                <Route path="cashbook" element={<CashbookContent />} />
                <Route path="reports" element={<ReportsContent />} />
            </Route>
            <Route path="/employee" element={<LayoutEmployee />} />
        </Routes>
    );
}

export default RoutersAdmin;