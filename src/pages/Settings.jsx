import React, { useState } from 'react';
import { Tabs, Form, Input, Button, Switch, Divider, message, Upload, Space, Card } from 'antd';
import { UserOutlined, LockOutlined, SettingOutlined, UploadOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

const Settings = () => {
   const [activeTab, setActiveTab] = useState('profile');

   const handleProfileSubmit = (values) => {
      console.log('Profile updated:', values);
      message.success('Profile saved successfully!');
   };

   const handleSecuritySubmit = (values) => {
      console.log('Security updated:', values);
      message.success('Password updated successfully!');
   };


   const ProfileSettings = () => (
      <Form
         layout="vertical"
         onFinish={handleProfileSubmit}
         initialValues={{
            fullName: 'Samantha Jones',
            email: 'samantha.jones@comp.com',
            jobTitle: 'HR Manager',
         }}
         className="w-full lg:w-3/4"
      >
         <Form.Item label="Profile Picture">
            <div className="flex items-center space-x-4 mb-4">
               <div className="flex-shrink-0 h-16 w-16 bg-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  SJ
               </div>
               <Upload
                  beforeUpload={() => false}
                  maxCount={1}
               >
                  <Button icon={<UploadOutlined />}>Change Photo</Button>
               </Upload>
            </div>
         </Form.Item>

         <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: 'Please input your full name!' }]}
         >
            <Input prefix={<UserOutlined />} placeholder="Full Name" className="h-10" />
         </Form.Item>

         <Form.Item
            label="Email Address"
            name="email"
            rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
         >
            <Input prefix={<UserOutlined />} placeholder="Email Address" disabled className="h-10" />
         </Form.Item>

         <Form.Item
            label="Job Title"
            name="jobTitle"
         >
            <Input prefix={<UserOutlined />} placeholder="Job Title" className="h-10" />
         </Form.Item>

         <Form.Item>
            <Button type="primary" htmlType="submit" className="bg-purple-600 hover:!bg-purple-700 h-10 w-32 mt-4">
               Save Profile
            </Button>
         </Form.Item>
      </Form>
   );

   const SecuritySettings = () => (
      <Form
         layout="vertical"
         onFinish={handleSecuritySubmit}
         className="w-full lg:w-3/4"
      >
         <h3 className="text-xl font-semibold text-gray-700 mb-4">Change Password</h3>
         <Form.Item
            label="Current Password"
            name="currentPassword"
            rules={[{ required: true, message: 'Please input your current password!' }]}
         >
            <Input.Password prefix={<LockOutlined />} placeholder="Current Password" className="h-10" />
         </Form.Item>

         <Form.Item
            label="New Password"
            name="newPassword"
            rules={[{ required: true, message: 'Please input your new password!' }]}
         >
            <Input.Password prefix={<LockOutlined />} placeholder="New Password" className="h-10" />
         </Form.Item>

         <Form.Item
            label="Confirm New Password"
            name="confirmNewPassword"
            dependencies={['newPassword']}
            hasFeedback
            rules={[
               { required: true, message: 'Please confirm your new password!' },
               ({ getFieldValue }) => ({
                  validator(_, value) {
                     if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                     }
                     return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
               }),
            ]}
         >
            <Input.Password prefix={<LockOutlined />} placeholder="Confirm New Password" className="h-10" />
         </Form.Item>

         <Divider />

         <h3 className="text-xl font-semibold text-gray-700 mb-4">Security Options</h3>
         <Space direction="vertical" className="w-full">
            <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-200">
               <div>
                  <p className="font-medium">Two-Factor Authentication (2FA)</p>
                  <p className="text-sm text-gray-500">Add an extra layer of security to your account.</p>
               </div>
               <Switch defaultChecked className="bg-purple-500" />
            </div>
         </Space>

         <Form.Item>
            <Button type="primary" htmlType="submit" className="bg-purple-600 hover:!bg-purple-700 h-10 w-40 mt-6">
               Update Security
            </Button>
         </Form.Item>
      </Form>
   );

   const GeneralSettings = () => (
      <Space direction="vertical" className="w-full lg:w-3/4">
         <h3 className="text-xl font-semibold text-gray-700 mb-2">Application Preferences</h3>
         <Card bordered={false} className="shadow-sm">
            <div className="flex justify-between items-center py-2">
               <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-gray-500">Switch the theme to a darker palette.</p>
               </div>
               <Switch />
            </div>
         </Card>

         <Card bordered={false} className="shadow-sm">
            <div className="flex justify-between items-center py-2">
               <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-500">Receive system alerts via email.</p>
               </div>
               <Switch defaultChecked className="bg-purple-500" />
            </div>
         </Card>

         <Divider />
         <h3 className="text-xl font-semibold text-red-600 mb-2 mt-4">Account Management</h3>
         <Card bordered={false} className="shadow-sm border-l-4 border-red-500">
            <div className="flex justify-between items-center py-2">
               <div>
                  <p className="font-medium text-red-700">Deactivate Account</p>
                  <p className="text-sm text-gray-500">This action is permanent and cannot be undone.</p>
               </div>
               <Button type="danger" onClick={() => message.warning('Deactivation process started.')}>
                  Deactivate
               </Button>
            </div>
         </Card>
      </Space>
   );

   return (
      <div className="min-h-screen bg-gray-100 p-6 sm:p-8 lg:p-10">
         <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Application Settings</h1>
            <p className="text-sm text-gray-500">Manage your account, security, and app preferences.</p>
         </header>

         <div className="bg-white p-6 rounded-xl shadow-lg">
            <Tabs
               defaultActiveKey="profile"
               onChange={setActiveTab}
               size="large"
            >
               <TabPane tab={<span><UserOutlined /> Profile</span>} key="profile">
                  <div className="p-4"><ProfileSettings /></div>
               </TabPane>
               <TabPane tab={<span><LockOutlined /> Security</span>} key="security">
                  <div className="p-4"><SecuritySettings /></div>
               </TabPane>
               <TabPane tab={<span><SettingOutlined /> General</span>} key="general">
                  <div className="p-4"><GeneralSettings /></div>
               </TabPane>
            </Tabs>
         </div>
      </div>
   );
}

export default Settings;