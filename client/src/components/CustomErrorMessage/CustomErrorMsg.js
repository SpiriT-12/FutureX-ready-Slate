import React from 'react';
import { ErrorMessage } from 'formik';
import './CustomErrorMsg.css';
const CustomErrorMsg = ({ name }) => {
   return (
      <>
         <div className='err'>
            <ErrorMessage name={name} />
         </div>
      </>
   );
};

export default CustomErrorMsg;
