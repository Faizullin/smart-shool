import * as React from 'react';
import { Dialog, Transition } from '@headlessui/react';
// import { Document, Page, pdfjs } from 'react-pdf';
import ExamService from '../../services/ExamService';
import { FormattedMessage } from 'react-intl';
import InputError from '../form/InputError';

// pdfjs.GlobalWorkerOptions.workerSrc = `https:////cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export interface IPracticalSubmitModalProps {
    show: boolean
    setShow: (a: boolean) => void
    exam_id: string
}

export default function PracticalSubmitModal(props: IPracticalSubmitModalProps) {
    const [file, setFile] = React.useState<File | null>(null)
    const { exam_id } = props
    const [data, setData] = React.useState({
        title: '',
        exam: exam_id,
    })
    const [error, setError] = React.useState<{
        title: any,
        practical_file: any
    }>({
        title: null,
        practical_file: null,
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files || [];
        files.length > 0 && setFile(files[0]);
    };

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('title', data.title)
        if (file) {
            formData.append('practical_file', file)
        }
        formData.append('exam', data.exam)
        setError({
            title: null,
            practical_file: null,
        })
        ExamService.fetchSubmitProjectPractical(formData).then(_ => {
            handleClose()
            window.location.reload()
        }).catch(error => {
            if (error.response && error.response.status === 400) {
                setError(error.response.data);
            } else {
                alert('An error occurred. ' + error.response.status);
            }
        })
    };

    const handleClose = () => {
        props.setShow(false)
    }

    React.useEffect(() => {
        setData(data => ({
            ...data,
            exam: exam_id
        }))
    }, [exam_id])

    return (
        <Transition appear show={props.show} as={React.Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                onClose={handleClose}
            >
                <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                        as={React.Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={React.Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <form onSubmit={handleSubmit}
                            className="inline-block w-full max-w-screen-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900"
                            >
                                <FormattedMessage id="app.detail.label" />
                            </Dialog.Title>
                            <div className="mt-2 text-gray-500 border-t pt-2">
                                <div className="max-w-md mx-auto">
                                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" >
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                                                <FormattedMessage id="app.title.label" />
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="title"
                                                type="text"
                                                value={data.title}
                                                onChange={(e) => setData(data => ({
                                                    ...data,
                                                    'title': e.target.value,
                                                }))}
                                            />
                                            <InputError messages={error.title} />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
                                                <FormattedMessage id="app.file.label" />
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="file"
                                                type="file"
                                                accept="application/pdf"
                                                onChange={handleFileChange}
                                            />
                                            <InputError messages={error.practical_file} />
                                            {
                                                file ? (
                                                    <div className='overflow-x-auto'>
                                                    </div>
                                                ) : (
                                                    <p>
                                                        <FormattedMessage
                                                            id='app.practical.submit.pl_submit_pdf.label'
                                                        />
                                                    </p>
                                                )
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 flex flex-start">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="inline-flex mr-6 justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300 "
                                >
                                    <FormattedMessage id="app.close.label" />
                                </button>
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    <FormattedMessage id="app.submit.label" />
                                </button>
                            </div>
                        </form>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}
