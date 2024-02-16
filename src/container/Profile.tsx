import React, { Fragment, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/router';
import { AnyAction } from '@reduxjs/toolkit';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';

import { singleLead, updateUser } from '../../type';
import { GetAllLeads } from '@/redux/action/GetAllLeads';
import styles from './Pagination.module.css';
import Loader from '@/pages/loader';
import { updateUserSchema } from '@/arrayList/FormValidation';
import { shallowEqual } from 'react-redux';
import { RootState, persistor } from '@/redux/store';
import { update } from '@/redux/action/UpdateUser';
import { reset } from '@/redux/reducer/Login';

const Profile = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const query = '';
  const current_Page = 1;
  const itemsPer_Page = 0;

  useEffect(() => {
    dispatch(
      GetAllLeads(query, current_Page, itemsPer_Page) as unknown as AnyAction
    );
  }, [dispatch]);

  const { leads, user, purchase_history, loading, token } = useAppSelector(
    (state: RootState) => ({
      leads: state?.leads?.leads?.leads,
      user: state?.login?.user,
      purchase_history: state?.history?.purchase_history,
      loading: state?.loading,
      token: state?.login?.user_info?.token,
    }),
    shallowEqual
  );
  const {
    id,
    name,
    email,
    city,
    state,
    country,
    address,
    role,
    agency,
    agencyName,
    agencyUrl,
  } = user;

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [changePass, setChangePass] = useState<boolean>(false);

  const matchedLeads = purchase_history?.map((purchase: any) =>
    leads.filter((lead: singleLead) => purchase.leadIds.includes(lead.id))
  );

  const flattenedLeads = matchedLeads?.flat() as [];

  const handlePageClick = (data: any) => {
    setCurrentPage(data.selected);
  };
  function paginate(leads: [], currentPage: number, itemsPerPage: number) {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return leads.slice(startIndex, endIndex);
  }
  // Paginate the leads based on the current page
  const paginatedLeads = paginate(flattenedLeads, currentPage, itemsPerPage);

  //This function used for manage dynamic time
  const calculateDynamicTime = (updatedAt: string) => {
    const now = new Date();
    const updatedDate = new Date(updatedAt);
    const timeDifference = Math.abs(now.getTime() - updatedDate.getTime());
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));

    if (minutesDifference < 60) {
      return `${minutesDifference} minutes ago`;
    } else if (minutesDifference < 1440) {
      const hours = Math.floor(minutesDifference / 60);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      const days = Math.floor(minutesDifference / 1440);
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    }
  };

  const handleShowMore = (leadId: string) => {
    router.push(
      {
        pathname: '/show-lead',
        query: { id: leadId },
      },
      '/show-lead'
    );
  };
  const initialValues = {
    userName: name,
    userAddress: address,
    userType: agency ? 'agency' : 'indivisual',
    userAgencyName: agency ? agencyName : '',
    userAgencyUrl: agency ? agencyUrl : '',
    userPassword: '',
    newPassword: '',
  };

  const handleSubmit = async (
    initialValues: updateUser,
    { resetForm }: any
  ) => {
    // Create a new object with the fields we want to send
    const {
      userName,
      userAddress,
      userPassword,
      userAgencyName,
      userAgencyUrl,
      userType,
      newPassword,
    } = initialValues;

    const values = {
      name: (userName?.length ?? 0) > 0 ? userName : null,
      address: (userAddress?.length ?? 0) > 0 ? userAddress : null,
      oldPassword: (userPassword?.length ?? 0) > 0 ? userPassword : null,
      newPassword: (newPassword?.length ?? 0) > 0 ? newPassword : null,
      agencyName: (userAgencyName?.length ?? 0) > 0 ? userAgencyName : null,
      agencyUrl: (userAgencyUrl?.length ?? 0) > 0 ? userAgencyUrl : null,
    };

    const onResponse = (response: boolean) => {
      setIsEdit(response);
      setChangePass(response);
    };
    dispatch(update(values, id, token, onResponse) as unknown as AnyAction);
    resetForm({ initialValues: '' });
  };
  return (
    <section className='profile_section'>
      <div className='container'>
        <div className='wrapper shadow my-5'>
          <div className='row'>
            <div className='col-md-4 border-end p-0'>
              <div className='profile_container'>
                <div className='col-md-12 col-12'>
                  <button className='plane_btn'>
                    <Link href='/all-leads'> &lt; Back to leads</Link>
                  </button>
                </div>
                <div className='profile_img_container mt-4'>
                  <img src='./team-1.jpg' alt='' />
                </div>
                <div className='detail'>
                  <h3>{name}</h3>
                </div>
                <div className='ps-4'>
                  <div className='row g-2 '>
                    <div className='col-md-3 text-muted'>Email</div>
                    <div className='col-md-9'>{email}</div>
                    <div className='col-md-3 text-muted'>Address</div>
                    <div className='col-md-9'>
                      {address} <br /> {city} &nbsp; {state} <br /> {country}
                    </div>
                  </div>
                </div>
                <div className='status_container'>
                  <span>Status</span>
                  <div className='status generator'>{role?.role}</div>
                  <span>tags</span>
                  <div className='my-2 d-flex flex-wrap'>
                    <div className='tags'>tag 1</div>
                    <div className='tags'>tag 1</div>
                    <button className='tags border-0 '>+</button>
                  </div>
                  <span>Lead source</span>
                  <div className='status source'>Google ads</div>
                </div>
              </div>
            </div>
            <div className='col-md-8 col-12 ps-0'>
              <div className='col-md-12 col-12 '>
                <div className='nav_container d-flex justify-content-between'>
                  <ul className='nav nav-tabs' id='myTab' role='tablist'>
                    <li className='nav-item' role='presentation'>
                      <button
                        className='nav-link active'
                        id='home-tab'
                        data-bs-toggle='tab'
                        data-bs-target='#home'
                        type='button'
                        role='tab'
                        aria-controls='home'
                        aria-selected='true'
                      >
                        profile details
                      </button>
                    </li>
                    <li className='nav-item' role='presentation'>
                      <button
                        className='nav-link'
                        id='profile-tab'
                        data-bs-toggle='tab'
                        data-bs-target='#profile'
                        type='button'
                        role='tab'
                        aria-controls='profile'
                        aria-selected='false'
                      >
                        Leads
                      </button>
                    </li>
                    <li className='nav-item' role='presentation'>
                      <button
                        className='nav-link'
                        id='contact-tab'
                        data-bs-toggle='tab'
                        data-bs-target='#contact'
                        type='button'
                        role='tab'
                        aria-controls='contact'
                        aria-selected='false'
                      >
                        Contact
                      </button>
                    </li>
                  </ul>
                  <ul className='nav nav-tabs'>
                    <li className='nav-item '>
                      <button
                        className='nav-link'
                        onClick={() => {
                          dispatch(reset());
                          persistor.purge();
                          router.push('/login');
                        }}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>

                <div className='tab-content' id='myTabContent'>
                  <div
                    className='tab-pane fade show active '
                    id='home'
                    role='tabpanel'
                    aria-labelledby='home-tab'
                  >
                    <div className='profile_tab_data d-flex align-items-center justify-content-center'>
                      {isEdit ? (
                        <div
                          className='form_bg d-flex align-items-center'
                          style={{ minHeight: '100%' }}
                        >
                          <div className='container'>
                            <div className='login_parent my-3'>
                              {loading ? (
                                <Loader />
                              ) : (
                                <div
                                  className='login_container row bg-white'
                                  style={{ width: '300' }}
                                >
                                  <span
                                    className='text-primary'
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                      setIsEdit(false);
                                      setChangePass(false);
                                    }}
                                  >
                                    {' '}
                                    &lt; Back
                                  </span>
                                  <div className='bg-white  col-md-12  '>
                                    <Formik
                                      initialValues={initialValues}
                                      validateOnBlur={true}
                                      enableReinitialize={true}
                                      validateOnChange={true}
                                      onSubmit={handleSubmit}
                                      validationSchema={updateUserSchema}
                                    >
                                      {({
                                        values,
                                        handleBlur,
                                        setFieldValue,
                                        handleChange,
                                      }) => (
                                        <div className='form_parent py-5'>
                                          <div className='col-sm-12'>
                                            {changePass ? (
                                              <h3 className='login-heading'>
                                                Change Password
                                              </h3>
                                            ) : (
                                              <h3 className='login-heading'>
                                                Update details
                                              </h3>
                                            )}

                                            <Form>
                                              {changePass ? (
                                                <div className='row m-2'>
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
                                                        name='userPassword'
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder='enter old password'
                                                        required
                                                        value={
                                                          values.userPassword
                                                        }
                                                        autoComplete='password'
                                                      />
                                                      <div className='error-container'>
                                                        <ErrorMessage
                                                          name='userPassword'
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
                                                        name='newPassword'
                                                        placeholder='enter new password'
                                                        required
                                                        value={
                                                          values.newPassword
                                                        }
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        autoComplete='new-password'
                                                      />
                                                      <div className='error-container'>
                                                        <ErrorMessage
                                                          name='newPassword'
                                                          component='div'
                                                          className='text-danger'
                                                        />
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              ) : (
                                                <>
                                                  <div className='col-md-12 col-12'>
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
                                                        name='userName'
                                                        placeholder='enter your name'
                                                        value={values.userName}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                      ></Field>
                                                      <div className='error-container'>
                                                        <ErrorMessage
                                                          name='userName'
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
                                                        name='userAddress'
                                                        value={
                                                          values.userAddress
                                                        }
                                                        as='textarea'
                                                        placeholder='enter your address'
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                      ></Field>
                                                      <div className='error-container'>
                                                        <ErrorMessage
                                                          name='userAddress'
                                                          component='div'
                                                          className='text-danger'
                                                        />
                                                      </div>
                                                    </div>
                                                  </div>

                                                  <div className='col-12 mb-2'>
                                                    You are an
                                                  </div>
                                                  <div className='row'>
                                                    <div className='col-md-6 col-12 mb-4'>
                                                      <button
                                                        type='button'
                                                        className={
                                                          values.userType ===
                                                          'agency'
                                                            ? 'inputBtn active'
                                                            : 'inputBtn'
                                                        }
                                                        name='agency'
                                                        onBlur={handleBlur}
                                                        onClick={() => {
                                                          setFieldValue(
                                                            'userType',
                                                            'agency'
                                                          );
                                                        }}
                                                      >
                                                        Agency
                                                      </button>
                                                    </div>

                                                    <div className='col-md-6 col-12'>
                                                      <button
                                                        type='button'
                                                        className={
                                                          values.userType ===
                                                          'indivisual'
                                                            ? 'inputBtn active'
                                                            : 'inputBtn'
                                                        }
                                                        name='agency'
                                                        onBlur={handleBlur}
                                                        onClick={() =>
                                                          setFieldValue(
                                                            'userType',
                                                            'indivisual'
                                                          )
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
                                                  </div>
                                                  {values.userType ===
                                                  'agency' ? (
                                                    <div className='row'>
                                                      <div className='col-md-6 col-12'>
                                                        <div className='form-group '>
                                                          <label className='form-label'>
                                                            <img
                                                              className='login-icons'
                                                              src='./agency.svg'
                                                            />
                                                          </label>
                                                          <Field
                                                            className='form-control'
                                                            type='text'
                                                            name='userAgencyName'
                                                            placeholder='agencyName'
                                                            value={
                                                              values.userAgencyName
                                                            }
                                                            onBlur={handleBlur}
                                                            onChange={
                                                              handleChange
                                                            }
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
                                                            name='userAgencyUrl'
                                                            placeholder='agencyUrl'
                                                            value={
                                                              values.userAgencyUrl
                                                            }
                                                            onBlur={handleBlur}
                                                            onChange={
                                                              handleChange
                                                            }
                                                          ></Field>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  ) : (
                                                    ''
                                                  )}
                                                </>
                                              )}

                                              <button
                                                className='login_btn w-100 mt-4'
                                                type='submit'
                                              >
                                                Update
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
                        </div>
                      ) : (
                        <div className='col-md-8 mt-5'>
                          <div className='card mb-3'>
                            <div className='card-body'>
                              <div className='row'>
                                <div className='col-sm-3'>
                                  <h6 className='mb-0'>Full Name</h6>
                                </div>
                                <div className='col-sm-9 text-secondary'>
                                  {name}
                                </div>
                              </div>
                              <hr />
                              <div className='row'>
                                <div className='col-sm-3'>
                                  <h6 className='mb-0'>Email</h6>
                                </div>
                                <div className='col-sm-9 text-secondary'>
                                  {email}
                                </div>
                              </div>
                              <hr />

                              <div className='row'>
                                <div className='col-sm-3'>
                                  <h6 className='mb-0'>Address</h6>
                                </div>
                                <div className='col-sm-9 text-secondary'>
                                  {address}
                                </div>
                              </div>
                              <hr />
                              <div className='row'>
                                <div className='col-sm-3'>
                                  <h6 className='mb-0'>Role</h6>
                                </div>
                                <div className='col-sm-9 text-secondary'>
                                  {role?.role}
                                </div>
                              </div>
                              <hr />
                              <div className='row'>
                                <div className='col-sm-12'>
                                  <button
                                    className='btn btn-primary '
                                    onClick={() => setIsEdit(true)}
                                  >
                                    Edit
                                  </button>

                                  <button
                                    className='btn btn-primary m-2'
                                    onClick={() => {
                                      setIsEdit(true);
                                      setChangePass(true);
                                    }}
                                  >
                                    Change Password
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    className='tab-pane fade'
                    id='profile'
                    role='tabpanel'
                    aria-labelledby='profile-tab'
                  >
                    {purchase_history.length > 0 ? (
                      <div className='profile_tab_data'>
                        <div className='row'>
                          {purchase_history.map((item: any, i: number) => (
                            <Fragment key={i}>
                              <div className='col-6 text-secondary text-center'>
                                {' '}
                                Total purchased leads :{' '}
                                {item.total_purchased_Lead}
                              </div>
                              <div className='col-6 text-secondary '>
                                {' '}
                                Total payment : {item.totalPayment}
                              </div>
                            </Fragment>
                          ))}
                          {paginatedLeads?.length > 0
                            ? paginatedLeads.map((item: any, i: number) => {
                                const dynamicTime = calculateDynamicTime(
                                  item.updatedAt
                                );
                                return (
                                  <div className='lead_list_container' key={i}>
                                    <div className='lead_list_row'>
                                      <div className='col-md-8 col-12'>
                                        <div className='lead_description'>
                                          <div className='lead_title_parent'>
                                            <div className='d-flex align-items-center justify-content-between'>
                                              {' '}
                                              <h5>{item.title}</h5>
                                              <span className='ms-4 leads_time'>
                                                {dynamicTime}
                                              </span>
                                            </div>

                                            <div></div>
                                          </div>
                                          <p>{item.description}</p>
                                        </div>
                                      </div>
                                      <div className='col-md-4 col-12 '>
                                        <div className='lead_skill_container'>
                                          <div className='lead_skill_parent'>
                                            <div className='lead_price'>
                                              {' '}
                                              $ {item.price}
                                            </div>
                                            <div>
                                              <button
                                                className='display-block'
                                                onClick={() =>
                                                  handleShowMore(item.id)
                                                }
                                              >
                                                Show More
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })
                            : null}
                        </div>
                        {/*---------------------------------pagination--------------------------------------- */}
                        {paginatedLeads !== undefined ? (
                          <div className='filter_className_pagination'>
                            <ReactPaginate
                              activeClassName={`${styles.item}  ${styles.active}`}
                              breakClassName={`${styles.item}  `}
                              breakLabel={'...'}
                              onPageChange={handlePageClick}
                              containerClassName={styles.pagination}
                              disabledLinkClassName={`${styles.disabledpage}`}
                              marginPagesDisplayed={2}
                              nextClassName={`${styles.item} ${styles.next}`}
                              nextLabel={
                                <FontAwesomeIcon
                                  icon={faChevronRight}
                                  style={{ fontSize: '18px' }}
                                />
                              }
                              pageCount={Math.ceil(
                                flattenedLeads.length / itemsPerPage
                              )}
                              pageClassName={`${styles.item} ${styles.paginationpage} `}
                              previousClassName={`${styles.item} ${styles.previous}`}
                              previousLabel={
                                <FontAwesomeIcon
                                  icon={faChevronLeft}
                                  style={{ fontSize: '18px' }}
                                />
                              }
                            />
                          </div>
                        ) : null}
                        {/* ---------------------------pagination end---------------------------------------- */}
                      </div>
                    ) : (
                      <span className='d-flex justify-content-center mt-5 alert alert-warning'>
                        You haven't bought any leads{' '}
                      </span>
                    )}
                  </div>
                  <div
                    className='tab-pane fade'
                    id='contact'
                    role='tabpanel'
                    aria-labelledby='contact-tab'
                  >
                    <div className='profile_tab_data'>..ytygg...</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className='tab-pane fade'
        id='contact'
        role='tabpanel'
        aria-labelledby='contact-tab'
      >
        ...
      </div>
    </section>
  );
};

export default Profile;
