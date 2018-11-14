import http from "./http.service";
import { Endpoints } from "../helpers/constants";
import { getJwt } from "./auth.service";
import { LoginModel } from "../models/login.model";
import { UserModel } from "../models/user.model";

http.setJwt(getJwt());

export async function signin(loginModel: LoginModel) {
  console.log("HTTP SERVICE");
  return await http.post(Endpoints.loginUrl, loginModel);
}

export async function signup(user: UserModel) {
  return await http.post(Endpoints.registerUrl, user);
}
