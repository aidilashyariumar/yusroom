import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppLayout from './layout/appLayout';
import Home from './pages/home/index'; 
import Users from './pages/users/Users';
import Rooms from './pages/rooms/Rooms';
import EditRoom from './pages/rooms/edit';
import AddRoom from './pages/rooms/add';
import EditUser from './pages/users/edit';
import AddUser from './pages/users/add';
import AddTime from './pages/time.jsx/add';
import TimePage from './pages/time.jsx';
import EditTime from './pages/time.jsx/edit';
import LoginPage from './pages/login/index';
import { ProtectedRoute } from './utils.jsx/ProtectedRoute';

function App() {
  return (
        <Routes>
        <Route path='/login' element={<LoginPage/>} />
          <Route path='/' element={
            <ProtectedRoute>
              <AppLayout/>
            </ProtectedRoute>
          }>
            <Route index element={<Home/>} />
            <Route path="users" element={<Users/>} />
            <Route path="rooms" element={<Rooms/>} />
            <Route path="time" element={<TimePage/>} />

            <Route path="add-room" element={<AddRoom/>} />
            <Route path="edit-room/:id" element={<EditRoom/>} />

            <Route path="add-user" element={<AddUser/>} />
            <Route path="edit-user/:id" element={<EditUser/>} />

            <Route path="add-time" element={<AddTime/>} />
            <Route path="edit-time/:id" element={<EditTime/>} />
           </Route>
        </Routes>
  );
}

export default App;
