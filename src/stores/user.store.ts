import { LoginModel } from "../models/login.model";
import { UserModel } from "../models/user.model";
import { signin, signup } from "../services/user.service";
import { decorate, action } from "mobx";

class UserStore {
  async signin(login: LoginModel) {
    await signin(login);
  }

  async signout(user: UserModel) {
    await signup(user);
  }
}

decorate(UserStore, {
  signin: action,
  signout: action
});

const userStore = new UserStore();
export default userStore;
