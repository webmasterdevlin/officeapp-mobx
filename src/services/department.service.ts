import { Endpoints } from "../helpers/constants";
import http from "./http.service";
import { getJwt } from "./auth.service";
import { DepartmentModel } from "../models/department.model";

import {
  authBearerAndContentTypeJsonHeaders,
  authBearerHeaders
} from "../helpers/httpHeaders";

http.setJwt(getJwt());

export async function getDepartments() {
  return await http.get(Endpoints.departmentUrl, authBearerHeaders);
}

export async function postDepartment(department: DepartmentModel) {
  console.log("Dept Service:", department);

  return await http.post(
    Endpoints.departmentUrl,
    JSON.stringify(department),
    authBearerAndContentTypeJsonHeaders
  );
}

export async function getDepartment(id: string) {
  return await http.get(`${Endpoints.departmentUrl}${id}`, authBearerHeaders);
}

export async function putDepartment(department: DepartmentModel) {
  return await http.put(
    `${Endpoints.departmentUrl}${department.id}`,
    department,
    authBearerAndContentTypeJsonHeaders
  );
}

export async function deleteDepartment(id: string) {
  return await http.delete(
    `${Endpoints.departmentUrl}${id}`,
    authBearerHeaders
  );
}
