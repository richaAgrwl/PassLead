import React, { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { GetAllLeads } from '@/redux/action/GetAllLeads';
import { useRouter } from 'next/router';
import { AnyAction } from '@reduxjs/toolkit';
import styles from './Pagination.module.css';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { cancelSVG, checkSVG } from '@/svg';
import toast from 'react-hot-toast';
import { RootState } from '@/redux/store';
import { GetPurchaseHistory } from '@/redux/action/LeadHistory';
import { purchaseHistory, singleLead } from '../../type';

const itemsPerPage = 4;

const AllLeads = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const leadResponse = useAppSelector((state: RootState) => state.leads?.leads);
  const list = useAppSelector((state: RootState) => state?.leads?.leads.leads);
  const apiTotalPages = useAppSelector(
    (state: RootState) => state?.leads?.leads.totalPages
  );
  const id = useAppSelector((state: RootState) => state?.login?.user?.id);
  const lead_purchase_history = useAppSelector(
    (state: RootState) => state?.history?.purchase_history
  );
  const [query, setQuery] = useState('');
  const [leads, setLeads] = useState([]);

  // State for managing pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number | null>(0);

  //state for filter box hide/show
  const [isActive, setIsActive] = useState(false);

  //state for lead history , purchased by user
  const [purchaseHistory, setPurchaseHistory] = useState<[]>();

  //for fetching leads data
  const token = useAppSelector(
    (state: RootState) => state?.login?.user_info?.token
  );

  useEffect(() => {
    if (token === null) {
      dispatch(
        GetAllLeads(query, currentPage, itemsPerPage) as unknown as AnyAction
      );
    } else {
      dispatch(
        GetAllLeads(query, currentPage, itemsPerPage) as unknown as AnyAction
      );
      dispatch(GetPurchaseHistory(id) as unknown as AnyAction);
    }
  }, [dispatch, currentPage, query, token, id]);

  //after fetching leads set data into state
  useEffect(() => {
    if (leadResponse) {
      setLeads(list);
      setTotalPages(apiTotalPages);
      if (token !== null) {
        setPurchaseHistory(lead_purchase_history);
      } else {
        setPurchaseHistory([]);
      }
    }
  }, [leadResponse, list, lead_purchase_history]);

  //This function used for search
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const inputQuery = e.target.value;
    if (inputQuery.length >= 3) {
      setQuery(inputQuery);
      setCurrentPage(1);
    } else {
      setQuery('');
    }
  };

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

  //This function used for set the current page
  const handlePageClick = (event: any) => {
    const pageCount = +(event.selected + 1);
    // Delay the router update after the render
    setTimeout(() => {
      setCurrentPage(pageCount);
    }, 0);
  };

  //This function used for navigate to next page for showing perticular lead details
  const handleShowMore = (leadId: number) => {
    router.push(
      {
        pathname: '/show-lead',
        query: { id: leadId },
      },
      '/show-lead'
    );
  };

  return (
    <section className=''>
      <div
        className={
          isActive
            ? 'filter-popup show_filter leads-nav '
            : 'filter-popup leads-nav '
        }
      >
        <div className='leads-filter '>
          <div className='filter_class'>
            <div className='d-flex justify-content-between mb-3'>
              <button className='filter-btn' onClick={() => setIsActive(false)}>
                cancel
              </button>
              <button className='filter-btn'>reset</button>
            </div>
            <div className='filter_parent'>
              <h4>Filter By</h4>
              <h3>Budget</h3>
              <div className='filter'>
                <label className='checkbox_parent'>
                  <input type='checkbox' />
                  <span></span> Fixed Price Projects
                </label>
                <div className='filter_by'>
                  <input type='text' className=' form-control filter_input' />
                  to
                  <input type='text' className=' form-control filter_input' />
                </div>
              </div>
              <div className='filter'>
                <label className='checkbox_parent'>
                  <input type='checkbox' />
                  <span></span> Hourly Projects
                </label>
                <div className='filter_by'>
                  <input type='text' className=' form-control filter_input' />
                  to
                  <input type='text' className=' form-control filter_input' />
                </div>
              </div>
            </div>
            <div className='filter_parent'>
              <h3>Type</h3>
              <div className='filter'>
                <label className='checkbox_parent'>
                  <input type='checkbox' />
                  <span></span> Local Jobs
                </label>
                <label className='checkbox_parent'>
                  <input type='checkbox' />
                  <span></span> Featured Jobs
                </label>
              </div>
            </div>
            <div className='filter_parent'>
              <h3>Skill</h3>
              <div className='filter'>
                <label className='checkbox_parent'>
                  <input type='checkbox' />
                  <span></span> .Net
                </label>
                <label className='checkbox_parent'>
                  <input type='checkbox' />
                  <span></span> React Js
                </label>
              </div>
            </div>

            <div className='text-center mt-5'>
              {' '}
              <button className='apply_btn'>apply</button>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='row lead_section  my-2'>
          <div className='col-12  lead_list_container'>
            <div className='bg-white  my-5'>
              <div className='leads-nav d-flex justify-content-between align-items-center'>
                <button className='filter-btn' onClick={() => router.back()}>
                  back
                </button>
                <div className='explore-leads-heading'>All Leads</div>
                <button
                  className='filter-btn'
                  onClick={() => setIsActive(true)}
                >
                  filter
                </button>
              </div>
              <div className='search_row  my-4 rounded-pill'>
                <label className='input-label'>
                  <img className='search-icon ' src='./search-gray.svg' />
                </label>
                <input
                  type='search'
                  className='search_input form-control'
                  placeholder='Search Keyword'
                  onChange={handleSearch}
                />
              </div>

              <div className='row  '>
                <div className='mb-2'>
                  {leads && leads.length > 0 ? (
                    leads.map((item: singleLead, i: number) => {
                      const dynamicTime = calculateDynamicTime(
                        item.createdAt as string
                      );
                      return (
                        <>
                          <div className='lead_list_container' key={item.id}>
                            <div className='lead_list_row '>
                              <div className='span_container col-md-12 sm-12 '>
                                {item.purchase_count !==
                                item.max_number_applicant ? (
                                  <span className='open_Time bg-success bg-gradient'>
                                    Open
                                  </span>
                                ) : (
                                  <span className='open_Time bg-danger bg-gradient'>
                                    Close
                                  </span>
                                )}
                              </div>
                              <div className='col-md-8 col-12' key={item.id}>
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
                                  <div className=''>
                                    <div className='capsule_container'>
                                      <div className='capsule'>
                                        {item.email ? checkSVG : cancelSVG}
                                        <div className='m-0 p-0'>Email</div>
                                      </div>
                                      <div className='capsule'>
                                        {item.phone_number
                                          ? checkSVG
                                          : cancelSVG}
                                        <div className='m-0 p-0'>
                                          Phone Number
                                        </div>
                                      </div>
                                      <div className='capsule'>
                                        {item.client_location
                                          ? checkSVG
                                          : cancelSVG}
                                        <div className='m-0 p-0'>
                                          City Location
                                        </div>
                                      </div>
                                      <div className='capsule'>
                                        {checkSVG}
                                        <div className='m-0 p-0'>Country</div>
                                      </div>
                                      <div className='capsule'>
                                        {item.price ? checkSVG : cancelSVG}
                                        <div className='m-0 p-0'>Cost</div>
                                      </div>
                                      <div className='capsule'>
                                        {item.id ? checkSVG : cancelSVG}
                                        <div className='m-0 p-0'>
                                          Application Number
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='col-md-4 col-12 '>
                                <div className='lead_skill_container'>
                                  <div className='lead_skill_parent'>
                                    <div className='lead_price'>
                                      {' '}
                                      {item.price}$
                                    </div>
                                    <div>
                                      {purchaseHistory &&
                                      purchaseHistory.length > 0 ? (
                                        purchaseHistory.map((history: any) => {
                                          // Check if item.id is in the leadIds of the current purchase history
                                          const hasPurchased =
                                            history.leadIds.includes(item.id);

                                          return hasPurchased ? (
                                            <span key={history.id}>
                                              <button
                                                className='display-block'
                                                onClick={() =>
                                                  handleShowMore(
                                                    item.id as number
                                                  )
                                                }
                                              >
                                                Show More
                                              </button>
                                            </span>
                                          ) : (
                                            <button
                                              key={history.id}
                                              className='display-block me-4'
                                              onClick={() => {
                                                if (token !== null) {
                                                  if (
                                                    item.purchase_count !==
                                                    item.max_number_applicant
                                                  ) {
                                                    router.push({
                                                      pathname: '/payment',
                                                      query: {
                                                        price: item.price,
                                                        lead_id: item.id,
                                                        lead_title: item.title,
                                                        lead_description:
                                                          item.description,
                                                      },
                                                    });
                                                  } else {
                                                    toast.error(
                                                      'Sorry!! Lead is closed now.'
                                                    );
                                                  }
                                                } else {
                                                  toast.error(
                                                    'You need to login first'
                                                  );
                                                  router.push('/login');
                                                }
                                              }}
                                            >
                                              buy now
                                            </button>
                                          );
                                        })
                                      ) : (
                                        <button
                                          className='display-block me-4'
                                          onClick={() => {
                                            if (token !== null) {
                                              if (
                                                item.purchase_count !==
                                                item.max_number_applicant
                                              ) {
                                                router.push({
                                                  pathname: '/payment',
                                                  query: {
                                                    price: item.price,
                                                    lead_id: item.id,
                                                    lead_title: item.title,
                                                    lead_description:
                                                      item.description,
                                                  },
                                                });
                                              } else {
                                                toast.error(
                                                  'Sorry!! Lead is closed now.'
                                                );
                                              }
                                            } else {
                                              toast.error(
                                                'You need to login first'
                                              );
                                              router.push('/login');
                                            }
                                          }}
                                        >
                                          buy now
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })
                  ) : (
                    <div className='alert alert-info'>
                      <h5 className='text-center'>
                        Sorry !! Something went wrong
                      </h5>
                    </div>
                  )}

                  {/*---------------------------------pagination--------------------------------------- */}
                  <div className='col-md-9'>
                    {leads !== undefined ? (
                      <div className='filter_class_pagination'>
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
                          pageCount={totalPages as number}
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
                    ) : (
                      ''
                    )}
                  </div>
                  {/* ---------------------------pagination end---------------------------------------- */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllLeads;
