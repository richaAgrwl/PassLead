import React from "react";
import RowTitleDescription from "./RowTitleDescription";
import ServicesBox from "./ServicesBox";

const WeServe = () => {
  return (
    <>
      <div className="bg-light py-5">
        <div className="container position-relative awesome_services_boxes">
          <div className="row align-items-center">
            <div className="col-md-6 col-12">
              <RowTitleDescription
                subTitle={"What We Serve"}
                title={"We help You To Find The Right Choice"}
                description={
                  "Quisque eu diam a mi vulputate lacinia. Aliquam eros neque, luctus ut ligula in, faucibus fermentum sem.Nulla varius auctor varius. Mauris erat nisl, aliquet sed libero et, ultrices venenatis nunc."
                }
              />
            </div>
            <div className="col-md-6 col-12">
              <div className="row">
                <ServicesBox
                  title={"Develop & Training"}
                  styleClass={"active-box"}
                  description={
                    "Nullam porttitor eleifend congue. Sed dignissim faucibus venenatis."
                  }
                />

                <ServicesBox
                  title={"Develop & Training"}
                  styleClass={""}
                  description={
                    "Nullam porttitor eleifend congue. Sed dignissim faucibus venenatis."
                  }
                />
                <ServicesBox
                  title={"Develop & Training"}
                  styleClass={""}
                  description={
                    "Nullam porttitor eleifend congue. Sed dignissim faucibus venenatis."
                  }
                />
                <ServicesBox
                  title={"Develop & Training"}
                  styleClass={""}
                  description={
                    "Nullam porttitor eleifend congue. Sed dignissim faucibus venenatis."
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid pl-4 mt-5">
          <div className="row">
            <div className="col-md-6 col-12">
              <div className="row">
                <ServicesBox
                  title={"Develop & Training"}
                  styleClass={"active-box"}
                  description={
                    "Nullam porttitor eleifend congue. Sed dignissim faucibus venenatis."
                  }
                />
                <ServicesBox
                  title={"Develop & Training"}
                  styleClass={"active-box"}
                  description={
                    "Nullam porttitor eleifend congue. Sed dignissim faucibus venenatis."
                  }
                />
              </div>
            </div>
            <div className="col-md-6 col-12 position-relative" data-aos="fade-right">
              <div className="awesome_service_box p-4">
                <div className="mainTitle">
                  <h2>
                    We Provide <br />
                    Awesome Service
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeServe;
