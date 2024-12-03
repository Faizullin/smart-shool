import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import ExamService from "@/core/services/ExamService";
import Table from "@/shared/components/table/Table";
import DashboardInfoSidebar from "@/shared/components/sidebar/DashboardInfoSidebar";
import ProjectWorkSubmitModal from "@/shared/components/modal/ProjectWorkSubmitModal";
import { useAppDispatch } from "@/core/hooks/redux";
import { openModal } from "@/core/redux/store/reducers/modalSlice";

const ExamTypeLabels = {
  i: "Initital",
  m: "Mid",
  f: "Final",
};

export default function DashboardExamIndex() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const intl = useIntl();
  const [exams, setExams] = React.useState<any[]>([]);
  const [showPracticalSubmitForm, setShowPracticalSubmitForm] =
    React.useState<boolean>(false);

  const exam_id = React.useRef<number | null>(null);

  React.useEffect(() => {
    ExamService.fetchExamsMy().then((response) => {
      setExams(response.data);
    });
  }, []);

  const handleStartQuiz = (id: string) => {
    navigate(`/quiz/${id}`);
  };

  const handleSubmitProject = (exam: any) => {
    if (exam.theory_passed) {
      exam_id.current = exam.id;
      setShowPracticalSubmitForm(true);
    } else {
      dispatch(
        openModal({
          type: "error",
          data: {
            message: "Please pass theory test at first!",
          },
        })
      );
    }
  };
  const columns = React.useMemo(
    () => [
      {
        key: "id",
        title: "ID",
        render: (exam: any, key: string | number) => (
          <th
            key={key}
            scope="row"
            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {exam.id}
          </th>
        ),
      },
      {
        key: "exam_type",
        title: intl.formatMessage({
          id: "dashboard.exams_exam_type",
          defaultMessage: "Exam Type",
        }),
        render: (exam: any, key: string | number) => (
          <td key={key} scope="row">
            {ExamTypeLabels[exam.exam_type]}
          </td>
        ),
      },
      {
        key: "subject",
        title: intl.formatMessage({
          id: "subject",
        }),
      },
      {
        key: "actions",
        title: intl.formatMessage({
          id: "actions",
        }),
        render: (exam: any, key: string | number) => (
          <td key={key} className="px-6 py-4 text-right">
            {exam.theory_passed ? (
              <p className="text-blue">
                <FormattedMessage id="passed" defaultMessage="Passed" />
              </p>
            ) : !exam.quiz_id ? (
              <p className="text-danger">No quiz id </p>
            ) : (
              <button
                onClick={() => handleStartQuiz(exam.quiz_id)}
                className="font-medium bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded mx-1 my-1"
              >
                <FormattedMessage
                  id="dashboard.exams_start_quiz"
                  defaultMessage="Start quiz"
                />
              </button>
            )}
            {!exam.submitted_project_work ? (
              <button
                onClick={() => handleSubmitProject(exam)}
                className="font-medium bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded mx-1 my-1"
              >
                <FormattedMessage
                  id="dashboard.exams_submit_project"
                  defaultMessage="Submit project"
                />
              </button>
            ) : (
              <Link
                to={`/dashboard/projects/${exam.submitted_project_work.id}/edit`}
              >
                Project {exam.submitted_project_work.title}
              </Link>
            )}
          </td>
        ),
      },
    ],
    []
  );

  return (
    <div className="row">
      <DashboardInfoSidebar />
      <div className="col-lg-8">
        <div className="card mb-4">
          <div className="card-body">
            <div className="overflow-x-auto">
              <Table data={exams} columns={columns} />
            </div>
          </div>
        </div>
      </div>
      <ProjectWorkSubmitModal
        show={showPracticalSubmitForm}
        setShow={setShowPracticalSubmitForm}
        exam_id={exam_id.current}
      />
    </div>
  );
}
