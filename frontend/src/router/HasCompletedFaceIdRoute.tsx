import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import QuizSessionService from '@/core/services/QuizSessionService';


const HasCompletedFaceIdRoute: React.FC<{ children: JSX.Element, forRoute: string }> = ({ children, forRoute }) => {
    const params = useParams()

    const data = QuizSessionService.getSessionData()
    const sessionData = {
        verified: false,
        for: forRoute + params.id,
    }
    if (data && data.for === sessionData.for) {
        sessionData.verified = data.verified
    }
    QuizSessionService.setSessionData(sessionData)
    if (sessionData.verified && sessionData.for) {
        return children
    }
    else if (!sessionData.verified && sessionData.for) {
        return <Navigate to={`/face_id/verify`} />
    }
    return <Navigate to={`/dashboard/exams`} />
}
export default HasCompletedFaceIdRoute;