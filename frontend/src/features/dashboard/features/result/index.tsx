import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { FormattedMessage, IntlShape, useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/core/hooks/redux";
import { IFeedback } from "@/core/models/IFeedback";
import Table from "@/shared/components/table/Table";
import DashboardInfoSidebar from "@/shared/components/sidebar/DashboardInfoSidebar";
import ExamService from "@/core/services/ExamService";
import $api from "@/core/http";
import { openModal } from "@/core/redux/store/reducers/modalSlice";
import FeedbackDetailModal from "@/shared/components/modal/FeedbackDetailModal";

const export_formats = [
  {
    label: "Excell",
    format: "xlsx",
  },
  {
    label: "Csv",
    format: "csv",
  },
];
const TableTab: React.FC<{ intl: IntlShape }> = ({ intl }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [results, setResults] = React.useState<any[]>([]);
  const [showFeedback, setShowFeedback] = React.useState<boolean>(false);
  const [feedbackPayload, setFeedbackPayload] = React.useState<IFeedback>();
  const handleShowFeedback = (id: string) => {
    ExamService.fetchExamFeedback(id)
      .then((response) => {
        setFeedbackPayload(response.data);
        setShowFeedback(true);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          dispatch(
            openModal({
              type: "error",
              data: {
                code: 404,
                message: "No feedback!",
              },
            })
          );
        }
      });
  };
  const handleRequestCert = (id: string) => {
    ExamService.fetchRequestCertificateSubmit({
      exam_id: id,
    })
      .then((_) => {
        navigate("/dashboard/certificates");
      })
      .catch((error) => {
        alert("Error: " + error.response.data);
      });
  };
  const downloadFile = async (
    model_name: string,
    params: {
      format: string;
    }
  ) => {
    try {
      const response = await $api.get(`/export/result/${params.format}/`, {
        responseType: "blob",
      });
      const blob = new Blob([response.data], {
        type: "application/octet-stream",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `filename.${params.format}`); // Specify the desired filename and extension
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download file:", error);
    }
  };
  const columns = React.useMemo(
    () => [
      {
        key: "id",
        title: "ID",
        sortable: true,
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
        key: "exam",
        title: intl.formatMessage({
          id: "exam",
          defaultMessage: "Exam",
        }),
        render: (result: any, key: string | number) => (
          <td key={key} className="px-6">
            {result.exam.id} ({result.exam.exam_type})
          </td>
        ),
      },
      {
        key: "subject",
        title: intl.formatMessage({
          id: "subject",
        }),
        render: (result: any, key: string | number) => (
          <td key={key} className="px-6">
            {result.exam.subject}
          </td>
        ),
      },
      {
        key: "practical_score",
        title: intl.formatMessage({
          id: "practical_score",
          defaultMessage: "Practical Score",
        }),
      },
      {
        key: "theory_score",
        title: intl.formatMessage({
          id: "theory_score",
          defaultMessage: "Theory Score",
        }),
      },
      {
        key: "total_score",
        title: intl.formatMessage({
          id: "total_score",
          defaultMessage: "Theory score",
        }),
      },
      {
        key: "actions",
        title: intl.formatMessage({
          id: "actions",
        }),
        render: (result: any, key: string | number) => (
          <td key={key} className="px-6 py-4 text-right">
            <button
              onClick={(_) => handleShowFeedback(result.exam.id)}
              className="relative font-medium bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded mx-1 my-1"
            >
              <FormattedMessage
                id="dashboard.results_show_feedback"
                defaultMessage="Show feedback"
              />
              {!result.feedback_watched && (
                <div className="absolute w-7 h-7 transform -translate-x-1/2 -translate-y-1/2 rounded-full top-0 left-0 bg-red-500"></div>
              )}
            </button>
          </td>
        ),
      },
    ],
    []
  );
  React.useEffect(() => {
    ExamService.fetchResultsMy().then((response) => {
      setResults(response.data);
    });
  }, []);
  return (
    <>
      <div className="btn-group" role="group">
        {export_formats.map((format, index) => (
          <button
            key={index}
            type="button"
            onClick={() =>
              downloadFile("result", {
                format: format.format,
              })
            }
            className="btn btn-secondary"
          >
            {format.label}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto">
        <Table data={results} columns={columns} />
      </div>
      <FeedbackDetailModal
        show={showFeedback}
        setShow={setShowFeedback}
        feedback_item={feedbackPayload}
      />
    </>
  );
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Scores data",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
    },
  },
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
  date?: string;
  theory_score: any[];
  practical_score: any[];
  total_score: any[];
}
function StatsTab({ intl }: { intl: IntlShape }) {
  const [groupBy, setGroupBy] = React.useState<string>("");
  const [startDate] = React.useState<string>("");
  const [endDate] = React.useState<string>("");
  const [data, setData] = React.useState<IResultStats>({
    theory_score: [],
    practical_score: [],
    total_score: [],
  });
  const [labels, setLabels] = React.useState<string[]>([]);
  const time_filters = [
    {
      label: intl.formatMessage({
        id: "year",
        defaultMessage: "Year",
      }),
      field: "year",
    },
    {
      label: intl.formatMessage({
        id: "month",
        defaultMessage: "Month",
      }),
      field: "month",
    },
    {
      label: intl.formatMessage({
        id: "day",
        defaultMessage: "Day",
      }),
      field: "day",
    },
    {
      label: intl.formatMessage({
        id: "recent",
        defaultMessage: "Recent",
      }),
      field: "",
    },
  ];
  const chartData = React.useMemo(() => {
    return {
      labels,
      datasets: [
        {
          label: intl.formatMessage({
            id: "theory_score",
          }),
          data: data.theory_score,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: intl.formatMessage({
            id: "practical_score",
          }),
          data: data.practical_score,
          borderColor: "rgb(20, 143, 119)",
          backgroundColor: "rgba(20, 143, 119, 0.5)",
        },
        {
          label: intl.formatMessage({
            id: "total_score",
          }),
          data: data.total_score,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    };
  }, [data]);

  const handleLoad = (data?: any) => {
    ExamService.fetchResultsStatsMy(data).then((response) => {
      const restpose_chart_data = response.data["chart_data"];
      const tmpData: IResultStats = {
        theory_score: [],
        practical_score: [],
        total_score: [],
      };
      for (let index = 0; index < restpose_chart_data.length; index++) {
        const element = restpose_chart_data[index];
        tmpData.theory_score.push(element.theory_score);
        tmpData.practical_score.push(element.practical_score);
        tmpData.total_score.push(element.total_score);
      }
      setLabels(restpose_chart_data.map((item: any) => item.date));
      setData(tmpData);
    });
  };
  React.useEffect(() => {
    handleLoad({
      group_by: groupBy,
      start_date: startDate,
      end_date: endDate,
    });
  }, [groupBy, startDate, endDate]);
  return (
    <div>
      <div className="btn-group" role="group">
        {time_filters.map((item, index) => (
          <button
            key={index}
            type="button"
            className="btn btn-secondary"
            onClick={() => setGroupBy(item.field)}
          >
            <FormattedMessage id={item.label} />
          </button>
        ))}
      </div>
      <div className="overflow-x-auto">
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
}

export default function DashboardResultIndex() {
  const intl = useIntl();
  const tabs = [
    {
      label: intl.formatMessage({
        id: "dashboard.results_table",
        defaultMessage: "Table",
      }),
    },
    {
      label: intl.formatMessage({
        id: "dashboard.results_stats",
        defaultMessage: "Statistics",
      }),
    },
  ];
  return (
    <div className="row">
      <DashboardInfoSidebar />
      <div className="col-lg-8">
        <div className="card mb-4">
          <div className="card-body">
            {/* <div className="bg-white p-3 shadow-sm rounded-sm">
                <Tabs tabs={tabs} />
              </div> */}
            <Tabs
              defaultActiveKey="table"
              id="uncontrolled-tab"
              className="mb-3"
            >
              <Tab eventKey="table" title={tabs[0].label}>
                <TableTab intl={intl} />
              </Tab>
              <Tab eventKey="statistics" title={tabs[1].label}>
                <StatsTab intl={intl} />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
