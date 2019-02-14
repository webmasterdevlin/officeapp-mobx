import { postLogin, postRegister } from "./user.service";
import jwtDecode from "jwt-decode";
import { LoginModel } from "../models/login.model";
import { RegisterModel } from "../models/register.model";

export async function login(user: LoginModel): Promise<void> {
  const { data: jwt } = await postLogin(user);
  localStorage.setItem("token", jwt.token);
}

export async function register(registerModel: RegisterModel): Promise<any> {
  await postRegister(registerModel);
}

export function logOut(): void {
  localStorage.removeItem("token");
  window.location.href = "/login";
}

export function getJwt(): string {
  return localStorage.getItem("token") as string;
}

export function routeCanActivate(): boolean {
  const token = localStorage.getItem("token");
  if (!token) return false;
  const decoded: any = jwtDecode(token);
  const expiresAt = decoded.exp * 1000;
  const dateNow = Date.now();
  return dateNow <= expiresAt;
}

export default {
  login,
  register,
  logOut,
  routeCanActivate
};
