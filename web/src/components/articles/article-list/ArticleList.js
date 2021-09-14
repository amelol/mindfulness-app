import { Component } from "react";


class ArticleList extends Component {
  render () {
    return (
      <section className="container">
        <div className="row">
          <div className="col">
            <h2 className="ms-3">Section name</h2>
          </div>
          <div className="col d-flex justify-content-end">
            <button type="button" className="btn btn-link text-black">
              More <i className="fa fa-angle-right" aria-hidden="true" />
            </button>
          </div>
        </div>

        <ul className="list-group list-group-horizontal m-3">
          <li className="list-group-item col-4">
            <div className="fw-bold">Title</div>
            <p>keywords</p>
            <p>X minutes read</p>
          </li>
          <li className="list-group-item col-4">
            <div className="fw-bold">Title</div>
            <p>keywords</p>
            <p>X minutes read</p>
          </li>
          <li className="list-group-item col-4">
            <div className="fw-bold">Title</div>
            <p>keywords</p>
            <p>X minutes read</p>
          </li>
        </ul>
      </section>
    );
  }
}

export default ArticleList