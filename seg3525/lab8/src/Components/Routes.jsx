import { Route, Switch } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import FlightResults from "../pages/FlightResults";
import BookFlight from "../pages/BookFlight";
import Destinations from "../pages/Destinations";
import DestinationDetails from "../pages/DestinationDetails";
import Bookings from "../pages/Bookings";

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
      <Route path="/destinations">
        <Destinations />
      </Route>
      <Route path="/destination/:place">
        <DestinationDetails />
      </Route>
      <Route path="/bookings">
        <Bookings />
      </Route>
      <Route path={["*", "/notfound"]}>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default Routes;
