import { LoginModel } from "../models/login.model";
import { decorate, action, observable } from "mobx";
import { RegisterModel } from "../models/register.model";
import auth from "../services/auth.service";
import { UserModel } from "../models/user.model";
import { getUser } from "../services/user.service";

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

  retrieveUser = async (id: string) => {
    const { data } = await getUser(id);
    this.user = data;
  };
}

decorate(UserStore, {
  login: action,
  register: action,
  user: observable
});

const userStore = new UserStore();
export default userStore;
