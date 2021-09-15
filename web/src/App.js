import { Switch, Route, Redirect } from "react-router-dom";
import ArticleDetail from "./components/articles/article-detail/ArticleDetail";

import ArticleList from "./components/articles/article-list/ArticleList";
import Home from "./components/home/Home";
import Footer from "./components/misc/Footer";
import Header from "./components/misc/Header";


function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/articles" component={ArticleList} />
        <Route exact path="/articles/:id" component={ArticleDetail} />
        <Redirect to="/" />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
