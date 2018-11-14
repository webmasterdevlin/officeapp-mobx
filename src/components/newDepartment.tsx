import * as React from "react";
import Form from "./common/form";
import * as departmentService from "../services/department.service";
import NavBar from "./navBar";
import { inject, observer } from "mobx-react";
import { FormProps } from "./../components/common/form";
import { DepartmentModel } from "../models/department.model";

import departmentStore from "../stores/department.store";
import { History } from "history";

export interface NewDepartmentProps {
  departmentStore: typeof departmentStore;
  history: History;
}

class NewDepartment extends Form<NewDepartmentProps & FormProps, any> {
  nameRef = React.createRef();
  descriptionRef = React.createRef();
  headRef = React.createRef();
  codeRef = React.createRef();

  state = {
    data: {
      name: "",
      description: "",
      head: "",
      code: ""
    }
  };

  handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    await departmentStore.addDepartment(this.state.data as DepartmentModel);
    this.props.history.replace("/");
  };

  handleChange = ({
    currentTarget: input
  }: React.FormEvent<HTMLSelectElement>) => {
    const department: any = { ...this.state.data };
    department[input.name] = input.value;
    console.log(this.props);
    this.setState({ data: department });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar />
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
            {this.renderButton(
              "Save",
              "btn btn-success btn-lg btn-block my-4",
              "submit"
            )}
          </form>
        </div>
      </React.Fragment>
    );
  }
}
export default inject("departmentStore")(observer(NewDepartment));
