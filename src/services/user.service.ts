import http from "./http.service";
import { BaseUrl } from "../helpers/constants";
import { getJwt } from "./auth.service";
import { LoginModel } from "../models/login.model";
import { RegisterModel } from "../models/register.model";
import { authBearerHeaders } from "../helpers/httpHeaders";

http.setJwt(getJwt());

export async function postLogin(loginModel: LoginModel): Promise<any> {
  return await http.post(BaseUrl.login, loginModel);
}

export async function postRegister(registerModel: RegisterModel): Promise<any> {
  return await http.post(BaseUrl.register, registerModel);
}

export async function getUser(id: string) {
  return await http.get(`${BaseUrl.user}${id}`, authBearerHeaders);
}
