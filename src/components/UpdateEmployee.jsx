import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

const UpdateEmployee = () => {
  //STATE INICIAL
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    charge: "",
    image: [],
  });

  //CARGO EN EL STATE LA IMAGEN OBTENIDA DEL FORMULARIO
  const [image, setImage] = useState({
    image: {},
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    console.log(e.target.value);
    setValues({
      ...values,
      [name]: value,
    });
  };

  const { id } = useParams();
  const navigate = useNavigate();

  //pido los datos a la API
  useEffect(() => {
    EmployeeService.getEmployeeById(id)
      .then((response) => {
        console.log(response.data);
        setValues(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleImage = (e) => {
    var image = e.target.files[0];
    console.log(image);
    setImage(image);
  };

  const json = JSON.stringify(values);
  const blob = new Blob([json], {
    type: "application/json",
  });

  //funcion para guardar el empleado
  const updateEmployee = (e) => {
    e.preventDefault();
    if (id) {
      const formDataEmployee = new FormData();
      formDataEmployee.append("employee", blob);
      formDataEmployee.append("image", image);
      EmployeeService.updateEmployee(id, formDataEmployee)
        .then(() => {
          navigate("/employees");
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
                    value={values.firstName}
                    onChange={handleInput}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Last Name:</label>
                  <input
                    type="text"
                    placeholder="Enter last name"
                    name="lastName"
                    className="form-control"
                    value={values.lastName}
                    onChange={handleInput}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">email:</label>
                  <input
                    type="text"
                    placeholder="Enter first name"
                    name="email"
                    className="form-control"
                    value={values.email}
                    onChange={handleInput}
                  ></input>

                  <div className="form-group mb-2">
                    <label className="form-label">image</label>
                    <input
                      type="file"
                      placeholder="Select image"
                      name="image"
                      className="form-control"
                      onChange={handleImage}
                    ></input>
                  </div>
                </div>
                <button
                  className="btn btn-success"
                  onClick={(e) => updateEmployee(e)}
                >
                  Update Employee
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
