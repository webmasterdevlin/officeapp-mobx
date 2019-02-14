import * as React from "react";
import "../styles/login.scss";
import { inject, observer } from "mobx-react";
import userStore from "../stores/user.store";

export interface Props {
  userStore: typeof userStore;
}

class Logout extends React.Component<Props> {
  componentDidMount() {
    const { userStore } = this.props;
    userStore.logout();
  }
  render() {
    return null;
  }
}

export default inject("departmentStore", "userStore")(observer(Logout));
