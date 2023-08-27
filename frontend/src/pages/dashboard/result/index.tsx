import * as React from 'react';
import Table from '../../../components/table/Table';
import DashboardLayout from '../../../components/layouts/DashboardLayout';
import ExamService from '../../../services/ExamService';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import FeedbackDetailModal from '../../../components/modal/FeedbackDetailModal';
import { IFeedback } from '../../../models/IFeedback';
import $api from '../../../http';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/redux';
import { openErrorModal } from '../../../redux/store/reducers/errorModalSlice';

export interface IResultIndexProps {
}

interface TabsProps {
  tabs: {
    label: string;
    content: any;
  }[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = React.useState(0);
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };
  return (
    <div>
      <div>
        {tabs.map((tab, index) => (
          <button
            key={index} onClick={() => handleTabClick(index)}
            className={`py-2 px-4 mr-2 rounded ${activeTab === index ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}>
            {tab.label}
          </button>
        ))}
      </div>
      <div>{tabs[activeTab].content}</div>
    </div>
  );
};

const export_formats = [
  {
    'label': 'Excell',
    'format': 'xlsx',
  },
  {
    'label': 'Csv',
    'format': 'csv',
  }
]
const TableTab: React.FC<{ intl: IntlShape }> = ({ intl }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [results, setResults] = React.useState<any[]>([])
  const [showFeedback, setShowFeedback] = React.useState<boolean>(false)
  const [feedbackPayload, setFeedbackPayload] = React.useState<IFeedback>()
  const handleShowFeedback = (id: string) => {
    ExamService.fetchExamFeedback(id).then(response => {
      setFeedbackPayload(response.data)
      setShowFeedback(true)
    }).catch(error => {
      if (error.response.status === 404) {
        dispatch(openErrorModal({
          status: 404,
          message: "No feedback!",
        }))
      }
    })
  }
  const handleRequestCert = (id: string) => {
    ExamService.fetchRequestCertificateSubmit({
      exam_id: id,
    }).then(_ => {
      navigate('/dashboard/certificates')
    }).catch(error => {
      alert("Error: " + error.response.data)
    })
  }
  const downloadFile = async (model_name: string, params: {
    'format': string,
  }) => {
    try {
      const response = await $api.get(`/export/${model_name}/${params.format}/`, {
        responseType: 'blob'
      });
      const blob = new Blob([response.data], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `filename.${params.format}`); // Specify the desired filename and extension
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download file:', error);
    }
  };
  const columns = React.useMemo(() => ([
    {
      key: 'id', title: 'ID', sortable: true, render: (exam: any, key: string | number) => (
        <th key={key} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {exam.id}
        </th>
      )
    },
    {
      key: 'exam', title: intl.formatMessage({
        id: 'app.dashboard.results.exam.label'
      }),
      render: (result: any, key: string | number) => (
        <td key={key} className="px-6">
          {result.exam.id} ({result.exam.exam_type})
        </td>
      )
    },
    {
      key: 'subject', title: intl.formatMessage({
        id: 'app.subject.label'
      }),
      render: (result: any, key: string | number) => (
        <td key={key} className="px-6">
          {result.exam.subject}
        </td>
      )
    },
    {
      key: 'practical_marks', title:
        intl.formatMessage({
          id: 'app.dashboard.results.practical_marks.label'
        }),
    },
    {
      key: 'theory_marks', title: intl.formatMessage({
        id: 'app.dashboard.results.theory_marks.label'
      }),
    },
    {
      key: 'total_marks', title: intl.formatMessage({
        id: 'app.dashboard.results.total_marks.label'
      }),
    },
    {
      key: 'actions', title: intl.formatMessage({
        id: 'app.table.columns.actions.label'
      }), render: (result: any, key: string | number) => (
        <td key={key} className="px-6 py-4 text-right">
          <button onClick={(_) => handleShowFeedback(result.exam.id)}
            className="relative font-medium bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded mx-1 my-1"
          >
            <FormattedMessage id='app.dashboard.results.show_feedback.label' />
            {
              !result.feedback_watched && <div className='absolute w-7 h-7 transform -translate-x-1/2 -translate-y-1/2 rounded-full top-0 left-0 bg-red-500'></div>
            }
          </button>
          {
            result.exam.exam_type === 'f' && result.access && (
              <button onClick={(_) => handleRequestCert(result.exam.id)}
                className="font-medium bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded mx-1 my-1"
              >
                <FormattedMessage id='app.dashboard.results.request_certficate.label' />
              </button>
            )
          }
        </td>
      )
    },
  ]), []);
  React.useEffect(() => {
    ExamService.fetchResultsMy().then(response => {
      setResults(response.data)
    })
  }, [])
  return (
    <>
      <div className="mb-5">
        {export_formats.map((format, index) => (
          <button
            key={index} onClick={() => downloadFile('results', {
              format: format.format
            })}
            className='py-2 px-4 mr-2 roundedbg-gray-200 text-gray-700'>
            {format.label}
          </button>
        ))}
      </div>
      <div className='overflow-x-auto'>
        <Table data={results} columns={columns} />
      </div>
      <FeedbackDetailModal show={showFeedback} setShow={setShowFeedback} payload={feedbackPayload} />
    </>
  );
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 200
    }
  }
};
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
interface IResultStats {
  date?: string,
  theory_marks: any[],
  practical_marks: any[],
  total_marks: any[],
}
function StatsTab({ intl }: { intl: IntlShape }) {
  const [groupBy, setGroupBy] = React.useState<string>('')
  const [startDate,] = React.useState<string>('')
  const [endDate,] = React.useState<string>('')
  const [data, setData] = React.useState<IResultStats>({
    theory_marks: [],
    practical_marks: [],
    total_marks: [],
  })
  const [labels, setLabels] = React.useState<string[]>([])

  const chartData = React.useMemo(() => {
    return {
      labels,
      datasets: [
        {
          label: intl.formatMessage({
            id: 'app.dashboard.results.theory_marks.label'
          }),
          data: data.theory_marks,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: intl.formatMessage({
            id: 'app.dashboard.results.practical_marks.label'
          }),
          data: data.practical_marks,
          borderColor: 'rgb(20, 143, 119)',
          backgroundColor: 'rgba(20, 143, 119, 0.5)',
        },
        {
          label: intl.formatMessage({
            id: 'app.dashboard.results.total_marks.label'
          }),
          data: data.total_marks,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    }
  }, [data]);

  const handleLoad = (data?: any) => {
    ExamService.fetchResultsStatsMy(data).then(response => {
      const tmpData: IResultStats = {
        theory_marks: [],
        practical_marks: [],
        total_marks: [],
      }
      for (let index = 0; index < response.data.length; index++) {
        const element = response.data[index];
        tmpData.theory_marks.push(element.theory_marks)
        tmpData.practical_marks.push(element.practical_marks)
        tmpData.total_marks.push(element.total_marks)
      }
      setLabels(response.data.map((item: any) => item.date))
      setData(tmpData)
    })
  }
  React.useEffect(() => {
    handleLoad({
      group_by: groupBy,
      start_date: startDate,
      end_date: endDate,
    })
  }, [groupBy, startDate, endDate])
  return (
    <div>
      <div className='text-white mt-5 gap-3 flex'>
        <a className='inline-block px-4 py-2 text-gray-800 font-semibold bg-blue-500 rounded-md hover:bg-blue-600 transition-colors duration-300 ease-in-out cursor-pointer' onClick={() => setGroupBy('year')}>
          <FormattedMessage id='app.year.label' />
        </a>
        <a className='inline-block px-4 py-2 text-gray-800 font-semibold bg-blue-500 rounded-md hover:bg-blue-600 transition-colors duration-300 ease-in-out cursor-pointer' onClick={() => setGroupBy('month')}>
          <FormattedMessage id='app.month.label' />
        </a>
        <a className='inline-block px-4 py-2 text-gray-800 font-semibold bg-blue-500 rounded-md hover:bg-blue-600 transition-colors duration-300 ease-in-out cursor-pointer' onClick={() => setGroupBy('day')}>
          <FormattedMessage id='app.day.label' />
        </a>
        <a className='inline-block px-4 py-2 text-gray-800 font-semibold bg-blue-500 rounded-md hover:bg-blue-600 transition-colors duration-300 ease-in-out cursor-pointer' onClick={() => setGroupBy('')}>
          <FormattedMessage id='app.recent.label' />
        </a>
      </div>
      <div className='overflow-x-auto'>
        <Line options={options} data={chartData} />
      </div>
    </div>
  )
}

export default function ResultIndex(_: IResultIndexProps) {
  const intl = useIntl()
  const tabs = [
    {
      label: intl.formatMessage({
        id: 'app.dashboard.results.table.label'
      }),
      content: <TableTab intl={intl} />
    },
    {
      label: intl.formatMessage({
        id: 'app.dashboard.results.stats.label'
      }),
      content: <StatsTab intl={intl} />
    },
  ];
  return (
    <DashboardLayout>
      <div className="bg-white p-3 shadow-sm rounded-sm">
        <Tabs tabs={tabs} />
      </div>
    </DashboardLayout>
  );
}
