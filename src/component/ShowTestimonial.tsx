import React from "react";
import SectionTopDescription from "./SectionTopDescription";
import RowTitleDescription from "./RowTitleDescription";
import TestimonialSlider from "./TestimonialSlider";

const ShowTestimonial = () => {
  return (
    <div className="testimonial_section">
      <div className="testimonial_overlay testimonial_background"></div>
      <div className="container">
        {/* <h2>testimonial</h2> */}
        <div className="row py-5">
          <div className="col-md-6 col-12">
            <RowTitleDescription
              title={"What They Say ?"}
              subTitle={"Testimonial"}
              description={
                "Vestibulum sit amet odio dui. Integer eleifend nibh massa, nec vehicula metus efficitur non. Pellentesque iaculis tincidunt purus, eleifend interdum arcu tempor ac."
              }
            />
          </div>
          <div className="col-md-6 col-12">
            <TestimonialSlider />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowTestimonial;
