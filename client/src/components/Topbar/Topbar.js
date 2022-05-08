import React from 'react';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { SearchIcon } from '@heroicons/react/outline';
const Topbar = (props) => {
   const user = {
      name: 'Praveen Sharma',
      email: 'praveen@gmail.com',
      imageUrl: 'https://wallpaperaccess.com/full/925056.png',
   };

   const userNav = [{ name: 'Log out', href: '#' }];
   function classNames(...classes) {
      return classes.filter(Boolean).join(' ');
   }
   return (
      <>
         <div className=' h-16 rounded-md bg-white shadow-md'>
            <div className='h-full px-5 py-0 flex items-center justify-between'>
               <div className='flex px-5 items-center'>
                  <SearchIcon className='w-5 h-5 text-gray-600' />
                  <input
                     type='text'
                     placeholder='Search for tasks ...'
                     className=' bg-transparent border-0 text-gray-600 placeholder-gray-500
                outline-none focus:ring-0 text-lg'
                  />
               </div>
               <div className='topRight flex items-center'>
                  <span className='text-gray-600'>{user.name} &nbsp; </span>

                  <Menu as='div' className='ml-3 relative '>
                     <div>
                        <Menu.Button className='max-w-xs flex items-center text-sm'>
                           <img
                              className='h-11 w-11 rounded-full'
                              src={user.imageUrl}
                              alt=''
                           />
                        </Menu.Button>
                     </div>
                     <Transition
                        as={Fragment}
                        enter='transition ease-out duration-100'
                        enterFrom='transform opacity-0 scale-95'
                        enterTo='transform opacity-100 scale-100'
                        leave='transition ease-in duration-75'
                        leaveFrom='transform opacity-100 scale-100'
                        leaveTo='transform opacity-0 scale-95'
                     >
                        <Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-md py-1 bg-white '>
                           {userNav.map((item) => (
                              <Menu.Item key={item.name}>
                                 {({ active }) => (
                                    <a
                                       href={item.href}
                                       className={classNames(
                                          active ? 'bg-gray-100' : '',
                                          'block px-4 py-2 text-sm text-gray-700 no-underline z-99'
                                       )}
                                    >
                                       {item.name}
                                    </a>
                                 )}
                              </Menu.Item>
                           ))}
                        </Menu.Items>
                     </Transition>
                  </Menu>
               </div>
            </div>
         </div>
      </>
   );
};

export default Topbar;
