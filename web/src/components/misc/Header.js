function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top p-0">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img alt="Mindfulness app logo" src="logo.png" className="img-fluid app-logo" />
        </a>
        <form className="d-flex">
          <button className="btn" type="submit">
            <i className="fa fa-search" aria-hidden="true" />
          </button>
        </form>
      </div>
    </nav>
  );
}

export default Header;
