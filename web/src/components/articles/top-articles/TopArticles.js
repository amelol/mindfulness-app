import articlesService from "../../../services/articles-service";
import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function TopArticles() {
  const location = useLocation();
  const [state, setState] = useState({ articles: {}, isLoading: true });
  const [fetch, handleFetch] = useState(false);

  const fetchArticles = useCallback(() => handleFetch(!fetch), [fetch]);

  useEffect(() => {
    let isMounted = true;
    articlesService
      .list(articles)
      .sort({ views: "desc" })
      .limit(3)
      .then((articles) => {
        if (isMounted) {
          setState({ articles, isLoading: false });
        }
      })
      .catch((error) => {
        setState({ isLoading: false, articles: {} });
        console.error(error);
      });
    return () => (isMounted = false);
  }, [fetch, location]);

  const { articles, isLoading } = state;

  return isLoading ? (
    <i className="fa fa-gear fa-spin" />
  ) : (
    <section className="container">
      <div className="list-group list-group m-3">
        {articles.map((article) => {
          return (
            <a
              key={article.id}
              className="list-group-item col-4 list-group-item-action articles-list"
              href={`/articles/${article.id}`}
            >
              <div className="fw-bold article-title">{article.title}</div>
              <p>Keywords: {article.keyWords}</p>
              <small className="text-muted">
                {article.minutesRead} minutes read
              </small>
            </a>
          );
        })}
      </div>
    </section>
  );
}

export default TopArticles;
