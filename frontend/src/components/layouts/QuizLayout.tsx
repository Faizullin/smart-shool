import React, { ReactNode } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchUserData, logout } from '../../redux/store/reducers/authSlice'
import Header from '../Header'

import AOS from 'aos';
import 'aos/dist/aos.css';
import ErrorDetailModal from '../modal/ErrorDetailModal';

type IQuizLayoutProps = {
  children: ReactNode
}

export default function QuizLayout({ children }: IQuizLayoutProps) {
  const dispath = useAppDispatch()
  const user = useAppSelector(state => state.auth.user)

  React.useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
    if (user.isAuthenticated) {
      if (!user.email) {
        dispath(fetchUserData()).then(reponse => {
          if (reponse.type !== fetchUserData.fulfilled.toString()) {
            dispath(logout())
          }
        })
      }
    }
  }, [dispath])
  return (
    <>
      <Header>
      </Header>
      <div className='flex-grow'>
        {children}
      </div>
      <ErrorDetailModal />
    </>
  )
}