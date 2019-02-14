import * as React from "react";
import { inject, observer } from "mobx-react";
import { RegisterModel } from "../models/register.model";

import departmentStore from "../stores/department.store";
import userStore from "../stores/user.store";
import Form, { FormProps } from "./common/form";

export interface Props {
  renderInput: any;
  history: any;
}

export interface State {
  data: {
    username: string;
    email: string;
    password: string;
  };
}

class Signup extends Form<Props & FormProps, State> {
  state = {
    data: {
      username: "",
      email: "",
      password: ""
    } as RegisterModel
  };

  renderButton: any = () => {};

  handleOnSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    this._sendRegistration();
  };

  _sendRegistration = async () => {
    try {
      await userStore.register(this.state.data);
      window.location.href = "/login";
    } catch (e) {
      alert(`Something happened: ${e.message}`);
    }
  };

  handleOnChange = ({ currentTarget }: React.FormEvent<HTMLSelectElement>) => {
    this._formToRegisterModel(currentTarget);
  };

  _formToRegisterModel = (currentTarget: any) => {
    const user = { ...this.state.data };
    const { name, value } = currentTarget;
    user[name] = value;
    this.setState({ data: user });
  };

  public render() {
    return (
      <>
        <div className="login-signup-bg">
          <div className="container py-5">
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-6 mx-auto">
                    <div className="card border-secondary opaq">
                      <div className="card-header">
                        <h3 className="mb-0 my-2">Sign up Page</h3>
                      </div>
                      <form
                        className="card-body form-group"
                        onSubmit={this.handleOnSubmit}
                      >
                        {this.renderInput("username", "Username")}
                        {this.renderInput("email", "Email", "email")}
                        {this.renderInput("password", "Password", "password")}
                        {this.renderInput(
                          "confirmPassword",
                          "Confirm Password"
                        )}

                        <div className="form-group">
                          {Form.renderButton(
                            "Register",
                            "mr-1 btn btn-success btn-lg float-right",
                            "submit"
                          )}
                          {Form.renderButton(
                            "Cancel",
                            "mr-1 btn btn-default btn-lg float-right",
                            "button",
                            () => this.props.history.goBack()
                          )}
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center outside-form">
            <strong>Values to be sent: </strong>
            <span>{JSON.stringify(this.state.data)}</span>
          </div>
        </div>
      </>
    );
  }
}
export default inject("departmentStore", "userStore")(observer(Signup));
