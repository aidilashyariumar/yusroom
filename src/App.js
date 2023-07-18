// import logo from './logo.svg';
import './App.css';
import AppLayout from './layout/appLayout';
import { BrowserRouter as Router, Route, Routes, IndexRoute } from 'react-router-dom';
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
import login from './pages/login/login';



function App() {
  return (
   <>
      <Router>
      
        <Routes>
          <Route path='login' element={<login/>}/>
          <Route path="/" element={<AppLayout/>} >
            <Route index element={<Home/>}/>
            <Route path="users" element={<Users />}/>
            <Route path="rooms" element={<Rooms />}/>
            <Route path="time" element={<TimePage />}/>

            <Route path="/add-room" element={<AddRoom/>}/>
            <Route path="/edit-room/:id" element={<EditRoom/>} />

            <Route path="/add-user" element={<AddUser />}/>
            <Route path="/edit-user/:id" element={<EditUser/>} />

            <Route path="add-time" element  ={<AddTime />}/>
            <Route path="edit-time" element={<EditTime />}/>
          </Route>
        </Routes>
    
    </Router>
   </>
  );
}

export default App;
