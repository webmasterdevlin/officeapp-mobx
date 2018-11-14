import * as React from "react";
import Form from "./common/form";
import * as departmentService from "../services/department.service";
import NavBar from "./navBar";
import Spinner from "./spinner";
import { inject, observer } from "mobx-react";
import { FormProps } from "./../components/common/form";
import departmentStore from "../stores/department.store";
import { DepartmentModel } from "../models/department.model";

export interface EditDepartmentProps {
  departmentStore: typeof departmentStore;
  history: any;
  match: any;
}

export interface DeptState {
  data: {
    id: string;
    name: string;
    description: string;
    head: string;
    code: string;
  };
}

class EditDepartment extends Form<EditDepartmentProps & FormProps, DeptState> {
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
    await departmentStore.findDepartment(this.props.match.params.id);
    this.setState({ data: departmentStore.department });
    console.log("IS:", departmentStore.department);
  }

  handleChange = ({ currentTarget }: React.FormEvent<HTMLSelectElement>) => {
    const { name, value } = currentTarget;
    this.setState({
      data: {
        ...this.state.data,
        [name]: value
      }
    });
  };

  onDelete = async () => {
    // Sample of optimistic update but not actually helpful here.
    this.props.history.replace("/");
    try {
      departmentStore.removeDepartment(this.state.data.id);
    } catch (e) {
      if (e.response && e.response.status === 404)
        alert("This department has already been deleted.");

      this.props.history.goBack();
    }
  };

  onUpdate = async () => {
    this.props.history.goBack();
    try {
      await departmentService.putDepartment(this.state.data);
    } catch (e) {
      if (e.response && e.response.status === 500)
        alert("Something happened. Please retry.");

      this.props.history.goBack();
    }
  };

  render() {
    return (
      <React.Fragment>
        <NavBar />
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
                {this.renderButton(
                  "Update",
                  "btn btn-warning col m-2",
                  "button",
                  this.onUpdate
                )}
                {this.renderButton(
                  "Delete",
                  "btn btn-danger col m-2",
                  "button",
                  this.onDelete
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
      </React.Fragment>
    );
  }
}

export default inject("departmentStore")(observer(EditDepartment));
