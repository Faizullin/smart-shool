import React from "react";
import { IQuestion, ISubquestion } from "@/core/models/IQuiz";
import useEffectInitial from "@/core/hooks/useEffectInitial";
import { Form } from "react-bootstrap";
import { FormattedMessage } from "react-intl";

export type IMarked = string[];

interface Props {
  index: number;
  question: IQuestion;
  marked?: IMarked;
  onMark: (question: IQuestion, answer: string) => any;
  questions_count: number;
}

const QuestionItem: React.FC<Props> = ({
  index,
  question,
  onMark,
  marked,
  questions_count,
}) => {
  const [textAnswer, setTextAnswer] = React.useState<string>("");
  const handleOpenEndedAnswerChange = (e) => {
    setTextAnswer(e.target.value);
  };

  const getDefaultValueFromDraggable = (subquestion: ISubquestion) => {
    if (!marked) {
      return -1;
    }
    const keys = question.choices?.map((answer_item) => {
      return `${subquestion.id}-${answer_item.id}`;
    });
    for (let index = 0; index < keys.length; index++) {
      const element = keys[index];
      if (marked.includes(element)) {
        return element;
      }
    }
    return -1;
  };
  const handleDraggableChange = (event: any) => {
    const value = event.target.value;
    onMark(question, value);
  };

  useEffectInitial(() => {
    onMark(question, textAnswer);
  }, [textAnswer]);
  React.useEffect(() => {
    if (question.question_type === "o" && marked?.length > 0) {
      setTextAnswer(marked[0]);
    }
  }, [marked]);
  return (
    <>
      <div className="question bg-white p-3 border-bottom">
        <div className="d-flex flex-row justify-content-between align-items-center mcq">
          <h4>
            <FormattedMessage id="quiz" defaultMessage="Quiz" />
          </h4>
          <span>
            ({index} / {questions_count})
          </span>
        </div>
      </div>
      <div className="question bg-white p-3 border-bottom">
        <div className="d-flex flex-row align-items-center question-title">
          <h3 className="text-danger">Q.</h3>
          <h5 className="mt-1 ml-2">{question.prompt}</h5>
        </div>
        {question.question_type === "c" &&
          question.choices?.map((answer_item) => (
            <div key={answer_item.id} className="ans ml-2">
              <label className="radio">
                <input
                  type="checkbox"
                  name={`answer-${answer_item.id}`}
                  defaultChecked={
                    marked?.includes(`${answer_item.id}`) || false
                  }
                  onClick={() => onMark(question, `${answer_item.id}`)}
                />
                <span>{answer_item.content}</span>
              </label>
            </div>
          ))}
        {question.question_type === "o" && (
          <textarea
            className="form-control "
            onChange={handleOpenEndedAnswerChange}
            defaultValue={textAnswer}
            cols={40}
          ></textarea>
        )}
       
      </div>
    </>
  );
};
export default QuestionItem;
