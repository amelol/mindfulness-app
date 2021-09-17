import articlesService from "../../../services/articles-service";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function TopArticlesList({ limit }) {
  const [state, setState] = useState({ articles: [], isLoading: true });

  useEffect(() => {
    let isMounted = true;
    const category = undefined;
    const tops = true;
    articlesService
      .list(category, tops)
      .then((articles) => {
        if (isMounted) {
          articles = articles.slice(0, limit)
          setState({ articles, isLoading: false });
        }
      })
      .catch((error) => {
        setState({ isLoading: false, articles: {} });
        console.error(error); //aqui estaria bien hacer una alerta
      });
    return () => (isMounted = false);
  }, [limit]);

  const { articles, isLoading } = state;

  return isLoading ? (
    <i className="fa fa-gear fa-spin" />
  ) : (
    <section className="container mt-4">
      <div className="row">
        <div className="col">
          <h2 className="ms-1 section-name">Top articles</h2>
        </div>
        <div className="col d-flex justify-content-end">
          <Link
            role="button"
            exact="true"
            to={`/articles`}
            className="btn btn-link more-button"
          >
            More <i className="fa fa-angle-right" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="list-group list-group mx-1 mt-2">
        {articles.map((article) => {
          return (
            <Link
              key={article.id}
              className="list-group-item col-4 list-group-item-action articles-list"
              exact="true"
              to={`/articles/${article.id}`}
            >
              <div className="fw-bold article-title">{article.title}</div>
              <small>Keywords: {article.keyWords.join(", ")} </small> <br />
              <small className="text-muted d-flex justify-content-end mt-1">
                {article.minutesRead} minutes read
              </small>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

TopArticlesList.defaultProps = {
  limit: 3,
  tops: false
};

export default TopArticlesList;
