import { createBrowserRouter } from "react-router-dom";
import { DashboardLayout } from "../components";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/auth/Login";
import Employees from "../pages/Employees";
import Attendance from "../pages/Attendance";
import Payroll from "../pages/Payroll";
import Settings from "../pages/Settings";

export const Element = createBrowserRouter([
   {
      path: '/admin-dashboard',
      element: <DashboardLayout />,
      children: [
         {
            index: true,
            element: <Dashboard />
         },
         {
            path: "employees",
            element: <Employees />
         },
         {
            path: "attendance",
            element: <Attendance />
         },
         {
            path: "payroll",
            element: <Payroll />
         },
         {
            path: "settings",
            element: <Settings />
         },
      ]
   },
   {
      path: "/",
      element: <Login />
   }
])