import { ReactNode } from "react";
import Icon from "@mdi/react";
import { mdiChevronDown, mdiChevronUp, mdiPageFirst, mdiPageLast, mdiPageNext, mdiPagePrevious } from "@mdi/js";
import { FormattedMessage } from "react-intl";
import { IArticleFiltersSortProps } from "../../models/IArticleFIlters";


interface ITableProps {
  data: Array<any>,
  columns: Array<{
    key: string,
    title: string,
    sortable?: boolean
    render?: (data: any, key: string | number) => ReactNode
    dangerous?: boolean
  }>,
  page?: number,
  pageSize?: number,
  rowsPerPageOptions?: Array<number>,
  count?: number,
  onChangePage?: (data?: any) => any,
  onChangeRowsPerPage?: (data?: any) => any,
  onSortingChange?: (data?: any) => any,
  sorting?: IArticleFiltersSortProps
}

const Table = ({ data, columns, page, pageSize, count, onChangePage, onChangeRowsPerPage, sorting, onSortingChange, rowsPerPageOptions }: ITableProps) => {
  const handleChangePage = (newPage: number) => {
    if (onChangePage) {
      onChangePage(newPage);
    }

  };

  const handleChangeRowsPerPage = (page: number) => {
    if (onChangeRowsPerPage) {
      onChangeRowsPerPage(page);
    }
  };

  const handleSortingChange = (event: any, key: string) => {
    event.preventDefault();
    let order = ''
    if (sorting) {
      order = (sorting.field === key && sorting.type === 'asc') ? 'desc' : 'asc';
    } else {
      order = 'desc'
    }
    if (onSortingChange) {
      onSortingChange({ field: key, type: order });
    }

  };

  return (
    <>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope="col" className="px-6 py-3">
                {
                  column.sortable ? (
                    <div className="flex items-center">
                      {column.title}
                      <a onClick={(e) => handleSortingChange(e, column.key)}>
                        {sorting?.field === column.key &&
                          sorting?.type === 'asc' ? (
                          <Icon path={mdiChevronUp} size={1} />
                        ) : (
                          <Icon path={mdiChevronDown} size={1} />

                        )
                        }
                      </a>
                    </div>
                  ) : column.title
                }
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              {columns.map((column, index) =>
                column.render ?
                  column.render(row, `${row.id}-${column.key}`)
                  :
                  (
                    <td key={`${row.id}-${column.key}-${index}`} className="px-6">
                      {
                        column.dangerous ? (
                          <div dangerouslySetInnerHTML={{ __html: row[column.key] }}></div>
                        ) : row[column.key]
                      }
                    </td>
                  )
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="">
        {
          count !== undefined ? (
            <Pagination
              rowsPerPageOptions={rowsPerPageOptions || [1, 10, 25, 50]}
              count={count}
              rowsPerPage={pageSize || 10}
              page={page || 1}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          ) : (
            <div></div>
          )
        }

      </div>
    </>
  );
};

export default Table;

interface IPaginationProps {
  page: number
  rowsPerPage: number
  count: number
  onChangePage: (data?: any) => any
  rowsPerPageOptions?: number[]
  onChangeRowsPerPage?: any
  showOnlyPrimitive?: boolean
}

export const Pagination = ({ page, rowsPerPage, count, onChangePage, onChangeRowsPerPage, rowsPerPageOptions, showOnlyPrimitive }: IPaginationProps) => {
  const totalPages = Math.ceil(count / rowsPerPage);

  const handleFirstPageButtonClick = (event: any) => {
    event.preventDefault()
    onChangePage(0);
  };
  const handlePreviousPageButtonClick = (event: any) => {
    event.preventDefault()
    if (page > 0) {
      onChangePage(page - 1);
    }
  };
  const handleNextPageButtonClick = (event: any) => {
    event.preventDefault()
    if (page + 1 < count) {
      onChangePage(page + 1);
    }
  };
  const handleLastPageButtonClick = (event: any) => {
    event.preventDefault()
    onChangePage(totalPages - 1);
  };
  const handleChange = (event: any, page: number) => {
    event.preventDefault()
    onChangePage(page)
  }
  const getPageButtonClassName = (active: boolean) => {
    const activePageClasses = 'relative z-10 inline-flex items-center bg-green-basic px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
    const pageClasses = 'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
    return active ? activePageClasses : pageClasses
  };

  return (
    <div className='flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6'>
      <div className="hidden sm:flex sm:items-center sm:justify-between">
        <div></div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <a href="#" onClick={handleFirstPageButtonClick}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
              {/* <span className="sr-only">First</span> */}
              <Icon path={mdiPageFirst} size={1} />
            </a>
            <a href="#"
              onClick={handlePreviousPageButtonClick}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
              {/* <span className="sr-only">Previous</span> */}
              <Icon path={mdiPagePrevious} size={1} />
            </a>
            {[...Array(totalPages)].map((_, i) => (
              <a key={i} href="#" className={getPageButtonClassName(i === page)} onClick={(e) => handleChange(e, i)}
                aria-current="page">{i + 1}</a>
            ))}

            <a href="#" onClick={handleNextPageButtonClick} className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
              {/* <span className="sr-only">Next</span> */}
              <Icon path={mdiPageNext} size={1} />
            </a>
            <a href="#" onClick={handleLastPageButtonClick} className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
              {/* <span className="sr-only">Last</span> */}
              <Icon path={mdiPageLast} size={1} />
            </a>
          </nav>
        </div>
      </div>
      <div className="flex justify-between sm:hidden">
        <a href="#" onClick={handlePreviousPageButtonClick} className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          <FormattedMessage id="app.previous.label" />
        </a>
        <a href="#" onClick={handleNextPageButtonClick} className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          <FormattedMessage id="app.next.label" />
        </a>
      </div>
      {!showOnlyPrimitive && (
        <div className="hidden sm:flex">
          <span className="flex items-center gap-1">
            <div>
              <FormattedMessage id="app.table.pagination.page.label" />
            </div>
            <strong>
              {page + 1} / {count}
            </strong>
          </span>
          <span className="flex items-center gap-1">
            | <FormattedMessage id="app.table.pagination.go_to_page.label" />:
            <input
              defaultValue={page + 1}
              type="number"
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                onChangePage(page)
              }}
              className="input input-bordered w-20 input-sm mx-2"
            />
          </span>
          {(rowsPerPageOptions && rowsPerPageOptions.length > 0) &&
            <select
              value={rowsPerPage}
              onChange={(e) => {
                onChangeRowsPerPage(Number(e.target.value));
              }}
              className="select select-sm select-bordered"
            >
              {rowsPerPageOptions?.map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  <FormattedMessage id="app.table.pagination.show.label" /> {pageSize}
                </option>
              ))}
            </select>
          }
        </div>
      )}
    </div>
  );
};