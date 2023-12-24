import { document } from "postcss";
import React, { useContext, useState } from "react";
import {Link, useNavigate, useLocation} from 'react-router-dom'
import { Context } from "../store/appContext";
import Swal from 'sweetalert2';



export const CreatePost = () => {
    const { store, actions } = useContext(Context);
    
    const location = useLocation()
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    imagen: "",
    pdf: "",
    postear_a: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const selectedFile = files[0];

    if (name === "imagen" && !selectedFile.type.startsWith("image/")) {
      Swal.fire({
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
        icon: 'error',
        title: 'Error al subir archivo',
        text: 'Por favor, seleccione un archivo de imagen válido.',
        customClass: "swal-small"
      });
      // Limpiar el campo de imagen
      e.target.value = null;
      return;
    }
    if (name === "pdf" && selectedFile.type.startsWith("image/")) {
        Swal.fire({
            position: "top-end",
            showConfirmButton: false,
            timer: 1500,
            icon: 'error',
            title: 'Error al subir archivo',
            text: 'Por favor, seleccione un archivo texto válido.',
            customClass: "swal-small"
          });
          // Limpiar el campo de pdf
          e.target.value = null;
          return;
        }
    
    setFormData({
      ...formData,
      [name]: selectedFile,
    });
  };

  const handleDropdownChange = (value) => {
    setFormData({
      ...formData,
      postear_a: value,
    });
  };

  const handleLimpiar = () => {
    setFormData({
      titulo: "",
      descripcion: "",
      imagen: "",
      pdf: "",
      postear_a: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos al backend o realizar las acciones necesarias
    console.log("Datos del formulario:", formData);
    Swal.fire({
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
        icon: 'success',
        title: 'Post Creado',
        text: 'El Post fue creado exitosamente',
        customClass: "swal-small"
      });
    // Restablecer el formulario después de enviar los datos
    handleLimpiar();
    setTimeout( () => {
        window.location.reload();
      }, 2000);
    
 
    
  };

  return (
    <div className="container mb-5 mt-5">
      <div className="row">
        <div className="col-12 mb-3 text-start">
          <h2 className="text-3xl md:text-6xl font-bold text-dark-black dark:text-principal-white big-text">
            Crear nuevo <span className="text-color-primary">Post </span>📑
          </h2>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="container mt-4 rounded-2xl border-5  shadow-2xl border-[#F9FCFD] bg-[#F9FCFD] p-5 ">
          <div className="container  whitespace-normal md:whitespace-pre">
            <div className="mb-3">
              <label htmlFor="titulo" className="form-label text-dark-black font-bold">
                Título:
              </label>
              <input
                type="text"
                className="form-control"
                id="titulo"
                name="titulo"
                placeholder="Ingrese el título"
                value={formData.titulo}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="descripcion" className="form-label text-dark-black font-bold">
                Descripción:
              </label>
              <textarea
                className="form-control"
                id="descripcion"
                name="descripcion"
                rows="3"
                placeholder="Ingrese la descripción"
                value={formData.descripcion}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="imagen" className="form-label text-dark-black font-bold">
                Añadir imágenes:
              </label>
              <input
                className="form-control"
                type="file"
                id="imagen"
                name="imagen"
                onChange={handleFileChange}
                
              />
            </div>
            <div className="mb-3 ">
              <label htmlFor="pdf" className="form-label text-dark-black font-bold">
                Añadir PDF:
              </label>
              <input
                className="form-control "
                type="file"
                id="pdf"
                name="pdf"
                onChange={handleFileChange}
              />
            </div>
            <div className="mb-3 d-flex  justify-between ">
              <label htmlFor="postear_a" className="form-label text-dark-black font-bold">
                Postear a:
              </label>
              <div className="dropdown">
                <button
                  className="btn text-principal-white bg-dark-black border-dark-black hover:text-dark-black hover:border-dark-black"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {formData.postear_a ? formData.postear_a : "Seleccionar"}
                </button>
                <ul className="dropdown-menu mt-2 bg-principal-white">
                  <li>
                    <button
                      className="dropdown-item font-light text-dark"
                      type="button"
                      onClick={() => handleDropdownChange("Maestros")}
                    >
                      Maestros
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item font-light text-dark"
                      type="button"
                      onClick={() => handleDropdownChange("Estudiantes")}
                    >
                      Estudiantes
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item font-light text-dark"
                      type="button"
                      onClick={() => handleDropdownChange("Padres")}
                    >
                      Padres
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item font-light text-dark"
                      type="button"
                      onClick={() => handleDropdownChange("Todos")}
                    >
                      Todos
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mb-3 mt-5 d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-outline-dark mx-3"
                onClick={handleLimpiar}
              >
                Limpiar
              </button>
              <button
                type="submit"
                className="border border-dark-black btn bg-dark-black text-principal-white hover:text-dark-black hover:border-dark-black hover:border hover:bg-principal-white"
              >
                Crear Post
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
