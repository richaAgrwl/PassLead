import { expertAgent } from "@/arrayList/mainJson";
import React, { useEffect } from "react";
import AOS from "aos";
const CustomBanner = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="page-banner">
      <section className="banner-section">
        <div className="container">
          <div className="row align-items-center banner_height m-0 p-0">
            <div className="col-md-6 col-12 m-0 p-0">
              <div className="banner_description">
                <h1 data-aos="slide-right">
                  Find Your
                  <br />
                  Right Job With Us
                </h1>
                <p data-aos="slide-right">
                  Curabitur pharetra luctus vulputate. Proin finibus odio vel
                  ipsum scelerisque, luctus bibendum purus pellentesque.
                </p>

                <div className="btn-box" data-aos="fade-up">
                  <button className="btn button-primary">Find New Lead</button>
                  <button className="btn button-text">Learn More</button>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12 position-relative">
              <div className="banner_img_container" data-aos="slide-left">
                <img src="./home-banner.jpg" alt="" className="banner_img" />
              </div>
              <div className="img_bottom_box" data-aos="slide-down"></div>
            </div>
          </div>
        </div>
      </section>
      <section className="banner-slide">
        <div className="container">
          <div className="row position-relative">
            {expertAgent.map((list, ind) => {
              return (
                <div className="col-lg-3 col-md-6 col-12" key={ind}>
                  <div
                    className={
                      (ind + 1) % 2 === 0
                        ? `banner_box bg-primary`
                        : `banner_box bg-white`
                    }
                  >
                    <div className="banner-box-content">
                      <h5>{list.title}</h5>
                      <p>{list.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomBanner;
