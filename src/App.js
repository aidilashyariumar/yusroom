// import logo from './logo.svg';
import './App.css';
import AppLayout from './layout/appLayout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/index'; 
import Users from './pages/Users';
import Rooms from './pages/rooms/Rooms';
import EditRoom from './pages/rooms/edit';
import AddRoom from './pages/rooms/add';



function App() {
  return (
   <>
      <Router>
      
        <Routes>
          
          <Route path="/" element={<AppLayout />} >
            <Route index element={<Home/>} />
            <Route path="users" element={<Users />} />
            <Route path="rooms" element={<Rooms />} />

            <Route path="/add-room" element={<AddRoom/>} />
            <Route path="/edit-room" element={<EditRoom />} />

          </Route>
        </Routes>
    
    </Router>
   </>
  );
}

export default App;
