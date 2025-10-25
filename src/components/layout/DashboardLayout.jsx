import React from 'react'
import { Footer, Header, Sidebar } from '../static'
import { Outlet } from 'react-router-dom'

export default function DashboardLayout() {
   return (
      <div className="flex h-screen">
         <aside className="">
            <Sidebar />
         </aside>
         <div className="flex-1 flex flex-col">
            <header className="h-20 bg-white shadow flex items-center px-4">
               <Header />
            </header>
            <main className="flex-1 p-0 bg-gray-50 overflow-y-auto">
               <Outlet />
            </main>
            <Footer />
         </div>
      </div>
   )
}
