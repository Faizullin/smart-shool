import * as React from 'react';
import StudentService from '../../services/StudentService';
import { useNavigate } from 'react-router-dom';
import FaceIdDetector from '../../components/face_id/FaceIdDetector';
import QuizSessionService, { ISessionData } from '../../services/QuizSessionService';
import Layout from '../../components/layouts/Layout';

export interface IFaceIdVerifyProps {
}

export default function FaceIdVerify(_: IFaceIdVerifyProps) {
    const navigate = useNavigate();
    const routeFor = React.useRef<string>('')

    const handleSubmit = (data: FormData) => {
        StudentService.verifyViaFace(data).then((_: any) => {
            const sessionData: ISessionData = {
                verified: true,
                for: routeFor.current,
            }
            QuizSessionService.setSessionData(sessionData)
            if (sessionData.for) {
                navigate(sessionData.for)
                window.location.reload();
            }
        }).catch(err => {
            console.error("error:", err);
            if (err.response?.message) {
                alert(err.response.message)
            }
        });
    }
    const handleFullDetect = (file: any) => {
        const formData = new FormData()
        formData.append('image', file)
        handleSubmit(formData)
    }

    React.useEffect(() => {
        const storedSessionData = QuizSessionService.getSessionData()
        if (storedSessionData === null) {
            return navigate('/')
        }
        routeFor.current = storedSessionData.for
    }, [])

    return (
        <Layout>
            <div className="container mx-auto">
                <FaceIdDetector detectLimit={2} onFullDetect={handleFullDetect} />
            </div>
        </Layout>
    );
}