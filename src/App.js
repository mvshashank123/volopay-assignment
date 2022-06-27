import { createBrowserHistory } from "history";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppHeader from "./components/AppHeader";
import Routes from "./components/Routes";
import Tabs from "./components/Tabs";

function App() {
  const history = createBrowserHistory();
  const [cardState, setCardState] = useState("All");

  return (
    <BrowserRouter history={history}>
    <div className="App">
      <AppHeader />
      <Tabs cardState={cardState} setCardState={setCardState}/>
      <Routes />
    </div>
    </BrowserRouter>
  );
}

export default App;
