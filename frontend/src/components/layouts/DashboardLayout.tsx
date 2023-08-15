import React, { ReactNode } from 'react'
import Layout from './Layout';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Link } from 'react-router-dom';
import Loader from '../loader/Loader';
import { fetchUserData } from '../../redux/store/reducers/authSlice';
import { fetchStudentData } from '../../redux/store/reducers/studentSlice';
import { FormattedMessage } from 'react-intl';

type Props = {
    children: ReactNode
}

const DashboardLayout = ({ children }: Props) => {
    const { student_payload } = useAppSelector(state => state.student)
    const { userData, loading } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        if (!userData.id) {
            dispatch(fetchUserData())
        }

    }, [dispatch])
    React.useEffect(() => {
        if (userData.isStudent && !student_payload?.id) {
            dispatch(fetchStudentData())
        }
    }, [userData])


    return (
        <Layout>
            {
                !loading && userData ? (
                    <section className="bg-gray-100 ">
                        <div className="container mx-auto p-5">
                            <div className="md:flex no-wrap md:-mx-2 ">
                                <div className="w-full md:w-3/12 md:mx-2">
                                    <div className="bg-white p-3 border-t-4 border-green-400">
                                        <div className={`image overflow-hidden w-20 ${userData ? '' : 'hidden'}`}>
                                            
                                            <img className="h-auto w-full mx-auto"
                                                src={userData.profile_picture}
                                                alt="Profile" />
                                        </div>
                                        <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{userData.username}</h1>
                                        <h3 className="text-gray-600 font-lg text-semibold leading-6">Student in our school.</h3>
                                        <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                                            {student_payload?.others}
                                        </p>
                                        <ul
                                            className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                            <li className="flex items-center py-3">
                                                <span>
                                                    <FormattedMessage id="app.status.label" />
                                                </span>
                                                <span className="ml-auto">
                                                    <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">{student_payload?.current_status}</span>
                                                </span>
                                            </li>
                                            <li className="flex items-center py-3">
                                                <span>
                                                    <FormattedMessage id="app.dashboard.member_since.label" />
                                                </span>
                                                <span className="ml-auto">{student_payload?.created_at}</span>
                                            </li>
                                            <li className="flex items-center py-3">
                                                <span>
                                                    <FormattedMessage id="app.dashboard.current_group.label" />

                                                </span>
                                                <span className="ml-auto">{student_payload?.current_group}</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="my-4"></div>
                                    <div className="bg-white p-3 hover:shadow">
                                        <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                                            <span className="text-green-500">
                                                <svg className="h-5 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                    viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                            </span>
                                            <span>
                                                <FormattedMessage id="app.dashboard.scheme.label" />

                                            </span>
                                        </div>
                                        <div className="mb-3"></div>
                                        <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                                            <span className="text-green-500">
                                                <svg className="h-5 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                    viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                            </span>
                                            <span>
                                                <Link to="/dashboard/results">
                                                    <FormattedMessage id="app.url.my_results.label" />

                                                </Link>
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                                            <span className="text-green-500">
                                                <svg className="h-5 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                    viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                            </span>
                                            <span>
                                                <Link to="/dashboard/exams">
                                                    <FormattedMessage id="app.url.my_exams.label" />

                                                </Link>
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                                            <span className="text-green-500">
                                                <svg className="h-5 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                    viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                            </span>
                                            <span>
                                                <Link to="/dashboard/profile/edit">
                                                    <FormattedMessage id="app.url.update_profile.label" />

                                                </Link>
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                                            <span className="text-green-500">
                                                <svg className="h-5 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                    viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                            </span>
                                            <span>
                                                <Link to="/dashboard/certificates">
                                                    <FormattedMessage id="app.url.my_certificates.label" />

                                                </Link>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-9/12 md:mx-2 mt-6 md:mt-0">
                                    <div className="bg-white p-3 shadow-sm rounded-sm min-h-64">
                                        <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                            <span className="text-green-500">
                                                <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </span>
                                            <span className="tracking-wide">
                                                <FormattedMessage id="app.dashboard.about.label" />

                                            </span>
                                        </div>
                                        <div className="text-gray-700">
                                            <div className="grid md:grid-cols-2 text-sm">
                                                <div className="grid grid-cols-2">
                                                    <div className="px-4 py-2 font-semibold">
                                                        <FormattedMessage id="app.auth.username.label" />

                                                    </div>
                                                    <div className="px-4 py-2">{userData.username}</div>
                                                </div>
                                                <div className="grid grid-cols-2">
                                                    <div className="px-4 py-2 font-semibold">
                                                        <FormattedMessage id="app.auth.email.label" />

                                                    </div>
                                                    <div className="px-4 py-2">
                                                        <a className="text-blue-800" href={`mailto:${userData.email}`}>{userData.email}</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`bg-white p-3 shadow-sm rounded-sm min-h-64 ${student_payload ? '' : 'hidden'}`}>
                                        <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                            <span className="text-green-500">
                                                <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </span>
                                            <span className="tracking-wide">
                                                <FormattedMessage id="app.dashboard.student_data.label" />

                                            </span>
                                        </div>
                                        <div className="text-gray-700">
                                            <div className="grid md:grid-cols-2 text-sm">
                                                <div className="grid grid-cols-2">
                                                    <div className="px-4 py-2 font-semibold">
                                                        <FormattedMessage id="app.dashboard.student_data.first_name.label" />

                                                    </div>
                                                    <div className="px-4 py-2">{student_payload?.first_name}</div>
                                                </div>
                                                <div className="grid grid-cols-2">
                                                    <div className="px-4 py-2 font-semibold">
                                                        <FormattedMessage id="app.dashboard.student_data.gender.label" />

                                                    </div>
                                                    <div className="px-4 py-2">{student_payload?.gender}</div>
                                                </div>
                                                <div className="grid grid-cols-2">
                                                    <div className="px-4 py-2 font-semibold">
                                                        <FormattedMessage id="app.dashboard.student_data.contact_no.label" />

                                                    </div>
                                                    <div className="px-4 py-2">{student_payload?.parent_mobile_number}</div>
                                                </div>
                                                <div className="grid grid-cols-2">
                                                    <div className="px-4 py-2 font-semibold">
                                                        <FormattedMessage id="app.dashboard.student_data.current_address.label" />
                                                    </div>
                                                    <div className="px-4 py-2">{student_payload?.address}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="my-4"></div>
                                    {children}
                                </div>
                            </div>
                        </div>
                    </section>
                ) : (
                    <Loader />
                )
            }
        </Layout>
    )
}

export default DashboardLayout