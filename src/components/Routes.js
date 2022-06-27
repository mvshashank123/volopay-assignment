import { Route, Switch } from "react-router-dom";
import Cards from "../pages/Cards";

const Routes = () => {
  return (
    <Switch>
      <Route path="/my-cards" exact>
        <Cards type="mycards" />
      </Route>
      <Route path="/blocked-cards" exact>
        <Cards type="blockedcards" />
      </Route>
      <Route path="/all-cards" exact>
        <Cards type="allcards" />
      </Route>
      <Route path="/" exact>
        <Cards type="allcards" />
      </Route>
    </Switch>
  );
};

export default Routes;
