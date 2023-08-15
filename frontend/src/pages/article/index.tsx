import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchArticleList } from '../../redux/store/reducers/articleSlice';
import Layout from '../../components/layouts/Layout';
import Breadcrumbs from '../../components/Breadcrumbs';
import Sidebar, { TriggerButton } from '../../components/sidebar/Sidebar';
import { ISortProps, setPage, setPageSize, setSorting } from '../../redux/store/reducers/articleFilterSlice';
import Table from '../../components/table/Table';
import { IArticle } from '../../models/IArticle';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';

export interface IArticleIndexProps {
}
export interface IArticleIndexState {
}
export default function ArticleIndex(_: IArticleIndexProps) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const intl = useIntl()
  const { filters, pagination } = useAppSelector(state => state.articleFilter)
  const { articles, } = useAppSelector(state => state.article)
  const [filtersSidebarOpen, setFiltersSidebarOpen] = React.useState<boolean>(false)

  const handleArticleDetailView = (id: string) => {
    navigate(`/article/${id}`)
  }

  React.useEffect(() => {
    dispatch(fetchArticleList());
  }, [dispatch, pagination.page, pagination.pageSize, filters.sort]);

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  const handleSortingChange = (sorting: ISortProps) => {
    dispatch(setSorting(sorting));
  };

  // const handleFiltersChange = (filters: any) => {
  //   dispatch(setPage(1));
  //   dispatch(setFilters(filters));
  // };

  const handleRowsPerPageChange = (value: number) => {
    dispatch(setPageSize(value))
  };
  const columns = React.useMemo(() => (
    [
      {
        key: 'id', title: 'ID', sortable: true, render: (article: IArticle, key: string | number) => (
          <th key={key} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {article.id}
          </th>
        )
      },
      {
        key: 'title',
        title: intl.formatMessage({
          id: "app.articles.filters.title.label"
        })
      },
      {
        key: 'pages_count',
        title: intl.formatMessage({
          id: "app.articles.filters.pages_number.label",
        }), sortable: true
      },
      {
        key: 'created_at',
        title: intl.formatMessage({
          id: "app.table.columns.created_at.label",
        }), sortable: true
      },
      {
        key: 'updated_at',
        title: intl.formatMessage({
          id: "app.table.columns.updated_at.label",
        }), sortable: true
      },
      {
        key: 'actions',
        title: intl.formatMessage({
          id: "app.table.columns.actions.label",
        }),
        render: (article: IArticle, key: string | number) => (
          <td key={key} className="px-6 py-4 text-right">
            <button onClick={(_) => handleArticleDetailView(article.id)}
              className="font-medium bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded mx-1 my-1"
            >
              <FormattedMessage id='app.detail.label' />
            </button>
          </td>
        )
      },
    ]
  ), []);


  return (
    <Layout>
      <Breadcrumbs>
        <h2>
          <FormattedMessage
            id='app.url.articles' />
        </h2>
        <p>Odio et unde deleniti. Deserunt numquam exercitationem. Officiis quo odio sint voluptas consequatur ut a odio voluptatem. Sit dolorum debitis veritatis natus dolores. Quasi ratione sint. Sit quaerat ipsum dolorem.</p>
      </Breadcrumbs>
      <section id="blog" className="blog">
        <div className="container mx-auto" data-aos="fade-up">
          <div className="flex justify-end items-center items-baseline border-b border-gray-200 px-6 pb-4 md:px-0">
            <TriggerButton onClick={() => setFiltersSidebarOpen(!filtersSidebarOpen)} />
          </div>

          <div className="flex mt-8">
            <div className="w-full lg:w-2/3 ">
              <div className="flex flex-wrap mx-auto posts-list">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <Table
                    columns={columns}
                    data={articles}
                    onChangePage={handlePageChange}
                    onSortingChange={handleSortingChange}
                    onChangeRowsPerPage={handleRowsPerPageChange}
                    page={pagination.page}
                    pageSize={pagination.pageSize}
                    count={pagination.totalItems || 0}
                    sorting={filters.sort}
                  />
                </div>
              </div>
            </div>
            <Sidebar open={filtersSidebarOpen} setOpen={setFiltersSidebarOpen} />
          </div>
        </div>
      </section>
    </Layout>
  );
}
