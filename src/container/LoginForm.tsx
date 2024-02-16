import React from 'react';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Login } from '@/redux/action/Register';
import { loginSchema } from '@/arrayList/FormValidation';
import { loginType } from '../../type';
import { AnyAction } from '@reduxjs/toolkit';
import { setLoading } from '@/redux/reducer/Loader';
import Loader from '@/pages/loader';

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const loading = useAppSelector((state) => state.loading);

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = (initialValues: loginType, { resetForm }: any) => {
    dispatch(setLoading(true) as unknown as AnyAction);
    dispatch(Login(initialValues, router) as unknown as AnyAction);
    // router.push('/all-leads');
    resetForm({ initialValues: '' });
  };

  return (
    <section className='form_bg d-flex align-items-center'>
      <div className='container '>
        <div className='login_parent '>
          {loading ? (
            <Loader />
          ) : (
            <div className='login_container shadow-lg row bg-white'>
              <div className='col-md-6 col-12 bg-white d-flex align-items-center position-relative right_img'>
                <div className='logo-icon'>
                  <img src='logo.svg' />
                </div>
                <div className='login-img '>
                  <img src='./mobile-login.svg' />
                </div>
              </div>
              <div className='col-md-6 col-12  '>
                <Formik
                  initialValues={initialValues}
                  validationSchema={loginSchema}
                  onSubmit={handleSubmit}
                >
                  {({ values, errors, touched, isSubmitting }) => (
                    <div className='form_parent  my-2'>
                      <div>
                        <div className='new-user text-end'>
                          <div>
                            new user? <a href='/registration'>Registration</a>
                          </div>
                        </div>
                        <h3 className='login-heading'>
                          Log in to your account
                        </h3>

                        <Form>
                          <div className='form-group'>
                            <label className='form-label'>
                              <img
                                className='login-icons'
                                src='email-svgrepo.svg'
                              />
                            </label>
                            <Field
                              className='form-control'
                              type='email'
                              name='email'
                              placeholder='enter your email'
                              value={values.email}
                            />
                            <div className='error-container'>
                              {errors.email && touched.email ? (
                                <div className='text-danger'>
                                  {errors.email}
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div className='form-group'>
                            <label className='form-label'>
                              <img
                                className='login-icons'
                                src='./password-svgrepo.svg'
                              />
                            </label>
                            <Field
                              className='form-control'
                              type='password'
                              name='password'
                              placeholder=' enter password'
                              value={values.password}
                              autoComplete='true'
                            />
                            <div className='error-container'>
                              {errors.password && touched.password ? (
                                <div className='text-danger'>
                                  {errors.password}
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div className='my-4'>
                            <div className='row'>
                              <div className='col-6'>
                                <div className='form-check mb-4'>
                                  <Field
                                    className='form-check-input'
                                    type='checkbox'
                                    value=''
                                    id='flexCheckChecked'
                                    checked
                                  />
                                  <label
                                    className='form-check-label'
                                    htmlFor='flexCheckChecked'
                                  >
                                    Remember me
                                  </label>
                                </div>
                              </div>
                              <div className='col-6'></div>
                              <div className='col-md-6'>
                                <button className='login_btn' type='submit'>
                                  Login
                                </button>
                              </div>

                              <div className='col-6 d-flex justify-content-center align-items-center'>
                                <div>
                                  <a
                                    href='/forgot-password'
                                    className='form-check-label'
                                  >
                                    {' '}
                                    Forgot Password
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Form>
                      </div>
                    </div>
                  )}
                </Formik>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
