import React from "react";
import { ReactNode } from "react";
import BootstrapTable from "react-bootstrap/Table";
import { FormattedMessage } from "react-intl";
import { Pagination as BootstrapPagination } from "react-bootstrap";

interface ISorting {
  type: "desc" | "asc";
  field: string;
}

interface ITableProps<T> {
  data: Array<T>;
  columns: Array<{
    key: string;
    title: string;
    sortable?: boolean;
    render?: (data: T, key: string | number) => ReactNode;
    dangerous?: boolean;
  }>;
  page?: number;
  pageSize?: number;
  rowsPerPageOptions?: Array<number>;
  count?: number;
  onChangePage?: (data?: any) => any;
  onChangeRowsPerPage?: (data?: any) => any;
  onSortingChange?: (data?: ISorting) => any;
  sorting?: ISorting;
}

function Table<T>({
  data,
  columns,
  page,
  pageSize,
  count,
  onChangePage,
  onChangeRowsPerPage,
  sorting,
  onSortingChange,
  rowsPerPageOptions,
}: ITableProps<T>) {
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
    const oredering_data: ISorting = { field: key, type: "desc" };
    if (sorting) {
      oredering_data.type =
        sorting.field === key && sorting.type === "asc" ? "desc" : "asc";
    } else {
      oredering_data.type = "desc";
    }
    if (onSortingChange) {
    }
  };

  return (
    <>
      <BootstrapTable className="table table-bordered">
        <thead >
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope="col" className="px-6 py-3">
                {column.sortable ? (
                  <div className="flex items-center">
                    {column.title}
                    <a onClick={(e) => handleSortingChange(e, column.key)}>
                      {/* {sorting?.field === column.key &&
                          sorting?.type === 'asc' ? (
                          <Icon path={mdiChevronUp} size={1} />
                        ) : (
                          <Icon path={mdiChevronDown} size={1} />

                        )
                        } */}
                    </a>
                  </div>
                ) : (
                  column.title
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={(row as any).id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              {columns.map((column, index) =>
                column.render ? (
                  column.render(row, `${(row as any).id}-${column.key}`)
                ) : (
                  <td key={`${(row as any).id}-${column.key}-${index}`} className="px-6">
                    {column.dangerous ? (
                      <div
                        dangerouslySetInnerHTML={{ __html: row[column.key] }}
                      ></div>
                    ) : (
                      row[column.key]
                    )}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </BootstrapTable>
      <div className="">
        {count !== undefined ? (
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
        )}
      </div>
    </>
  );
};

export default Table;

interface IPaginationProps {
  page: number;
  rowsPerPage: number;
  count: number;
  onChangePage: (data?: any) => any;
  rowsPerPageOptions?: number[];
  onChangeRowsPerPage?: any;
  showOnlyPrimitive?: boolean;
}

export const Pagination = ({
  page,
  rowsPerPage,
  count,
  onChangePage,
  onChangeRowsPerPage,
  rowsPerPageOptions,
  showOnlyPrimitive,
}: IPaginationProps) => {
  const totalPages = Math.ceil(count / rowsPerPage);

  const handleFirstPageButtonClick = (event: any) => {
    event.preventDefault();
    onChangePage(0);
  };
  const handlePreviousPageButtonClick = (event: any) => {
    event.preventDefault();
    if (page > 0) {
      onChangePage(page - 1);
    }
  };
  const handleNextPageButtonClick = (event: any) => {
    event.preventDefault();
    if (page + 1 < count) {
      onChangePage(page + 1);
    }
  };
  const handleLastPageButtonClick = (event: any) => {
    event.preventDefault();
    onChangePage(totalPages - 1);
  };
  const handleChange = (event: any, page: number) => {
    event.preventDefault();
    onChangePage(page);
  };
  return (
    <>
      <BootstrapPagination>
        <BootstrapPagination.First onClick={handleFirstPageButtonClick} />
        <BootstrapPagination.Prev onClick={handlePreviousPageButtonClick} />
        {/* <BootstrapPagination.Ellipsis onClick={handlePreviousPageButtonClick} /> */}

        {[...Array(totalPages)].map((_, i) => (
          <BootstrapPagination.Item
            key={i}
            onClick={(e) => handleChange(e, i)}
            active={i === page}
          >
            {i + 1}
          </BootstrapPagination.Item>
        ))}

        {/* <BootstrapPagination.Ellipsis /> */}
        <BootstrapPagination.Next onClick={handleNextPageButtonClick} />
        <BootstrapPagination.Last onClick={handleLastPageButtonClick} />
      </BootstrapPagination>
      {!showOnlyPrimitive && (
        <div className="hidden sm:flex">
          <span className="flex items-center gap-1">
            <div>
              <FormattedMessage id="page" defaultMessage="Page" />
            </div>
            <strong>
              {page + 1} / {count}
            </strong>
          </span>
          <span className="flex items-center gap-1">
            | <FormattedMessage id="go_to_page" defaultMessage="Go to page" />
            :
            <input
              defaultValue={page + 1}
              type="number"
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                onChangePage(page);
              }}
              className="input input-bordered w-20 input-sm mx-2"
            />
          </span>
          {rowsPerPageOptions && rowsPerPageOptions.length > 0 && (
            <select
              value={rowsPerPage}
              onChange={(e) => {
                onChangeRowsPerPage(Number(e.target.value));
              }}
              className="select select-sm select-bordered"
            >
              {rowsPerPageOptions?.map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  <FormattedMessage id="show" defaultMessage="Show" />
                  {pageSize}
                </option>
              ))}
            </select>
          )}
        </div>
      )}
    </>
  );
};
