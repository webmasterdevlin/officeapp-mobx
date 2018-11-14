import React from "react";
import { NavLink, Link } from "react-router-dom";

import NavBar from "./navBar";
import "../styles/home.scss";

import departmentStore from "../stores/department.store";
import { inject, observer } from "mobx-react";
import Spinner from "./spinner";

export interface HomeProps {
  departmentStore: typeof departmentStore;
}

class Home extends React.Component<HomeProps, any> {
  async componentDidMount() {
    const { departmentStore } = this.props;
    console.log("DEPARTMENTS:", departmentStore);
    departmentStore.loadDepartments();
  }

  public render() {
    const { departments } = departmentStore;

    return (
      <React.Fragment>
        <NavBar />
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
          <NavLink
            type="button"
            className="btn btn-primary btn-lg"
            to="/new-department"
          >
            Create New
          </NavLink>
        </div>
      </React.Fragment>
    );
  }
}

export default inject("departmentStore", "userStore")(observer(Home));
