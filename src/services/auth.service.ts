import { signin } from "./user.service";
import jwtDecode from "jwt-decode";
import { LoginModel } from "../models/login.model";

const key = "token";

export async function login(user: LoginModel) {
  console.log("AUTH SERVICE");
  const { data: jwt } = await signin(user);
  localStorage.setItem("token", jwt.token);
}

export function logOut() {
  localStorage.removeItem("token");
  window.location.href = "/login";
  console.log("logged out");
}

export function getJwt(): string {
  return localStorage.getItem(key) as string;
}

export function RouteCanActivate() {
  const token = localStorage.getItem(key);
  if (!token) return false;
  console.log("token:", token);
  const decoded: any = jwtDecode(token);
  const expiresAt = decoded.exp * 1000;
  const dateNow = Date.now();
  const isTokenExpired = dateNow > expiresAt;
  console.log("dateNow:", dateNow);
  console.log("expiresAt:", expiresAt);
  console.log("isTokenExpired:", isTokenExpired);

  if (isTokenExpired) {
    return false;
  }
  if (!isTokenExpired) {
    return true;
  }
}

export default {
  login,
  logOut,
  routeCanActivate: RouteCanActivate
};
