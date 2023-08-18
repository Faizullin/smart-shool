import React from "react";
import { IQuestion } from "../../models/IQuiz";
import 'regenerator-runtime/runtime';

export type IMarked = string[]

interface Props {
    index: number
    question: IQuestion
    marked?: IMarked
    onMark: (question: IQuestion, answer: IMarked) => any
}

const QuestionItem: React.FC<Props> = ({ index, question, onMark, marked, }) => {
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
                                    onChange={() => onMark(question, [`${answer.id}`])}
                                    checked={marked?.includes(`${answer.id}`) || false} />
                            </label>
                            {answer.content}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default QuestionItem;