import { useAppDispatch } from "@/core/hooks/redux";
import { IQuestion } from "@/core/models/IQuiz";
import { openModal } from "@/core/redux/store/reducers/modalSlice";
import ExamService from "@/core/services/ExamService";
import QuizSessionService from "@/core/services/QuizSessionService";
import QuestionItem, { IMarked } from "@/shared/components/quiz/QuestionItem";
import TitleHelment from "@/shared/components/title/TitleHelmet";
import QuizLayout from "@/shared/layouts/QuizLayout";
import { AxiosError } from "axios";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate, useParams } from "react-router-dom";
import "./QuizProcess.scss";

type IMarkedValue = string[];

interface IQuizConfig {
  paginted: boolean;
  lazy: boolean;
}

type IMarkedObj = {
  [key: string]: IMarkedValue;
};

export default function QuizProcess() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useAppDispatch();
  const [quizConfig] = React.useState<IQuizConfig>({
    paginted: true,
    lazy: false,
  });
  const [questions, setQuestions] = React.useState<IQuestion[]>([]);
  const [marked, setMarked] = React.useState<IMarkedObj>({});
  const [currentQuestionPage, setCurrentQuestionPage] =
    React.useState<number>(0);
  const quiz_id = params.id;

  const handleMark = (question: IQuestion, answer_key: string) => {
    const key = `${question.id}`;
    let final_answer: IMarked;
    if (question.question_type === "c") {
      let old_answer_ids: IMarked = [];
      if (Object.keys(marked).includes(key)) {
        old_answer_ids = marked[key];
      }
      if (old_answer_ids.includes(answer_key)) {
        old_answer_ids = old_answer_ids.filter(
          (element) => element !== answer_key
        );
      } else {
        old_answer_ids.push(answer_key);
      }
      final_answer = old_answer_ids;
    } else if (question.question_type === "o") {
      final_answer = [answer_key];
    } else if (question.question_type === "d") {
      let old_answer_ids: IMarked = [];
      if (Object.keys(marked).includes(key)) {
        old_answer_ids = marked[key];
      }
      const arr = answer_key.split("-");
      if (arr[1] == "0") {
        question.choices.forEach((answer_item) => {
          const subquestion_answer_key = `${arr[0]}-${answer_item.id}`;
          if (old_answer_ids.includes(subquestion_answer_key)) {
            old_answer_ids = old_answer_ids.filter(
              (element) => element !== subquestion_answer_key
            );
          }
        });
      } else {
        question.choices.forEach((answer_item) => {
          const subquestion_answer_key = `${arr[0]}-${answer_item.id}`;
          if (old_answer_ids.includes(subquestion_answer_key)) {
            old_answer_ids = old_answer_ids.filter(
              (element) => element !== subquestion_answer_key
            );
          }
        });
        old_answer_ids.push(answer_key);
      }
      final_answer = old_answer_ids;
    } else {
      console.error("Unrecognized question type: ", question.question_type);
      return;
    }
    setMarked((marked) => ({
      ...marked,
      [key]: final_answer,
    }));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (!quiz_id) return;

    const data: any = {
      questions: [],
    };
    Object.keys(marked).forEach((key: string) => {
      data.questions.push({
        choices: marked[key],
        id: Number(key),
      });
    });
    ExamService.fetchSubmitQuiz(Number(quiz_id), data)
      .then((_) => {
        sessionStorage.clear();
        navigate("/dashboard/results/");
      })
      .catch((error) => {
        if (error.response.status) {
          // dispatch(openErrorModal({
          //     status: error.response.status,
          //     message: error.response?.data?.message || "",
          // }))
        }
      });
  };
  const handleQuit = () => {
    QuizSessionService.clean();
    navigate("/dashboard/exams");
  };
  const handleQuestionPageChange = (page: number) => {
    if (page >= 0 && page < questions.length) setCurrentQuestionPage(page);
  };
  React.useEffect(() => {
    if (!quiz_id) return;
    if (!quizConfig.lazy && questions.length === 0) {
      ExamService.fetchQuestions(Number(quiz_id))
        .then((response) => {
          const tmpQuestions = response.data;
          setQuestions(tmpQuestions);
          setCurrentQuestionPage(0);
        })
        .catch((error) => {
          if (error instanceof AxiosError && error.response) {
            if (error.response.status.toString().startsWith("4")) {
              dispatch(
                openModal({
                  type: "error",
                  data: {
                    code: error.response.status,
                    message: error.response.data?.detail || "",
                  },
                })
              );
            }
          }
        });
    }
  }, [quizConfig.lazy]);

  return (
    <QuizLayout>
      <TitleHelment title={"Quiz"} />
      <div className="container mt-5 quiz-process">
        <div className="d-flex justify-content-center row">
          <div className="col-md-10 col-lg-10">
            <div className="border">
              {quizConfig.paginted
                ? questions[currentQuestionPage] && (
                    <QuestionItem
                      questions_count={questions.length}
                      marked={marked[`${questions[currentQuestionPage].id}`]}
                      question={questions[currentQuestionPage]}
                      index={currentQuestionPage + 1}
                      onMark={handleMark}
                    />
                  )
                : questions.map((question, index) => (
                    <QuestionItem
                      questions_count={questions.length}
                      key={question.id}
                      marked={marked[`${question.id}`]}
                      question={question}
                      index={index + 1}
                      onMark={handleMark}
                    />
                  ))}
              <div className="d-flex flex-row justify-content-between align-items-center p-3 bg-white">
                <button
                  className="btn btn-primary d-flex align-items-center"
                  type="button"
                  onClick={() =>
                    handleQuestionPageChange(currentQuestionPage - 1)
                  }
                >
                  <i className="fa fa-angle-left mt-1 mr-1" />
                  &nbsp;previous
                </button>
                <button
                  className="btn btn-primary border-success align-items-center"
                  type="button"
                  onClick={() =>
                    handleQuestionPageChange(currentQuestionPage + 1)
                  }
                >
                  Next
                  <i className="fa fa-angle-right ml-2" />
                </button>
              </div>
            </div>
            <div className="border mt-5">
              <div className="d-flex flex-row justify-content-between align-items-center p-3 bg-white">
                <button
                  className="btn btn-primary d-flex align-items-center btn-success"
                  type="button"
                  onClick={handleSubmit}
                >
                  <FormattedMessage id="send" defaultMessage="Send" />
                </button>
                <button
                  className="btn btn-primary border-success align-items-center btn-danger"
                  type="button"
                  onClick={handleQuit}
                >
                  <FormattedMessage id="quit" defaultMessage="Quit" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </QuizLayout>
  );
}
