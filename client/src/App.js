import { useEffect, useState } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Home from './components/Home/Home';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';

const App = () => {
   const [user, setUser] = useState();
   const [loginStatus, setLoginStatus] = useState('');
   axios.defaults.withCredentials = true;
   useEffect(() => {
      axios.get('http://localhost:5000/login').then((result) => {
         if (result.data.loggedIn === true) {
            setLoginStatus(result.data.user);
         }
      });
   });
   return (
      <div>
         <BrowserRouter>
            <Routes>
               <Route
                  exact
                  path='/'
                  element={
                     loginStatus && loginStatus.user_id ? (
                        <Home />
                     ) : (
                        <Login setUser={setUser} />
                     )
                  }
               />

               <Route path='/register' element={<Register />} />
               <Route path='/login' element={<Login setUser={setUser} />} />
               <Route path='/dashboard' element={<Dashboard />} />
            </Routes>
         </BrowserRouter>
      </div>
   );
};

export default App;
