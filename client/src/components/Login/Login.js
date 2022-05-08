import React, { useState } from 'react';
import './Login.css';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../CustomErrorMessage/CustomErrorMsg.css';
const Login = ({ setUser }) => {
   const navigate = useNavigate();
   const [loginMsg, setLoginMsg] = useState('');

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
                              <h4 className=' text-center mt-0 fw-bold signinTitle'>
                                 Sign In
                              </h4>
                           </div>
                           <Formik
                              initialValues={{
                                 email: '',
                                 password: '',
                              }}
                              onSubmit={(values) => {
                                 console.log(values);
                                 axios
                                    .post('http://localhost:5000/login', values)
                                    .then((res) => {
                                       console.log(res);
                                       if (res.data.status === 404) {
                                          toast.error(res.data.msg);
                                       } else if (res.data.status === 401) {
                                          setLoginMsg(res.data.msg);
                                          toast.error(res.data.msg);
                                       } else if (res.data.status === 200) {
                                          setLoginMsg();
                                          toast.success(
                                             'welcome ' + res.data.user.name
                                          );
                                          setUser(res.data.user);
                                          navigate('/');
                                          console.log(res.data);
                                       }
                                    });
                              }}
                           >
                              {(formik) => (
                                 <Form>
                                    <div className='mb-3'>
                                       <label className='form-label'>
                                          Email address
                                       </label>
                                       <Field
                                          required
                                          placeholder='Enter your email'
                                          name='email'
                                          type='text'
                                          id='email'
                                          className='form-control shadow-none'
                                       />
                                    </div>
                                    <div className='mb-3'>
                                       {' '}
                                       <label className='form-label'>
                                          Password
                                       </label>
                                       <button
                                          className='text-muted float-end forgetPass'
                                          // onClick={() => navigate('/register')}
                                       >
                                          Forget Password?
                                       </button>
                                       <div className='mb-0 input-group '>
                                          <Field
                                             required
                                             placeholder='Enter your password'
                                             name='password'
                                             type='password'
                                             id='password'
                                             className='form-control shadow-none'
                                          />
                                       </div>
                                       <p className='err'>{loginMsg}</p>
                                    </div>

                                    <div className='mb-3 mb-0 text-center'>
                                       <button
                                          type='submit'
                                          className='btn btn-primary loginBtn'
                                       >
                                          Log In
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
                              Don't have an account?
                              <button
                                 className='Signup'
                                 onClick={() => navigate('/register')}
                              >
                                 &nbsp; Sign Up
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

export default Login;
