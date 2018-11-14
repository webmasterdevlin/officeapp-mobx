import * as React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../services/auth.service";

function ProtectedRoute({ path, component: Component, render, ...rest }: any) {
  return (
    <Route
      {...rest}
      render={props => {
        const routeCanActivate = auth.routeCanActivate();

        console.log("routeCanActivate:", routeCanActivate);
        if (!routeCanActivate)
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
}
export default ProtectedRoute;
