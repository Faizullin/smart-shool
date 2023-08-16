import * as React from 'react';
import ExamService from '../../services/ExamService';
import { useNavigate, useParams } from 'react-router-dom';
import { IQuestion } from '../../models/IQuiz';
import PrimaryButton from '../../components/form/auth/PrimaryButton';
import { FormattedMessage } from 'react-intl';
import { Pagination } from '../../components/table/Table';
import QuizLayout from '../../components/layouts/QuizLayout';
import SecondaryButton from '../../components/form/auth/SecondaryButton';
import { AxiosError } from 'axios';
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import QuestionItem, { IMarked } from '../../components/quiz/QuestionItem';



export interface IQuizProcessProps {
}

interface IQuizConfig {
    paginted: boolean,
    lazy: boolean,
}

type IMarkedObj = {
    [key: string]: IMarked;
}

export default function QuizProcess(_: IQuizProcessProps) {
    const navigate = useNavigate()
    const params = useParams();
    const [quizConfig] = React.useState<IQuizConfig>({
        paginted: true,
        lazy: false,
    })
    const [questions, setQuestions] = React.useState<IQuestion[]>([])
    const [marked, setMarked] = React.useState<IMarkedObj>({})
    const [currentQuestionPage, setCurrentQuestionPage] = React.useState<number>(0)
    // const [isRecording, setIsRecording] = React.useState<boolean>(false);
    const recordVideoRef = React.useRef<HTMLVideoElement | null>(null);
    // const mediaRecorderRef = React.useRef<any>(null);
    // const chunksRef = React.useRef([]);

    const quiz_id = params.id


    const {
        listening,
    } = useSpeechRecognition();


    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null;
    }
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        console.log('Your browser does not support speech recognition software! Try Chrome desktop, maybe?');
    }
    const handleMark = (question: IQuestion, answer: IMarked) => {
        const question_id = question.id
        let final_answer: IMarked;

        if (question.question_type === 'c') {
            let old_answer_ids: IMarked = []
            if (Object.keys(marked).includes(question_id)) {
                old_answer_ids = marked[question_id]
            }
            if (old_answer_ids.includes(answer[0])) {
                old_answer_ids = old_answer_ids.filter(element => element !== answer[0])
            } else {
                old_answer_ids.push(answer[0])
            }
            final_answer = old_answer_ids
        } else if (question.question_type === 'o') {
            final_answer = answer
        } else {
            console.log("Unrecognized question type: ", question.question_type)
            return
        }

        console.log("save mark", question_id, final_answer)
        setMarked(marked => ({
            ...marked,
            [question_id]: final_answer,
        }))
    }

    const handleSubmit = (event: Event) => {
        event.preventDefault()
        if (!quiz_id) return;


        // const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        // const url = URL.createObjectURL(blob);

        // // Create an anchor element to prompt the user to download the recorded video
        // const a = document.createElement('a');
        // a.href = url;
        // a.download = 'recorded-video.webm';
        // a.click();
        // return;
        //const recored_data = get_recorded_data(chunksRef.current)
        const data: any = {
            questions: []
        }
        const formData = new FormData()
        // console.log('record', recored_data)
        // formData.append('record', recored_data, 'recorded-video.webm');
        Object.keys(marked).forEach((element: string) => {
            data.questions.push({
                'answers': marked[element],
                'id': element,
            })
        })
        formData.append('questions', data.questions)
        ExamService.fetchSubmitQuiz(quiz_id, data).then(_ => {
            sessionStorage.clear()
            navigate('/dashboard/results/')
        })
    }

    // const handleQuizConfigChange = (e: any) => {
    //     setQuizConfig(quizConfig => ({
    //         ...quizConfig,
    //         ...e,
    //     }))
    // }
    const handleQuit = () => {
        sessionStorage.clear()
        navigate('/dashboard/exams')
    }
    const handleQuestionPageChange = (page: number) => {
        setCurrentQuestionPage(page)
    }

    React.useEffect(() => {
        if (!quiz_id) return;
        if (!quizConfig.lazy && questions.length === 0) {
            // startRecording()
            ExamService.fetchQuestions(quiz_id).then(response => {
                const tmpQuestions = response.data
                const tmpMarked: IMarkedObj = {}
                tmpQuestions.forEach(element => {
                    tmpMarked[element.id] = []
                })
                setQuestions(tmpQuestions)
                setMarked(tmpMarked)
                setCurrentQuestionPage(0)
            }).catch((error) => {
                if (error instanceof AxiosError && error.response) {
                    if (error.response.status.toString().startsWith('4')) {
                        return alert(error.response.data.message)
                    }

                }

            })
        }
    }, [quizConfig.lazy])

    // React.useEffect(() => {
    //     console.log("Changed currentQuestionPage", currentQuestionPage)
    //     const question = questions[currentQuestionPage]
    //     if(listening) {
    //         handleMark(question, transcript)
    //         resetTranscript();
    //     }
    // },[currentQuestionPage])




    // const startRecording = () => {
    //     navigator.mediaDevices
    //         .getUserMedia({ video: { width: 300 }, audio: true, })
    //         .then((stream: any) => {
    //             if (recordVideoRef.current) {
    //                 recordVideoRef.current.srcObject = stream;
    //             }

    //             mediaRecorderRef.current = new MediaRecorder(stream);

    //             mediaRecorderRef.current.ondataavailable = (event: any) => {
    //                 if (event.data.size > 0) {
    //                     (chunksRef.current as any[]).push(event.data);
    //                 }
    //             };

    //             mediaRecorderRef.current.onstop = () => {
    //                 // const blob = new Blob(chunksRef.current, { type: 'video/webm' });

    //                 // Now you can submit the recorded video to your Django backend
    //                 // using a POST request or another suitable method.
    //                 // Example using fetch:
    //                 // fetch('your-django-api-url', {
    //                 //   method: 'POST',
    //                 //   body: blob,
    //                 // });

    //                 chunksRef.current = [];
    //             };

    //             mediaRecorderRef.current.start();
    //             // setIsRecording(true);
    //         })
    //         .catch(err => {
    //             console.error("error:", err);
    //         });
    // };

    return (
        <QuizLayout listening={listening} onMicroClick={() => {}}>
            <section id='blog'>
                <video ref={recordVideoRef} autoPlay muted />
                <div className="container mx-auto" data-aos="fade-up">
                    <div className="pt-5">
                        {
                            !quizConfig.lazy ? (
                                <div>
                                    {quizConfig.paginted ?
                                        (
                                            questions[currentQuestionPage] && (
                                                <QuestionItem
                                                    marked={marked[questions[currentQuestionPage].id]}
                                                    question={questions[currentQuestionPage]}
                                                    index={currentQuestionPage + 1}
                                                    onMark={handleMark} />
                                            )
                                        ) :
                                        questions.map((question, index) => (
                                            <QuestionItem key={question.id} 
                                                marked={marked[question.id]}
                                                question={question} index={index + 1} onMark={handleMark} />
                                        ))
                                    }
                                </div>
                            ) : (
                                <div>Lazy load</div>
                            )
                        }
                        {
                            quizConfig.paginted && (
                                <Pagination showOnlyPrimitive={false} page={currentQuestionPage} rowsPerPage={1} count={questions.length} onChangePage={handleQuestionPageChange} />
                            )
                        }
                        <div className='mt-3 flex grid grid-cols-2 justify-between'>
                            <PrimaryButton onClick={handleSubmit} className='max-w-[300px]'>
                                <FormattedMessage
                                    id="app.submit.label" />
                            </PrimaryButton>
                            <SecondaryButton onClick={handleQuit} className='max-w-[300px]'>
                                <FormattedMessage
                                    id="app.close.label" />
                            </SecondaryButton>
                        </div>
                    </div>
                </div>
            </section>
        </QuizLayout>
    );
}
