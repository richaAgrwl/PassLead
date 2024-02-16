import React, { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { AnyAction } from '@reduxjs/toolkit';

import { Country } from 'country-state-city';
import { leadValidationSchema } from '@/arrayList/FormValidation';
import { AddNewLeads } from '@/redux/action/AddLead';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setLoading } from '@/redux/reducer/Loader';
import Loader from '@/pages/loader';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

const countryList = Country.getAllCountries();
const AddLeads = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [file, setFile] = useState<File[]>([]);
  const [filePreview, setFilePreview] = useState<string[]>([]);

  // State to store the base64
  const loading = useAppSelector((state) => state.loading);
  const initialValues = {
    leadTitle: '',
    leadDescription: '',
    approxBudget: '',
    preferredLocation: '',
    leadEmail: '',
    leadPhone: '',
    clientLocation: '',
    country: '',
    leadCost: '',
    numberApplication: '',
    leadProof: null,
  };
  const handleInputClick = () => {
    setFile([]);
    setFilePreview([]);
  };
  return (
    <>
      <section className=' form_bg'>
        <div className='container'>
          <div className='row lead_section  my-5'>
            {loading ? (
              <Loader />
            ) : (
              <Formik
                initialValues={initialValues}
                validationSchema={leadValidationSchema}
                validateOnChange={true}
                validateOnBlur={true}
                onSubmit={async (values, { resetForm }) => {
                  try {
                    const {
                      leadTitle,
                      leadDescription,
                      leadEmail,
                      leadPhone,
                      clientLocation,
                      leadCost,
                      numberApplication,
                      leadProof,
                    } = values;
                    const formValues = {
                      title: leadTitle,
                      description: leadDescription,
                      price: leadCost,
                      max_number_applicant: numberApplication,
                      email: leadEmail,
                      phone_number: leadPhone,
                      client_location: clientLocation,
                    };

                    dispatch(setLoading(true));
                    dispatch(
                      AddNewLeads(
                        formValues,
                        file as []
                      ) as unknown as AnyAction
                    );
                    resetForm();
                    setFile([]);
                    router.push('/all-leads');
                  } catch (error: any) {
                    toast.error(error);
                  }
                }}
              >
                {({ values, handleBlur, handleChange, setFieldValue }) => (
                  <div className='col-12  lead_list_container'>
                    <Form>
                      <div className='bg-white  px-5 my-5'>
                        <div className='text-center'>
                          <h1 className='lead-heading'>Add Leads</h1>
                        </div>

                        <fieldset className=' list-fielset '>
                          <legend className=''>Cover Letter</legend>
                          <div className='row  '>
                            <div className='mb-2'></div>

                            <div className='col-md-12 col-12 mb-3'>
                              <label className='form-label'>Title</label>&nbsp;
                              <span className='text-danger'>*</span>
                              <Field
                                type='text'
                                name='leadTitle'
                                className='form-control '
                                value={values.leadTitle}
                                placeholder='Title'
                                onBlur={handleBlur}
                              />
                              <div className='error-container'>
                                <ErrorMessage
                                  name='leadTitle'
                                  component='div'
                                  className='text-danger'
                                />
                              </div>
                            </div>

                            <div className='col-md-12 col-12 mb-3'>
                              <label className='form-label'>Description</label>
                              &nbsp;
                              <span className='text-danger'>*</span>
                              <Field
                                as='textarea'
                                name='leadDescription'
                                className='form-control'
                                rows='3'
                                value={values.leadDescription}
                                placeholder='Description'
                                onBlur={handleBlur}
                              />
                              <div className='error-container'>
                                <ErrorMessage
                                  name='leadDescription'
                                  component='div'
                                  className='text-danger'
                                />
                              </div>
                            </div>

                            <div className='col-md-6 col-12 mb-3'>
                              <label className='form-label'>
                                Approx Budget(in dollar)
                              </label>
                              &nbsp;
                              <span className='text-danger'>*</span>
                              <Field
                                type='number'
                                name='approxBudget'
                                className='form-control'
                                value={values.approxBudget}
                                placeholder='10$'
                                onBlur={handleBlur}
                              />
                              <div className='error-container'>
                                <ErrorMessage
                                  name='approxBudget'
                                  component='div'
                                  className='text-danger '
                                />
                              </div>
                            </div>

                            <div className='col-md-6 col-12 mb-3'>
                              <label className='form-label'>
                                Preferred Location
                              </label>
                              <Field
                                type='text'
                                name='preferredLocation'
                                className='form-control'
                                value={values.preferredLocation}
                                placeholder='location'
                                onBlur={handleBlur}
                              />
                              <div className='error-container'>
                                <ErrorMessage
                                  name='preferredLocation'
                                  component='div'
                                  className='text-danger mt-2'
                                />
                              </div>
                            </div>
                          </div>
                        </fieldset>

                        <fieldset className='mt-5 list-fielset '>
                          <legend className=''>Secrete Envelope</legend>
                          <div className='row  '>
                            <div className='mb-3 col-md-12 col-12'>
                              <label className='form-label'>Email</label>
                              &nbsp;
                              <span className='text-danger'>*</span>
                              <Field
                                className='form-control'
                                type='email'
                                name='leadEmail'
                                value={values.leadEmail}
                                placeholder='Email'
                                onBlur={handleBlur}
                              />
                              <div className='error-container'>
                                <ErrorMessage
                                  name='leadEmail'
                                  component='div'
                                  className='text-danger'
                                />
                              </div>
                            </div>

                            <div className='mb-3 col-md-6 col-12'>
                              <label className='form-label'>
                                Contact Number
                              </label>
                              &nbsp;
                              <span className='text-danger'>*</span>
                              <Field
                                className='form-control'
                                type='number'
                                name='leadPhone'
                                value={values.leadPhone}
                                placeholder='Contact number'
                                onBlur={handleBlur}
                              />
                              <div className='error-container'>
                                <ErrorMessage
                                  name='leadPhone'
                                  component='div'
                                  className='text-danger '
                                />
                              </div>
                            </div>

                            <div className='mb-3 col-md-6 col-12'>
                              <label className='form-label'>
                                Client Location
                              </label>
                              &nbsp;
                              <span className='text-danger'>*</span>
                              <Field
                                className='form-control'
                                type='text'
                                name='clientLocation'
                                value={values.clientLocation}
                                placeholder='Indore'
                                onBlur={handleBlur}
                              />
                              <div className='error-container'>
                                <ErrorMessage
                                  name='clientLocation'
                                  component='div'
                                  className='text-danger'
                                />
                              </div>
                            </div>

                            <div className='mb-3 col-md-6 col-12'>
                              <label className='form-label'>Country</label>

                              <Field
                                as='select'
                                className='form-select form-control'
                                aria-label='Default select example'
                                onBlur={handleBlur}
                                name='country'
                              >
                                <option>Please select your Country</option>
                                {countryList.map((option: any, ind: any) => {
                                  return (
                                    <option value={option.isoCode} key={ind}>
                                      {option.name}
                                    </option>
                                  );
                                })}
                              </Field>
                              <div className='error-container'>
                                <ErrorMessage
                                  name='country'
                                  component='div'
                                  className='text-danger'
                                />
                              </div>
                            </div>

                            <div className='mb-3 col-md-6 col-12'>
                              <label className='form-label'>
                                Cost(in dallar)
                              </label>
                              &nbsp;
                              <span className='text-danger'>*</span>
                              <Field
                                className='form-control'
                                type='number'
                                name='leadCost'
                                value={values.leadCost}
                                placeholder='10$'
                                onBlur={handleBlur}
                              />
                              <div className='error-container'>
                                <ErrorMessage
                                  name='leadCost'
                                  component='div'
                                  className='text-danger'
                                />
                              </div>
                            </div>

                            <div className='mb-3 col-md-6 col-12'>
                              <label className='form-label'>
                                Number of applicant
                              </label>
                              &nbsp;
                              <span className='text-danger'>*</span>
                              <Field
                                className='form-control'
                                type='number'
                                name='numberApplication'
                                value={values.numberApplication}
                                placeholder='4'
                                onBlur={handleBlur}
                              />
                              <div className='error-container'>
                                <ErrorMessage
                                  name='numberApplication'
                                  component='div'
                                  className='text-danger'
                                />
                              </div>
                            </div>

                            <div className='mb-3 col-md-6 col-12'>
                              <label className='form-label'>Proof</label>
                              &nbsp;
                              <span className='text-danger'>*</span>
                              <input
                                className='form-control'
                                type='file'
                                name='leadProof'
                                multiple
                                onChange={(e: any) => {
                                  const selectedFile = e.target.files;
                                  setFile(selectedFile as []);
                                  setFieldValue(
                                    'leadProof',
                                    Array.from(e.target.files)
                                  );
                                  if (selectedFile) {
                                    Array.from(selectedFile).forEach((file) => {
                                      const reader = new FileReader();
                                      reader.onloadend = () => {
                                        // Update state with each file preview
                                        setFilePreview(
                                          (prevPreviews: string[]) => [
                                            ...prevPreviews,
                                            reader.result as string,
                                          ]
                                        );
                                      };
                                      reader.readAsDataURL(file as Blob);
                                    });
                                  }
                                }}
                                onBlur={handleBlur}
                                onClick={handleInputClick}
                              />
                              <div className='error-container'>
                                <ErrorMessage
                                  name='leadProof'
                                  component='div'
                                  className='text-danger'
                                />
                              </div>
                              {filePreview.length > 0 && (
                                <div className='row'>
                                  {filePreview.map((preview, index) => (
                                    <div
                                      key={index}
                                      style={{ marginBottom: '10px' }}
                                      className={
                                        file[index]?.type?.startsWith('audio/')
                                          ? 'col-6'
                                          : 'col-4'
                                      }
                                    >
                                      {/* Conditionally render audio/video/image based on file type */}
                                      {file[index]?.type?.startsWith(
                                        'image/'
                                      ) && (
                                        <img
                                          src={preview}
                                          alt={`File Preview ${preview}`}
                                          height={80}
                                        />
                                      )}

                                      {file[index]?.type?.startsWith(
                                        'audio/'
                                      ) && (
                                        <audio
                                          controls
                                          style={{ width: '230px' }}
                                        >
                                          <source
                                            src={preview}
                                            type={file[index].type}
                                            width={20}
                                          />
                                          Your browser does not support the
                                          audio tag.
                                        </audio>
                                      )}

                                      {file[index]?.type?.startsWith(
                                        'video/'
                                      ) && (
                                        <video controls height={80}>
                                          <source
                                            src={preview}
                                            type={file[index].type}
                                          />
                                          Your browser does not support the
                                          video tag.
                                        </video>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </fieldset>
                        <div className='mt-3 col-md-12  col-12 d-flex justify-content-center'>
                          <button
                            className='login_btn w-25 mx-4 mt-4'
                            type='submit'
                          >
                            Add Lead
                          </button>
                          <button
                            className='login_btn gray  w-25 mx-4 mt-4'
                            type='submit'
                          >
                            Cancel lead
                          </button>
                        </div>
                      </div>
                    </Form>
                  </div>
                )}
              </Formik>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default AddLeads;
