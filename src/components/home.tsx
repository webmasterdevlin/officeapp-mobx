import * as React from "react";
import { NavLink, Link } from "react-router-dom";
import { History } from "history";
import jwtDecode from "jwt-decode";
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
    this._loadUser();
  }

  handleOnDelete = async (id: string) => {
    if (!routeCanActivate()) this.props.history.replace("/");

    const response = window.confirm("Are you sure you want to delete this?");
    if (!response) return;

    this._deleteSelectedDepartment(id);
  };

  _loadDepartments = async () => {
    try {
      await departmentStore.loadDepartments();
    } catch (e) {
      alert(`Something happened: ${e.message}`);
    }
  };

  _loadUser = async () => {
    const token: any = localStorage.getItem("token");
    const decoded: any = jwtDecode(token);

    try {
      await userStore.retrieveUser(decoded.sub);
    } catch (e) {
      alert(`Something happened: ${e.message}`);
    }
  };

  _deleteSelectedDepartment = async (id: string) => {
    await departmentStore.removeDepartment(id);
  };

  public render() {
    const { departments } = departmentStore;
    return (
      <>
        <NavBar name={userStore.userModel.username} />
        <table className="table table-dark">
          <thead>
            <tr className="header">
              <th scope="col">#CODE</th>
              <th scope="col">NAME</th>
              <th scope="col">DESCRIPTION</th>
              <th scope="col">HEAD</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            {departments.map(item => (
              <tr key={item.id}>
                <td>{item.code}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.head}</td>
                <td>
                  <Link className="links" to={`/edit-detail/${item.id}`}>
                    <button className="btn btn-info mr-1">Edit</button>
                  </Link>
                  <button
                    onClick={() => this.handleOnDelete(item.id)}
                    className="btn btn-outline-warning ml-1"
                  >
                    Delete
                  </button>
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
