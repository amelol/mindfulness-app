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
          articles = articles.slice(0, limit);
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
    <i className="fa fa-circle-o-notch fa-spin" />
  ) : (
    <section className="container mt-4">
      <div className="row">
        <div className="col-8">
          <h2 className="ms-1 section-name">Top articles</h2>
        </div>
        <div className="col-4 d-flex justify-content-end">
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

      <div className="card-group my-3 mx-1">
        {articles.map((article) => {
          return (
            <Link
              key={article.id}
              className="card articles-list bg-light p-1"
              exact="true"
              to={`/articles/${article.id}`}
            >
              <div className="card-body">
                <div className="fw-bold article-list-title card-title">
                  {article.title}
                </div>
                <div className="card-text article-list-text">
                  <p>
                    <i className="fa fa-tags me-1" aria-hidden="true" />{" "}
                    {article.keyWords.join(", ")}{" "}
                  </p>{" "}
                  <small className="text-muted d-flex justify-content-end mt-1">
                    <i
                      className="fa fa-clock-o me-1 reading-time-icon"
                      aria-hidden="true"
                    />{" "}
                    {article.minutesRead} minutes read
                  </small>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

TopArticlesList.defaultProps = {
  limit: 3,
  tops: false,
};

export default TopArticlesList;
