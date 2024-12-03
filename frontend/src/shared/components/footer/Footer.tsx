import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import "./Footer.scss";
import React from "react";
import { Titles } from "@/core/constants/names";

export default function Footer() {
  return (
    <footer id="footer">
      {/* <div className="footer-newsletter">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <h4>Join Our Newsletter</h4>
              <p>
                Tamen quem nulla quae legam multos aute sint culpa legam noster
                magna
              </p>
              <form action="" method="post">
                <input type="email" name="email" />
                <input type="submit" value="Subscribe" />
              </form>
            </div>
          </div>
        </div>
      </div> */}

      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 footer-contact">
              <h3>{Titles.app_name}</h3>
              <p> Кабанбай Батыра, 53, блок 1, Назарбаев университет, Астана 010000, Казахстан <br />

                <br />
                <br />
                <strong>Phone:</strong> +7 (777) 439 39 82
                <br />
                <strong>Email:</strong> issai@nu.edu.kz
                <br />
              </p>
            </div>

            <div className="col-lg-3 col-md-6 footer-links">
              <h4>
                <FormattedMessage
                  id="useful_links"
                  defaultMessage="Useful Links"
                />
              </h4>
              <ul>
                <li>
                  <i className="bx bx-chevron-right"></i>{" "}
                  <a href="#">
                    <FormattedMessage id="home" defaultMessage="Home" />
                  </a>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>{" "}
                  <a href="/#about">
                    <FormattedMessage id="about_us"/>
                  </a>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>{" "}
                  <a href="#">Privacy policy</a>
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 footer-links">
              <h4>
                <FormattedMessage
                  id="our_services"
                  defaultMessage="Our Services"
                />
              </h4>
              <ul>
                <li>
                  <i className="bx bx-chevron-right"></i>{" "}
                  <a href="/#about">
                    <FormattedMessage
                      id="web_design"
                      defaultMessage="Web Design"
                    />
                  </a>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>{" "}
                  <a href="/#about">
                    <FormattedMessage
                      id="FvA189"
                      defaultMessage="Web Devlopment"
                    />
                  </a>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>{" "}
                  <a href="/#about">
                    <FormattedMessage
                      id="hnM9ND"
                      defaultMessage="Robotics integration"
                    />
                  </a>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>{" "}
                  <a href="/#about">
                    <FormattedMessage
                      id="4tL2Jy"
                      defaultMessage="Product Management"
                    />
                  </a>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>{" "}
                  <a href="/#about">
                    <FormattedMessage
                      id="oiUZCZ"
                      defaultMessage="Graphic Design"
                    />
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 footer-links">
              {/* <h4>Our Social Networks</h4>
              <div className="social-links mt-3"></div>
              <div className="social-links mt-3">
                <a href="#" className="twitter">
                  <i className="bx bxl-twitter"></i>
                </a>
                <a href="#" className="facebook">
                  <i className="bx bxl-facebook"></i>
                </a>
                <a href="#" className="instagram">
                  <i className="bx bxl-instagram"></i>
                </a>
                <a href="#" className="google-plus">
                  <i className="bx bxl-skype"></i>
                </a>
                <a href="#" className="linkedin">
                  <i className="bx bxl-linkedin"></i>
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="container footer-bottom clearfix">
        <div className="copyright">
          &copy; Copyright{" "}
          <strong>
            <span>{Titles.app_name}</span>
          </strong>
          . All Rights Reserved
        </div>
      </div>
    </footer>
  );
}
