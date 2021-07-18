import { Route, Switch } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import FlightResults from "../pages/FlightResults";
import Book from "../pages/Book";
import Destinations from "../pages/Destinations";
import DestinationDetails from "../pages/DestinationDetails";
import Bookings from "../pages/Bookings";
import BookingDetails from "../pages/BookingDetails";

const Routes = ({ language }) => {
  return (
    <Switch>
      <Route exact path="/">
        <Home language={language} />
      </Route>
      <Route path="/flights">
        <FlightResults language={language} />
      </Route>
      <Route path="/book">
        <Book language={language} />
      </Route>
      <Route path="/destinations">
        <Destinations language={language} />
      </Route>
      <Route path="/destination/:place">
        <DestinationDetails language={language} />
      </Route>
      <Route path="/bookings">
        <Bookings language={language} />
      </Route>
      <Route path="/booking/:id">
        <BookingDetails language={language} />
      </Route>
      <Route path={["*", "/notfound"]}>
        <NotFound language={language} />
      </Route>
    </Switch>
  );
};

export default Routes;
