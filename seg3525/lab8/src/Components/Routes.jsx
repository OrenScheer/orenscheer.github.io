import { Route, Switch } from "react-router-dom";
import NotFound from "../Pages/NotFound";
import Home from "../Pages/Home";
import FlightResults from "../Pages/FlightResults";
import BookFlight from "../Pages/BookFlight";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/flights">
        <FlightResults />
      </Route>
      <Route path="/bookflight">
        <BookFlight />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
};

export default Routes;
