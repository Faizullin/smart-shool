import React, { ChangeEvent, useState } from "react";
import { mdiMagnify } from '@mdi/js'
import { useAppDispatch } from "../../hooks/redux";
import { fetchArticleList } from "../../redux/store/reducers/articleSlice";
import useDebouncedInput from "../../hooks/useDebouncedInput";
import Icon from "@mdi/react";
import { setFilters } from "../../redux/store/reducers/articleFilterSlice";
import { FormattedMessage } from "react-intl";

export default function SearchInputBlock() {
    const dispatch = useAppDispatch()

    const [data, setData] = useState<{
        keyword: string,
    }>({
        keyword: ''
    });

    const handleChange = useDebouncedInput(function (event: React.ChangeEvent<HTMLInputElement>) {
        setData(data => ({
            ...data,
            "keyword": event.target.value,
        }));
    }, 500)

    const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(setFilters({
            search: data.keyword
        }))
        dispatch(fetchArticleList())
    }

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