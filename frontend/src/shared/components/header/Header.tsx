import { Titles } from "@/core/constants/names";
import { useAppDispatch, useAppSelector } from "@/core/hooks/redux";
import useIsMobile from "@/core/hooks/useIsMobile";
import { INotification } from "@/core/models/INotification";
import { logout } from "@/core/redux/store/reducers/authSlice";
import { fetchNotificationList } from "@/core/redux/store/reducers/notificationSlice";
import LangConfig, { ILangOption, TLang } from "@/lang/LangConfig";
import { mdiChevronDown, mdiClose, mdiMenu } from "@mdi/js";
import Icon from "@mdi/react";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Link, useNavigate } from "react-router-dom";
import PrimaryButton from "../buttons/primary-button/PrimaryButton";
import NavDropdown from "../navbar/NavDropdown";
import NavLink from "../navbar/NavLink";
import "./Header.scss";

const LanguageOptions: ILangOption[] = [
  {
    code: "en",
    name: "English",
  },
  {
    code: "kk",
    name: "Kazakh",
  },
  {
    code: "ru",
    name: "Russian",
  },
];

type IHeaderProps = {
  children?: ReactNode;
};
const links: {
  href?: string;
  to?: string;
  label: string;
  active?: boolean;
}[] = [
  {
    label: "Home",
    to: "/",
    active: true,
  },
  {
    label: "About",
    href: "/#about",
    to: "/#about",
  },
  {
    label: "Resources",
    to: "/article",
  },
  {
    label: "Chat",
    to: "/срфе",
  },
];
interface ILinkItem {
  href?: string;
  to?: string;
  label: string;
  active?: boolean;
}

const user_default_ava =
  "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp";

export default function Header({ children }: IHeaderProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const intl = useIntl();
  const headerRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { notifications_list, loaded: notification_loaded } = useAppSelector(
    (state) => state.notification
  );
  const [sticky, setSticky] = useState({ isSticky: false, offset: 0 });
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const isMobile = useIsMobile();

  const links: ILinkItem[] = [
    {
      label: intl.formatMessage({
        id: "home",
        defaultMessage: "Home",
      }),
      to: "/",
      active: true,
    },
    {
      label: intl.formatMessage({
        id: "about_us",
      }),
      href: "/#about",
      to: "/#about",
    },
    {
      label: intl.formatMessage({
        id: "resources",
        defaultMessage: "Resources",
      }),
      to: "/article",
    },
    // {
    //   label: intl.formatMessage({
    //     id: "chat",
    //     defaultMessage: "Chat",
    //   }),
    //   to: "/chat",
    // },
  ];

  const handleScroll = (elTopOffset: any, elHeight: any) => {
    if (window.pageYOffset > elTopOffset + elHeight) {
      setSticky({ isSticky: true, offset: elHeight });
    } else {
      setSticky({ isSticky: false, offset: 0 });
    }
  };
  const handleToggleMobileNav = () => {
    setIsMobileNavOpen((isMobileNavOpen) => !isMobileNavOpen);
  };
  const handleMobileDropdownChnage = (data: any) => {};
  const handleLogout = () => {
    dispatch(logout());
  };
  const handleLangChang = (lang: TLang) => {
    LangConfig.setLang(lang);
    window.location.reload();
  };

  const handleRedirect = (event: any, to: string) => {
    event?.preventDefault();
    if (isMobile) {
      if (isMobileNavOpen) {
        setIsMobileNavOpen((state) => !state);
        navigate(to);
      }
    } else {
      navigate(to);
    }
  };

  const unread_notifications = React.useMemo(() => {
    return notifications_list.filter(
      (item: INotification) => item.unread === true
    );
  }, [notification_loaded]);

  useEffect(() => {
    if (headerRef.current) {
      var header = headerRef.current.getBoundingClientRect();
      const handleScrollEvent = () => {
        handleScroll(header.top, header.height);
      };

      window.addEventListener("scroll", handleScrollEvent);

      return () => {
        window.removeEventListener("scroll", handleScrollEvent);
      };
    }
  }, []);
  React.useEffect(() => {
    if (!notification_loaded && isAuthenticated) {
      dispatch(fetchNotificationList());
    }
  }, [notification_loaded, isAuthenticated]);

  return (
    <header id="header" className="header shadow-sm bg-white">
      <div className="container h-100 d-flex align-items-center justify-content-between">
        <h1 className="logo me-auto me-lg-0">
          <Link to={"/"}>
            {Titles.app_header_logo_name}
            <span className="text-color-orange-f2">.</span>
          </Link>
        </h1>
        <nav
          id="navbar"
          className={`navbar h-100 order-last order-sm-0 mobile-nav ${
            isMobileNavOpen ? "navbar-mobile" : ""
          }`}
        >
          <ul>
            {links.map((link, index) => (
              <li key={index}>
                <NavLink
                  link={link}
                  onClick={(e) => handleRedirect(e, link.href || link.to)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <NavDropdown
              className="position-relative dropdown-menu-end d-sm-none"
              mobile={true}
              titleComponent={<span>{intl.locale}</span>}
            >
              {LanguageOptions.map((lang, index) => (
                <li key={index}>
                  <a
                    onClick={() => handleLangChang(lang.code)}
                    className={`${
                      lang.code === intl.locale ? "text-color-green-normal" : ""
                    }`}
                  >
                    {lang.name}
                  </a>
                </li>
              ))}
            </NavDropdown>
            {isAuthenticated ? (
              <NavDropdown
                className="position-relative dropdown-menu-end d-sm-none"
                mobile={true}
                titleComponent={
                  <div className="position-relative">
                    <img
                      src={user_default_ava}
                      alt=""
                      className="border avatar"
                    />
                    <div
                      className={`notification-point ${
                        unread_notifications.length > 0 ? "" : "d-none"
                      }`}
                    ></div>
                  </div>
                }
              >
                <>
                  <li className="dropdown">
                    <Link to="/dashboard">
                      <span>
                        <FormattedMessage
                          id="notifications"
                          defaultMessage="Notifications"
                        />
                      </span>
                      {/* <i className="bi bi-chevron-right"></i> */}
                    </Link>
                    <ul>
                      {unread_notifications.map((item: INotification) => (
                        <li key={item.id}>
                          <Link to={`/dashboard`}>
                            {item.description.length > 9
                              ? item.description.substring(0, 9) + "..."
                              : item.description}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li>
                    <Link to={"/dashboard/profile"}>
                      <FormattedMessage id="profile" defaultMessage="Profile" />
                    </Link>
                  </li>
                  <li>
                    <Link to={"/dashboard"}>
                      <FormattedMessage
                        id="dashboard"
                        defaultMessage="Dashboard"
                      />
                    </Link>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        event.preventDefault();
                        handleLogout();
                      }}
                    >
                      <FormattedMessage id="logout" defaultMessage="Logout" />
                    </a>
                  </li>
                </>
              </NavDropdown>
            ) : (
              <PrimaryButton
                onClick={(e) => handleRedirect(e, "/auth/login")}
                className="d-md-none"
              >
                <FormattedMessage id="login" defaultMessage="Login" />
              </PrimaryButton>
            )}
          </ul>
          <a
            className="bg-transparent d-sm-none"
            onClick={handleToggleMobileNav}
          >
            <Icon
              path={isMobileNavOpen ? mdiClose : mdiMenu}
              size={1.3}
              className={`mobile-nav-toggle ${
                isMobileNavOpen
                  ? "text-color-orange-f2"
                  : "text-color-green-normal"
              }`}
            />
          </a>
        </nav>

        <div className="navbar d-none d-sm-block">
          <ul>
            <li className="dropdown">
              <a href="#" className="h-100 text-color-black-26 font-noto">
                <span>{intl.locale}</span>
                <Icon path={mdiChevronDown} size={1} />
              </a>
              <ul>
                {LanguageOptions.map((lang, index) => (
                  <li key={index}>
                    <a
                      onClick={() => handleLangChang(lang.code)}
                      role="button"
                      className={`${
                        lang.code === intl.locale
                          ? "text-color-green-normal"
                          : ""
                      }`}
                    >
                      {lang.name}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
            {isAuthenticated ? (
              <li className="dropdown position-relative dropdown-menu-end ">
                <a href="#" className="p-0">
                  <img
                    src={user_default_ava}
                    alt=""
                    className="w-100 border avatar"
                  />
                  <div
                    className={`notification-point ${
                      unread_notifications.length > 0 ? "" : "d-none"
                    }`}
                  ></div>
                </a>
                <ul className="notification-list-ul">
                  <li className="dropdown">
                    <a
                      href="#"
                      onClick={(e) => handleRedirect(e, "/dashboard")}
                    >
                      <span>
                        <FormattedMessage
                          id="notifications"
                          defaultMessage="Notifications"
                        />
                      </span>
                      {/* <i className="bi bi-chevron-right"></i> */}
                    </a>
                    <ul>
                      {unread_notifications.map((item: INotification) => (
                        <li key={item.id}>
                          <a
                            href="#"
                            onClick={(e) => handleRedirect(e, "/dashboard")}
                          >
                            {item.description.length > 9
                              ? item.description.substring(0, 9) + "..."
                              : item.description}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={(e) => handleRedirect(e, "/dashboard/profile")}
                    >
                      <FormattedMessage id="profile" defaultMessage="Profile" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={(e) => handleRedirect(e, "/dashboard")}
                    >
                      <FormattedMessage
                        id="dashboard"
                        defaultMessage="Dashboard"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={(event) => {
                        event.preventDefault();
                        handleLogout();
                      }}
                    >
                      <FormattedMessage id="logout" defaultMessage="Logout" />
                    </a>
                  </li>
                </ul>
              </li>
            ) : (
              <PrimaryButton onClick={(e) => handleRedirect(e, "/auth/login")}>
                <FormattedMessage id="login" defaultMessage="Login" />
              </PrimaryButton>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}
