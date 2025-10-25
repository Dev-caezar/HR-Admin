import React, { useState } from 'react';


const AddEmployeeModal = ({ isOpen, onClose, departments }) => {
   if (!isOpen) return null;

   return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center p-4 transition-opacity duration-300 backdrop-blur-[5px]">
         <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-auto transform transition-all duration-300 scale-100 opacity-100">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
               <h3 className="text-xl font-semibold text-gray-800">
                  ➕ Add New Employee
               </h3>
               <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Close"
               >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
               </button>
            </div>

            <form className="p-6 space-y-4">
               <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                     type="text"
                     id="fullName"
                     name="fullName"
                     placeholder="e.g., Jane Doe"
                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                     required
                  />
               </div>

               <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                     type="email"
                     id="email"
                     name="email"
                     placeholder="jane.doe@company.com"
                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                     required
                  />
               </div>

               <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Job Role</label>
                  <input
                     type="text"
                     id="role"
                     name="role"
                     placeholder="e.g., Software Engineer"
                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                     required
                  />
               </div>

               <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <select
                     id="department"
                     name="department"
                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 bg-white"
                     required
                  >
                     <option value="">Select Department</option>
                     {departments.map((dept, index) => (
                        <option key={index} value={dept.name}>{dept.name}</option>
                     ))}
                  </select>
               </div>

            </form>

            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
               <button
                  onClick={onClose}
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-150"
               >
                  Cancel
               </button>
               <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition duration-150 shadow-md"
               >
                  Save Employee
               </button>
            </div>

         </div>
      </div>
   );
};

const hrMetrics = [
   { title: "Total Employees", value: 163, change: "↑ 1.12% from last month", icon: '👤', iconBg: 'bg-indigo-100 text-indigo-600', style: 'border-l-4 border-indigo-500' },
   { title: "New Hires", value: 8, change: "↑ 3 from last month", icon: '✅', iconBg: 'bg-green-100 text-green-600', style: 'border-l-4 border-green-500' },
   { title: "Departments", value: 6, change: null, icon: '🏢', iconBg: 'bg-blue-100 text-blue-600', style: 'border-l-4 border-blue-500' },
   { title: "Growth Rate", value: "+1.8%", change: "↑ 1.5% from last month", icon: '📈', iconBg: 'bg-yellow-100 text-yellow-600', style: 'border-l-4 border-yellow-500' },
];

const departmentsData = [
   { name: "Engineering", count: 45 },
   { name: "Marketing", count: 28 },
   { name: "Sales", count: 35 },
   { name: "Design", count: 22 },
   { name: "HR", count: 18 },
   { name: "Finance", count: 20 },
];

const recentEmployees = [
   { initial: "SJ", name: "Sarah Johnson", email: "sarah.johnson@company.com", department: "Engineering", role: "Senior Developer", status: "Active" },
];

const maxDeptCount = Math.max(...departmentsData.map(d => d.count)) || 1;
const CHART_HEIGHT_PX = 200;

const Dashboard = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);

   const openModal = () => setIsModalOpen(true);
   const closeModal = () => setIsModalOpen(false);

   return (
      <div className="min-h-screen bg-gray-100 p-6 sm:p-8 lg:p-10">
         <header className="flex justify-between items-center mb-8">
            <div>
               <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
               <p className="text-sm text-gray-500">Welcome back! Here's your HR overview.</p>
            </div>

            <button
               onClick={openModal}
               className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-200"
            >
               <span className="text-xl leading-none">+</span>
               <span>Add Employee</span>
            </button>
         </header>

         <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {hrMetrics.map((metric, index) => (
               <div
                  key={index}
                  className={`bg-white p-5 rounded-xl shadow-lg flex items-center justify-between ${metric.style}`}
               >
                  <div>
                     <p className="text-sm font-medium text-gray-500">{metric.title}</p>
                     <div className="text-3xl font-bold text-gray-900 mt-1">{metric.value}</div>
                     {metric.change && (
                        <p className="text-xs mt-1 text-green-600 font-semibold">{metric.change}</p>
                     )}
                  </div>
                  <div className={`p-3 rounded-full ${metric.iconBg}`}>
                     <span className="text-xl">{metric.icon}</span>
                  </div>
               </div>
            ))}
         </section>

         {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

            <section className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
               <h2 className="text-xl font-semibold text-gray-800 mb-4">Employees by Department</h2>

               <div className="relative flex h-80 pt-10">
                  <div className="flex flex-col justify-between items-end pr-3 text-sm text-gray-500 h-full">
                     <span>60</span>
                     <span>45</span>
                     <span>30</span>
                     <span>15</span>
                     <span>0</span>
                  </div>

                  <div className="flex items-end justify-around flex-grow border-b border-gray-300">
                     {departmentsData.map((dept, index) => (
                        <div key={index} className="flex flex-col items-center w-10 h-full justify-end">
                           <div
                              className="w-full bg-indigo-500 rounded-t-md hover:bg-indigo-600 transition duration-150"
                              style={{ height: `${(dept.count / maxDeptCount) * 100 * (CHART_HEIGHT_PX / 320)}%` }}
                              title={`${dept.name}: ${dept.count}`}
                           ></div>
                           <p className="text-xs mt-2 text-gray-600">{dept.name}</p>
                        </div>
                     ))}
                  </div>
               </div>
            </section>

            <section className="lg:col-span-1 p-6 rounded-xl shadow-lg bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
               <h3 className="text-xl font-semibold mb-1">Quick Actions</h3>
               <p className="text-sm opacity-90 mb-4">Streamline your HR workflow</p>

               <div className="grid grid-cols-2 gap-3">
                  {['Review Applications', 'Schedule Interview', 'Generate Report', 'Manage Leave'].map((action, index) => (
                     <button
                        key={index}
                        className="bg-white bg-opacity-20 hover:bg-opacity-30 p-4 rounded-lg font-medium text-sm transition duration-150"
                     >
                        {action}
                     </button>
                  ))}
               </div>
            </section>
         </div> */}

         <section className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Employees</h2>

            <div className="overflow-x-auto">
               <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                     <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">Employee</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Department</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Status</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                     {recentEmployees.map((employee, index) => (
                        <tr key={index}>
                           <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                 <div className="flex-shrink-0 h-10 w-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                                    {employee.initial}
                                 </div>
                                 <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                                    <div className="text-xs text-gray-500">{employee.email}</div>
                                 </div>
                              </div>
                           </td>
                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.department}</td>
                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.role}</td>
                           <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-3 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                 {employee.status}
                              </span>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </section>

         <AddEmployeeModal
            isOpen={isModalOpen}
            onClose={closeModal}
            departments={departmentsData}
         />
      </div>
   );
};

export default Dashboard;