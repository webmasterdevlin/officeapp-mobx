import * as React from "react";
import { Link } from "react-router-dom";
import Form from "./common/form";
import "../styles/login.scss";
import auth from "../services/auth.service";
import { inject, observer } from "mobx-react";
import { History } from "history";

export interface LogoutProps {}

class Logout extends React.Component<LogoutProps, any> {
  componentDidMount() {
    auth.logOut();
  }
  render() {
    return null;
  }
}

export default inject("departmentStore")(observer(Logout));
