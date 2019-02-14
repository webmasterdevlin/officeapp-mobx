import { LoginModel } from "../models/login.model";
import { decorate, action, observable } from "mobx";
import { RegisterModel } from "../models/register.model";
import auth from "../services/auth.service";
import { UserModel } from "../models/user.model";

class UserStore {
  user: UserModel = {
    id: "",
    username: "",
    email: ""
  };

  login = async (loginModel: LoginModel) => {
    await auth.login(loginModel);
  };

  logout = () => {
    auth.logOut();
    this.user.id = "";
  };

  register = async (registerModel: RegisterModel) => {
    await auth.register(registerModel);
  };
}

decorate(UserStore, {
  login: action,
  register: action,
  user: observable
});

const userStore = new UserStore();
export default userStore;
