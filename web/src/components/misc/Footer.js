function Footer() {
  return (
    <footer className="footer m-0 bg-light fixed-bottom">
      <div className="container">
        <span className="text-muted">
          <div className="row">
            <div className="card bg-transparent border-0 col-4">
              <i
                className="fa fa-file-text-o card-img-top"
                aria-hidden="true"
                alt="Read articles icon"
              />
              <div className="card-body p-0">
                <h6 className="card-title m-0">Articles</h6>
              </div>
            </div>
            <div className="card bg-transparent border-0 col-4">
              <i
                className="fa fa-headphones card-img-top"
                aria-hidden="true"
                alt="Let's meditate icon"
              />
              <div className="card-body p-0">
                <h6 className="card-title m-0">Meditations</h6>
              </div>
            </div>
            <div className="card bg-transparent border-0 col-4">
              <i
                className="fa fa-user card-img-top"
                aria-hidden="true"
                alt="Profile icon"
              />
              <div className="card-body p-0">
                <h6 className="card-title m-0">Profile</h6>
              </div>
            </div>
          </div>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
