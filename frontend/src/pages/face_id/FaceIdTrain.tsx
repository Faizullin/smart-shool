import * as React from 'react';
import StudentService from '../../services/StudentService';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import FaceIdDetector from '../../components/face_id/FaceIdDetector';
import Layout from '../../components/layouts/Layout';

const requiredImageSize = 3;

export interface IFaceIdTrainProps {
}

export default function FaceIdTrain(_: IFaceIdTrainProps) {
  const [capturedImages, setCapturedImages] = React.useState<File[]>([]);
  const detectCounter = React.useRef<number>(0);
  const navigate = useNavigate()


  const handleSubmit = () => {
    const formData = new FormData()
    capturedImages.forEach((element, index) => {
      if (index >= requiredImageSize) {
        return
      }
      formData.append(`images`, element)
    });
    StudentService.trainFace(formData).then(() => {
      navigate("/dashboard/profile")
      window.location.reload();
    });
  }
  const handleDetect = (file: File) => {
    if (capturedImages.length > requiredImageSize) {
      window.location.reload()
      return
    }
    setCapturedImages(capturedImages => ([
      ...capturedImages,
      file
    ]))
  }
  const handleCountChange = (count: number) => {
    detectCounter.current = count
    if (detectCounter.current > requiredImageSize) {
      detectCounter.current = requiredImageSize
    } else if (detectCounter.current === 0) {
      setCapturedImages([])
    }
  }

  return (
    <Layout>
      <div className="container mx-auto">
        <FaceIdDetector detectLimit={3} onDetect={handleDetect} onCountChange={handleCountChange} />
        <div className="mt-10 w-full flex flex-col">
          <span className='mx-auto text-lg mb-6'>{detectCounter.current} - {capturedImages.length}</span>
          <PrimaryButton onClick={handleSubmit} processing={capturedImages.length < requiredImageSize}
            type='button' className='bg-green mx-auto mb-6'>
            <FormattedMessage
              id='app.submit.label' />
          </PrimaryButton>
        </div>
      </div>
    </Layout>
  );
}

