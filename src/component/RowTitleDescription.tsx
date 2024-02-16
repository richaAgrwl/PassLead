import React from 'react';

const RowTitleDescription = ({ subTitle, title, description }: any) => {
  return (
    <div className='row'>
      {/* <div className="col-md-6 col-10 mx-auto my-5"> */}
      <div className='row_des_container'>
        <div className=' subTitle' data-aos='fade-up'>
          <h6>{subTitle}</h6>
        </div>

        <div className='mainTitle mb-4' data-aos='fade-right'>
          <h2>{title}</h2>
        </div>
        <div className='section_dicription para' data-aos='fade-left'>
          <p>{description}</p>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default RowTitleDescription;
