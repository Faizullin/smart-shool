import SearchInputBlock from "./SearchInputBlock";
import MobileSidebar from "./MobileSidebar";
import Icon from '@mdi/react';
import { mdiFilter } from "@mdi/js";
import { FormattedMessage } from "react-intl";

interface ISidebarProps {
    open: boolean
    setOpen: (data?: any) => any
}

const Sidebar = (props: ISidebarProps) => {
    return (
        <>
            <div className="lg:hidden">
                <MobileSidebar open={props.open} setOpen={props.setOpen} />
            </div>
            <div className="lg:w-1/3 hidden lg:block">
                <div className={`sidebar ease-out duration-300
                    ${props.open ? "translate-x-0 " : "translate-x-full"}  md:transform-none md:transition-none`} >
                    <SearchInputBlock />
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