import React from 'react';
import { candidates, services } from '@/arrayList/mainJson';
import LatestNews from '@/component/LatestNews';
import SectionTopDescription from '@/component/SectionTopDescription';
import CustomBanner from '@/component/customBanner';

const HomePage = () => {
  return (
    <>
      <CustomBanner />
      <section className='letest_news_section'>
        <div className='container'>
          <div className='letest_news_container'>
            <SectionTopDescription
              textAlign={'text-center'}
              subTitle={'Our News'}
              title={'Our Latest News That Can Help You'}
              description={
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.'
              }
            />
          </div>
          <LatestNews />
        </div>
      </section>

      <section className='we-are-hiring'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6 col-12'>
              <div className='row'>
                <div className='col-md-12'>
                  <SectionTopDescription
                    textAlign={'text-left'}
                    subTitle={'We Are Working'}
                    title={"We Don't Stop After Hiring"}
                    description={
                      'Nulla eleifend ultricies urna, id sagittis nibh ullamcorper a. Sed in velit sit amet eros porta molestie. In ultrices, magna at fringilla ultricies.'
                    }
                  />
                </div>
              </div>
              <div className='we-content'>
                {candidates.map((candidate, index) => {
                  return (
                    <div className='we-list' key={candidate.id}>
                      <div className='list-icon' data-aos='fade-right'>
                        <h5>0{candidate.id}</h5>
                      </div>

                      <div className='list-content' data-aos='slide-left'>
                        <h3>{candidate.candidate}</h3>
                        <p>{candidate.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className='col-md-6 col-12'>
              <div className='we-are-gallery'>
                <div className='we-gallery' data-aos='fade-right'>
                  <img src='./testomonial_2.jpg' alt='' />
                </div>

                <div className='upper_img_container' data-aos='fade-up'>
                  <img src='./testomonial_1.jpg' alt='' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='video-section'>
        <div className='right_employ'>
          <div className='container'>
            <div className='row position-relative'>
              <div className='col-md-8 col-12 mx-auto '>
                <div className='row align-items-center'>
                  <div className='col-12'>
                    <div
                      className='mainTitle play-btn-container'
                      data-aos='fade-right'
                    >
                      <h2 className='text-center text-white'>
                        We Continue Helping Company Finding The Right Employee
                      </h2>
                      <div className='video-btn'>
                        <div className='promo-video'>
                          <div className='waves-block'>
                            <div className='waves wave-1'></div>
                            <div className='waves wave-2'></div>
                            <div className='waves wave-3'></div>
                          </div>
                        </div>
                        <a
                          href='https://www.youtube.com/watch?v=BqI0Q7e4kbk'
                          className='video video-popup mfp-iframe'
                          target='_blank'
                          data-lity
                        >
                          <img src='./play.svg' alt='' />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='services-block'>
        <div className='container text-center'>
          <div className='section-heading text-center'>
            <div className='subTitle' data-aos='fade-down'>
              <h6>Our Service</h6>
              <h2>Our Rigorous Process Is Proven</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
              </p>
            </div>
          </div>
          <div className='row g-2 '>
            {services.map((service, index) => {
              return (
                <div className='col-md-6 col-12 services' key={index}>
                  <div className='service-list px-4 py-1 text-center rounded-5'>
                    <div className='img-container'>
                      <img src={service.image} alt='' />
                    </div>
                    <div className='service_data'>
                      <h5 data-aos='fade-left '>{service.title}</h5>
                      <p data-aos='fade-right'>{service.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className='button-wrapper-primary mt-4' data-aos='fade-up'>
            <button className='btn btn-theme'>Learn More</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
