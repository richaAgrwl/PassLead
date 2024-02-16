import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { emailValidateSchema } from '@/arrayList/FormValidation';
import { AnyAction } from '@reduxjs/toolkit';
import { setLoading } from '@/redux/reducer/Loader';
import Loader from '@/pages/loader';
import { email } from '../../type';
import { sendEmail } from '@/redux/action/SendMail';

const FogotPassword = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const loading = useAppSelector((state) => state.loading);
  const [sendMail, setSendMail] = useState<boolean>(false);

  const initialValues = {
    email: '',
  };

  const onResponse = (response: boolean) => {
    setSendMail(response);
  };

  const handleSubmit = (initialValues: email, { resetForm }: any) => {
    const email = initialValues.email;
    const body = JSON.stringify({
      email: email,
    });

    dispatch(setLoading(true) as unknown as AnyAction);
    dispatch(sendEmail(body, onResponse) as unknown as AnyAction);
    resetForm({ initialValues: '' });

    setTimeout(() => {
      setSendMail(false);
    }, 60000);
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
                  validationSchema={emailValidateSchema}
                  onSubmit={handleSubmit}
                >
                  {({ values, errors, touched }) => (
                    <div className='form_parent  my-2'>
                      <div>
                        <div className='new-user text-end'></div>
                        <h3 className='text-primary'>Forgot your password ?</h3>

                        {!sendMail ? (
                          <>
                            <span className='text-muted mb-5'>
                              To reset your password, type the full email
                              address
                            </span>
                            <Form>
                              <div className='form-group mt-5'>
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

                              <div className='my-4'>
                                <div className='col-md-6'>
                                  <button className='login_btn' type='submit'>
                                    Send
                                  </button>
                                </div>
                              </div>
                            </Form>
                          </>
                        ) : (
                          <h5 className='alert alert-primary mt-5'>
                            Please check your Email
                          </h5>
                        )}
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

export default FogotPassword;
