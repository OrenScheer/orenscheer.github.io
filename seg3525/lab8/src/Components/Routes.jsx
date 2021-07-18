import { Route, Switch } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import FlightResults from "../pages/FlightResults";
import Book from "../pages/Book";
import Destinations from "../pages/Destinations";
import DestinationDetails from "../pages/DestinationDetails";
import Bookings from "../pages/Bookings";
import BookingDetails from "../pages/BookingDetails";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/flights">
        <FlightResults />
      </Route>
      <Route path="/book">
        <Book />
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
      <Route path="/booking/:id">
        <BookingDetails />
      </Route>
      <Route path={["*", "/notfound"]}>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default Routes;
