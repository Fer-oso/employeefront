import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

const UpdateEmployee = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const employee = { firstName, lastName, email, image };

  let formData = new FormData();

  const savOrUpdateEmployee = (e) => {
    e.preventDefault();
    if (id) {
      EmployeeService.updateEmployee(id, employee)
        .then((response) => {
          navigate("/employees");
        })
        .catch((error) => {
          console.log(error);
        });
  };

  useEffect(() => {
    EmployeeService.getEmployeeById(id)
      .then((response) => {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

 

  };

  return (
    <div>
      <div className="container mt-4">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h2 className="text-center">Update Employee</h2>;
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label">First Name:</label>
                  <input
                    type="text"
                    placeholder="Enter first name"
                    name="firstName"
                    className="form-control"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Last Name:</label>
                  <input
                    type="text"
                    placeholder="Enter last name"
                    name="lastName"
                    className="form-control"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">email:</label>
                  <input
                    type="text"
                    placeholder="Enter first name"
                    name="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>

                  <div className="form-group mb-2">
                    <label className="form-label">image</label>
                    <input
                      type="file"
                      placeholder="Select image"
                      name="image"
                      className="form-control"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                    ></input>
                  </div>
                </div>
                <button
                  className="btn btn-success"
                  onClick={(e) => savOrUpdateEmployee(e)}
                >
                  Save Employee
                </button>
                <Link to="/employees" className="btn btn-danger">
                  Cancel
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UpdateEmployee;
