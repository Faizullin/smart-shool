import { IArticle } from "@/core/models/IArticle";
import ArticleService from "@/core/services/ArticleService";
import PrimaryButton from "@/shared/components/buttons/primary-button/PrimaryButton";
import StarField from "@/shared/components/star-field/StarField";
import TitleHelment from "@/shared/components/title/TitleHelmet";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useLocation, useNavigate } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/effect-cards';
import { Autoplay, EffectCards } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import "./About.scss";

import Img1 from "@/assets/img/landing-home-image-1.jpg";
import Img2 from "@/assets/img/landing-home-image-2.jpg";
import Img3 from "@/assets/img/landing-home-image-3.jpg";
import Img4 from "@/assets/img/landing-home-image-4.jpg";

const PopularArticleItem = ({
  article_item,
  onArticleDetailClick,
}: {
  article_item: IArticle;
  onArticleDetailClick: (id: number) => void;
}) => {
  return (
    <div className="col-11 col-sm-6 col-md-4 popular-article-item position-relative">
      <div className="d-flex flex-column">
        <img
          src={article_item.featured_image?.url}
          alt={article_item.featured_image?.url}
          className=""
        />
      </div>
      <p className="popular-article-title text-color-black-26">
        {article_item.title}
      </p>
      <div className="position-absolute bottom-0 d-flex justify-content-between ">
        <PrimaryButton onClick={() => onArticleDetailClick(article_item.id)}>
          <FormattedMessage id="detail" defaultMessage="Detail" />
        </PrimaryButton>
      </div>
    </div>
  );
};



export default function About() {
  const navigate = useNavigate();
  const currentLocation = useLocation();
  const [popularArticlesList, setPopularArticlesList] = React.useState<
    IArticle[]
  >([]);
  const landingSliderImages = [
    Img1,
    Img2,
    Img3,
    Img4,
  ]
  React.useEffect(() => {
    if (currentLocation.hash) {
      const element = document.getElementById(
        currentLocation.hash.substring(1)
      );
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    ArticleService.getPopularItems().then((response) => {
      setPopularArticlesList(response.data);
    });
  }, []);
  const onArticleDetailClick = (id: number) => {
    navigate(`/article/${id}/`);
  };
  return (
    <main id="main" className="about-page">
      <TitleHelment title={"Home"} />
      <section className="position-relative landing-1">
        <div className="position-absolute start-0 w-100 landing-op">
          <div className="container h-100">
            <div className="row z-1 h-100 ">
              <div className="col-12 col-md-4 p-0">
                <div className="op op-1 h-100 d-flex flex-column  justify-content-center align-items-center ">
                  <p className="op-description font-noto">
                    <FormattedMessage
                      id="Gs62mG"
                      defaultMessage="Start devlopment"
                    />
                  </p>
                  <p className="op-title text-color-white font-noto">
                    <FormattedMessage id="tVweXM" defaultMessage="IT start" />
                  </p>
                </div>
              </div>
              <div className="col-12 col-md-4 p-0">
                <div className="op op-2 h-100 d-flex flex-column  justify-content-center align-items-center ">
                  <p className="op-description font-noto">
                    <FormattedMessage
                      id="/tj8WM"
                      defaultMessage="Deep learning"
                    />
                  </p>
                  <p className="op-title text-color-white font-noto">
                    <FormattedMessage id="cYDrCK" defaultMessage="Deep-ai" />
                  </p>
                </div>
              </div>
              <div className="col-12 col-md-4 p-0">
                <div className="op op-3 h-100 d-flex flex-column  justify-content-center align-items-center ">
                  <p className="op-description font-noto">
                    <FormattedMessage
                      id="ecguCq"
                      defaultMessage="Advanced robotics"
                    />
                  </p>
                  <p className="op-title text-color-white font-noto">
                    <FormattedMessage id="71DvwL" defaultMessage="Roboto" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <img src={imgLanding} alt="" className="w-100"/> */}
        <div className="post-details-header">
          <div className="post-details-header-wrap">
            <div className="w-100 content-area">
              <div className="content-area-wrap">
                <div className="container">
                  <div className="row _gutter-80 _align-items-center justify-content-between">
                    <div className="post-details-header-left col-xl-5 col-lg-6">
                      <h1 className="post-details-tagline">
                        <FormattedMessage id="shape_future_title" defaultMessage="Shape Your Future" />
                      </h1>
                      <span className="post-details-title">
                        <FormattedMessage id="experince_tr_description" defaultMessage="Experience transformative learning that prepares you for the challenges of tomorrow." />
                      </span>
                    </div>
                    <div className="post-details-header-right col-xl-6 col-lg-6">
                      <div className="post-details-banner">
                        <Swiper
                          effect={'cards'}
                          grabCursor={true}
                          modules={[EffectCards, Autoplay]}
                          className="mySwiper"
                          autoplay={{ delay: 3500 }}
                        >
                          {
                            landingSliderImages.map((item, index) => (
                              <SwiperSlide key={index}>
                                <img src={item} alt={item} />
                              </SwiperSlide>
                            ))
                          }
                        </Swiper>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*<section id="about" className="clients">*/}
      {/*  <div className="container">*/}
      {/*    <div className="d-flex justify-content-center mb-4 ">*/}
      {/*      <h2 className="text-color-green-normal font-noto font-weight-bold">*/}
      {/*        <FormattedMessage id="about_us" defaultMessage="About us" />*/}
      {/*      </h2>*/}
      {/*    </div>*/}
      {/*    <div className="row">*/}
      {/*      /!* Opportunities Column *!/*/}
      {/*      <div className="col-md-6">*/}
      {/*        <h4 className="green-text">*/}
      {/*          <FormattedMessage id="zB5VYc" defaultMessage="Opportunities" />*/}
      {/*        </h4>*/}
      {/*        <p>*/}
      {/*          <FormattedMessage*/}
      {/*            id="ullM+c"*/}
      {/*            defaultMessage="Unlock exciting career opportunities in the fields of IoT,*/}
      {/*          Robotics, and Informatics. Our programs are designed to prepare*/}
      {/*          you for the challenges of the modern technological landscape."*/}
      {/*          />*/}
      {/*        </p>*/}
      {/*      </div>*/}
      {/*      /!* Description Column *!/*/}
      {/*      <div className="col-md-6">*/}
      {/*        <h4 className="green-text">*/}
      {/*          <FormattedMessage*/}
      {/*            id="description"*/}
      {/*            defaultMessage="Description"*/}
      {/*          />*/}
      {/*        </h4>*/}
      {/*        <p>*/}
      {/*          <FormattedMessage*/}
      {/*            id="1fG/hw"*/}
      {/*            defaultMessage="Welcome to our online school dedicated to IoT, Robotics, and*/}
      {/*            Informatics. We are passionate about fostering innovation and*/}
      {/*            providing quality education in cutting-edge technologies."*/}
      {/*          />*/}
      {/*        </p>*/}
      {/*        <p>*/}
      {/*          <FormattedMessage*/}
      {/*            id="EsqiVy"*/}
      {/*            defaultMessage="Our mission is to empower students with the knowledge and skills*/}
      {/*            needed to thrive in the rapidly evolving fields of IoT,*/}
      {/*            Robotics, and Informatics. Whether you're a beginner or an*/}
      {/*            experienced professional, our courses cater to all levels of*/}
      {/*            expertise."*/}
      {/*          />*/}
      {/*        </p>*/}
      {/*        <p>*/}
      {/*          <FormattedMessage id="d02RrA" defaultMessage="Why choose us?" />*/}
      {/*        </p>*/}
      {/*        <ul className="list-unstyled">*/}
      {/*          <li className="green-text">*/}
      {/*            <FormattedMessage*/}
      {/*              id="HHimCO"*/}
      {/*              defaultMessage="Expert Instructors"*/}
      {/*            />*/}
      {/*          </li>*/}
      {/*          <li className="green-text">*/}
      {/*            <FormattedMessage*/}
      {/*              id="or11Q2"*/}
      {/*              defaultMessage="Hands-on Learning"*/}
      {/*            />*/}
      {/*          </li>*/}
      {/*          <li className="green-text">*/}
      {/*            <FormattedMessage*/}
      {/*              id="KHMm3V"*/}
      {/*              defaultMessage="Comprehensive Curriculum"*/}
      {/*            />*/}
      {/*          </li>*/}
      {/*          <li className="green-text">*/}
      {/*            <FormattedMessage*/}
      {/*              id="KNEurE"*/}
      {/*              defaultMessage="Community Support"*/}
      {/*            />*/}
      {/*          </li>*/}
      {/*        </ul>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    /!* Other Column *!/*/}
      {/*    <div className="col-md-12 mt-4">*/}
      {/*      <h4 className="green-text">*/}
      {/*        <FormattedMessage id="/VnDMl" defaultMessage="Other" />*/}
      {/*      </h4>*/}
      {/*      <p>*/}
      {/*        <FormattedMessage*/}
      {/*          id="KfGEob"*/}
      {/*          defaultMessage="Explore our state-of-the-art online learning platform that*/}
      {/*        provides a dynamic and interactive learning experience. Join our*/}
      {/*        community of like-minded individuals and stay updated on the*/}
      {/*        latest advancements in technology."*/}
      {/*        />*/}
      {/*      </p>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}
      <section id="about" className="clients">
        <div className="container">
          <div className="d-flex justify-content-center mb-5">
            <h2 className=" font-noto font-weight-bold">
              <FormattedMessage id="about_us" defaultMessage="About Us" />
            </h2>
          </div>

          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h4 className="green-text font-weight-bold">
                    <FormattedMessage id="zB5VYc" defaultMessage="Opportunities" />
                  </h4>
                  <p>
                    <FormattedMessage
                      id="ullM+c"
                      defaultMessage="Unlock exciting career opportunities in the fields of IoT,
                Robotics, and Informatics. Our programs are designed to prepare
                you for the challenges of the modern technological landscape."
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h4 className="green-text font-weight-bold">
                    <FormattedMessage id="description" defaultMessage="Description" />
                  </h4>
                  <p>
                    <FormattedMessage
                      id="1fG/hw"
                      defaultMessage="Welcome to our online school dedicated to IoT, Robotics, and
                Informatics. We are passionate about fostering innovation and
                providing quality education in cutting-edge technologies."
                    />
                  </p>
                  <p>
                    <FormattedMessage
                      id="EsqiVy"
                      defaultMessage="Our mission is to empower students with the knowledge and skills
                needed to thrive in the rapidly evolving fields of IoT,
                Robotics, and Informatics. Whether you're a beginner or an
                experienced professional, our courses cater to all levels of
                expertise."
                    />
                  </p>


                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-12 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h4 className="green-text font-weight-bold">
                    <FormattedMessage id="/VnDMl" defaultMessage="Other" />
                  </h4>
                  <p>
                    <FormattedMessage
                      id="KfGEob"
                      defaultMessage="Explore our state-of-the-art online learning platform that
                provides a dynamic and interactive learning experience. Join our
                community of like-minded individuals and stay updated on the
                latest advancements in technology."
                    />
                  </p>
                </div>
              </div>
            </div>

          </div>


        </div>
      </section>

      <section id="top-labs" className="clients">
        <div className="container">
          <StarField className="ms-3 mt-2" />
          <div className="d-flex justify-content-center mb-4 ">
            <h2 className="text-color-green-normal font-noto font-weight-bold text-capitalize">
              <FormattedMessage
                id="top-articles"
                defaultMessage="Top articles"
              />
            </h2>
          </div>
          <div className="row">
            {popularArticlesList.map((article_item) => (
              <PopularArticleItem
                key={article_item.id}
                article_item={article_item}
                onArticleDetailClick={onArticleDetailClick}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
