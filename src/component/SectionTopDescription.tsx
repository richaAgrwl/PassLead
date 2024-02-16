import React from "react";

const SectionTopDescription = ({ subTitle, title, description, textAlign }: any) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className={`section-heading ${textAlign}`}>
          <h6>{subTitle}</h6>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default SectionTopDescription;
