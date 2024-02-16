import React from "react";

const ServicesBox = ({ title, description, styleClass }: any) => {
  return (
    <>
      <div className="col-md-6 col-12 mb-4" data-aos="fade-left">
        <div className={`service_box ${styleClass}`}>
          <div className="box-title">
            <h6>{title}</h6>
          </div>
          <div className="box-description">
            <p>{description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicesBox;
