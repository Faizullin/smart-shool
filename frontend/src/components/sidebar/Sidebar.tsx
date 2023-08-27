import * as React from 'react';
import SearchInputBlock from "./SearchInputBlock";
import MobileSidebar from "./MobileSidebar";
import Icon from '@mdi/react';
import { mdiFilter } from "@mdi/js";
import { FormattedMessage } from "react-intl";
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchArticleFilters, setFilters } from '../../redux/store/reducers/articleFilterSlice';
import { fetchArticleList } from '../../redux/store/reducers/articleSlice';
import { useNavigate } from 'react-router-dom';

interface ISidebarProps {
    open: boolean
    setOpen: (data?: any) => any
}

const Sidebar = (props: ISidebarProps) => {
    const dispatch = useAppDispatch()
    const { filters, appliedFilters } = useAppSelector(state => state.articleFilter)
    const navigate = useNavigate()

    const getSubjectFilters = (subject: any) => {
        let new_subjects_filters = [subject]
        if (appliedFilters.subjects !== undefined && appliedFilters.subjects.length > 0) {
            if (appliedFilters.subjects[0].id === subject.id) {
                new_subjects_filters = []
            }
        }
        dispatch(setFilters({
            subjects: new_subjects_filters,
        }))
        return {
            subject: new_subjects_filters.length > 0 ? new_subjects_filters[0].id : null,
        }
    }
    const handleFiltersClick = (filter_field: string, value: any) => {
        let params = {}
        if (filter_field === 'subjects') {
            params = {
                ...params,
                ...getSubjectFilters(value),
            }
        } else if (filter_field === 'search') {
            params = {
                ...params,
                'search': value,
            }
        }
        dispatch(fetchArticleList(params)).then(() => {
            if (location.pathname !== '/article') {
                navigate('/article');
            }
        })
    }

    React.useEffect(() => {
        if (filters.subjects === undefined) {
            dispatch(fetchArticleFilters())
        }
    }, [dispatch, filters.subjects,]);

    const filtersData = React.useMemo(() => {
        const appliedFiltersIds = {
            subjects: appliedFilters.subjects?.map(item => item.id) as string[] || []
        }
        let tmp_data: {
            subjects: Array<{
                active: boolean
                value: any
            }>,
            search: string,
        } = {
            subjects: filters.subjects?.map((item) => {
                return {
                    active: appliedFiltersIds.subjects.includes(item.id),
                    value: item,
                }
            }) || [],
            search: appliedFilters.search || '',
        }
        return tmp_data
    }, [appliedFilters, filters])

    return (
        <>
            <div className="lg:hidden">
                <MobileSidebar open={props.open} setOpen={props.setOpen} filters={filters} filtersData={filtersData} onFiltersChange={handleFiltersClick} />
            </div>
            <div className="lg:w-1/3 hidden lg:block">
                <div className={`sidebar ease-out duration-300
                    ${props.open ? "translate-x-0 " : "translate-x-full"}  md:transform-none md:transition-none`} >
                    <SearchInputBlock onSeachChange={handleFiltersClick} />
                    <div className="sidebar-item categories categories-subjects">
                        <h3 className="sidebar-title">Subjects</h3>
                        <ul className="mt-3 space-y-1">
                            {filtersData.subjects.map((item, _) => (
                                <li key={`subject-${item.value.id}`} className='flex items-center'>
                                    <a href="#" className={`${item.active ? 'active font-bold text-blue-500' : 'text-gray-700'}`} onClick={(e) => { e.preventDefault(); handleFiltersClick('subjects', item.value) }}>
                                        {item.value.title}<span>({item.value.articles_count})</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
const TriggerButton = ({ onClick }: { onClick: (data?: any) => void }) => {
    return (
        <button
            type="button"
            className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
            onClick={onClick}
        >
            <span className="sr-only">
                <FormattedMessage
                    id="app.articles.filters.label" />
            </span>
            <Icon path={mdiFilter} className="h-5 w-5" />
        </button>
    );
}
export { TriggerButton }
export default Sidebar;