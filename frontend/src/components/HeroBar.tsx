import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
// import HeroImg from '../assets/img/hero-img.svg';
const HeroImg = ''

const base_url = ((window as any).BASE_API_URL !== undefined) ? (window as any).BASE_API_URL : import.meta.env.VITE_APP_BASE_URL


export default function Herobar() {
    return (
        <section id="hero" className="hero">
            <div className="container mx-auto sm:px-4 relative">
                <div className="flex flex-wrap  gy-5" data-aos="fade-in">
                    <div className="lg:w-1/2 pr-4 pl-4 order-2 lg:order-1 flex flex-col justify-center text-center text-lg-start">
                        <h2>
                            <FormattedMessage
                                id="app.herobar.welcome.to"
                            />
                            <span>{import.meta.env.VITE_APP_NAME}</span></h2>
                        <p>
                            <FormattedMessage
                                id="app.herobar.welcome.info"
                            />
                        </p>
                        <div className="flex justify-center lg:justify-start">
                            <Link to="/" className="btn-get-started">
                                <FormattedMessage
                                    id="app.herobar.welcome.get_started"
                                />
                            </Link>
                        </div>
                    </div>
                    <div className="lg:w-1/2 pr-4 pl-4 order-1 lg:order-2">
                        <img src={HeroImg} className="max-w-full h-auto" alt="" data-aos="zoom-out" data-aos-delay="100" />
                    </div>
                </div>
            </div>

            <div className="icon-boxes relative">
                <div className="container mx-auto sm:px-4 relative">
                    <div className="flex flex-wrap gy-4 mt-12">

                        <div className="xl:w-1/3 md:w-1/2 w-full pr-4 pl-4 mt-5" data-aos="fade-up" data-aos-delay="100">
                            <div className="icon-box">
                                <div className="icon"><i className="bi bi-easel"></i></div>
                                <h4 className="title">
                                    <Link to="/dashboard/profile" className="stretched-link">
                                        <FormattedMessage
                                            id="app.herobar.role.student"
                                        />
                                    </Link>
                                </h4>
                            </div>
                        </div>

                        <div className="xl:w-1/3 md:w-1/2 w-full pr-4 pl-4 mt-5" data-aos="fade-up" data-aos-delay="200">
                            <div className="icon-box">
                                <div className="icon"><i className="bi bi-gem"></i></div>
                                <h4 className="title">
                                    <a href={`${base_url}/s/dashboard/`} className="stretched-link">
                                        <FormattedMessage
                                            id="app.herobar.role.teacher"
                                        />
                                    </a>
                                </h4>
                            </div>
                        </div>

                        <div className="xl:w-1/3 md:w-1/2 w-full pr-4 pl-4 mt-5" data-aos="fade-up" data-aos-delay="300">
                            <div className="icon-box">
                                <div className="icon"><i className="bi bi-geo-alt"></i></div>
                                <h4 className="title">
                                    <a href={`${base_url}/s/dashboard/`} className="stretched-link">
                                        <FormattedMessage
                                            id="app.herobar.role.staff"
                                        />
                                    </a>
                                </h4>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}