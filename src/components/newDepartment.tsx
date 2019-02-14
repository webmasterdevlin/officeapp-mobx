import * as React from "react";
import Form from "./common/form";
import NavBar from "./navBar";
import { inject, observer } from "mobx-react";
import { FormProps } from "./common/form";
import { DepartmentModel } from "../models/department.model";
import { History } from "history";
import { routeCanActivate } from "../services/auth.service";

import departmentStore from "../stores/department.store";
import userStore from "../stores/user.store";

export interface Props {
  departmentStore: typeof departmentStore;
  userStore: typeof userStore;
  history: History;
}

export interface State {
  data: {
    name: string;
    description: string;
    head: string;
    code: string;
  };
}

class NewDepartment extends Form<Props & FormProps, State> {
  state = {
    data: {
      name: "",
      description: "",
      head: "",
      code: ""
    }
  };

  handleOnChange = ({
    currentTarget: input
  }: React.FormEvent<HTMLSelectElement>) => {
    this._formToDepartmentModel(input);
  };

  handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!routeCanActivate()) this.props.history.replace("/");
    this._saveDepartment();
  };

  _formToDepartmentModel = (input: any) => {
    const department: any = { ...this.state.data };
    department[input.name] = input.value;
    this.setState({ data: department });
  };

  _saveDepartment = async () => {
    await departmentStore.addDepartment(this.state.data as DepartmentModel);
    this.props.history.replace("/");
  };

  render() {
    return (
      <>
        <NavBar name={userStore.user.username} />
        <h2 className="text-center m-4">Add New Department</h2>
        <div className="container py-5">
          <form className="form-row" onSubmit={this.handleSubmit}>
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
            {Form.renderButton(
              "Save",
              "btn btn-success btn-lg btn-block my-4",
              "submit"
            )}
          </form>
        </div>
      </>
    );
  }
}
export default inject("departmentStore", "userStore")(observer(NewDepartment));
