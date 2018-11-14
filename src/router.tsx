import React from "react";
import { Redirect, Route, Switch } from "react-router";
import NewDepartment from "./components/newDepartment";
import Home from "./components/home";
import EditDepartment from "./components/editDepartment";
import Signup from "./components/signup";
import Login from "./components/login";
import Logout from "./components/logout";
import ProtectedRoute from "./components/common/protectedRoute";
import { Provider } from "mobx-react";
import departmentStore from "./stores/department.store";
import userStore from "./stores/user.store";
import createBrowserHistory from "history/createBrowserHistory";
import { RouterStore, syncHistoryWithStore } from "mobx-react-router";

import moduleName from "module";
const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();
const stores = {
  routing: routingStore,
  departmentStore,
  userStore
};
const history = syncHistoryWithStore(browserHistory, routingStore);

const Router = () => (
  <Provider {...stores}>
    <Switch>
      <Route history={history} path="/home" component={Home} />
      <Route
        history={history}
        path="/new-department"
        component={NewDepartment}
      />
      <Route
        history={history}
        path="/edit-detail/:id"
        component={EditDepartment}
      />
      <Route history={history} path="/signup" component={Signup} />
      <Route history={history} path="/login" component={Login} />
      <Route history={history} path="/logout" component={Logout} />

      <Redirect from="/" exact to="/home" />
      <Redirect from="/edit-detail" exact to="/home" />
    </Switch>
  </Provider>
);

export default Router;
