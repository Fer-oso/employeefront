import axios from 'axios';

const EMPLOYEE_BASE_REST_API_URL = 'http://localhost:8080/api/v1/employees';

const IMAGES_BASE_REST_API_URL = "http://localhost:8080/api/v1/images";

class EmployeeService {
  getAllEmployees() {
    return axios.get(EMPLOYEE_BASE_REST_API_URL);
  }

  createEmployee(employee) {
    return axios.post(EMPLOYEE_BASE_REST_API_URL,employee);
  }

  getEmployeeById(employeeId) {
    return axios.get(EMPLOYEE_BASE_REST_API_URL + "/" + employeeId);
  }

  updateEmployee(employeeId, employee) {
    return axios.put(EMPLOYEE_BASE_REST_API_URL + "/" + employeeId, employee);
  }

  deleteEmployee(employeeId) {
    return axios.delete(EMPLOYEE_BASE_REST_API_URL + "/" + employeeId);
  }

  createImage(image) {
    return axios.post(IMAGES_BASE_REST_API_URL, image);
  }
}
export default new EmployeeService();