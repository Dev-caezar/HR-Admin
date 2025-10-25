import axios from 'axios';
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
// import { setUserData, setUserToken } from '../../../../Redux_Project/src/utils/Features';
import { Flex, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Login = () => {
   const navigate = useNavigate()
   // const dispatch = useDispatch()
   const [loading, setLoading] = useState(false)
   const [showPassword, setShowPassword] = useState(false)
   const [formData, setFormData] = useState({
      email: "",
      password: "",
   })
   const handleChange = (e) => {
      const { name, value } = e.target
      setFormData({
         ...formData,
         [name]: value
      })
   }

   const handlePassword = () => {
      setShowPassword(!showPassword)
   }

   const handleRegister = () => {
      navigate("/register")
   }


   const validationSchema = yup.object({
      email: yup.string().email("Invalid email format").required("Email is required"),
      password: yup.string().required("Password is required"),
   })

   const API_BASE_URL = "https://product-api-mrbb.onrender.com"
   const validateForm = async (e) => {
      e.preventDefault();
      setLoading(true)
      try {
         await validationSchema.validate(formData, { abortEarly: false })
         const response = await axios.post(`${API_BASE_URL}/login`, formData)
         // dispatch(setUserData(response.data.data))
         // dispatch(setUserToken(response.data.token))
         navigate("/")
         console.log(response.data);
      } catch (error) {
         if (error.name === "ValidationError") {
            console.log("Validation errors:", error.inner);
         } else {
            console.error("An unexpected error occurred:", error);
         }
      }
      setLoading(false)
   }


   return (
      <div className="h-screen w-full bg-gradient-to-r from-purple-500 to-white flex justify-center items-center p-4">
         <div className="w-full max-w-[40%] bg-white rounded-3xl shadow-2xl p-8 sm:p-10">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Welcome Back 👋</h2>
            <p className="text-center text-gray-500 mb-8">Sign in to continue to your account.</p>

            <div className="w-full space-y-6">
               <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                     Email Address
                  </label>
                  <input
                     type="email"
                     name="email"
                     value={formData.email}
                     onChange={handleChange}
                     placeholder="you@example.com"
                     className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
               </div>

               <div>
                  <div className="flex justify-between items-center">
                     <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                     </label>
                  </div>
                  <div className="relative mt-1">
                     <input
                        type={showPassword ? "password" : "text"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pr-10"
                     />
                     <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer">
                        {showPassword ? <FaEye onClick={handlePassword} /> : <FaEyeSlash onClick={handlePassword} />}
                     </span>
                  </div>
                  <h4 href="#" className="text-xs font-medium text-purple-600 hover:text-purple-500 transition duration-150 text-right cursor-pointer mt-2">
                     Forgot password?
                  </h4>
               </div>

               <button
                  onClick={validateForm}
                  className="w-full mt-8 flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-semibold text-white bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400 transition duration-200 ease-in-out"
               >
                  {loading ? (
                     <Flex align="center" gap="middle">
                        <Spin indicator={<LoadingOutlined style={{ fontSize: 25, color: "white" }} spin />} />
                        Signing in...
                     </Flex>
                  ) : "Login"}
               </button>
            </div>

            <p className="mt-8 text-center text-sm text-gray-600">
               Don't have an account?{' '}
               <span onClick={handleRegister}
                  className="font-medium text-purple-500 hover:text-purple-500 transition duration-150">
                  Sign up
               </span>
            </p>
         </div>
      </div>
   );
};

export default Login;