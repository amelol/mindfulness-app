import TopArticlesList from "../articles/top-articles-list/TopArticlesList";
import TopMeditationsList from "../meditations/top-meditations-list/TopMeditationsList";

function Home() {
  return (
    <div className="container pt-1 pb-1">
      <section className="container home-intro mt-4">
        <div className="row">
          <h2 className="ms-1 section-name">Getting started</h2>
        </div>
        <div className="card-group my-3 mx-1">
          <div className="card h-100 bg-light p-1">
            <div className="card-body">
              <h5 className="fw-bold card-title home-title">
                Benefits of mindfulness
              </h5>
              <p className="card-text home-text">
                Mindfulness is the practice of purposely bringing one's
                attention in the present moment.
              </p>
            </div>
          </div>

          <div className="card h-100 bg-light p-1">
            <div className="card-body">
              <h5 className="fw-bold card-title home-title">
                Why Mindfulness App?
              </h5>
              <p className="card-text home-text">
                We have great articles and meditations to help you embed
                mindfulness into your daily routine.
              </p>
            </div>
          </div>

          <div className="card h-100 bg-light p-1">
            <div className="card-body">
              <h5 className="fw-bold card-title home-title">
                Change people's lives
              </h5>
              <p className="card-text home-text">
                Would you like to contribute to the community by sharing your
                own article or meditation? Become an author!
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="home-articles mt-4">
        <TopArticlesList tops={true} limit={3} />
      </section>
      <section className="home-meditations mt-4">
        <TopMeditationsList tops={true} limit={3} />
      </section>
    </div>
  );
}

export default Home;
