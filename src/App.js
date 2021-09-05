import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./container/home";
import Play from "./container/play";
import Navbar from "./container/navbar";
import WrongPage from "./pages/wrongpage";
import ErrorBoundary from "./container/errorBoundary/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Navbar />
        <div className="content-body">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/play" component={Play} />
            <Route path="/" component={WrongPage} />
          </Switch>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
