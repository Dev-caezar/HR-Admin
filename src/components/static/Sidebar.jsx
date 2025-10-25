import { useState } from "react";
import {
   HomeIcon,
   UsersIcon,
   CalendarIcon,
   Cog6ToothIcon,
   ChartBarIcon,
   ArrowLeftOnRectangleIcon,
   Bars3Icon,
} from "@heroicons/react/24/outline";
import { Modal, Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
   const [isOpen, setIsOpen] = useState(true);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const navigate = useNavigate()

   const menuItems = [
      { name: "Dashboard", icon: <HomeIcon className="w-6 h-6" />, path: "/admin-dashboard" },
      { name: "Employees", icon: <UsersIcon className="w-6 h-6" />, path: "employees" },
      { name: "Attendance", icon: <CalendarIcon className="w-6 h-6" />, path: "attendance" },
      { name: "Payroll", icon: <ChartBarIcon className="w-6 h-6" />, path: "payroll" },
      { name: "Settings", icon: <Cog6ToothIcon className="w-6 h-6" />, path: "settings" },
   ];

   const showModal = () => setIsModalOpen(true);
   const handleCancel = () => setIsModalOpen(false);
   const handleLogout = () => {
      console.log("User logged out");
      navigate("/")
      setIsModalOpen(false);
   };

   return (
      <div className="flex">
         <div
            className={`${isOpen ? "w-60" : "w-20"
               } bg-purple-500 text-gray-100 h-screen p-4 pt-8 relative duration-300`}
         >
            <button
               onClick={() => setIsOpen(!isOpen)}
               className="absolute -right-3 top-9 w-7 h-7 bg-purple-500 border border-gray-300 rounded-full flex items-center justify-center hover:bg-purple-600 transition"
            >
               <Bars3Icon className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-10 px-2">
               <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="logo"
                  className="w-8 h-8"
               />
               <h1
                  className={`origin-left font-semibold text-xl duration-200 ${!isOpen && "scale-0"
                     }`}
               >
                  HR Admin
               </h1>
            </div>

            <ul className="space-y-4">
               {menuItems.map((item, index) => (
                  <li
                     key={index}
                     onClick={() => navigate(item.path)}
                     className="flex items-center gap-3 text-gray-200 hover:bg-purple-400 p-2 rounded-md cursor-pointer"
                  >
                     {item.icon}
                     <span
                        className={`text-base font-medium duration-200 ${!isOpen && "hidden"
                           }`}
                     >
                        {item.name}
                     </span>
                  </li>
               ))}
            </ul>

            <div className="w-full h-[40%] flex items-end">
               <button
                  className="flex items-center gap-3 text-gray-200 hover:bg-purple-400 p-2 rounded-md cursor-pointer w-full"
                  onClick={showModal}
               >
                  <ArrowLeftOnRectangleIcon className="w-6 h-6 text-gray-200" />
                  <span
                     className={`text-base font-medium duration-200 ${!isOpen && "hidden"
                        }`}
                  >
                     Logout
                  </span>
               </button>
            </div>
         </div>

         <Modal
            title="Confirm Logout"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={[
               <Button key="cancel" onClick={handleCancel}>
                  Cancel
               </Button>,
               <Button key="logout" type="primary" danger onClick={handleLogout}>
                  Logout
               </Button>,
            ]}
         >
            <p>Are you sure you want to log out?</p>
         </Modal>
      </div>
   );
}
