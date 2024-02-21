import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Admin from './pages/Admin/Admin';
import AdminDashbard from './pages/AdminDashboard/AdminDashbard';
import UserContext from "./config/context"
import { useState } from 'react';
import Booking from './pages/Booking/Booking';
// import homePage from "./paspark_html/paspark/index.html"

function App() {
  const [state,setState] = useState()

  return (
    <BrowserRouter>
    <UserContext.Provider value={{state,setState}}>

      <Routes>
        <Route index element={<Home/>}/>
        <Route path='/admin' element={<Admin />} />
        <Route path='/admin/dashboard' element={<AdminDashbard/>} />
        <Route path='/slots' element={<Booking/>} />
      </Routes>
    </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
