import * as React from 'react';
import DashboardLayout from '../../../components/layouts/DashboardLayout';
import ExamService from '../../../services/ExamService';
import Table from '../../../components/table/Table';
import { useNavigate } from 'react-router-dom';
import PracticalSubmitModal from '../../../components/modal/PracticalSubmitModal';
import { FormattedMessage, useIntl } from 'react-intl';

export interface IExamIndexProps {
}


export default function ExamIndex(_: IExamIndexProps) {
  const navigate = useNavigate()
  const intl = useIntl()
  const [exams, setExams] = React.useState<any[]>([])
  const [showPracticalSubmitForm, setShowPracticalSubmitForm] = React.useState<boolean>(false)
  const exam_id = React.useRef<string | null>(null)


  React.useEffect(() => {
    ExamService.fetchExamsMy().then(response => {
      setExams(response.data)
    })
  }, [])

  const handleStartQuiz = (id: string) => {
    navigate(`/quiz/${id}`)
  }

  const handleSubmitProject = (exam: any) => {
    if (exam.theory_passed) {
      exam_id.current = exam.id as string
      setShowPracticalSubmitForm(true)
    } else {
      alert("Please pass theory test at first!")
    }
  }
  const columns = React.useMemo(() => ([
    {
      key: 'id', title: 'ID', render: (exam: any, key: string | number) => (
        <th key={key} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {exam.id}
        </th>
      )
    },
    {
      key: 'exam_type', title: intl.formatMessage({
        id: 'app.dashboard.exams.exam_type.label'
      })
    },
    {
      key: 'practical_files_provided', title: intl.formatMessage({
        id: 'app.dashboard.exams.practical_files.label'
      }),
      dangerous: true,
    },
    {
      key: 'subject', title: intl.formatMessage({
        id: 'app.subject.label'
      })
    },
    {
      key: 'actions', title: intl.formatMessage({
        id: 'app.table.columns.actions.label'
      }),
      render: (exam: any, key: string | number) => (
        <td key={key} className="px-6 py-4 text-right">
          {
            exam.theory_passed ? (
              <p className='text-blue'>Passed</p>
            ) : (
              <button onClick={(_) => handleStartQuiz(exam.quiz_id)}
                className="font-medium bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded mx-1 my-1"
              >
                <FormattedMessage id='app.dashboard.exams.start_quiz.label' />
              </button>
            )
          }
          {
            !exam.practical_files_provided &&
            <button onClick={(_) => handleSubmitProject(exam)}
              className="font-medium bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded mx-1 my-1"
            >
              <FormattedMessage id='app.dashboard.exams.submit_project.label' />
            </button>
          }
        </td>
      )
    },
  ]), []);

  return (
    <DashboardLayout>
      <div className="bg-white p-3 shadow-sm rounded-sm">
        <div className='overflow-x-auto'>
          <Table data={exams} columns={columns} />
          <PracticalSubmitModal exam_id={exam_id.current || ''} show={showPracticalSubmitForm} setShow={setShowPracticalSubmitForm} />
        </div>
      </div>
    </DashboardLayout>
  );
}
