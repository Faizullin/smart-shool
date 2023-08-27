import * as React from 'react';
import ExamService from '../../../services/ExamService';
import { ICertificate } from '../../../models/ICertificate';
import DashboardLayout from '../../../components/layouts/DashboardLayout';
import Table from '../../../components/table/Table';
import { FormattedMessage, useIntl } from 'react-intl';

export interface ICertificateIndexProps {
}

export default function CertificateIndex(_: ICertificateIndexProps) {
  const intl = useIntl()
  const [certs, setCerts] = React.useState<ICertificate[]>([])
  const [lastCertPayload, setLastCertPayload] = React.useState<ICertificate | null>(null)
  React.useEffect(() => {
    ExamService.fetchCertificates().then(response => {
      setCerts(response.data)
    })
  }, [])
  React.useEffect(() => {
    if (certs.length > 0) {
      ExamService.fetchCertificateData(certs[0].id).then(response => {
        setLastCertPayload(response.data)
      })
    }
  }, [certs])
  const handleLoadImage = (cert: ICertificate) => {
    setLastCertPayload(cert)
  }
  const columns = React.useMemo(() => ([
    {
      key: 'id', title: 'ID', render: (cert: any, key: string | number) => (
        <th key={key} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {cert.id}
        </th>
      )
    },
    { key: 'subject', title: intl.formatMessage({
      id: 'app.subject.label'
    }) },
    {
      key: 'image', title: intl.formatMessage({
        id: 'app.image.label'
      }), render: (cert: any, key: string | number) => (
        <td key={key} className="px-6 py-4 text-right">
          <img src={cert.image} alt="" className='object-cover h-24 w-48' />
        </td>
      )
    },
    {
      key: 'actions', title: intl.formatMessage({
        id: 'app.table.columns.actions.label'
      }), render: (cert: any, key: string | number) => (
        <td key={key} className="px-6 py-4 text-right">
          <button onClick={() => handleLoadImage(cert)}
            className="font-medium bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded mx-1 my-1"
          >
            <FormattedMessage id='app.show.label' />
          </button>
        </td>
      )
    },
  ]), []);
  return (
    <DashboardLayout>
      <div className="bg-white p-3 shadow-sm rounded-sm">
        {
          lastCertPayload && (
            <div className='my-4'>
              <div className="flex w-full">
                <div className='w-full lg:w-1/2'>
                  <img src={lastCertPayload?.image} alt=""
                    className='w-full' />
                  <a href={lastCertPayload.image} className='mt-5'>{lastCertPayload.image}</a>
                </div>
                <div className='w-full lg:w-1/2'>
                  <p>{lastCertPayload.subject}</p>
                  <p>{lastCertPayload.updated_at}</p>
                </div>
              </div>
            </div>
          )
        }
        <div className='overflow-x-auto'>
          <Table data={certs} columns={columns} />
        </div>
      </div>
    </DashboardLayout>
  );
}
