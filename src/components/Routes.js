import { Route, Switch } from "react-router-dom";
import Cards from "../pages/Cards";

const Routes = () => {
  return (
    <Switch>
      <Route path="/volopay-assignment/my-cards" exact>
        <Cards type="mycards" />
      </Route>
      <Route path="/volopay-assignment/blocked-cards" exact>
        <Cards type="blockedcards" />
      </Route>
      <Route path="/volopay-assignment/all-cards" exact>
        <Cards type="allcards" />
      </Route>
      <Route path="/volopay-assignment/" exact>
        <Cards type="allcards" />
      </Route>
    </Switch>
  );
};

export default Routes;
