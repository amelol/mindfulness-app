import { Switch, Route, Redirect } from "react-router-dom";
import ArticleDetail from "./components/articles/article-detail/ArticleDetail";
import ArticleList from "./components/articles/articles-list/ArticlesList";
import Home from "./components/home/Home";
import MeditationDetail from "./components/meditations/meditation-detail/MeditationDetail";
import MeditationsList from "./components/meditations/meditations-list/MeditationsList";
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
        <Route exact path="/meditations" component={MeditationsList} />
        <Route exact path="/meditations/:id" component={MeditationDetail} />
        <Redirect to="/" />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
