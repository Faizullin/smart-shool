import useInterval from "@/core/hooks/useInterval";
import { ILoadingState } from "@/core/models/ILoadingState";
import * as faceapi from "face-api.js";
import React from "react";
import { Button } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";

// const MODEL_URL =
//   "https://cdn.jsdelivr.net/gh/cgarciagl/face-api.js@0.22.2/weights";
const MODEL_URL = "/models";

export interface IFaceIdProps {
    detectLimit: number;
    onDetect?: (data: File) => void;
    onFullDetect?: (data: File) => void;
    onCountChange?: (count: number) => void;
    delay_interval: number;
}

function dataURLtoFile(dataURL: string, filename: string): File {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}

export default function FaceIdDetector({
    detectLimit,
    onDetect,
    onFullDetect,
    onCountChange,
    delay_interval = 300,
}: IFaceIdProps) {
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState<ILoadingState>({
        detail: false,
        post: false,
    });
    const [_, setCapturedImage] = React.useState<File | null>(null);
    const detectCounter = React.useRef<number>(0);
    const [delayState, setDelayState] = React.useState<boolean>(false);

    const videoRef = React.useRef<any>();
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    useInterval(
        async () => {
            if (!loading.detail && canvasRef.current) {
                // Detect a single face in the video feed
                const faceDetectionOptions = new faceapi.TinyFaceDetectorOptions({
                    inputSize: 128,
                });
                const detection = await faceapi
                    .detectSingleFace(videoRef.current, faceDetectionOptions)
                    .withFaceLandmarks(true)
                    .withFaceDescriptor();
                // Clear previous drawings
                canvasRef.current
                    .getContext("2d")
                    .clearRect(
                        0,
                        0,
                        canvasRef.current.offsetWidth,
                        canvasRef.current.offsetHeight
                    );
                if (detection) {
                    check(detection);
                    const detectionsForSize = faceapi.resizeResults(detection, {
                        width: videoRef.current.offsetWidth,
                        height: videoRef.current.offsetHeight,
                    });
                    canvasRef.current.width = videoRef.current.offsetWidth;
                    canvasRef.current.height = videoRef.current.offsetHeight;
                    faceapi.draw.drawDetections(canvasRef.current, detectionsForSize);
                }
            }
        },
        delayState ? delay_interval : null
    );

    const startVideo = () => {
        if (
            navigator.mediaDevices &&
            navigator.mediaDevices.getUserMedia &&
            !loading.detail
        ) {
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then((stream: any) => {
                    let video: any = videoRef.current;
                    if (video) {
                        video.srcObject = stream;
                        video.play();
                    }
                })
                .catch((error) => {
                    console.error("error:", error);
                });
        }
    };

    const check = (detection: any) => {
        if (detection) {
            if (detectCounter.current + 1 > detectLimit) {
                const video = videoRef.current;
                const image = faceapi.createCanvasFromMedia(video);
                const base64Image = image.toDataURL("image/jpeg");
                const file = dataURLtoFile(base64Image, "image.jpg");
                setCapturedImage(file);
                closeWebcam();
                if (onFullDetect !== undefined) {
                    onFullDetect(file);
                }
            }
            if (onDetect !== undefined) {
                const video = videoRef.current;
                const image = faceapi.createCanvasFromMedia(video);
                const base64Image = image.toDataURL("image/jpeg");
                const file = dataURLtoFile(base64Image, "image.jpg");
                setCapturedImage(file);
                onDetect(file);
            }
            detectCounter.current = detectCounter.current + 1;
            if (onCountChange !== undefined) {
                onCountChange(detectCounter.current);
            }
        } else if (detectCounter.current !== 0) {
            detectCounter.current = 0;
            if (onCountChange !== undefined) {
                onCountChange(detectCounter.current);
            }
        }
    };

    const handleVideoOnPlay = () => {
        setDelayState(true);
    };

    const closeWebcam = () => {
        videoRef.current.pause();
        videoRef.current.srcObject.getTracks()[0].stop();
        setDelayState(false);
    };

    const handleReloadVideo = () => {
        closeWebcam();
        startVideo();
    };

    React.useEffect(() => {
        const loadModels = async () => {
            setLoading((loading) => ({
                ...loading,
                detail: true,
            }));
            try {
                const response = await Promise.all([
                    faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                    faceapi.nets.faceLandmark68TinyNet.loadFromUri(MODEL_URL),
                    faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
                    faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
                ]);
                startVideo();
            } catch (error) {
                console.error("Models loading error: ", error);
            }
            setLoading((loading) => ({
                ...loading,
                detail: false,
            }));
        };
        loadModels();
    }, []);

    return (
        <div className="py-12">
            <div className="flex justify-center">
                <div className="p-2">
                    <div className="position-relative">
                        <video
                            ref={videoRef}
                            onPlay={handleVideoOnPlay}
                            className="w-100"
                            style={{ borderRadius: "10px" }}
                        />
                        <canvas
                            ref={canvasRef}
                            className="position-absolute top-0 start-0"
                        />
                    </div>
                </div>
                <Loader active={loading.detail} />
            </div>
            <div className="mt-2">
                <Button variant="secondary" onClick={handleReloadVideo}>
                    <FormattedMessage id="reload" defaultMessage="Reload" />
                </Button>
            </div>
        </div>
    );
}