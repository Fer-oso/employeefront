import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

const Image = () => {
  const navigate = useNavigate();

  const [image, setImage] = useState({
    image: {},
  });

  const handleFile = (e) => {
    let image = e.target.files[0];
    console.log(e.target.files[0]);
    setImage(image);
  };

  const formData = new FormData();
  formData.append("image", image);


  const savOrUpdateEmployee = (e) => {
    e.preventDefault();
    EmployeeService.createImage(formData)
      .then((res) => {
        console.log(res.data);
        navigate("/employees");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="container mt-4">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h2 className="text-center">Add Employee</h2>
            <div className="card-body">
              <form onSubmit className="col-md-8">
                <div className="form-group mb-2">
                  <div className="form-group mb-2">
                    <label className="form-label">image</label>
                    <input
                      type="file"
                      placeholder="Select image"
                      name="image"
                      className="form-control"
                      onChange={(e) => {
                        handleFile(e);
                      }}
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
export default Image;
