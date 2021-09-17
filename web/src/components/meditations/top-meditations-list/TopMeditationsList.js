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
    <i className="fa fa-gear fa-spin" />
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

      <div className="list-group list-group mx-1 mt-2">
        {meditations.map((meditation) => {
          return (
            <Link
              key={meditation.id}
              className="list-group-item col-4 list-group-item-action meditations-list"
              exact="true"
              to={`/meditations/${meditation.id}`}
            >
              <div className="fw-bold meditation-title">{meditation.title}</div>
              <small>Keywords: {meditation.keyWords.join(", ")} </small> <br />
              <small className="text-muted d-flex justify-content-end mt-1">
                {meditation.minutesRead} minutes read
              </small>
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
