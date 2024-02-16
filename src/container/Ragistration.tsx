import React, { ChangeEvent, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { userSchema } from '@/arrayList/FormValidation';
import { RegisterUser } from '@/redux/action/Register';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { AnyAction } from '@reduxjs/toolkit';
import { registerType } from '../../type';
import Loader from '@/pages/loader';
import { setLoading } from '@/redux/reducer/Loader';
import Stripe from 'stripe';
import { createUser } from '@/redux/reducer/stripe';
import { City, Country, State } from 'country-state-city';
import { useRouter } from 'next/router';
const Registration = () => {
  const countryList = Country.getAllCountries();

  const dispatch = useAppDispatch();
  const router = useRouter();

  const [isLeadGeneratorSelected, setLeadGeneratorSelected] = useState(false);
  const [isExplorerSelected, setExplorerSelected] = useState(false);
  const toggleLeadGenerator = () => {
    setLeadGeneratorSelected(!isLeadGeneratorSelected);
  };

  const toggleExplorer = () => {
    setExplorerSelected(!isExplorerSelected);
  };

  const loading = useAppSelector((state) => state.loading);

  const [selectedCountry, setSelectedCountry] = useState('');
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const initialValues = {
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postal_code: '',
    userType: '',
    agencyName: '',
    agencyUrl: '',
    password: '',
    confirmPassword: '',
    registerAs: '',
  };
  const handleSubmit = async (
    initialValues: registerType,
    { resetForm }: any
  ) => {
    const stripe = new Stripe(
      process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string
    );

    // Create a new object with the fields we want to send
    const {
      name,
      email,
      address,
      city,
      state,
      country,
      postal_code,
      password,
      agencyName,
      agencyUrl,
      userType,
      registerAs,
    } = initialValues;

    const customer = await stripe.customers.create({
      email,
      name,
    });
    dispatch(createUser(customer));

    const formData = {
      name,
      email,
      password,
      agencyName,
      agencyUrl,
      agency: userType == 'agency' ? true : false,
      role: registerAs,
      address,
      pinCode: postal_code,
      state,
      city,
      country,
      customer_id: customer.id,
    };
    dispatch(setLoading(true));
    dispatch(RegisterUser(formData, router) as unknown as AnyAction);

    resetForm();
    if (isExplorerSelected === true || isLeadGeneratorSelected === true) {
      setExplorerSelected(false);
      setLeadGeneratorSelected(false);
    }
  };
  return (
    <section className='form_bg d-flex align-items-center'>
      <div className='container'>
        <div className='login_parent my-5'>
          {loading ? (
            <Loader />
          ) : (
            <div className='login_container row bg-white'>
              <div className='col-md-5 col-12  d-flex align-items-center position-relative right_img'>
                <div className='logo-icon'>
                  <img src='logo.svg' />
                </div>
                <div className='login-img'>
                  <img src='./login.svg' alt='' className='' />
                </div>
              </div>
              <div className='  bg-white  col-md-7  '>
                <Formik
                  initialValues={initialValues}
                  validationSchema={userSchema}
                  validateOnBlur={true}
                  validateOnChange={true}
                  onSubmit={handleSubmit}
                >
                  {({ values, handleBlur, setFieldValue }) => (
                    <div className='form_parent py-5'>
                      <div>
                        <h3 className='login-heading'>Registration Form</h3>

                        <Form>
                          <div className=' row'>
                            <div className='col-md-6 col-12'>
                              <div className=' form-group '>
                                <label className='form-label'>
                                  <img
                                    className='login-icons'
                                    src='./profile.svg'
                                  />
                                </label>
                                <Field
                                  className='form-control'
                                  type='name'
                                  name='name'
                                  placeholder='enter your name'
                                  value={values.name}
                                  onBlur={handleBlur}
                                ></Field>
                                <div className='error-container'>
                                  <ErrorMessage
                                    name='name'
                                    component='div'
                                    className='text-danger'
                                  />
                                </div>
                              </div>
                            </div>
                            <div className='col-md-6 col-12'>
                              <div className='form-group'>
                                <label className='form-label'>
                                  <img
                                    className='login-icons'
                                    src='./email-svgrepo.svg'
                                  />
                                </label>
                                <Field
                                  className='form-control'
                                  type='email'
                                  name='email'
                                  placeholder='enter your email'
                                  value={values.email}
                                ></Field>
                                <div className='error-container'>
                                  <ErrorMessage
                                    name='email'
                                    component='div'
                                    className='text-danger'
                                  />
                                </div>
                              </div>
                            </div>
                            <div className='col-md-12 col-12'>
                              <div className='form-group'>
                                <label className='form-label'>
                                  <img
                                    className='login-icons'
                                    src='./address-svgrepo.svg'
                                  />
                                </label>
                                <Field
                                  className='form-control'
                                  name='address'
                                  as='textarea'
                                  placeholder='enter your address'
                                ></Field>
                                <div className='error-container'>
                                  <ErrorMessage
                                    name='address'
                                    component='div'
                                    className='text-danger'
                                  />
                                </div>
                              </div>
                            </div>
                            <div className='col-md-6 col-12'>
                              <div className='form-group'>
                                <Field
                                  as='select'
                                  className='form-select form-control'
                                  aria-label='Default select example'
                                  name='country'
                                  onChange={(
                                    e: ChangeEvent<HTMLInputElement>
                                  ) => {
                                    const selectedCountry = e.target.value;
                                    setFieldValue('country', selectedCountry);
                                    setSelectedCountry(selectedCountry);

                                    // Fetch and set the states for the selected country

                                    const countryStates =
                                      State.getStatesOfCountry(selectedCountry);
                                    setStates(countryStates as []);
                                    // Reset cities
                                    setCities([]);
                                  }}
                                  value={values.country}
                                >
                                  <option>Select your Country</option>
                                  {countryList
                                    .filter(
                                      (option: any) => option.isoCode === 'US'
                                    ) // Filter for the United States
                                    .map((option: any, ind: number) => (
                                      <option value={option.isoCode} key={ind}>
                                        {option.flag} &nbsp;{option.name}
                                      </option>
                                    ))}
                                </Field>
                                <div className='error-container'>
                                  <ErrorMessage
                                    name='country'
                                    component='div'
                                    className='text-danger'
                                  />
                                </div>
                              </div>
                            </div>

                            <div className='col-md-6 col-12'>
                              <div className='form-group'>
                                <label className='form-label'>
                                  <img
                                    className='login-icons'
                                    src='./state.svg'
                                  />
                                </label>
                                <Field
                                  as='select'
                                  className='form-select form-control'
                                  aria-label='Default select example'
                                  name='state'
                                  onChange={(
                                    e: ChangeEvent<HTMLInputElement>
                                  ) => {
                                    const selectedStateCode = e.target.value;

                                    setFieldValue('state', selectedStateCode);
                                    // Fetch and set the cities for the selected state
                                    const countryCities = City.getCitiesOfState(
                                      selectedCountry,
                                      selectedStateCode
                                    );
                                    setCities(countryCities as []);
                                  }}
                                >
                                  <option>Select your State</option>
                                  {states.map((option: any, ind: number) => (
                                    <option value={option.isoCode} key={ind}>
                                      {option.flag} &nbsp;{option.name}
                                    </option>
                                  ))}
                                </Field>
                                <div className='error-container'>
                                  <ErrorMessage
                                    name='country'
                                    component='div'
                                    className='text-danger'
                                  />
                                </div>
                              </div>
                            </div>
                            <div className='col-md-6 col-12'>
                              <div className='form-group'>
                                <label className='form-label'>
                                  <img
                                    className='login-icons'
                                    src='./city-town.svg'
                                  />
                                </label>
                                <Field
                                  as='select'
                                  className='form-select form-control'
                                  aria-label='Default select example'
                                  name='city'
                                  onChange={(
                                    e: ChangeEvent<HTMLInputElement>
                                  ) => {
                                    const selectedCity = e.target.value;
                                    setFieldValue('city', selectedCity);
                                  }}
                                >
                                  <option>Select your City</option>
                                  {cities.map((option: any, ind: number) => (
                                    <option value={option.name} key={ind}>
                                      {option.flag} &nbsp;{option.name}
                                    </option>
                                  ))}
                                </Field>
                                <div className='error-container'>
                                  <ErrorMessage
                                    name='country'
                                    component='div'
                                    className='text-danger'
                                  />
                                </div>
                              </div>
                            </div>

                            <div className='col-md-6 col-12'>
                              <div className='form-group'>
                                <label className='form-label'>
                                  <img
                                    className='login-icons'
                                    src='./address.svg'
                                  />
                                </label>
                                <Field
                                  className='form-control'
                                  type='number'
                                  name='postal_code'
                                  placeholder='enter pin code'
                                ></Field>
                                <div className='error-container'>
                                  <ErrorMessage
                                    name='postal_code'
                                    component='div'
                                    className='text-danger'
                                  />
                                </div>
                              </div>
                            </div>
                            <div className='col-12 mb-2'>Are You an</div>
                            <div className='col-md-6 col-12 mb-4'>
                              <button
                                type='button'
                                className={
                                  values.userType === 'agency'
                                    ? 'inputBtn active'
                                    : 'inputBtn'
                                }
                                name='agency'
                                onClick={() => {
                                  setFieldValue('userType', 'agency');
                                }}
                              >
                                Agency
                              </button>
                            </div>
                            <div className='col-md-6 col-12'>
                              <button
                                type='button'
                                className={
                                  values.userType === 'indivisual'
                                    ? 'inputBtn active'
                                    : 'inputBtn'
                                }
                                name='agency'
                                onClick={() =>
                                  setFieldValue('userType', 'indivisual')
                                }
                              >
                                Individual
                              </button>
                            </div>
                            <div className='error-container'>
                              <ErrorMessage
                                name='userType'
                                component='div'
                                className='text-danger'
                              />
                            </div>

                            {values.userType === 'agency' ? (
                              <>
                                <div className='col-md-6 col-12'>
                                  <div className='form-group '>
                                    <label className='form-label'>
                                      {/* <img className='login-icons' src='./agency.svg' /> */}
                                      <img
                                        className='login-icons'
                                        src='./agency.svg'
                                      />
                                    </label>
                                    <Field
                                      className='form-control'
                                      type='text'
                                      name='agencyName'
                                      placeholder='agencyName'
                                      value={values.agencyName}
                                    ></Field>
                                  </div>
                                </div>
                                <div className='col-md-6 col-12'>
                                  <div className='form-group'>
                                    <label className='form-label'>
                                      <img
                                        className='login-icons'
                                        src='./url.svg'
                                      />
                                    </label>
                                    <Field
                                      className='form-control'
                                      type='text'
                                      name='agencyUrl'
                                      placeholder='agencyUrl'
                                      value={values.agencyUrl}
                                    ></Field>
                                  </div>
                                </div>
                              </>
                            ) : (
                              ''
                            )}

                            <div className='col-md-6 col-12'>
                              <div className='form-group'>
                                <label className='form-label'>
                                  <img
                                    className='login-icons'
                                    src='./lock-password.svg'
                                  />
                                </label>
                                <Field
                                  className='form-control'
                                  type='password'
                                  name='password'
                                  placeholder='enter password'
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
                            </div>

                            <div className='col-md-6 col-12'>
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
                                  name='confirmPassword'
                                  placeholder='re-enter password'
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
                            </div>
                            <div className='col-12'>Register as</div>

                            <div className='col-md-6 col-12'>
                              <button
                                type='button'
                                value={'Lead Generator'}
                                className={
                                  isLeadGeneratorSelected
                                    ? 'inputBtn active'
                                    : 'inputBtn'
                                }
                                onClick={() => {
                                  setFieldValue('registerAs', 'lead generator');
                                  toggleLeadGenerator();
                                }}
                              >
                                Lead Generator
                              </button>
                            </div>
                            <div className='col-md-6 col-12'>
                              <button
                                type='button'
                                value={'explorer'}
                                name='registerAs'
                                onClick={() => {
                                  setFieldValue('registerAs', 'explorer');
                                  toggleExplorer();
                                }}
                                className={
                                  isExplorerSelected
                                    ? 'inputBtn active'
                                    : 'inputBtn'
                                }
                              >
                                Explorer
                              </button>
                            </div>
                          </div>
                          <div className='error-container'>
                            <ErrorMessage
                              name='registerAs'
                              component='div'
                              className='text-danger'
                            />
                          </div>

                          <button
                            className='login_btn w-100 mt-4'
                            type='submit'
                          >
                            Save
                          </button>
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

export default Registration;
