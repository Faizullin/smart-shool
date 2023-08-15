import * as React from 'react';
import * as faceapi from 'face-api.js';
import { FormattedMessage } from 'react-intl';
import Loader from '../loader/Loader';

export interface IFaceIdProps {
    detectLimit: number
    onDetect?: (data: File) => void
    onFullDetect?: (data: File) => void
    onCountChange?: (count: number) => void
}

function dataURLtoFile(dataURL: string, filename: string): File {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}

export default function FaceIdDetector({ detectLimit, onDetect, onFullDetect, onCountChange }: IFaceIdProps) {
    const [modelsLoaded, setModelsLoaded] = React.useState(false);
    const [captureVideo, setCaptureVideo] = React.useState(false);
    const [_, setCapturedImage] = React.useState<File | null>(null);
    const detectCounter = React.useRef<number>(0);

    const videoRef = React.useRef<any>();
    const videoHeight = 480;
    const videoWidth = 640;
    const canvasRef = React.useRef<any>();

    React.useEffect(() => {
        const loadModels = async () => {
            const MODEL_URL = import.meta.env.BASE_URL + '/models'
            Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
                faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
            ]).then(() => {
                setModelsLoaded(true)
            });
        }
        loadModels();
    }, []);

    const startVideo = () => {
        setCaptureVideo(true);
        navigator.mediaDevices
            .getUserMedia({ video: { width: 300 } })
            .then((stream: any) => {
                let video: any = videoRef.current;
                if (video) {
                    video.srcObject = stream;
                    video.play();
                }
            })
            .catch(err => {
                console.error("error:", err);
            });
    }

    const check = (detections: any[]) => {
        if (detections.length === 1) {
            if (detectCounter.current + 1 > detectLimit) {
                const video = videoRef.current;
                const image = faceapi.createCanvasFromMedia(video);
                const base64Image = image.toDataURL('image/jpeg');
                const file = dataURLtoFile(base64Image, 'image.jpg');
                setCapturedImage(file);
                closeWebcam()
                if (onFullDetect !== undefined) {
                    onFullDetect(file)
                }
            }
            if (onDetect !== undefined) {
                const video = videoRef.current;
                const image = faceapi.createCanvasFromMedia(video);
                const base64Image = image.toDataURL('image/jpeg');
                const file = dataURLtoFile(base64Image, 'image.jpg');
                setCapturedImage(file);
                onDetect(file)
            }
            detectCounter.current = detectCounter.current + 1
            if (onCountChange !== undefined) {
                onCountChange(detectCounter.current)
            }
        } else if (detectCounter.current !== 0) {
            detectCounter.current = 0
            if (onCountChange !== undefined) {
                onCountChange(detectCounter.current)
            }
        }

    }

    const handleVideoOnPlay = () => {
        setInterval(async () => {
            if (canvasRef && canvasRef.current) {
                canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
                const displaySize = {
                    width: videoWidth,
                    height: videoHeight
                }

                faceapi.matchDimensions(canvasRef.current, displaySize);
                const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
                check(detections)
                const resizedDetections = faceapi.resizeResults(detections, displaySize);
                canvasRef && canvasRef.current && canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight);
                canvasRef && canvasRef.current && faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
                // canvasRef && canvasRef.current && faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
                // canvasRef && canvasRef.current && faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
            }
        }, 300)
    }

    const closeWebcam = () => {
        videoRef.current.pause();
        videoRef.current.srcObject.getTracks()[0].stop();
        setCaptureVideo(false);
    }

    return (
        <div className='py-12'>
            <div className='flex justify-center'>
                {
                    captureVideo && modelsLoaded ?
                        <button onClick={closeWebcam} style={{ cursor: 'pointer', backgroundColor: 'green', color: 'white', padding: '15px', fontSize: '25px', border: 'none', borderRadius: '10px' }}>
                            <FormattedMessage id='app.face_id.close.label' />
                        </button>
                        :
                        <button onClick={startVideo} style={{ cursor: 'pointer', backgroundColor: 'green', color: 'white', padding: '15px', fontSize: '25px', border: 'none', borderRadius: '10px' }}>
                            <FormattedMessage id='app.face_id.open.label' />
                        </button>
                }
            </div>
            {
                captureVideo ?
                    modelsLoaded ?
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                                <video ref={videoRef} height={videoHeight} width={videoWidth} onPlay={handleVideoOnPlay} style={{ borderRadius: '10px' }} />
                                <canvas ref={canvasRef} style={{ position: 'absolute' }} />
                            </div>
                            <p className='mt-10'>
                                <FormattedMessage id='app.face_id.warning.reload.label' />
                            </p>
                        </div>
                        :
                        <Loader />
                    :
                    <>
                    </>
            }
        </div>
    )
}