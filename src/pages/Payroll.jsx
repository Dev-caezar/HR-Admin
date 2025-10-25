import React, { useState } from 'react';
import { Table, Select, Input, Button, Tag, Space, Card, Statistic } from 'antd';
import { DownloadOutlined, EuroOutlined, ScheduleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Option } = Select;


const payrollMetrics = [
   { title: "Total Monthly Payout", value: 45850.00, prefix: <EuroOutlined />, color: 'text-purple-600', border: 'border-l-4 border-purple-500' },
   { title: "Next Payment Date", value: "Oct 31, 2025", prefix: <ScheduleOutlined />, color: 'text-gray-600', border: 'border-l-4 border-gray-500' },
   { title: "Payments Processed", value: 98, prefix: <CheckCircleOutlined />, color: 'text-green-600', border: 'border-l-4 border-green-500' },
];

const payrollRecords = [
   { key: 'P001', employee: "Sarah Johnson", period: "Sep 2025", baseSalary: 6000.00, tax: 1200.00, netPay: 4800.00, status: "Paid", date: "2025-09-30" },
   { key: 'P002', employee: "Michael Thompson", period: "Sep 2025", baseSalary: 4500.00, tax: 900.00, netPay: 3600.00, status: "Paid", date: "2025-09-30" },
   { key: 'P003', employee: "Emily Lee", period: "Sep 2025", baseSalary: 5200.00, tax: 1040.00, netPay: 4160.00, status: "Pending", date: "2025-09-30" },
   { key: 'P004', employee: "James Rodriguez", period: "Aug 2025", baseSalary: 4800.00, tax: 960.00, netPay: 3840.00, status: "Paid", date: "2025-08-30" },
];

const columns = [
   {
      title: 'Payment ID',
      dataIndex: 'key',
      key: 'key',
      width: 120,
      fixed: 'left',
   },
   {
      title: 'Employee',
      dataIndex: 'employee',
      key: 'employee',
      sorter: (a, b) => a.employee.localeCompare(b.employee),
   },
   {
      title: 'Pay Period',
      dataIndex: 'period',
      key: 'period',
      filters: [{ text: 'Sep 2025', value: 'Sep 2025' }, { text: 'Aug 2025', value: 'Aug 2025' }],
      onFilter: (value, record) => record.period.indexOf(value) === 0,
   },
   {
      title: 'Base Salary (€)',
      dataIndex: 'baseSalary',
      key: 'baseSalary',
      render: (text) => `€${text.toFixed(2)}`,
      sorter: (a, b) => a.baseSalary - b.baseSalary,
   },
   {
      title: 'Net Pay (€)',
      dataIndex: 'netPay',
      key: 'netPay',
      render: (text) => <span className="font-semibold text-green-700">€{text.toFixed(2)}</span>,
      sorter: (a, b) => a.netPay - b.netPay,
   },
   {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
         let color = 'gray';
         if (status === 'Paid') color = 'green';
         if (status === 'Pending') color = 'gold';

         return <Tag color={color}>{status}</Tag>;
      },
      filters: [
         { text: 'Paid', value: 'Paid' },
         { text: 'Pending', value: 'Pending' },
      ],
      onFilter: (value, record) => record.status === value,
   },
   {
      title: 'Pay Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
   },
   {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 100,
      render: (_, record) => (
         <Space size="middle">
            <a className="text-purple-600 hover:text-purple-900">View Slip</a>
         </Space>
      ),
   },
];

const Payroll = () => {
   const [searchTerm, setSearchTerm] = useState('');
   const [filteredData, setFilteredData] = useState(payrollRecords);

   const handleSearch = (e) => {
      const value = e.target.value.toLowerCase();
      setSearchTerm(value);

      const newFilteredData = payrollRecords.filter(item =>
         item.employee.toLowerCase().includes(value) ||
         item.key.toLowerCase().includes(value)
      );
      setFilteredData(newFilteredData);
   };

   return (
      <div className="min-h-screen bg-gray-100 p-6 sm:p-8 lg:p-6">
         <header className="flex justify-between items-center mb-8">
            <div>
               <h1 className="text-3xl font-bold text-gray-800">Payroll Management</h1>
               <p className="text-sm text-gray-500">Process salaries and manage payment history.</p>
            </div>
            <Button
               type="primary"
               className="bg-purple-600 hover:!bg-purple-700 h-auto px-4 py-2 flex items-center justify-center text-white font-medium rounded-lg shadow-md transition duration-200"
            >
               <span className="text-xl leading-none mr-1">€</span>
               <span>Run Payroll</span>
            </Button>
         </header>

         <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            {payrollMetrics.map((metric, index) => (
               <Card key={index} bordered={false} className={`shadow-lg rounded-xl ${metric.border}`}>
                  <Statistic
                     title={<span className="text-gray-500">{metric.title}</span>}
                     value={metric.value}
                     prefix={<span className={metric.color}>{metric.prefix}</span>}
                     formatter={(value) => typeof value === 'number' ? `€${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` : value}
                     valueStyle={{ color: metric.color.replace('text-', '#') }}
                  />
               </Card>
            ))}
         </section>

         <div className="bg-white p-6 rounded-xl shadow-lg mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">

            <Input
               prefix={<EuroOutlined className="text-gray-400" />}
               placeholder="Search by Employee or Payment ID..."
               value={searchTerm}
               onChange={handleSearch}
               className="w-full md:w-80 h-10"
            />

            <Select
               defaultValue="All Periods"
               className="w-full md:w-48 h-10"
               onChange={(value) => console.log('Filter by period:', value)}
            >
               <Option value="all">All Periods</Option>
               <Option value="oct2025">Oct 2025</Option>
               <Option value="sep2025">Sep 2025</Option>
               <Option value="aug2025">Aug 2025</Option>
            </Select>

            <Button
               type="default"
               icon={<DownloadOutlined />}
               className="w-full md:w-auto h-10 px-4 py-2 flex items-center justify-center bg-gray-200 hover:!bg-gray-300 text-gray-700 font-medium rounded-lg transition duration-150"
            >
               Export
            </Button>
         </div>

         <section className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment History</h2>

            <Table
               columns={columns}
               dataSource={filteredData}
               pagination={{ pageSize: 8 }}
               scroll={{ x: 1000 }}
            />
         </section>
      </div>
   );
}

export default Payroll;