import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

const AddEmployee = () => {
  const navigate = useNavigate();

  //CARGO EN EL STATE LOS VALORES OBTENIDOS DEL FORMULARIO
  const [values, setValues] = useState({
    firstName: "",
    lsatName: "",
    email: "",
    charge: "",
  });

  //CARGO EN EL STATE LA IMAGEN OBTENIDA DEL FORMULARIO
  const [image, setImage] = useState({
    image:{}
  }
  
  );

  //FUNCIONES PARA PODER OBTENER LOS VALORES DEL FORMULARIO
  const handleInput = (e) => {
    const { name, value } = e.target;
    console.log(e.target.value);
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleImage = (e) => {
    var image = e.target.files[0];
    console.log(image);
    setImage(image);
  };

  //PARA PODER ENVIAR LA INFORMACION A LA API NECESITO TRANSFORMAR LOS VALORES A JSON
  const json = JSON.stringify(values);
  const blob = new Blob([json], {
    type: "application/json",
  });


  /*const jsonImage = JSON.stringify(image);
  const blobImage = new Blob([jsonImage], {
    type: "image/jpg",
  });*/
    

  //FUNCION PARA HACER EL POST
  const crearUsuario = (e) => {
    e.preventDefault();
    //  const formDataImage = new FormData();
    //  formDataImage.append("image", image);
    const formDataEmployee = new FormData();
    formDataEmployee.append("employee", blob);
    formDataEmployee.append("image", image);
    EmployeeService.createEmployee(formDataEmployee)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container align-content-center">
      <form className="col-md-8" encType="multipart/form-data">
        <h1>Formulario Creacion empleado</h1>

        <div className="form-group">
          <label>nombre</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            placeholder="ingrese nombre del usuario"
            onChange={handleInput}
          />
        </div>

        <div className="form-group">
          <label>apellido</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            placeholder="ingrese lastname del usuario"
            onChange={handleInput}
          />
        </div>

        <div className="form-group">
          <label>charger</label>
          <input
            type="text"
            className="form-control"
            name="charge"
            placeholder="ingrese lastname del usuario"
            onChange={handleInput}
          />
        </div>

        <div className="form-group">
          <label>email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="ingrese nombre del usuario"
            onChange={handleInput}
          />
        </div>

        <div className="form-group">
          <label>image</label>
          <input
            type="file"
            className="form-control"
            name="image"
            placeholder="ingrese lastname del usuario"
            onChange={(e) => {
              handleImage(e);
            }}
          />
        </div>
        <button className="btn btn-success" onClick={(e) => crearUsuario(e)}>
          Save Employee
        </button>
        {/*      <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => crearUsuario(e)}
        >
          Registrar
        </button> */}
        <div>
          <Link to="/employees" className="card-link">
            Volver
          </Link>
        </div>
      </form>
    </div>
  );
};
export default AddEmployee;
