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

const QuizQuestionItem = ({ question, index, onMark, marked }: { question: IQuestion, index: number, marked?: string[], onMark: (question_id: string, answer_id: string) => void }) => {
    return (
        <div className='mb-3'>
            <p>
                {index} {")"} <span>{question.prompt}</span>
            </p>
            <div className='mt-3 ml-8'>
                {
                    question.answers.map((answer, a_index) => (
                        <div key={answer.id} className='mb-2'>
                            <label htmlFor={`answer=${answer.id}`} className='mr-1'>
                                <span className={`mr-1 ${answer.correct ? 'font-bold' : ''}`} >
                                    {a_index + 1} {")"}
                                </span>
                                <input type="checkbox" name=""
                                    id={`answer=${answer.id}`}
                                    onChange={(_) => onMark(`${question.id}`, `${answer.id}`)}
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

interface IQuizConfig {
    paginted: boolean,
    lazy: boolean,
}

type Marked = {
    [key: string]: Array<string>;
}

export default function QuizProcess() {
    const navigate = useNavigate()
    const params = useParams();
    const [quizConfig,] = React.useState<IQuizConfig>({
        paginted: true,
        lazy: false,
    })
    const [questions, setQuestions] = React.useState<IQuestion[]>([])
    const [marked, setMarked] = React.useState<Marked>({})
    const [currentQuestionPage, setCurrentQuestionPage] = React.useState<number>(0)

    const quiz_id = params.id
    React.useEffect(() => {
        if (!quiz_id) return;
        if (!quizConfig.lazy && questions.length === 0) {
            ExamService.fetchQuestions(quiz_id).then(response => {
                const tmpQuestions = response.data
                const tmpMarked: Marked = {}
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


    const handleMark = (question_id: string, answer_id: string) => {
        let old_answer_ids: string[] = []
        if (Object.keys(marked).includes(question_id)) {
            old_answer_ids = marked[question_id]
        }
        if (old_answer_ids.includes(answer_id)) {
            old_answer_ids = old_answer_ids.filter(element => element !== answer_id)
        } else {
            old_answer_ids.push(answer_id)
        }
        setMarked(marked => ({
            ...marked,
            [question_id]: old_answer_ids
        }))
    }

    const handleSubmit = (event: Event) => {
        event.preventDefault()
        if (!quiz_id) return;
        const data: any = {
            questions: []
        }
        Object.keys(marked).forEach((element: string) => {
            data.questions.push({
                'answers': marked[element],
                'id': element,
            })
        })
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
    const handleQuit = (_: any) => {
        sessionStorage.clear()
        navigate('/dashboard/exams')
    }

    const handleQuestionPageChange = (page: number) => {
        setCurrentQuestionPage(page)
    }

    return (
        <QuizLayout listening={false} onMicroClick={() => { }}>
            <section id='blog'>
                <div className="container mx-auto" data-aos="fade-up">
                    <div className="pt-5">
                        {
                            !quizConfig.lazy ? (
                                <div>
                                    {quizConfig.paginted ?
                                        (
                                            questions[currentQuestionPage] && (
                                                <QuizQuestionItem
                                                    marked={marked[questions[currentQuestionPage].id]}
                                                    question={questions[currentQuestionPage]}
                                                    index={currentQuestionPage + 1}
                                                    onMark={handleMark} />
                                            )
                                        ) :
                                        questions.map((question, index) => (
                                            <QuizQuestionItem key={question.id}
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