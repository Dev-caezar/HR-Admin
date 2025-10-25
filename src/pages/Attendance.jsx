import React, { useState } from 'react';
import { Table, Select, Input, Button, Tag, Space, DatePicker, Card, Statistic } from 'antd';
import { DownloadOutlined, ClockCircleOutlined, CalendarOutlined, AlertOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Option } = Select;
const { RangePicker } = DatePicker;


const attendanceMetrics = [
   { title: "Avg. Work Hours", value: "7h 45m", prefix: <ClockCircleOutlined />, color: 'text-purple-600', border: 'border-l-4 border-purple-500' },
   { title: "On-Time Rate", value: "92.5%", prefix: <CalendarOutlined />, color: 'text-green-600', border: 'border-l-4 border-green-500' },
   { title: "Absent Days (Total)", value: 7, prefix: <AlertOutlined />, color: 'text-red-600', border: 'border-l-4 border-red-500' },
];

const attendanceRecords = [
   { key: '1', employee: "Sarah Johnson", date: "2025-10-24", clockIn: "08:55 AM", clockOut: "05:00 PM", status: "On-Time", hours: 8.08, overtime: 0 },
   { key: '2', employee: "Michael Thompson", date: "2025-10-24", clockIn: "09:15 AM", clockOut: "05:00 PM", status: "Late", hours: 7.75, overtime: 0 },
   { key: '3', employee: "Emily Lee", date: "2025-10-24", clockIn: "09:00 AM", clockOut: "06:00 PM", status: "Overtime", hours: 9.00, overtime: 1.0 },
   { key: '4', employee: "James Rodriguez", date: "2025-10-24", clockIn: "08:45 AM", clockOut: "04:45 PM", status: "On-Time", hours: 8.00, overtime: 0 },
   { key: '5', employee: "Anna Fedorov", date: "2025-10-23", clockIn: "09:05 AM", clockOut: "05:00 PM", status: "Late", hours: 7.92, overtime: 0 },
];

const columns = [
   {
      title: 'Employee',
      dataIndex: 'employee',
      key: 'employee',
      sorter: (a, b) => a.employee.localeCompare(b.employee),
      fixed: 'left',
   },
   {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
   },
   {
      title: 'Clock In',
      dataIndex: 'clockIn',
      key: 'clockIn',
   },
   {
      title: 'Clock Out',
      dataIndex: 'clockOut',
      key: 'clockOut',
   },
   {
      title: 'Work Hours',
      dataIndex: 'hours',
      key: 'hours',
      render: (hours) => `${hours.toFixed(2)}h`,
      sorter: (a, b) => a.hours - b.hours,
   },
   {
      title: 'Overtime',
      dataIndex: 'overtime',
      key: 'overtime',
      render: (overtime) => overtime > 0 ? <Tag color="orange">{overtime.toFixed(1)}h</Tag> : '0h',
      sorter: (a, b) => a.overtime - b.overtime,
   },
   {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
         let color = 'default';
         if (status === 'On-Time') color = 'green';
         if (status === 'Late') color = 'red';
         if (status === 'Overtime') color = 'purple';
         if (status === 'Absent') color = 'gray';

         return <Tag color={color}>{status}</Tag>;
      },
      filters: [
         { text: 'On-Time', value: 'On-Time' },
         { text: 'Late', value: 'Late' },
         { text: 'Overtime', value: 'Overtime' },
         { text: 'Absent', value: 'Absent' },
      ],
      onFilter: (value, record) => record.status === value,
   },
];

const Attendance = () => {
   const [searchTerm, setSearchTerm] = useState('');
   const [filteredData, setFilteredData] = useState(attendanceRecords);

   const handleSearch = (e) => {
      const value = e.target.value.toLowerCase();
      setSearchTerm(value);

      const newFilteredData = attendanceRecords.filter(item =>
         item.employee.toLowerCase().includes(value)
      );
      setFilteredData(newFilteredData);
   };

   return (
      <div className="min-h-screen bg-gray-100 p-6 sm:p-8 lg:p-6">
         <header className="flex justify-between items-center mb-8">
            <div>
               <h1 className="text-3xl font-bold text-gray-800">Attendance Overview</h1>
               <p className="text-sm text-gray-500">Real-time clock-in and work hour records.</p>
            </div>
            <Button
               type="primary"
               className="bg-purple-600 hover:!bg-purple-700 h-auto px-4 py-2 flex items-center justify-center text-white font-medium rounded-lg shadow-md transition duration-200"
            >
               <span className="text-xl leading-none mr-1">+</span>
               <span>Manual Entry</span>
            </Button>
         </header>

         <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            {attendanceMetrics.map((metric, index) => (
               <Card key={index} bordered={false} className={`shadow-lg rounded-xl ${metric.border}`}>
                  <Statistic
                     title={<span className="text-gray-500">{metric.title}</span>}
                     value={metric.value}
                     prefix={<span className={metric.color}>{metric.prefix}</span>}
                     valueStyle={{ color: metric.color.replace('text-', '#') }}
                  />
               </Card>
            ))}
         </section>

         <div className="bg-white p-6 rounded-xl shadow-lg mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">

            <Input
               prefix={<ClockCircleOutlined className="text-gray-400" />}
               placeholder="Search by employee name..."
               value={searchTerm}
               onChange={handleSearch}
               className="w-full md:w-64 h-10"
            />

            <RangePicker
               className="w-full md:w-auto h-10"
               defaultValue={[dayjs('2025-10-01'), dayjs('2025-10-25')]}
            />

            <Button
               type="default"
               icon={<DownloadOutlined />}
               className="w-full md:w-auto h-10 px-4 py-2 flex items-center justify-center bg-gray-200 hover:!bg-gray-300 text-gray-700 font-medium rounded-lg transition duration-150"
            >
               Export
            </Button>
         </div>

         <section className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Daily Records</h2>

            <Table
               columns={columns}
               dataSource={filteredData}
               pagination={{ pageSize: 10 }}
               scroll={{ x: 1000 }}
            />
         </section>
      </div>
   );
}

export default Attendance;