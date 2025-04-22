import React from "react";
import { useAppDispatch, useAppSelector } from "@/core/hooks/redux";
import { fetchArticleList } from "@/core/redux/store/reducers/articleSlice";
import { IArticle } from "@/core/models/IArticle";
import { useNavigate } from "react-router-dom";
import Loader from "@/shared/components/loader/Loader";
import DarkButton from "@/shared/components/buttons/dark-button/DarkButton";
import ArticleService from "@/core/services/ArticleService";
import { Pagination } from "@/shared/components/table/Table";
import "./index.scss";
import { FormattedMessage } from "react-intl";
import TitleHelment from "@/shared/components/title/TitleHelmet";

interface ISorting {
  type: "desc" | "asc";
  field: string;
}

interface ISubjectFilters {
  id: number;
  title: string;
  articles_count: number;
  active?: boolean;
}

interface IFilters {
  subjects: Array<ISubjectFilters>;
  pagination: {
    page_size: number;
    page: number;
  };
  ordering: ISorting;
  search: string;
}

const ArticleItem = ({
  article_item,
  onArticleDetailClick,
}: {
  article_item: IArticle;
  onArticleDetailClick: (id: number) => void;
}) => {
  return (
    <div className="article-item row ms-0 me-0">
      <img
        className="image col-6 col-md-5 p-0 bg-green-light"
        alt="Image"
        src={article_item.featured_image ? article_item.featured_image.url: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"}
      />
      <div className="content col-6 col-md-7 py-2 px-3 py-sm-4 px-sm-5 h-100">
        <div className="h-100 d-flex flex-column justify-content-between">
          <div className="content-2">
            <div className="title">
              {/* <p className="created_at text-uppercase font-noto">
                {article_item.created_at}&nbsp;&nbsp; |&nbsp;&nbsp;
              </p> */}
              <p className="we-ve-reached font-noto">{article_item.title}</p>
            </div>
            <div className="subject">
              {article_item.subject && (
                <h4>
                  <div className="badge bg-secondary font-noto">
                    {article_item.subject.title}
                  </div>
                </h4>
              )}
            </div>
          </div>
          <DarkButton
            style={{ borderRadius: "34px", height: "40px", width: "120px" }}
            className="button border-rounded-50 font-weight-medium font-noto"
            onClick={() => onArticleDetailClick(article_item.id)}
          >
            <FormattedMessage id="read" />
          </DarkButton>
        </div>
      </div>
    </div>
  );
};

export default function ArticleIndex() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { articles, loading, pagination_data } = useAppSelector(
    (state) => state.article
  );
  const [filters, setFilters] = React.useState<{
    subjects: Array<ISubjectFilters>;
  }>({
    subjects: [],
  });
  const [appliedFilters, setAppliedFilters] = React.useState<IFilters>({
    search: "",
    subjects: [],
    pagination: {
      page_size: 10,
      page: 1,
    },
    ordering: {
      field: "id",
      type: "desc",
    },
  });

  const onArticleDetailClick = (id: number) => {
    navigate(`/article/${id}/`);
  };

  const handlePageChange = (page: number) => {
    setAppliedFilters((appliedFilters) => ({
      ...appliedFilters,
      pagination: {
        ...appliedFilters.pagination,
        page: page + 1,
      },
    }));
  };
  const handleSortingChange = (ordering: ISorting) => {
    setAppliedFilters((appliedFilters) => ({
      ...appliedFilters,
      ordering: ordering,
    }));
  };
  const handleFilterChange = (filter_name: string, filter_item: any) => {
    setAppliedFilters((appliedFilters) => ({
      ...appliedFilters,
      subjects: appliedFilters.subjects
        .map((item) => item.id)
        .includes(filter_item.id)
        ? []
        : [filter_item],
    }));
  };

  React.useEffect(() => {
    const data = {};
    if (appliedFilters.search) {
      data["search"] = appliedFilters.search;
    }
    if (appliedFilters.subjects.length > 0) {
      data["subject"] = appliedFilters.subjects.map((item) => item.id)[0];
    }
    data["page"] = appliedFilters.pagination.page;
    data["page_size"] = appliedFilters.pagination.page_size;
    if (appliedFilters.ordering.field) {
      data["ordering"] =
        appliedFilters.ordering.type === "desc"
          ? "-" + appliedFilters.ordering.field
          : appliedFilters.ordering.field;
    }
    dispatch(fetchArticleList(data));
  }, [dispatch, appliedFilters]);

  React.useEffect(() => {
    ArticleService.getFilters().then((response) => {
      setFilters((filters) => ({
        ...filters,
        subjects: response.data.subjects.map(
          (subject_filter_item: ISubjectFilters) => {
            return {
              ...subject_filter_item,
            };
          }
        ),
      }));
    });
  }, []);
  React.useEffect(() => {
    setFilters((filters) => ({
      ...filters,
      subjects: filters.subjects.map((subject_filter_item: ISubjectFilters) => {
        return {
          ...subject_filter_item,
          active: appliedFilters.subjects
            .map((item) => item.id)
            .includes(subject_filter_item.id),
        };
      }),
    }));
  }, [articles]);

  return (
    <main className="article-list-page d-flex flex-column flex-grow-1">
      <TitleHelment title={"Articles"} />
      <section className="bg-green-light d-flex flex-column flex-grow-1">
        <div className="clients d-flex flex-column flex-grow-1">
          <div className="container d-flex flex-column flex-grow-1">
            <div className="d-flex flex-row justify-content-start align-items-center py-2 bg-white gap-2 ">
              {filters.subjects.map((subject_filter_item) => (
                <button
                  key={subject_filter_item.id}
                  className={`btn ${
                    subject_filter_item.active
                      ? "btn-success"
                      : "btn-outline-success"
                  } `}
                  onClick={() =>
                    handleFilterChange("subjects", subject_filter_item)
                  }
                >
                  {subject_filter_item.title} (
                  {subject_filter_item.articles_count})
                </button>
              ))}
            </div>
            <div className="d-flex flex-column d-flex flex-column flex-grow-1">
              <div className="position-relative">
                <Loader active={loading.list} />
              </div>
              {articles.map((article_item: IArticle) => (
                <ArticleItem
                  key={article_item.id}
                  article_item={article_item}
                  onArticleDetailClick={onArticleDetailClick}
                />
              ))}
            </div>
            <div className="py-2 bg-white">
              <Pagination
                page={appliedFilters.pagination.page - 1}
                rowsPerPage={appliedFilters.pagination.page_size}
                count={Math.floor(
                  pagination_data.totalItems /
                    appliedFilters.pagination.page_size
                )}
                onChangePage={handlePageChange}
                showOnlyPrimitive={true}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
