import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router";
import articlesService from "../../../services/articles-service";
import Moment from "react-moment";

function ArticleDetail({
  title,
  author,
  createdAt,
  keyWords,
  summary,
  content,
}) {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    let isMounted = true;
    articlesService.detail(id).then((article) => {
      if (isMounted) {
        setArticle(article);
      }
    });
    return () => (isMounted = false);
  }, [id]);

  const [fetch, handleFetch] = useState(false);
  const fetchArticles = useCallback(() => handleFetch(!fetch), [fetch]);
  const onDeleteArticle = useCallback(
    (id) => {
      articlesService
        .remove(id)
        .then(() => fetchArticles())
        .catch((error) => console.error(error));
    },
    [fetchArticles]
  );

  

  return (
    article && (
      <section className="container article-detail bg-white">
      <div className="col d-flex justify-content-end">
              <i
                role="button"
                className="fa fa-times"
                aria-hidden="true"
                onClick={() => onDeleteArticle(id)}
              />
            </div>
        <div className="row">
          <div className="col">
            <div className="row">
              <div className="col">
                <h2 className="article-detail-title">{article.title}</h2>
              </div>
              <div className="col">
                <p>{article.author.username}</p>
                <p>
                  <Moment date={article.createdAt} format="LL" />
                </p>
                <p>Keywords: {article.keyWords.join(", ")}</p>
              </div>
            </div>
            
          </div>
          <div className="summary mb-3">
            <h4>Summary</h4>
            <small className="text-muted">{article.summary}</small>
          </div>
          <div>{article.content}</div>
        </div>
      </section>
    )
  );
}

export default ArticleDetail;
