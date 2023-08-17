import StudentService from '../../services/StudentService';
import { useAppDispatch } from '../../hooks/redux';
import { fetchUserData, setTokens } from '../../redux/store/reducers/authSlice';
import { useNavigate } from 'react-router-dom';
import FaceIdDetector from '../../components/face_id/FaceIdDetector';
import Layout from '../../components/layouts/Layout';


export interface IFaceIdLoginProps {
}

export default function FaceIdLogin(_: IFaceIdLoginProps) {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const handleSubmit = (data: FormData) => {
        StudentService.loginViaFace(data).then(response => {
            dispatch(setTokens(response.data))
            dispatch(fetchUserData()).then(_ => {
                navigate('/dashboard/profile')
                window.location.reload();
            })
        }).catch(error => {
            console.error("error:", error);
        })
        
    }
    const handleFullDetect = (file: any) => {
        const formData = new FormData()
        formData.append('image', file)
        handleSubmit(formData)
    }

    return (
        <Layout>
            <div className="container mx-auto">
                <FaceIdDetector detectLimit={2} onFullDetect={handleFullDetect} />
            </div>
        </Layout>
    );
}