import React from "react";
import { IQuestion } from "../../models/IQuiz";
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Lang } from "../../lang/LangConfig";

export type IMarked = string[]

interface Props {
    index: number
    question: IQuestion
    marked?: IMarked
    onMark: (question: IQuestion, answer: IMarked) => any
    lang?: Lang
}

const QuestionItem: React.FC<Props> = ({ index, question, onMark, marked, lang, }) => {
    const [transcriptText, setTranscriptText] = React.useState<string>("")
    const {
        transcript,
        interimTranscript,
        finalTranscript,
        resetTranscript,
        listening,
    } = useSpeechRecognition();
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null;
    }
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        console.log('Your browser does not support speech recognition software! Try Chrome desktop, maybe?');
    }
    const startListeng = () => {
        console.log("Start")
        const lang_to_use = lang ? lang : 'en'
        SpeechRecognition.startListening({
            continuous: true,
            language: lang_to_use,
        });
    }
    const stopListeng = () => {
        console.log("Stop")
        SpeechRecognition.stopListening()
    }
    React.useEffect(() => {
        if (finalTranscript !== '') {
            if (listening && question.question_type === 'o') {
                onMark(question, [transcript])
            }
        }
    }, [interimTranscript, finalTranscript]);
    React.useEffect(() => {
        setTranscriptText(transcript)
    }, [transcript]);
    React.useEffect(() => {
        if (question.question_type === 'o') {
            if (!listening) {
                startListeng()
            }
        } else if (question.question_type === 'c') {
            if (listening) {
                stopListeng()
            }
        }
        return () => {
            stopListeng()
            resetTranscript()
        }
    }, [question.question_type]);
    React.useEffect(() => {
        if (question.question_type === 'o' && marked !== undefined) {
            setTranscriptText(marked.join(' '))
        }
    }, [marked]);
    return (
        <div className='mb-3'>
            <p>
                {index} {")"} <span>{question.prompt}</span>
            </p>
            {listening ? 'True' : "False"} {question.question_type}
            <div className='mt-3 ml-8'>
                {
                    question.question_type === 'c' &&
                    question.answers.map((answer, a_index) => (
                        <div key={answer.id} className='mb-2'>
                            <label htmlFor={`answer=${answer.id}`} className='mr-1'>
                                <span className={`mr-1 ${answer.correct ? 'font-bold' : ''}`} >
                                    {a_index + 1} {")"}
                                </span>
                                <input type="checkbox" name=""
                                    id={`answer=${answer.id}`}
                                    onChange={() => onMark(question, [`${answer.id}`])}
                                    checked={marked?.includes(`${answer.id}`) || false} />
                            </label>
                            {answer.content}
                        </div>
                    ))
                }
                {
                    question.question_type === 'o' &&
                    (
                        <div className='mb-2 mt-6'>
                            <textarea
                                value={transcriptText}
                                readOnly={true}
                                className="border rounded-lg p-2 w-full"
                                placeholder="Speak to fill the textarea..."
                            />
                        </div>
                    )
                }
            </div>
        </div>
    )
}
export default QuestionItem;