import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
const Home = () => {
   const navigate = useNavigate();
   return (
      <>
         <div className='homepage'>
            <h1>Hello Welcome!</h1>

            <div className='btn btn-primary' onClick={() => navigate('/login')}>
               Logout
            </div>
            <div className=''></div>
            <Dashboard />
         </div>
      </>
   );
};

export default Home;
