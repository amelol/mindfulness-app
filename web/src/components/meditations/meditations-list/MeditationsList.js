/* eslint-disable react-hooks/exhaustive-deps */
import meditationsService from "../../../services/meditations-service";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ReactRoundedImage from "react-rounded-image";

function MeditationsList({ category, limit, tops }) {
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
          meditations = meditations.reduce(
            (meditationsByCategory, meditation) => {
              if (meditationsByCategory[meditation.type]) {
                if (
                  !limit ||
                  meditationsByCategory[meditation.type].length < limit
                ) {
                  meditationsByCategory[meditation.type].push(meditation);
                }
              } else {
                meditationsByCategory[meditation.type] = [meditation];
              }
              return meditationsByCategory;
            },
            {}
          );
          setState({ meditations, isLoading: false });
        }
      })
      .catch((error) => {
        setState({ isLoading: false, meditations: {} });
        console.error(error);
      });
    return () => (isMounted = false);
  }, [limit, location, tops]);

  const { meditations, isLoading } = state;

  return isLoading ? (
    <i className="fa fa-circle-o-notch fa-spin" />
  ) : (
    <div className="container py-1">
      {Object.keys(meditations).map((category) => {
        return (
          <div key={category}>
            <div className="row mt-4">
              <div className="col-8">
                <h2 className="ms-3 meditation-type">{category}</h2>
              </div>
              <div className="col-4 d-flex justify-content-end">
                <Link
                  role="button"
                  exact="true"
                  to={`/meditations?category=${category}&limit=`}
                  className="btn btn-link more-button"
                >
                  More <i className="fa fa-angle-right" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="card-group m-3">
              {meditations[category].map((meditation) => {
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
          </div>
        );
      })}
    </div>
  );
}

MeditationsList.defaultProps = {
  limit: 3,
  tops: false,
};

export default MeditationsList;
