import React from "react";
import { IQuestion } from "../../models/IQuiz";
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export type IMarked = string[] | string

interface Props {
    index: number
    question: IQuestion
    onNext: () => void
    marked?: IMarked
    onMark: (question: IQuestion, answer: IMarked) => any,
}

const QuestionItem: React.FC<Props> = ({ index, question, onMark, marked, }) => {
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
        SpeechRecognition.startListening({
            continuous: true,
            language: 'ru',
        });
    }
    const stopListeng = () => {
        SpeechRecognition.stopListening()
    }
    React.useEffect(() => {
        if (finalTranscript !== '') {
            console.log('Got final result:', finalTranscript);
            if (listening && question.question_type === 'o') {
                onMark(question, transcript)
            }
        }
    }, [interimTranscript, finalTranscript]);
    React.useEffect(() => {
        startListeng()
        return () => {
            stopListeng()
            resetTranscript()
        }
    }, []);
    return (
        <div className='mb-3'>
            <p>
                {index} {")"} <span>{question.prompt}</span>
            </p>
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
                                    onChange={() => onMark(question, `${answer.id}`)}
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
                                value={transcript}
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