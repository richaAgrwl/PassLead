import React, { useEffect, useState } from 'react';
import { GetLeadById, GetLeadProofById } from '@/redux/action/GetLeadById';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { cancelSVG, checkSVG, envelopeSVG } from '@/svg';
import { AnyAction } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import { proof, singleLead } from '../../type';
import { createSelector } from 'reselect';
import { RootState } from '@/redux/store';

const selectSingleLead = (state: RootState) => state?.leads?.singleLead;
const selectCreatedAt = createSelector(
  [selectSingleLead],
  (singleLead) => singleLead?.createdAt
);
const selectIdProof = (state: any) => state?.leads?.leadProof?.proof;

// Memoized selector
const selectLeadDetails = createSelector(
  [selectSingleLead, selectCreatedAt, selectIdProof],
  (singleLead, createdAt, idProof) => ({
    singleLead,
    time: createdAt,
    idProof,
  })
);

// Hook to use the selector
const useLeadDetails = () => {
  return useAppSelector((state: RootState) => selectLeadDetails(state));
};
const ShowLead = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { singleLead, time, idProof } = useLeadDetails();
  useEffect(() => {
    const id = router.query.id;
    dispatch(GetLeadById(id) as unknown as AnyAction);
    dispatch(GetLeadProofById(id) as unknown as AnyAction);
  }, [router.query.id]);

  useEffect(() => {
    if (!singleLead) return;
    if (Object.keys(singleLead).length > 0) {
      setLead(singleLead);
      setProof(idProof);
    }
  }, [singleLead, idProof]);
  const [expandedImage, setExpandedImage] = useState(null);
  const [lead, setLead] = useState<singleLead>();
  const [leadCreateTime, setLeadCreateTime] = useState<string>('');
  const [proof, setProof] = useState<null | proof | undefined>();
  const handleImageClick = (index: any) => {
    if (expandedImage === index) {
      // If the clicked image is already expanded, close it
      setExpandedImage(null);
    } else {
      // Expand the clicked image
      setExpandedImage(index);
    }
  };

  const leadCreatedTime = (updatedAt: string) => {
    const now = new Date();
    const updatedDate = new Date(updatedAt);
    const timeDifference = now.getTime() - updatedDate.getTime();
    const minutesAgo = Math.floor(timeDifference / (1000 * 60));
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (minutesAgo < 60) {
      return `${minutesAgo} minute${minutesAgo === 1 ? '' : 's'} ago`;
    } else if (daysAgo < 1) {
      return `${Math.floor(minutesAgo / 60)} hour${
        Math.floor(minutesAgo / 60) === 1 ? '' : 's'
      } ago`;
    } else {
      return `${daysAgo} day${daysAgo === 1 ? '' : 's'} ago`;
    }
  };

  useEffect(() => {
    const createdAt = time;
    const dynamicTime = leadCreatedTime(createdAt as string);
    setLeadCreateTime(dynamicTime);
  }, [time]);

  return (
    <section
      className={
        expandedImage !== null
          ? 'lead_section py-2 click_section'
          : 'lead_section py-2'
      }
    >
      <div className='container'>
        <div className='show_lead'>
          {lead ? (
            <div className='row g-4'>
              <div className='col-md-8 col-12'>
                <div className='show_lead_description'>
                  <div className='show_title_container'>
                    <div className='col-md-8 col-12'>
                      <button className='plane_btn'>
                        <span onClick={() => router.back()}> &lt; Back </span>
                      </button>
                      <h1 className='text-start'>{lead.title}</h1>

                      <div className='span_container'>
                        {lead.purchase_count !== lead.max_number_applicant ? (
                          <span className='open_Time'>Open</span>
                        ) : (
                          <span className='open_Time'>Close</span>
                        )}

                        <span className='span_time_ago'>{leadCreateTime}</span>
                      </div>
                    </div>
                    <div className='col-md-4 col-12'>
                      <h1 className='text-end'> ${lead.price}</h1>
                    </div>
                  </div>
                  <p className='mb-4'>{lead.description}</p>
                  <div className='secrete_container'>
                    <div>
                      email :
                      <span className='ms-2 text-muted'> {lead.email}</span>
                    </div>
                    <div>
                      contact no :
                      <span className='ms-2 text-muted'>
                        {' '}
                        {lead.phone_number}
                      </span>
                    </div>
                    <div>
                      city :{' '}
                      <span className='ms-2 text-muted'>
                        {' '}
                        {lead.client_location}
                      </span>
                    </div>
                    <div>
                      country : <span className='ms-2 text-muted'> india</span>
                    </div>
                    <div>
                      cost :{' '}
                      <span className='ms-2 text-muted'> ${lead.price}</span>
                    </div>
                    <div>
                      application no :{' '}
                      <span className='ms-2 text-muted'> {lead.id}</span>
                    </div>
                  </div>
                </div>{' '}
              </div>
              <div className='col-md-4 col-12'>
                <div className='show_lead_sidebar ms-4'>
                  <div className='secrete_container'>
                    <div className='secrete_envelope  '>
                      {envelopeSVG}
                      <h5>Secrete Envelope</h5>
                    </div>
                    <div className='capsule_container'>
                      <div className='capsule'>
                        <p className='m-0 p-0'>Email</p>
                        {lead.email ? checkSVG : cancelSVG}
                      </div>
                      <div className='capsule'>
                        <p className='m-0 p-0'>Phone Number</p>
                        {lead.phone_number ? checkSVG : cancelSVG}
                      </div>
                      <div className='capsule'>
                        <p className='m-0 p-0'>City Location</p>
                        {lead.client_location ? checkSVG : cancelSVG}
                      </div>
                      <div className='capsule'>
                        <p className='m-0 p-0'>Country</p>
                        {checkSVG}
                      </div>
                      <div className='capsule'>
                        <p className='m-0 p-0'>Cost</p>
                        {lead.price ? checkSVG : cancelSVG}
                      </div>
                      <div className='capsule'>
                        <p className='m-0 p-0'>Application Number</p>
                        {lead.max_number_applicant ? checkSVG : cancelSVG}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='secrete_container '>
                <div className='secrete_envelope  '>
                  <img src='./user-icon.png' alt='' />
                  <h5 className=''>Id Proof</h5>
                </div>
              </div>
              <div className='row g-3'>
                {proof?.video_url && proof.video_url.length > 0
                  ? proof?.video_url?.map((url, index) => (
                      <div key={index} className='col-md-3 col-sm-6 col-12'>
                        <div className='id_proof'>
                          <video controls className='proof_id' autoPlay>
                            <source src={url} type={`video/mp4`} />
                          </video>
                        </div>
                      </div>
                    ))
                  : null}

                {proof?.image_url && proof.image_url.length > 0
                  ? proof.image_url.map((url, index) => (
                      <div key={index} className='col-md-3 col-sm-6 col-12'>
                        <div className='id_proof'>
                          <img
                            className='proof_id'
                            src={url}
                            alt={`Image ${index}`}
                          />
                        </div>
                      </div>
                    ))
                  : null}

                {proof?.audio_url && proof.audio_url.length > 0
                  ? proof.audio_url.map((url, index) => (
                      <div key={index} className='col-md-3 col-sm-6 col-12'>
                        <div className='id_proof'>
                          <audio className='w-100' controls>
                            <source src={url} type={`audio/mp3`} />
                          </audio>
                        </div>
                      </div>
                    ))
                  : null}
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </section>
  );
};

export default ShowLead;
