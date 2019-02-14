import * as React from "react";
import { History } from "history";

import Form from "./common/form";
import NavBar from "./navBar";
import Spinner from "./spinner";
import { inject, observer } from "mobx-react";
import { FormProps } from "./common/form";
import { routeCanActivate } from "../services/auth.service";

import departmentStore from "../stores/department.store";
import userStore from "../stores/user.store";

export interface Props {
  departmentStore: typeof departmentStore;
  userStore: typeof userStore;
  history: History;
  match: any;
}

export interface State {
  data: {
    id: string;
    name: string;
    description: string;
    head: string;
    code: string;
  };
}

class EditDepartment extends Form<Props & FormProps, State> {
  state = {
    data: {
      id: "",
      name: "",
      description: "",
      head: "",
      code: ""
    }
  };

  async componentDidMount() {
    if (!routeCanActivate()) this.props.history.replace("/");

    this._loadDepartment();
  }

  handleOnChange = ({ currentTarget }: React.FormEvent<HTMLSelectElement>) => {
    this._onChange(currentTarget);
  };

  handleOnUpdate = async () => {
    if (!routeCanActivate()) this.props.history.replace("/");
    this._onUpdate();
  };

  handleOnDelete = async () => {
    if (!routeCanActivate()) this.props.history.replace("/");
    this._onDelete();
  };

  _loadDepartment = async () => {
    await departmentStore.loadDepartment(this.props.match.params.id);
    this.setState({ data: departmentStore.department });
  };

  _onChange = (currentTarget: any) => {
    const { name, value } = currentTarget;
    this.setState({
      data: {
        ...this.state.data,
        [name]: value
      }
    });
  };

  _onUpdate = async () => {
    await departmentStore.updateDepartment(this.state.data);
    this.props.history.goBack();
  };

  _onDelete = async () => {
    await departmentStore.removeDepartment(this.state.data.id);
    this.props.history.goBack();
  };

  render() {
    return (
      <>
        <NavBar name={userStore.user.username} />
        <h2 className="text-center m-4">Edit Details</h2>
        {this.state.data["name"] ? (
          <div className="container py-5">
            <div className="form-row">
              <div className="form-group col-md-6">
                {this.renderInput("name", "Name")}
              </div>
              <div className="form-group col-md-6">
                {this.renderInput("description", "Description")}
              </div>
              <div className="form-group col-md-6">
                {this.renderInput("head", "Head")}
              </div>
              <div className="form-group col-md-6">
                {this.renderInput("code", "Code")}
              </div>
            </div>
            <div className="container">
              <div className="row">
                {Form.renderButton(
                  "Update",
                  "btn btn-warning col m-2",
                  "button",
                  this.handleOnUpdate
                )}
                {Form.renderButton(
                  "Delete",
                  "btn btn-outline-danger col m-2",
                  "button",
                  this.handleOnDelete
                )}
              </div>
            </div>
            <div className="text-center">
              <strong>Values to be sent: </strong>
              <span>{JSON.stringify(this.state.data)}</span>
            </div>
          </div>
        ) : (
          <div className="row h-100 justify-content-center align-items-center">
            <Spinner />
          </div>
        )}
      </>
    );
  }
}

export default inject("departmentStore", "userStore")(observer(EditDepartment));
