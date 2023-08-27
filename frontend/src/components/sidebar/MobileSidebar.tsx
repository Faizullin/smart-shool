import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { ChangeEvent, useState } from "react";
import { Fragment } from "react";
import Icon from '@mdi/react';
import { mdiClose, mdiMagnify, mdiMinus, mdiPlus, } from "@mdi/js";
import { fetchArticleList } from "../../redux/store/reducers/articleSlice";
import { useAppDispatch } from "../../hooks/redux";
import { setFilters } from "../../redux/store/reducers/articleFilterSlice";
import { FormattedMessage, useIntl } from "react-intl";
import { IArticleFilters } from "../../models/IArticleFIlters";

interface IMobileSidebarProps {
    open: boolean
    setOpen: (data: any) => any
    filters: IArticleFilters
    filtersData: {
        subjects: Array<{
            active: boolean
            value: any
        }>
        search: string,
    }
    onFiltersChange: (filter_field: string, value: any) => any
}

export default function MobileSidebar({ open, setOpen, filtersData, onFiltersChange }: IMobileSidebarProps) {
    const dispatch = useAppDispatch()
    const intl = useIntl()
    const [data, setData] = useState<{
        keyword: string,
    }>({
        keyword: ''
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData(data => ({
            ...data,
            "keyword": event.target.value,
        }));
    }
    const handleFiltersClick = (e: any, filter_field: string, value: any) => {
        e.preventDefault();
        onFiltersChange(filter_field, value)
    }
    const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(setFilters({
            search: data.keyword
        }))
        dispatch(fetchArticleList({
            search: data.keyword
        })).then(() => {
            setOpen(false)
        })
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-[9999] md:hidden" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 flex">
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <Dialog.Panel className="relative mr-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                            <div className="flex items-center justify-between px-4">
                                <h2 className="text-lg font-medium text-gray-900">
                                    <FormattedMessage id="app.articles.filters.label" />
                                </h2>
                                <button
                                    type="button"
                                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                    onClick={() => setOpen(false)}
                                >
                                    <span className="sr-only">
                                        <FormattedMessage id="app.close.label" />
                                    </span>
                                    <Icon path={mdiClose}
                                        size={1}
                                        className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="mt-4 border-t border-gray-200">
                                <div className="px-4">
                                    <form className="relative mt-6 mx-4" onSubmit={handleSubmit}>
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                            <Icon path={mdiMagnify}
                                                size={1}
                                                className="w-6 h-6 text-gray-400" />
                                        </span>
                                        <input type="text"
                                            value={data.keyword} onChange={handleChange}
                                            className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                                            placeholder={intl.formatMessage({
                                                'id': 'app.search.label'
                                            })} />
                                    </form>
                                </div>
                                <Disclosure as="div" className="border-b border-gray-200 py-6 px-4 ">
                                    {({ open }) => (
                                        <>
                                            <h3 className="-my-3 flow-root">
                                                <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                    <span className="text-lg text-gray-900">Subjects</span>
                                                    <span className="ml-6 flex items-center">
                                                        {open ? (
                                                            <Icon path={mdiMinus}
                                                                size={1}
                                                                className="w-6 h-6" />
                                                        ) : (
                                                            <Icon path={mdiPlus}
                                                                size={1}
                                                                className="w-6 h-6" />
                                                        )}
                                                    </span>
                                                </Disclosure.Button>
                                            </h3>
                                            <Disclosure.Panel className="pt-6">
                                                <div className="space-y-4">
                                                    {filtersData.subjects.map((item, _) => (
                                                        <div key={item.value.id} className="flex items-center">
                                                            <a
                                                                href="#"
                                                                className="ml-3 text-gray-600"
                                                                onClick={(e) => handleFiltersClick(e, 'subjects', item.value)}
                                                            >
                                                                {item.value.title}
                                                            </a>
                                                        </div>
                                                    ))}
                                                </div>
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}