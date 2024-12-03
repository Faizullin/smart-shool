import useRedirectBack from "@/core/hooks/useRedirectBack";
import StudentService from "@/core/services/StudentService";
import PrimaryButton from "@/shared/components/buttons/primary-button/PrimaryButton";
import FaceIdDetector from "@/shared/components/face_id/FaceIdDetector";
import TitleHelment from "@/shared/components/title/TitleHelmet";
import React from "react";
import { FormattedMessage } from "react-intl";

const requiredImageSize = 3;

export interface IFaceIdTrainProps {}

export default function FaceIdTrain(_: IFaceIdTrainProps) {
  const [capturedImages, setCapturedImages] = React.useState<File[]>([]);
  const detectCounter = React.useRef<number>(0);
  const { redirect } = useRedirectBack();

  const handleSubmit = () => {
    const formData = new FormData();
    capturedImages.forEach((element, index) => {
      if (index >= requiredImageSize) {
        return;
      }
      formData.append(`images`, element);
    });
    StudentService.trainFace(formData)
      .then(() => {
        redirect();
      })
      .catch((error) => {});
  };
  const handleDetect = (file: File) => {
    if (capturedImages.length > requiredImageSize) {
      window.location.reload();
      return;
    }
    setCapturedImages((capturedImages) => [...capturedImages, file]);
  };
  const handleCountChange = (count: number) => {
    detectCounter.current = count;
    if (detectCounter.current > requiredImageSize) {
      detectCounter.current = requiredImageSize;
    } else if (detectCounter.current === 0) {
      setCapturedImages([]);
    }
  };

  return (
    <div className="form-container">
      <TitleHelment title={"Face-id Train"} />
      <h3>
        <FormattedMessage
          id="face_id.train_with_face_id"
          defaultMessage="Train face id"
        />
      </h3>
      <FaceIdDetector
        detectLimit={3}
        onDetect={handleDetect}
        onCountChange={handleCountChange}
        delay_interval={300}
      />
      <div className="mt-3">
        <div className="d-flex justify-content-start flex-wrap">
          <PrimaryButton
            onClick={handleSubmit}
            processing={capturedImages.length < requiredImageSize}
            type="button"
          >
            <FormattedMessage id="submit" defaultMessage="Submit" />
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
