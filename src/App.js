import { useLocation, Route, Switch, Redirect } from "react-router-dom";
import cn from "classnames";
import {NotificationContainer} from 'react-notifications';

import HomePage from "./routes/Home";
import GamePage from "./routes/Game";
import MenuHeader from "./components/MenuHeader";
import Footer from "./components/Footer";
import AboutPage from "./routes/About";
import NotFound from "./routes/NotFound";
import PrivateRoute from "./components/PrivateRoute";

import { FireBaseContext } from "./context/firebaseContext";
import FirebaseClass from "./service/firebase";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserAsync } from "./store/user";

import 'react-notifications/lib/notifications.css';
import s from "./style.module.css";
import UserPage from "./components/User";

const App = () => {
  const location = useLocation();
  const isPadding = location.pathname === "/" || location.pathname === "/game/board";
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAsync());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <FireBaseContext.Provider value={FirebaseClass}>
      <Switch>
        <Route path="/404" component={NotFound} />
        <Route>
          <>
            <MenuHeader bgActive={!isPadding} />
            <div className={cn(s.wrap, {
              [s.isHomePage]: isPadding
            })}>
              <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/home" component={HomePage} />
                <PrivateRoute path="/game" component={GamePage} />
                <PrivateRoute path="/about" component={AboutPage} />
                <PrivateRoute path="/login" component={UserPage} />
                <Route render={() => (
                  <Redirect to="/404" />
                )} />
              </Switch>
            </div>
            <Footer />
          </>
        </Route>
      </Switch>
      <NotificationContainer />
    </FireBaseContext.Provider>
  );
};

export default App;
