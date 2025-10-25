import React, { useState } from "react";
import { Bell, MessageSquare, User, LogOut } from "lucide-react";
import { Modal, Button } from "antd";

const Header = () => {
   const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
   const [isModalOpen, setIsModalOpen] = useState(false);

   const toggleProfileMenu = () => {
      setIsProfileMenuOpen((prev) => !prev);
   };

   const showModal = () => {
      setIsModalOpen(true);
      setIsProfileMenuOpen(false);
   };

   const handleCancel = () => {
      setIsModalOpen(false);
   };

   return (
      <header className="flex justify-between items-center h-full w-full bg-white p-0 rounded-xl sticky top-4 z-10">
         <h1 className="text-2xl font-semibold text-gray-800">
         </h1>
         <div className="flex items-center space-x-4 relative">
            <button
               className="text-gray-500 hover:text-purple-600 p-2 rounded-full hover:bg-purple-100 transition"
               title="Notifications"
            >
               <Bell size={20} />
            </button>
            <button
               className="text-purplr-500 hover:text-purple-600 p-2 rounded-full hover:bg-purple-100 transition"
               title="Messages"
            >
               <MessageSquare size={20} />
            </button>
            <button
               className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm cursor-pointer hover:ring-2 hover:ring-purple-400 transition"
               onClick={toggleProfileMenu}
               title="Open Profile Menu"
            >
               JD
            </button>
            {isProfileMenuOpen && (
               <div className="absolute right-0 mt-2 top-full w-48 bg-white rounded-xl shadow-2xl overflow-hidden z-30 ring-1 ring-gray-200">
                  <div className="py-2">
                     <div className="px-4 py-2 text-sm text-gray-700 font-semibold border-b border-gray-100">
                        John Doe (Admin)
                     </div>
                     <button
                        className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition text-sm"
                        onClick={() => {
                           console.log("View Profile action");
                           setIsProfileMenuOpen(false);
                        }}
                     >
                        <User size={16} className="mr-2" /> View Profile
                     </button>
                     <button
                        className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition text-sm"
                        onClick={showModal}
                     >
                        <LogOut size={16} className="mr-2 text-red-500" /> Logout
                     </button>
                  </div>
               </div>
            )}
            <Modal
               title="Confirm Logout"
               open={isModalOpen}
               onCancel={handleCancel}
               footer={[
                  <Button key="cancel" onClick={handleCancel}>
                     Cancel
                  </Button>,
                  <Button
                     key="logout"
                     type="primary"
                     danger
                     onClick={() => {
                        console.log("User logged out");
                        setIsModalOpen(false);
                     }}
                  >
                     Logout
                  </Button>,
               ]}
            >
               <p>Are you sure you want to log out?</p>
            </Modal>
         </div>
      </header>
   );
};

export default Header;
