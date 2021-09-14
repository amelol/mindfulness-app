import { Switch, Route, Redirect } from "react-router-dom";
import ArticleItem from "./components/articles/article-item/ArticleItem";

import ArticleList from "./components/articles/article-list/ArticleList";
import Footer from "./components/misc/Footer";
import Navbar from "./components/misc/Navbar";


function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/articles" component={ArticleList} />
        <Route exact path="/articles/:id" component={ArticleItem} />
        <Redirect to="/" />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
