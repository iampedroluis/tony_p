import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ReactPaginate from "react-paginate";

export const Admin = () => {
  const { store, actions } = useContext(Context);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const usuariosPerPage = 3;

 const usuarios = [
    {
      "id": 1,
      "nombre": "John",
      "apellido": "Doe",
      "email": "john.doe@example.com",
      "contraseña": "password123",
      "role_id": 1
    },
    {
      "id": 2,
      "nombre": "Jane",
      "apellido": "Smith",
      "email": "jane.smith@example.com",
      "contraseña": "securepass",
      "role_id": 2
    },
    {
      "id": 3,
      "nombre": "Alice",
      "apellido": "Johnson",
      "email": "alice.johnson@example.com",
      "contraseña": "mysecret",
      "role_id": 3
    },
    {
      "id": 4,
      "nombre": "Bob",
      "apellido": "Williams",
      "email": "bob.williams@example.com",
      "contraseña": "pass123",
      "role_id": 1
    },
    {
      "id": 5,
      "nombre": "Eva",
      "apellido": "Brown",
      "email": "eva.brown@example.com",
      "contraseña": "evapass",
      "role_id": 2
    },
    {
      "id": 6,
      "nombre": "Carlos",
      "apellido": "González",
      "email": "carlos.gonzalez@example.com",
      "contraseña": "carlospass",
      "role_id": 3
    },
    {
      "id": 7,
      "nombre": "Maria",
      "apellido": "López",
      "email": "maria.lopez@example.com",
      "contraseña": "marialove",
      "role_id": 1
    },
    {
      "id": 8,
      "nombre": "Juan",
      "apellido": "Perez",
      "email": "juan.perez@example.com",
      "contraseña": "juan123",
      "role_id": 2
    },
    {
      "id": 9,
      "nombre": "Laura",
      "apellido": "Ramirez",
      "email": "laura.ramirez@example.com",
      "contraseña": "laurapass",
      "role_id": 3
    },
    {
      "id": 10,
      "nombre": "Pedro",
      "apellido": "García",
      "email": "pedro.garcia@example.com",
      "contraseña": "pedropass",
      "role_id": 1
    },
    {
      "id": 11,
      "nombre": "Sofía",
      "apellido": "Martínez",
      "email": "sofia.martinez@example.com",
      "contraseña": "sofiapass",
      "role_id": 2
    }
  ]
  ;
  

  const offset = currentPage * usuariosPerPage;
  const filteredUsuarios = usuarios.filter(
    (usuario) =>
      usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentUsuarios = filteredUsuarios.slice(offset, offset + usuariosPerPage);

  const pageCount = Math.ceil(filteredUsuarios.length / usuariosPerPage);

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  const [hoveredUserId, setHoveredUserId] = useState(null);

  const getRoleColor = (roleId) => {
    switch (roleId) {
      case 1:
        return "maestro";
      case 2:
        return "alumno";
      case 3:
        return "padre";
      default:
        return "otro";
    }
  };

  return (
    <div className="container h-screen mt-5">
      <div className="row">
        <div className="col-12 mb-3 text-start">
          <h2 className="text-3xl md:text-6xl font-bold text-start text-dark-black dark:text-principal-white big-text">
            Administración 🗃️
          </h2>
        </div>
        <div className="container d-flex justify-content-center">
          <div className="mt-5 d-flex align-items-center justify-content-between w-50">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Buscar usuario"
              aria-label="Buscar usuario"
              value={searchTerm}
              onChange={(e) => {
                setCurrentPage(0);
                setSearchTerm(e.target.value.trim());
              }}
            />
            
          </div>
        </div>

        <div className="col-md-12 mt-5">
          <div className="form registro dark:bg-gray-700 p-4 rounded border shadow p-3 mb-5 bg-body-tertiary rounded">
            <table className="table table-borderless bg-transparent table-hover ">
              <thead>
                <tr className="bg-transparent">
                  <th className="bg-transparent" scope="col">
                    Nombre
                  </th>
                  <th className="bg-transparent" scope="col">
                    Apellido
                  </th>
                  <th className="bg-transparent" scope="col">
                    Email
                  </th>
                  <th className="bg-transparent" scope="col">
                    Rol
                  </th>
                  <th className="bg-transparent" scope="col">
                    <p className="text-white">edit</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentUsuarios.map((usuario) => (
                  <tr
                    key={usuario.id}
                    className={`bg-transparent ${
                      hoveredUserId === usuario.id ? "hover:bg-gray-200" : ""
                    }`}
                    onMouseEnter={() => setHoveredUserId(usuario.id)}
                    onMouseLeave={() => setHoveredUserId(null)}
                  >
                    <td className="bg-transparent" scope="row">
                      {usuario.nombre}
                    </td>
                    <td className="bg-transparent">{usuario.apellido}</td>
                    <td className="bg-transparent">
                      <p className="inline-block">{usuario.email}</p>
                    </td>
                    <td className="bg-transparent">
                      <p
                        className={`text-white font-black inline-block rounded px-2 text-center capitalize ${
                          usuario.role_id === 1
                            ? "bg-maestro"
                            : usuario.role_id === 2
                            ? "bg-alumno"
                            : usuario.role_id === 3
                            ? "bg-padre"
                            : "bg-otro"
                        }`}
                      >
                        {getRoleColor(usuario.role_id)}
                      </p>
                    </td>
                    <td className="bg-transparent">
                      {hoveredUserId === usuario.id && (
                        <i className="fa-solid fa-pencil"></i>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="d-flex justify-center mt-5">

            <ReactPaginate 
  previousLabel={"Anterior"}
  nextLabel={"Siguiente"}
  breakLabel={"..."}
  breakClassName={"break-me"}
  pageCount={pageCount}
  marginPagesDisplayed={2}
  pageRangeDisplayed={5}
  onPageChange={handlePageClick}
  containerClassName={"pagination"}
  activeClassName={"active"}  // Clase para la página activa
  pageClassName={"custom-page-class"}  // Clase para las páginas
  previousClassName={"custom-previous-class"}  // Clase para "Anterior"
  nextClassName={"custom-next-class"}  // Clase para "Siguiente"
/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
