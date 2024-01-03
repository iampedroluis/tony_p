import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; 





export const Admin = () => {
  const { store, actions } = useContext(Context);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const usuariosPerPage = 3;
 const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const usuarios = [
    { id: 1, nombre: "Juan", apellido: "Pérez", email: "juan@example.com", role_id: 1 },
    { id: 2, nombre: "María", apellido: "Gómez", email: "maria@example.com", role_id: 2 },
    { id: 3, nombre: "Carlos", apellido: "Martínez", email: "carlos@example.com", role_id: 3 },
    { id: 4, nombre: "Laura", apellido: "López", email: "laura@example.com", role_id: 1 },
    { id: 5, nombre: "Pedro", apellido: "Rodríguez", email: "pedro@example.com", role_id: 2 },
  ];
  
  // Puedes utilizar este array en lugar del array vacío que tenías en tu código.
  

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

  const handleEdit = (user) => {
    setEditUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setEditUser(null);
    setShowModal(false);
  };

  const handleSaveChanges = () => {
    // Lógica para guardar los cambios del usuario editado
    // actions.editUser(editUser); // Asegúrate de tener una función editUser en tu store o actions
    handleCloseModal();
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
                        <button onClick={() => handleEdit(usuario)}>
                  <i className="fa-solid fa-pencil"></i>
                </button> 
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
     
{/* Modal para editar usuario */}
<Modal show={showModal} onHide={handleCloseModal} className="text-center dark">
  <Modal.Header closeButton>
    <Modal.Title>Editar Usuario</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {/* Formulario para editar el usuario */}
    {editUser && (
      <form>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            value={editUser.nombre}
            onChange={(e) => setEditUser({ ...editUser, nombre: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="apellido" className="form-label">
            Apellido
          </label>
          <input
            type="text"
            className="form-control"
            id="apellido"
            value={editUser.apellido}
            onChange={(e) => setEditUser({ ...editUser, apellido: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Correo Electrónico
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={editUser.email}
            onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
          />
        </div>
        {/* Agregar campos adicionales para editar (Apellido, email, etc.) */}
      </form>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseModal}>
      Cerrar
    </Button>
    <Button variant="primary" onClick={handleSaveChanges}>
      Guardar Cambios
    </Button>
  </Modal.Footer>
</Modal>

     
      

    </div>
  );
};

export default Admin;
