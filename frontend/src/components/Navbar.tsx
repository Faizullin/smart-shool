import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import AuthDropdown from "./form/auth/AuthDropdown";
import LangSelect from "./LangSelect";
import { FormattedMessage } from "react-intl";

export interface INavbarProps {
}

export default function Navbar(_: INavbarProps) {
    const [isOpenNavbar, setIsOpenNavbar] = useState(false);
    const handleMobileToggle = () => setIsOpenNavbar(!isOpenNavbar);
    useEffect(function () {
        if (isOpenNavbar) {
            document.body.classList.add('mobile-nav-active');
        } else {
            document.body.classList.remove('mobile-nav-active');
        }
    }, [isOpenNavbar])

    return (
        <div className="container h-100 d-flex justify-content-between">
            <Link to="/" className="logo flex items-center">
                <h1>{import.meta.env.VITE_APP_NAME}<span>.</span></h1>
            </Link>
            {/* <div className={`${isOpenNavbar ? "" : "hidden"} fixed inset-0 mobile-nav-bg`}>
            </div> */}
            <div id="navbar" className="h-100 m-0 p-0">
                <ul className="h-100 d-flex justify-content-center align-items-stretch m-0 p-0">
                    <li className="h-full px-6">
                        <NavLink to="/" classList="text-decoration-none text-green-normal">
                            <FormattedMessage
                                id="app.url.home"
                                defaultMessage="Home"
                            />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/article" className="text-green-normal">
                            <FormattedMessage
                                id="app.url.articles"
                                defaultMessage="Articles"
                            />
                        </NavLink>
                    </li>
                    {/* <LangSelect /> */}
                    <AuthDropdown />
                </ul>
            </div>
            <div className="">

            </div>
        </div>
    );
}