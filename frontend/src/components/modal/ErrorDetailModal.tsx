import * as React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FormattedMessage } from 'react-intl';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { closeErrorModal } from '../../redux/store/reducers/errorModalSlice';

export interface IErrorDetailModalProps {
    show?: boolean
    setShow?: (a: boolean) => void
    payload?: {
        status: number,
        message: string,
    }
}

export default function ErrorDetailModal(props: IErrorDetailModalProps) {
    const dispatch = useAppDispatch();
    const { open, error: payload } = useAppSelector(state => state.errorModal);
    const handleClose = () => {
        if(props.setShow !== undefined) {
            props.setShow(false)
        }
        else {
            dispatch(closeErrorModal())
        }
    }

    return (
        <Transition appear show={open} as={React.Fragment}>
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
                        <div className="inline-block w-full max-w-screen-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900"
                            >
                                <span><FormattedMessage id="app.detail.label" />: <FormattedMessage id="app.error.label" defaultMessage="Error" /> {payload?.status}</span>
                            </Dialog.Title>
                            <div className="mt-2 text-gray-500 border-t pt-2">
                                {
                                    payload?.message
                                }
                            </div>

                            <div className="mt-4 flex flex-start">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="inline-flex mr-6 justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300 "
                                >
                                    <FormattedMessage id="app.close.label" />
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}
