

function ArticleItem({ title, author, createdAt, keyWords, summary, content }) {
  return (
    <section className="container article-item">
      <div className="row">
        <div className="col">
          <h2>{title}</h2>
        </div>
        <div className="col">
          <p>{author}</p>
          <p>{createdAt}</p>
          <p>{keyWords}</p>
        </div>
      </div>
      <div className="summary">
        <h4>Summary</h4>
        <p>{summary}</p>
      </div>
      <p>{content}</p>
    </section>
  );
}

export default ArticleItem;
