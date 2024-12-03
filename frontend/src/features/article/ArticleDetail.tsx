import React from "react";
import { useAppDispatch, useAppSelector } from "@/core/hooks/redux";
import { fetchArticleDetail } from "@/core/redux/store/reducers/articleSlice";
import { useParams } from "react-router-dom";
import { Accordion } from "react-bootstrap";
import FileViewer from "@/shared/components/article/FileViewer";
import imgLineVector from "@/assets/img/line-vector.png";
import "./index.scss";
import "./ArticleCKEditorPreview.scss";
import TitleHelment from "@/shared/components/title/TitleHelmet";

export default function ArticleDetail() {
  const dispatch = useAppDispatch();
  const { article_payload, loading } = useAppSelector((state) => state.article);
  const { id: item_id } = useParams();
  const article_read_files = React.useMemo(() => {
    if (!article_payload?.files) return [];
    if (!article_payload.featured_image) return article_payload.files;
    return article_payload.files.filter(
      (fileItem) => fileItem.id !== article_payload.featured_image.id
    );
  }, [article_payload]);

  React.useEffect(() => {
    if (item_id) {
      dispatch(fetchArticleDetail(Number(item_id)));
    }
  }, [dispatch, item_id]);

  return (
    <section className="article-detail clients">
      <TitleHelment title={article_payload?.title || "Article"} />
      <div className="container">
        <div className="w-100 d-flex justify-content-center py-5 position-relative ">
          <h1 className="article-title font-noto">{article_payload?.title}</h1>
          <img
            src={imgLineVector}
            alt={imgLineVector}
            className="position-absolute end-0 translate-middle-x top-0 "
          />
        </div>
      </div>
      <div className="w-100 container-md p-0 p-md-1">
        <div className="w-100 article-image">
          <img
            src={article_payload?.featured_image?.url}
            alt={article_payload?.featured_image?.url}
            className="img-fluid w-100 object-fit-contain img-0 z-2"
          />
        </div>
        <div className="position-relative">
          {/* <img
            src={imgCircle}
            alt={imgStripedCircle}
            className="position-absolute start-0 bottom-0 img-1"
          /> */}
          {/* <img
            src={imgStripedCircle}
            alt={imgStripedCircle}
            className="position-absolute end-0 bottom-0 img-2"
          /> */}
        </div>
      </div>
      <div className="article-content mt-3 mt-sm-5">
        <div className="container">
          <div className="w-100">
            <div
              className="ck-content"
              dangerouslySetInnerHTML={{
                __html: article_payload?.content || "",
              }}
            ></div>
          </div>
        </div>
      </div>
      {article_read_files.length > 0 && (
        <div className="container">
          <Accordion defaultActiveKey="0">
            {article_read_files.map((fileItem, index) => (
              <Accordion.Item key={fileItem.id} eventKey={`${index}`}>
                <Accordion.Header>
                  <a href={fileItem.url}>{fileItem.name}</a>
                </Accordion.Header>
                <Accordion.Body>
                  <FileViewer file={fileItem} />
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      )}
      <div className="container">
        <div className="py-5"></div>
      </div>
    </section>
  );
}
