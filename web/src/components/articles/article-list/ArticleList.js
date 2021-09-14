import articlesService from "../../../services/articles-service";
import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function ArticleList({ category, limit }) {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const [state, setState] = useState({ articles: {}, isLoading: true });
  const [fetch, handleFetch] = useState(false);

  const fetchArticles = useCallback(() => handleFetch(!fetch), [fetch]);

  useEffect(() => {
    let isMounted = true;
    articlesService
      .list(category || query.get("category"))
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
        console.error(error);
      });
    return () => (isMounted = false);
  }, [fetch, limit, query]);

  const { articles, isLoading } = state;

  return (
    (isLoading ? (
      <i className="fa fa-gear fa-spin" />
    ) : (
      <section className="container">
        {Object.keys(articles).map((category) => {
          return (
            <div key={category}>
              <div className="row">
                <div className="col">
                  <h2 className="ms-3">{category}</h2>
                </div>
                <div className="col d-flex justify-content-end">
                  <Link role="button" to={`/articles?category=${category}&limit=`} className="btn btn-link text-black">
                    More <i className="fa fa-angle-right" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              <ul className="list-group list-group-horizontal m-3">
                {articles[category].map((article) => {
                  return (
                    <li key={article.id} className="list-group-item col-4">
                      <div className="fw-bold">{article.title}</div>
                      <p>keywords</p>
                      <p>X minutes read</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </section>
    ))
  );
}

ArticleList.defaultProps = {
  limit: 3,
}

export default ArticleList;
