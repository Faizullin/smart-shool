import React, { ChangeEvent, useState } from "react";
import { mdiMagnify } from '@mdi/js'
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import Icon from "@mdi/react";
import { setFilters } from "../../redux/store/reducers/articleFilterSlice";
import { FormattedMessage } from "react-intl";

interface ISearchInputBlockProps {
    onSeachChange: (filter_field: string, value: any) => any
}
export default function SearchInputBlock({ onSeachChange, }: ISearchInputBlockProps) {
    const dispatch = useAppDispatch()
    const { appliedFilters } = useAppSelector(state => state.articleFilter)

    const [data, setData] = useState<{
        keyword: string,
    }>({
        keyword: ''
    });

    const handleChange = function (event: React.ChangeEvent<HTMLInputElement>) {
        setData(data => ({
            ...data,
            "keyword": event.target.value,
        }));
    }

    const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(setFilters({
            search: data.keyword,
        }))
        onSeachChange('search', data.keyword)
    }
    React.useEffect(() => {
        if (appliedFilters.search !== undefined) {
            setData({
                keyword: appliedFilters.search,
            })
        }
    }, [appliedFilters.search])
    React.useEffect(() => {
        dispatch(setFilters({
            search: data.keyword,
        }))
    }, [data.keyword])

    return (
        <div className="sidebar-item search-form relative">
            <h3 className="sidebar-title">
                <FormattedMessage id='app.search.label' />
            </h3>
            <form className="mt-3" onSubmit={handleSubmit}>
                <input type="text" className="border-none focus:ring-0"
                    defaultValue={data.keyword} onChange={handleChange} />
                <button type="submit">
                    <Icon path={mdiMagnify}
                        size={1}
                        className="text-white w-6 h-6" />
                </button>
            </form>
        </div>
    );
}