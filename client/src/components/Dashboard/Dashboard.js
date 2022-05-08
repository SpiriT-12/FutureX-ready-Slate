import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Topbar from '../Topbar/Topbar';
// import Board from '../Board/Board';
import BoardContent from '../BoardContent/BoardContent';

const Dashboard = () => {
   
   return (
      <>
         <div class='flex min-w-full min-h-screen  h-screen overflow-hidden bg-blue-100'>
            <aside class=' h-screen sticky top-0 '>
               <Sidebar />
            </aside>
            <div className=' mb-3 mt-1 mr-4 w-screen overflow-x-auto overflow-y-hidden'>
               <div className=' mb-3 mt-0  sticky top-3 left-0 '>
                  <Topbar />
               </div>

               <div className='px-4 flex flex-col'>
                  <BoardContent />
               </div>
            </div>
         </div>
      </>
   );
};

export default Dashboard;
