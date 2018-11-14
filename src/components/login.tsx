import * as React from "react";
import { Link } from "react-router-dom";
import Form from "./common/form";
import { FormProps } from "./../components/common/form";
import auth from "../services/auth.service";
import { inject, observer } from "mobx-react";
import departmentStore from "../stores/department.store";
import { History } from "history";
import { LoginModel } from "../models/login.model";
import { UserModel } from "../models/user.model";

export interface LoginProps {
  departmentStore: typeof departmentStore;
  history: History;
}

class Login extends Form<LoginProps & FormProps, any> {
  state = {
    data: {
      email: "",
      password: ""
    }
  };

  onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log("LOGIN");
    await auth.login(this.state.data as LoginModel);
    window.location.href = "/";
  };

  handleChange = ({ currentTarget }: any) => {
    const login: any = { ...this.state.data };
    const { name, value } = currentTarget;
    login[name] = value;

    this.setState({ data: login });
  };

  reset = () => {
    const response = prompt("Enter your email here");
    if (response) {
      alert("Please check your email");
      return;
    }
    alert("Please try again");
  };

  render() {
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
                        <h3 className="mb-0 my-2">Login Page</h3>
                      </div>
                      <form
                        onSubmit={this.onSubmit}
                        className="card-body form-group"
                      >
                        <div className="form-group">
                          {this.renderInput("email", "Email", "email")}
                        </div>
                        <div className="form-group">
                          {this.renderInput("password", "Password", "password")}
                        </div>
                        <div className="form-group">
                          {this.renderButton(
                            "Login",
                            "mr-1 btn btn-success btn-lg float-right",
                            "password"
                          )}
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="outside-form">
            <p className="text-center">
              Forgot your password?{" "}
              <button
                className="link-button"
                type="button"
                onClick={this.reset}
              >
                Reset
              </button>
            </p>
            <p className="text-center">
              Not yet a member?{" "}
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/signup"
              >
                Sign up
              </Link>{" "}
              here.
            </p>
            <div className="text-center">
              <strong>Values to be sent: </strong>
              <span>{JSON.stringify(this.state.data)}</span>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default inject("departmentStore")(observer(Login));
