import TopArticleList from "../articles/top-articles-list/TopArticleList";

function Home() {
  return (
    <>
      <section className="home-intro mb-1">
        <h2 className="ms-3 section-name">Getting started</h2>
        <div className="row row-cols-1 row-cols-md-3 g-4 mx-1 mt-1">
          <div className="col mt-2">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Benefits of mindfulness</h5>
                <p className="card-text">
                  Mindfulness is the practice of purposely bringing one's
                  attention in the present moment.
                </p>
              </div>
            </div>
          </div>
          <div className="col mt-2">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Why Mindfulness App?</h5>
                <p className="card-text">
                  We have great articles and meditations to help you embed
                  mindfulness into your daily routine.
                </p>
              </div>
            </div>
          </div>
          <div className="col mt-2">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Change people's lives</h5>
                <p className="card-text">
                  Would you like to contribute to the community by sharing your
                  own article or meditation? Become an author!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-articles">
        <TopArticleList tops={true} limit={3} />
      </section>
      <section className="home-meditations">aqui va meditations list</section>
    </>
  );
}

export default Home;
