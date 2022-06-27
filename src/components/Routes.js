import { Route, Switch } from "react-router-dom";

import allPaths from "../helpers/allPaths";
import Cards from "../pages/Cards";

const Routes = () => {
  return (
    <Switch>
      <Route path={allPaths.MY_CARDS_ROUTE} exact>
        <Cards type="mycards" />
      </Route>
      <Route path={allPaths.BLOCKED_CARDS_ROUTE} exact>
        <Cards type="blockedcards" />
      </Route>
      <Route path={allPaths.ALL_CARDS_ROUTE} exact>
        <Cards type="allcards" />
      </Route>
      <Route path={allPaths.DEFAULT_ROUTE} exact>
        <Cards type="allcards" />
      </Route>
    </Switch>
  );
};

export default Routes;
