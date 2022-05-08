import React, { useState } from 'react';
import './Register.css';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import CustomErrorMsg from '../CustomErrorMessage/CustomErrorMsg';
import FormikPhoneInput from './FormikPhoneInput';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
   name: yup
      .string()
      .max(20, 'Name must be less than 20 characters.')
      .required('Name is required.'),
   email: yup.string().email('Invalid email id').required('Email is required.'),
   phone: yup.number().required('Phone number is required'),
   password: yup.string().required('Password is required.'),
   confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords don’t match.')
      .required('Re-enter the password.'),
});
const ref = React.createRef();

const Register = () => {
   const [banner, setBanner] = useState('');
   const navigate = useNavigate();

   return (
      <>
         <div className='main'>
            <ToastContainer />

            <div className='container'>
               <div className='justify-content-center row'>
                  <div className='col-xxl-4 col-xl-5 col-lg-6 col-md-8'>
                     <div className='card'>
                        <div className='pt-3 pb-3 text-center bg-primary card-header brandName'>
                           <h2>Trello Clone</h2>
                        </div>
                        <div className='p-4 card-body'>
                           <div className='text-center w-75 m-auto'>
                              <h4 className=' text-center mt-0 fw-bold signupTitle'>
                                 Sign Up
                              </h4>
                           </div>
                           <Formik
                              validationSchema={validationSchema}
                              initialValues={{
                                 name: '',
                                 email: '',
                                 phone: '',
                                 password: '',
                                 confirmPassword: '',
                              }}
                              onSubmit={(values) => {
                                 console.log(values);
                                 axios
                                    .post(
                                       'http://localhost:5000/register',
                                       values
                                    )
                                    .then((res) => {
                                       console.log(res);
                                       if (res.data.status === 200) {
                                          setBanner(res.data.msg);
                                          toast.success(res.data.msg);
                                          navigate('/login');
                                       } else if (res.data.status === 400) {
                                          setBanner(res.data.msg);
                                          toast.error(res.data.msg);
                                       }
                                    });
                              }}
                              // onClick={banner}
                           >
                              {(formik) => (
                                 <Form>
                                    {/* {console.log(formik.values)} */}
                                    <div className='mb-3'>
                                       <label className='form-label'>
                                          Full Name
                                       </label>
                                       <Field
                                          placeholder='Enter your name'
                                          name='name'
                                          type='text'
                                          id='name'
                                          className='form-control shadow-none'
                                       />
                                       <CustomErrorMsg name='name' />
                                    </div>
                                    <div className='mb-3'>
                                       <label className='form-label'>
                                          Email address
                                       </label>
                                       <Field
                                          placeholder='Enter your email'
                                          name='email'
                                          type='text'
                                          id='email'
                                          className='form-control shadow-none'
                                       />
                                       <CustomErrorMsg name='email' />
                                    </div>
                                    <div className='mb-3'>
                                       <label className='form-label'>
                                          Phone number
                                       </label>
                                       <FormikPhoneInput
                                          ref={ref}
                                          name='phone'
                                          className='form-control shadow-none'
                                          formik={formik}
                                          id='phone-input'
                                          onChange={(e) =>
                                             formik.setFieldValue('phone', e)
                                          }
                                       />
                                    </div>
                                    <CustomErrorMsg name='phone' />
                                    <div className='mb-3'>
                                       {' '}
                                       <label className='form-label'>
                                          Password
                                       </label>{' '}
                                       <div className='mb-0 input-group '>
                                          <Field
                                             placeholder='Enter your password'
                                             name='password'
                                             type='password'
                                             id='password'
                                             className='form-control shadow-none'
                                          />
                                       </div>
                                       <CustomErrorMsg name='password' />
                                    </div>
                                    <div className='mb-3'>
                                       {' '}
                                       <label className='form-label'>
                                          Confirm Password
                                       </label>{' '}
                                       <div className='mb-0 input-group '>
                                          <Field
                                             placeholder='Re-enter your password'
                                             name='confirmPassword'
                                             type='password'
                                             id='password'
                                             className='form-control shadow-none'
                                          />
                                       </div>
                                       <CustomErrorMsg name='confirmPassword' />
                                    </div>
                                    <div className='mb-3 mb-0 text-center'>
                                       <button
                                          type='submit'
                                          className='btn btn-primary signupBtn'
                                       >
                                          Sign Up
                                       </button>
                                    </div>
                                 </Form>
                              )}
                           </Formik>
                        </div>
                     </div>
                     <div className='mt-3 row'>
                        <div className='text-center col'>
                           <p className='text-muted'>
                              Already have an account?
                              <button
                                 className='Signup'
                                 onClick={() => navigate('/login')}
                              >
                                 &nbsp; Log In
                              </button>
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Register;
