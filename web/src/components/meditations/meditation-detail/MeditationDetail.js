import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router";
import meditationsService from "../../../services/meditations-service";
import Moment from "react-moment";
import ReactRoundedImage from "react-rounded-image";

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
      <div className="container meditation-detail bg-white">
        <div className="col d-flex justify-content-end">
          <i
            role="button"
            className="fa fa-times"
            aria-hidden="true"
            onClick={() => onDeleteMeditation(id)}
          />
        </div>
        <div className="row">
          <div className="col-3">
            <ReactRoundedImage
              image={meditation.image}
              imageWidth="90"
              imageHeight="90"
              roundedSize="1"
              roundedColor="#F1F1F1"
            />
          </div>
          <div className="col-9">
            <h2 className="meditation-detail-title">{meditation.title}</h2>
            <div className="text-muted"></div>
          </div>
        </div>

        <div className="meditation-audio my-4">
          <audio controls src={meditation.audio} />
        </div>

        <div className="meditation-summary mb-3">
          <h5>Summary</h5>
          <small>{meditation.summary}</small>
        </div>
        <div className="pb-3 text-muted">
          <small>
            <i className="fa fa-user-circle me-1" aria-hidden="true" />{" "}
            {meditation.author.username}
          </small>{" "}
          <br />
          <small>
            {" "}
            <i className="fa fa-tags me-1" aria-hidden="true" />{" "}
            {meditation.keyWords.join(", ")}
          </small>{" "}
          <br />
          <small>
            <i className="fa fa-calendar me-1" aria-hidden="true" />{" "}
            <Moment date={meditation.createdAt} format="LL" />
          </small>
        </div>
      </div>
    )
  );
}

export default MeditationDetail;
