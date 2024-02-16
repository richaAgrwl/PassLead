import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { passwordValidateSchema } from '@/arrayList/FormValidation';
import Loader from '@/pages/loader';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setLoading } from '@/redux/reducer/Loader';
import { AnyAction } from '@reduxjs/toolkit';
import { resetPass } from '../../type';
import { resetPassword } from '@/redux/action/ResetPass';
import Link from 'next/link';

const ResetPassword = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const loading = useAppSelector((state) => state.loading);

  const initialValues = {
    password: '',
    confirmPassword: '',
  };
  const { token } = router.query;
  const handleSubmit = (initialValues: resetPass, { resetForm }: any) => {
    const { password, confirmPassword } = initialValues;
    const body = JSON.stringify({
      newPassword: password,
      confirmPassword: confirmPassword,
    });

    dispatch(setLoading(true) as unknown as AnyAction);
    dispatch(
      resetPassword(body, token as string, router) as unknown as AnyAction
    );
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
                  <img src='../logo.svg' />
                </div>
                <div className='login-img '>
                  <img src='../mobile-login.svg' />
                </div>
              </div>
              <div className='col-md-6 col-12  '>
                <Formik
                  initialValues={initialValues}
                  validationSchema={passwordValidateSchema}
                  onSubmit={handleSubmit}
                >
                  {({ values }) => (
                    <div className='form_parent  my-2'>
                      <div>
                        <div className='new-user text-end'></div>
                        <h3 className='text-primary'>Reset your password ?</h3>
                        <span className='text-muted mb-5'>
                          Enter a new password below to change your password
                        </span>

                        <Form>
                          <div className='form-group mt-5'>
                            <label className='form-label'>
                              <img
                                className='login-icons'
                                src='../lock-password.svg'
                              />
                            </label>
                            <Field
                              className='form-control'
                              type='password'
                              name='password'
                              placeholder='new password'
                              value={values.password}
                              autoComplete='username'
                            />
                            <div className='error-container'>
                              <ErrorMessage
                                name='password'
                                component='div'
                                className='text-danger'
                              />
                            </div>
                          </div>

                          <div className='form-group'>
                            <label className='form-label'>
                              <img
                                className='login-icons'
                                src='../password-svgrepo.svg'
                              />
                            </label>
                            <Field
                              className='form-control'
                              type='password'
                              name='confirmPassword'
                              placeholder='confirm your password'
                              autoComplete='username'
                              value={values.confirmPassword}
                            />
                            <div className='error-container'>
                              <ErrorMessage
                                name='confirmPassword'
                                component='div'
                                className='text-danger'
                              />
                            </div>
                          </div>

                          <div className='row my-4'>
                            <div className='col-md-6'>
                              <button className='login_btn' type='submit'>
                                Reset
                              </button>
                            </div>
                            <div className='col-md-6 mt-3'>
                              <span className='text-muted'>
                                Again send{' '}
                                <Link href='/forgot-password'>Email ?</Link>{' '}
                              </span>
                            </div>
                            <div className='col-md-6'></div>
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

export default ResetPassword;
