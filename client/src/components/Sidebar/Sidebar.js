import React, { useState } from 'react';

const Sidebar = () => {
   const [openSidebar, setOpenSidebar] = useState(true);
   // const Menus = [{ title: 'Boards', src: 'Dashboard' }, {}];
   return (
      <>
         <div
            className={` ${
               openSidebar ? 'w-64' : 'w-24'
            } duration-300 rounded-md h-[calc(100%_-_32px)] mt-3 mx-3 px-4 pt-4  bg-white shadow-md relative `}
         >
            <svg
               xmlns='http://www.w3.org/2000/svg'
               className={` h-8 w-8 absolute cursor-pointer border-2 fill-white border-white bg-blue-100 rounded-full -right-3 top-7 ${
                  !openSidebar && 'rotate-180'
               } duration-300 `}
               viewBox='0 0 20 20'
               fill='currentColor'
               onClick={() => setOpenSidebar(!openSidebar)}
            >
               <path
                  fillRule='evenodd'
                  d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                  clipRule='evenodd'
               />
            </svg>
            <div className='flex gap-x-4 items-center '>
               <img
                  src={'images/Slate.svg'}
                  alt=''
                  className={` cursor-pointer duration-500 w-11 ${
                     openSidebar && 'rotate-[360deg] '
                  }`}
               />
               <h1
                  className={` text-blue-700 font-ubuntu text-3xl my-auto duration-300 ${
                     !openSidebar && 'scale-0'
                  } `}
               >
                  Slate
               </h1>
            </div>
            <ul></ul>
         </div>
      </>
   );
};

export default Sidebar;
