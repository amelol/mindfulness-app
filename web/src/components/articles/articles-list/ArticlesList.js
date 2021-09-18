/* eslint-disable react-hooks/exhaustive-deps */
import articlesService from "../../../services/articles-service";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function ArticlesList({ category, limit, tops }) {
  const location = useLocation();
  const [state, setState] = useState({ articles: {}, isLoading: true });

  useEffect(() => {
    let isMounted = true;
    const query = new URLSearchParams(location.search);
    articlesService
      .list(category || query.get("category"), tops)
      .then((articles) => {
        if (isMounted) {
          limit = query.has("limit") ? query.get("limit") : limit;
          articles = articles.reduce((articlesByCategory, article) => {
            if (articlesByCategory[article.type]) {
              if (!limit || articlesByCategory[article.type].length < limit) {
                articlesByCategory[article.type].push(article);
              }
            } else {
              articlesByCategory[article.type] = [article];
            }
            return articlesByCategory;
          }, {});
          setState({ articles, isLoading: false });
        }
      })
      .catch((error) => {
        setState({ isLoading: false, articles: {} });
        console.error(error); //aqui estaria bien hacer una alerta
      });
    return () => (isMounted = false);
  }, [limit, location, tops]);

  const { articles, isLoading } = state;

  return isLoading ? (
    <i className="fa fa-circle-o-notch fa-spin" />
  ) : (
    <section className="container py-1">
      {Object.keys(articles).map((category) => {
        return (
          <div key={category}>
            <div className="row mt-4">
              <div className="col-8">
                <h2 className="ms-3 article-type">{category}</h2>
              </div>
              <div className="col-4 d-flex justify-content-end">
                <Link
                  role="button"
                  exact="true"
                  to={`/articles?category=${category}&limit=`}
                  className="btn btn-link more-button"
                >
                  More <i className="fa fa-angle-right" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="card-group m-3">
              {articles[category].map((article) => {
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
                          {article.keyWords.join(", ")}
                        </p>
                        <small className="text-muted d-flex justify-content-end">
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
          </div>
        );
      })}
    </section>
  );
}

ArticlesList.defaultProps = {
  limit: 3,
  tops: false,
};

export default ArticlesList;
