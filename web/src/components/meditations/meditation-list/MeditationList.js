import meditationsService from "../../../services/meditations-service";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function MeditationList({ category, limit, tops }) {
  const location = useLocation();
  const [state, setState] = useState({ meditations: {}, isLoading: true });

  useEffect(() => {
    let isMounted = true;
    const query = new URLSearchParams(location.search);
    meditationsService
      .list(category || query.get("category"), tops)
      .then((meditations) => {
        if (isMounted) {
          limit = query.has("limit") ? query.get("limit") : limit;
          meditations = meditations.reduce((meditationsByCategory, meditation) => {
            if (meditationsByCategory[meditation.type]) {
              if (!limit || meditationsByCategory[meditation.type].length < limit) {
                meditationsByCategory[meditation.type].push(meditation);
              }
            } else {
              meditationsByCategory[meditation.type] = [meditation];
            }
            return meditationsByCategory;
          }, {});
          setState({ meditations, isLoading: false });
        }
      })
      .catch((error) => {
        setState({ isLoading: false, meditations: {} });
        console.error(error); //aqui estaria bien hacer una alerta
      });
    return () => (isMounted = false);
  }, [limit, location, tops]);

  const { meditations, isLoading } = state;

  return isLoading ? (
    <i className="fa fa-gear fa-spin" />
  ) : (
    <section className="container">
      {Object.keys(meditations).map((category) => {
        return (
          <div key={category}>
            <div className="row mt-4">
              <div className="col">
                <h2 className="ms-3 meditation-type">{category}</h2>
              </div>
              <div className="col d-flex justify-content-end">
                <Link
                  role="button"
                  exact="true" to={`/meditations?category=${category}&limit=`}
                  className="btn btn-link more-button"
                >
                  More <i className="fa fa-angle-right" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="list-group list-group m-3">
              {meditations[category].map((meditation) => {
                return (
                  <Link
                    key={meditation.id}
                    className="list-group-item col-4 list-group-item-action meditations-list"
                    exact="true"
                    to={`/meditations/${meditation.id}`}
                  >
                    <div className="fw-bold meditation-title">{meditation.title}</div>
                    <p>Keywords: {meditation.keyWords}</p>
                    <small className="text-muted d-flex justify-content-end">
                      {meditation.minutesRead} minutes read
                    </small>
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

MeditationList.defaultProps = {
  limit: 3,
  tops: false
};

export default MeditationList;
