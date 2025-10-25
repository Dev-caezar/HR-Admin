import React, { useState } from 'react';
import { Table, Select, Input, Button, Tag, Space } from 'antd';
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons';

const { Option } = Select;

const getRandomTailwindColor = () => {
   const colors = [
      'bg-red-500', 'bg-pink-500', 'bg-purple-500', 'bg-deep-purple-500',
      'bg-indigo-500', 'bg-blue-500', 'bg-light-blue-500', 'bg-cyan-500',
      'bg-teal-500', 'bg-green-500', 'bg-light-green-500', 'bg-lime-500',
      'bg-yellow-500', 'bg-amber-500', 'bg-orange-500', 'bg-deep-orange-500',
   ];


   const randomIndex = Math.floor(Math.random() * colors.length);
   return colors[randomIndex];
};

const employeeList = [
   { key: '101', initial: "SJ", name: "Sarah Johnson", email: "sarah.j@comp.com", department: "Engineering", role: "Senior Developer", status: "Active", startDate: "2020-05-15" },
   { key: '102', initial: "MT", name: "Michael Thompson", email: "michaelt@comp.com", department: "Marketing", role: "Content Specialist", status: "Active", startDate: "2022-11-01" },
   { key: '103', initial: "EL", name: "Emily Lee", email: "emily.lee@comp.com", department: "Sales", role: "Account Executive", status: "On Leave", startDate: "2021-08-20" },
   { key: '104', initial: "JR", name: "James Rodriguez", email: "james.r@comp.com", department: "Design", role: "UX Designer", status: "Active", startDate: "2023-01-10" },
   { key: '105', initial: "AF", name: "Anna Fedorov", email: "anna.f@comp.com", department: "Finance", role: "Financial Analyst", status: "Terminated", startDate: "2019-03-25" },
   { key: '106', initial: "BW", name: "Ben Wilson", email: "ben.w@comp.com", department: "Engineering", role: "Junior Developer", status: "Active", startDate: "2024-01-01" },
   { key: '107', initial: "KC", name: "Karen Chen", email: "karen.c@comp.com", department: "Marketing", role: "Social Media Manager", status: "Active", startDate: "2023-07-01" },
   { key: '108', initial: "DP", name: "David Patel", email: "david.p@comp.com", department: "Sales", role: "Sales Manager", status: "Active", startDate: "2018-01-20" },
];

const departments = [...new Set(employeeList.map(emp => emp.department))];

const columns = [
   {
      title: 'Employee',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
         <div className="flex items-center">
            <div className={`flex-shrink-0 h-10 w-10 ${getRandomTailwindColor()} rounded-full flex items-center justify-center text-white font-medium text-sm`}>
               {record.initial}
            </div>
            <div className="ml-4">
               <div className="text-sm font-medium text-gray-900">{record.name}</div>
               <div className="text-xs text-gray-500">{record.email}</div>
            </div>
         </div>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
   },
   {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      filters: departments.map(dept => ({ text: dept, value: dept })),
      onFilter: (value, record) => record.department.indexOf(value) === 0,
      sorter: (a, b) => a.department.localeCompare(b.department),
   },
   {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
   },
   {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      sorter: (a, b) => new Date(a.startDate) - new Date(b.startDate),
   },
   {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
         let color;
         if (status === 'Active') {
            color = 'success';
         } else if (status === 'On Leave') {
            color = 'warning';
         } else {
            color = 'error';
         }
         return (
            <Tag color={color} key={status}>
               {status.toUpperCase()}
            </Tag>
         );
      },
      filters: [
         { text: 'Active', value: 'Active' },
         { text: 'On Leave', value: 'On Leave' },
         { text: 'Terminated', value: 'Terminated' },
      ],
      onFilter: (value, record) => record.status === value,
   },
   {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
         <Space size="middle">
            <a className="text-purple-600 hover:text-purple-900">View Details</a>
         </Space>
      ),
   },
];

const Employees = () => {
   const [searchTerm, setSearchTerm] = useState('');
   const [filteredData, setFilteredData] = useState(employeeList);

   const handleSearch = (e) => {
      const value = e.target.value.toLowerCase();
      setSearchTerm(value);

      const newFilteredData = employeeList.filter(item =>
         item.name.toLowerCase().includes(value) ||
         item.role.toLowerCase().includes(value)
      );
      setFilteredData(newFilteredData);
   };

   return (
      <div className="min-h-screen bg-gray-100 p-6 sm:p-8 lg:p-10">
         <header className="flex justify-between items-center mb-8">
            <div>
               <h1 className="text-3xl font-bold text-gray-800">Employee Directory</h1>
               <p className="text-sm text-gray-500">Manage and view all current and former personnel.</p>
            </div>
            <Button
               type="primary"
               className="bg-purple-600 hover:!bg-purple-700 h-auto px-4 py-2 flex items-center justify-center text-white font-medium rounded-lg shadow-md transition duration-200"
            >
               <span className="text-xl leading-none mr-1">+</span>
               <span>Add Employee</span>
            </Button>
         </header>

         <div className="bg-white p-6 rounded-xl shadow-lg mb-8 flex flex-col md:flex-row gap-4 items-center">

            <Input
               prefix={<SearchOutlined className="text-gray-400" />}
               placeholder="Search by name or role..."
               value={searchTerm}
               onChange={handleSearch}
               className="w-full md:w-80 h-10"
            />

            <Button
               type="default"
               icon={<DownloadOutlined />}
               className="w-full md:w-auto h-10 px-4 py-2 flex items-center justify-center bg-gray-200 hover:!bg-gray-300 text-gray-700 font-medium rounded-lg transition duration-150"
            >
               Export Data
            </Button>
         </div>

         <section className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Employee Roster</h2>

            <Table
               columns={columns}
               dataSource={filteredData}
               pagination={{ pageSize: 10 }}
               scroll={{ x: 800 }}
            />
         </section>
      </div>
   );
}

export default Employees;