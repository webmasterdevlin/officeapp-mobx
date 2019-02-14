import * as React from "react";
import { NavLink, Link } from "react-router-dom";
import { History } from "history";
import departmentStore from "../stores/department.store";
import userStore from "../stores/user.store";
import { inject, observer } from "mobx-react";

import NavBar from "./navBar";
import Spinner from "./spinner";

import "../styles/home.scss";
import { routeCanActivate } from "../services/auth.service";

export interface Props {
  departmentStore: typeof departmentStore;
  userStore: typeof userStore;
  history: History;
}

class Home extends React.Component<Props> {
  async componentDidMount() {
    if (!routeCanActivate()) this.props.history.replace("/");

    this._loadDepartments();
  }

  _loadDepartments = async () => {
    try {
      await departmentStore.loadDepartments();
    } catch (e) {
      alert(`Something happened: ${e.message}`);
    }
  };

  public render() {
    const { departments } = departmentStore;
    return (
      <>
        <NavBar name="Devlin" />
        <table className="table table-dark">
          <thead>
            <tr className="header">
              <th scope="col">#CODE</th>
              <th scope="col">NAME</th>
              <th scope="col">DESCRIPTION</th>
              <th scope="col">HEAD</th>
            </tr>
          </thead>
          <tbody>
            {departments.map(item => (
              <tr key={item.id}>
                <td>
                  <Link className="links" to={`/edit-detail/${item.id}`}>
                    {item.code}
                  </Link>
                </td>
                <td>
                  <Link className="links" to={`/edit-detail/${item.id}`}>
                    {item.name}
                  </Link>
                </td>
                <td>
                  <Link className="links" to={`/edit-detail/${item.id}`}>
                    {item.description}
                  </Link>
                </td>
                <td>
                  <Link className="links" to={`/edit-detail/${item.id}`}>
                    {item.head}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {departments.length ? (
          ""
        ) : (
          <div className="row h-100 justify-content-center align-items-center">
            <Spinner />
          </div>
        )}
        <div className="text-center m-5">
          <NavLink to="/new-department">
            <button className="btn btn-primary btn-lg">Create New</button>
          </NavLink>
        </div>
      </>
    );
  }
}

export default inject("departmentStore", "userStore")(observer(Home));
