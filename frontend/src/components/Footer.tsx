import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer id="footer" className="footer">
            <div className="container mx-auto sm:px-4">
                <div className="flex flex-wrap  gy-4">
                    <div className="lg:w-2/5 pr-4 pl-4 md:w-full pr-4 pl-4 footer-info">
                        <Link to="" className="logo flex items-center">
                            <span>{import.meta.env.VITE_APP_NAME}</span>
                        </Link>
                        <p>Cras fermentum odio eu feugiat lide par naso tierra. Justo eget nada terra videa magna derita valies darta donna mare fermentum iaculis eu non diam phasellus.</p>
                        <div className="social-links flex mt-4">
                            {/* <Link href="#" className="twitter">
                            <FaTwitter />
                        </Link>
                        <Link href="#" className="facebook">
                            <FaFacebook />
                        </Link>
                        <Link href="#" className="instagram">
                            <FaInstagram />
                        </Link>
                        <Link href="#" className="linkedin">
                            <FaLinkedin/>
                        </Link> */}
                        </div>
                    </div>

                    <div className="mt-8 w-full lg:w-3/5 flex flex-wrap">
                        <div className="lg:w-1/4 pr-4 pl-4 w-1/2 footer-links">
                            <h4>
                                <FormattedMessage
                                    id="app.footer.useful_links"
                                />
                            </h4>
                            <ul>
                                <li>
                                    <Link to="/">
                                        <FormattedMessage
                                            id="app.url.home"
                                        />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/"><FormattedMessage
                                        id="app.url.about_us"
                                    /></Link>
                                </li>
                                <li>
                                    <Link to="#">Privacy policy</Link>
                                </li>
                            </ul>
                        </div>

                        <div className="lg:w-1/4 pr-4 pl-4 w-1/2 footer-links">
                            <h4>
                                <FormattedMessage
                                    id="app.footer.our_services"
                                />
                            </h4>
                            <ul>
                                <li>
                                    <Link to="/article">
                                        <FormattedMessage
                                            id="app.url.articles"
                                        />
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="lg:w-1/2 pr-4 pl-4 w-full text-center md:text-start footer-contact">
                            <h4>
                                <FormattedMessage
                                    id="app.footer.contact_us"
                                />
                            </h4>
                            <p>
                                U38 D25 <br />
                                Astana, 010000<br />
                                Kazakhstan <br /><br />
                                <strong>Phone:</strong> +7 777 777 77 77<br />
                                <strong>Email:</strong> admin@example.com<br />
                            </p>
                        </div>

                    </div>

                </div>
            </div>

            <div className="container mx-auto sm:px-4 mt-4">
                <div className="copyright">
                    &copy; Copyright <strong><span>{import.meta.env.VITE_APP_NAME}</span></strong>. All Rights Reserved
                </div>
            </div>
        </footer>
    );
}