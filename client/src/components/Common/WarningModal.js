import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { ExclamationCircleIcon, XIcon } from '@heroicons/react/outline';
import parse from 'html-react-parser';
import {
   MODAL_ACTION_CLOSE,
   MODAL_ACTION_CONFIRM,
} from '../../utilities/constant';

const WarningModal = (props) => {
   const { content, show, onAction } = props;
   return (
      <>
         {/* From here */}
         <Modal
            centered
            className='bg-gray-900 bg-opacity-70'
            show={show}
            backdrop='static'
            // onHide={() => onAction(MODAL_ACTION_CLOSE)}
         >
            <div class=' rounded-lg shadow py-3'>
               <button
                  onClick={() => onAction(MODAL_ACTION_CLOSE)}
                  type='button'
                  className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5  ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white'
               >
                  <XIcon className='w-5' />
               </button>
               <div class='p-6 text-center'>
                  <ExclamationCircleIcon className='mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200' />
                  <h3 className='mb-5 text-lg font-medium text-gray-500 dark:text-gray-400'>
                     <Modal.Body>{parse(content)}</Modal.Body>
                  </h3>
                  <button
                     onClick={() => onAction(MODAL_ACTION_CONFIRM)}
                     type='button'
                     className='text-white bg-red-600 hover:bg-red-800 focus:ring-2 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-4 py-2.5 text-center mr-2'
                  >
                     Yes, I'm sure
                  </button>
                  <button
                     onClick={() => onAction(MODAL_ACTION_CLOSE)}
                     type='button'
                     className='text-gray-500 bg-white hover:bg-gray-200 focus:ring-2 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-4 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600'
                  >
                     No, cancel
                  </button>
               </div>
            </div>
         </Modal>
         {/* To here */}
      </>
   );
};

export default WarningModal;
