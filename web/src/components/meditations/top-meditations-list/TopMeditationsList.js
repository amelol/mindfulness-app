import meditationsService from "../../../services/meditations-service";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactRoundedImage from "react-rounded-image";

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
          meditations = meditations.slice(0, limit);
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
        <div className="col-8">
          <h2 className="ms-1 section-name">Top meditations</h2>
        </div>
        <div className="col-4 d-flex justify-content-end">
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

      <div className="card-group my-3 mx-1">
        {meditations.map((meditation) => {
          return (
            <Link
              key={meditation.id}
              className="card meditations-list bg-light p-1"
              exact="true"
              to={`/meditations/${meditation.id}`}
            >
              <div className="row g-0">
                <div className="col-4 meditation-image">
                  <ReactRoundedImage
                    image={meditation.image}
                    imageWidth="80"
                    imageHeight="80"
                    roundedSize="1"
                    roundedColor="#F1F1F1"
                  />
                </div>
                <div className="col-7">
                  <div className="card-body">
                    <div className="fw-bold meditation-list-title card-title">
                      {meditation.title}
                    </div>
                    <div className="card-text meditation-list-text">
                      <small className="text-muted d-flex">
                        <i
                          className="fa fa-clock-o me-1 meditation-time-icon"
                          aria-hidden="true"
                        />{" "}
                        {meditation.duration} minutes
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
  tops: false,
};

export default TopMeditationsList;
