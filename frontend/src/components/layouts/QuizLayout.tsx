import React, { ReactNode } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchUserData, logout } from '../../redux/store/reducers/authSlice'
import Header from '../Header'

import AOS from 'aos';
import 'aos/dist/aos.css';
import MicroButton from '../speech-recognition/MicroButton';

type IQuizLayoutProps = {
  children: ReactNode
  listening: boolean
  onMicroClick: () => any
}

export default function QuizLayout({ children, listening, onMicroClick }: IQuizLayoutProps) {
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
        <div className="container mx-auto flex items-center justify-between px-4">
          <MicroButton onClick={onMicroClick} active={listening} />
        </div>
      </Header>
      {children}
    </>
  )
}