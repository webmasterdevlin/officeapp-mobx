import { DepartmentModel } from "../models/department.model";
import { decorate, observable, action } from "mobx";
import {
  getDepartments,
  getDepartment,
  deleteDepartment,
  postDepartment,
  putDepartment
} from "../services/department.service";

class DepartmentStore {
  departments: DepartmentModel[] = [];
  department: DepartmentModel = {
    id: "",
    name: "",
    description: "",
    head: "",
    code: ""
  };

  loadDepartments = async () => {
    const { data } = await getDepartments();
    this.departments = data;
  };

  loadDepartment = async (id: string) => {
    const { data } = await getDepartment(id);
    this.department = data;
  };

  addDepartment = async (department: DepartmentModel) => {
    await postDepartment(department); // sending post request to the server
    // no need to update UI since we're navigating to back the homepage
  };

  removeDepartment = async (id: string) => {
    await deleteDepartment(id); // sending delete request to the server
    // no need to update UI since we're navigating to back the homepage
  };

  updateDepartment = async (department: DepartmentModel) => {
    await putDepartment(department); // sending put request to the server
    // no need to update UI since we're navigating to back the homepage
  };
}

decorate(DepartmentStore, {
  departments: observable,
  department: observable,
  loadDepartments: action,
  addDepartment: action,
  removeDepartment: action
});

const departmentStore = new DepartmentStore();
export default departmentStore;
