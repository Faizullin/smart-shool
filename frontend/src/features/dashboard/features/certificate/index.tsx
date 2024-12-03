import React from "react";
import { ICertificate } from "@/core/models/ICertificate";
import ExamService from "@/core/services/ExamService";
import DashboardInfoSidebar from "@/shared/components/sidebar/DashboardInfoSidebar";
import { FormattedMessage, useIntl } from "react-intl";
import Table from "@/shared/components/table/Table";
import { Card } from "react-bootstrap";

export default function CertificateIndex() {
  const intl = useIntl();
  const [certs, setCerts] = React.useState<ICertificate[]>([]);
  const [lastCertPayload, setLastCertPayload] =
    React.useState<ICertificate | null>(null);
  React.useEffect(() => {
    ExamService.fetchCertificates().then((response) => {
      setCerts(response.data);
    });
  }, []);
  React.useEffect(() => {
    if (certs.length > 0) {
      setLastCertPayload(certs[0]);
    }
  }, [certs]);
  const handleLoadImage = (cert: ICertificate) => {
    setLastCertPayload(cert);
  };
  const columns = React.useMemo(
    () => [
      {
        key: "id",
        title: "ID",
        render: (cert: any, key: string | number) => (
          <th
            key={key}
            scope="row"
            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {cert.id}
          </th>
        ),
      },
      {
        key: "subject",
        title: intl.formatMessage({
          id: "subject",
          defaultMessage: "Subject",
        }),
        render: (cert: any, key: string | number) => (
          <td key={key} className="px-6 py-4 text-right">
            {cert.subject?.title}
          </td>
        ),
      },
      {
        key: "image",
        title: intl.formatMessage({
          id: "image",
          defaultMessage: "Image",
        }),
        render: (cert: any, key: string | number) => (
          <td key={key} className="px-6 py-4 text-right">
            <img
              src={cert.image?.url}
              alt=""
              style={{
                width: 100,
              }}
            />
          </td>
        ),
      },
      {
        key: "actions",
        title: intl.formatMessage({
          id: "actions",
          defaultMessage: "Actions",
        }),
        render: (cert: any, key: string | number) => (
          <td key={key} className="px-6 py-4 text-right">
            <button
              onClick={() => handleLoadImage(cert)}
              className="font-medium bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded mx-1 my-1"
            >
              <FormattedMessage id="show" defaultMessage="Show" />
            </button>
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
            {lastCertPayload && (
              <Card>
                <Card.Img variant="top" src={lastCertPayload.image?.url} />
                <Card.Body>
                  <Card.Text>
                    {lastCertPayload.subject?.title}
                    <br />
                    {lastCertPayload.updated_at}
                  </Card.Text>
                </Card.Body>
              </Card>
            )}
            <div className="overflow-x-auto">
              <Table data={certs} columns={columns} />
              {/* <PracticalSubmitModal exam_id={exam_id.current || ''} show={showPracticalSubmitForm} setShow={setShowPracticalSubmitForm} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
