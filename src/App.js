import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./container/home";
import Play from "./container/play";
import Navbar from "./container/navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="content-body">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/play" component={Play} />
          </Switch>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
