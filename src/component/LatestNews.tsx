import latestNews from "@/arrayList/latestNews";
import React from "react";

const LatestNews = () => {
  return (
    <div className="row">
      {latestNews.map((news) => {
        return (
          <div className="col-md-4 col-6" key={news.id} data-aos="fade-right">
            <div className="letest_news_box">
              <div className="letest_news_img">
                <img src={news.image} alt="" className="w-100" />
              </div>
              <div className="letest_news_user_content">
                <h6>{news.title}</h6>
                <p>{news.description}</p>
                <a href="">Learn More</a>
              </div>
            </div>
          </div>
        );
      })}
      {/* letest_news 3 */}
    </div>
  );
};

export default LatestNews;
