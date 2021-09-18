import meditationsService from "../../../services/meditations-service";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function TopMeditationsList({ limit }) {
  const [state, setState] = useState({ meditations: [], isLoading: true });

  useEffect(() => {
    let isMounted = true;
    const category = undefined;
    const tops = true;
    meditationsService
      .list(category, tops)
      .then((meditations) => {
        if (isMounted) {
          meditations = meditations.slice(0, limit)
          setState({ meditations, isLoading: false });
        }
      })
      .catch((error) => {
        setState({ isLoading: false, meditations: {} });
        console.error(error); //aqui estaria bien hacer una alerta
      });
    return () => (isMounted = false);
  }, [limit]);

  const { meditations, isLoading } = state;

  return isLoading ? (
    <i className="fa fa-circle-o-notch fa-spin" />
  ) : (
    <section className="container mt-4">
      <div className="row">
        <div className="col">
          <h2 className="ms-1 section-name">Top meditations</h2>
        </div>
        <div className="col d-flex justify-content-end">
          <Link
            role="button"
            exact="true"
            to={`/meditations`}
            className="btn btn-link more-button"
          >
            More <i className="fa fa-angle-right" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="card-group m-3">
        {meditations.map((meditation) => {
          return (
            <Link
              key={meditation.id}
              className="card meditations-list bg-light"
              exact="true"
              to={`/meditations/${meditation.id}`}
            >
              <div className="row g-0">
                <div className="col-4">
                  <img
                    src={meditation.image}
                    className="meditation-image-list img-fluid rounded"
                    alt="abstract art"
                  />
                </div>
                <div className="col-8">
                  <div className="card-body">
                    <div className="fw-bold meditation-title-list card-title">
                      {meditation.title}
                    </div>
                    <div className="card-text meditation-text-list">
                      <small className="text-muted d-flex">
                        Duration: {meditation.duration} minutes
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

TopMeditationsList.defaultProps = {
  limit: 3,
  tops: false
};

export default TopMeditationsList;
