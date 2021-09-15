import { useEffect, useState } from "react";
import { useParams } from "react-router";
import articlesService from "../../../services/articles-service";

function ArticleDetail({
  title,
  author,
  createdAt,
  keyWords,
  summary,
  content,
}) {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    let isMounted = true;
    articlesService.details(id).then((article) => {
      if (isMounted) {
        setArticle(article);
      }
    });
    return () => (isMounted = false);
  }, [id]);

  return (
    article && (
      <section className="container article-detail">
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
    )
  );
}

export default ArticleDetail;
