import * as React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../services/auth.service";

const ProtectedRoute = ({
  path,
  component: Component,
  render,
  ...rest
}: any): React.FunctionComponentElement<string> => {
  return (
    <Route
      {...rest}
      render={props => {
        const routeCanActivate = auth.routeCanActivate();

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
};
export default ProtectedRoute;
