import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router";
import meditationsService from "../../../services/meditations-service";
import Moment from "react-moment";

function MeditationDetail({
  title,
  summary,
  image,
  duration,
  author,
  createdAt,
  keyWords,
}) {
  const { id } = useParams();
  const [meditation, setMeditation] = useState(null);

  useEffect(() => {
    let isMounted = true;
    meditationsService.detail(id).then((meditation) => {
      if (isMounted) {
        setMeditation(meditation);
      }
    });
    return () => (isMounted = false);
  }, [id]);

  const [fetch, handleFetch] = useState(false);
  const fetchMeditations = useCallback(() => handleFetch(!fetch), [fetch]);
  const onDeleteMeditation = useCallback(
    (id) => {
      meditationsService
        .remove(id)
        .then(() => fetchMeditations())
        .catch((error) => console.error(error));
    },
    [fetchMeditations]
  );

  return (
    meditation && (
      <section className="container meditation-detail bg-white">
        <div className="col d-flex justify-content-end">
          <i
            role="button"
            className="fa fa-times"
            aria-hidden="true"
            onClick={() => onDeleteMeditation(id)}
          />
        </div>
        <div className="row">
          <div className="col">
            <img
              src={meditation.image}
              className="rounded-circle"
              alt="abstract art"
            />
          </div>
          <div className="col">
            <h2 className="meditation-detail-title">{meditation.title}</h2>
            <small>Author: {meditation.author.username}</small> <br />
            <small>Keywords: {meditation.keyWords.join(", ")}</small>{" "}
          </div>
        </div>
      </section>
    )
  );
}

export default MeditationDetail;
