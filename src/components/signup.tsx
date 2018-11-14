import * as React from "react";
import { signup } from "../services/user.service";
import { inject, observer } from "mobx-react";
import departmentStore from "../stores/department.store";

export interface SignupProps {
  departmentStore: typeof departmentStore;
  renderInput: any;
  history: any;
}

class Signup extends React.Component<SignupProps, any> {
  renderInput: any = {};
  renderButton: any = {};

  onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    signup(this.state.data);
    window.location.href = "/login";
  };

  handleChange = ({ currentTarget }: React.FormEvent<HTMLSelectElement>) => {
    const user = { ...this.state.data };
    const { name, value } = currentTarget;
    user[name] = value;
    console.log("SETTING STATE:", user);
    // this.setState({ data: user });
  };

  public render() {
    return (
      <React.Fragment>
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
                        onSubmit={this.onSubmit}
                      >
                        {this.renderInput("username", "Username")}
                        {this.renderInput("email", "Email", "email")}
                        {this.renderInput("password", "Password", "password")}
                        {this.renderInput(
                          "confirmPassword",
                          "Confirm Password"
                        )}

                        <div className="form-group">
                          {this.renderButton(
                            "Register",
                            "mr-1 btn btn-success btn-lg float-right",
                            "submit"
                          )}
                          {this.renderButton(
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
      </React.Fragment>
    );
  }
}
export default inject("departmentStore")(observer(Signup));
