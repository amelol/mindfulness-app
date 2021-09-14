function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Mindfulness app
        </a>
        <form className="d-flex">
          <button className="btn" type="submit">
            <i className="fa fa-search" aria-hidden="true"/>
          </button>
        </form>
      </div>
    </nav>
  );
}

export default Navbar;
