import testimonialList from "@/arrayList/testimonialList";
import React from "react";
import Slider from "react-slick";

const TestimonialSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 7000,

  };
  return (
    <div >
      <Slider {...settings}>
        {testimonialList.map((list, ind) => {
          return (
            <div className="px-3 py-3 monial_parent" data-aos="fade-right">
              <div className="show_monial_container" key={ind}>
                <div className="para">
                  <p>{list.description}</p>
                </div>
              </div>
              <div className="img_author_container" data-aos="fade-up">
                <img
                  src={list.image}
                  alt=""
                  className=" testi_img rounded-circle"
                />

                <div>
                  <h6>{list.name}</h6>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default TestimonialSlider;
