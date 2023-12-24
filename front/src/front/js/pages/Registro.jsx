import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import Postimg from "../../img/posts-img.png";

export const Registro = () => {
    const { store, actions } = useContext(Context);
    const [registroError , setRegistroError] = useState(null)
    const [errMsg, setErrMsg] = useState("")
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        confirmPassword: "",
        rol_id: "" // Nuevo campo para el rol_id
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRadioChange = (e) => {
        // Asignar rol_id según la opción seleccionada
        const roleMappings = {
            maestro: 2,
            alumno: 3,
            padre: 4
        };

        setFormData({
            ...formData,
            rol_id: roleMappings[e.target.value]
        });
    };
    const validateEmail = (email) => {
        // Puedes usar una expresión regular para validar el formato del correo electrónico
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = () => {
        // Validación de campos vacíos
        for (const key in formData) {
            if (formData[key] === "") {
                if (key === "rol_id") {
                    setRegistroError(true);
                    setErrMsg("El campo Registrar como no puede estar vacío.");
                } else {
                    setRegistroError(true);
                    setErrMsg(`El campo ${key} no puede estar vacío.`);
                }
                return;
            }
        }
        if (!validateEmail(formData.email)) {
            setRegistroError(true);
            setErrMsg("Por favor, introduce un correo electrónico válido.");
            return;
        }
        // Validación de contraseñas iguales
        if (formData.password !== formData.confirmPassword) {
            setRegistroError(true);
            setErrMsg("Las contraseñas no coinciden.");
            return;
        }

        // Enviar datos al backend o realizar acciones necesarias
        actions.createUser(formData);

        // Limpiar el formulario después del registro exitoso
        setFormData({
            nombre: "",
            apellido: "",
            email: "",
            password: "",
            confirmPassword: "",
            rol_id: ""
        });
        setRegistroError(false);
        setErrMsg("Registro exitoso");
    };

    return (
        <div className="container mt-5 bg-gray-100 dark:bg-gray-900 shadow-md p-4 rounded">
            <div className="row">
                <div className="col-12 mb-3 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white big-text">Registrarse</h2>
                </div>
                <div className="col-md-6 mb-3">
                    <img src={Postimg} alt="Posts" className="w-100 h-auto" />
                </div>
                <div className="col-md-6">
                    <div className="form registro bg-white dark:bg-gray-700 p-4 rounded border shadow p-3 mb-5 bg-body-tertiary rounded">
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="Nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="Apellido"
                                name="apellido"
                                value={formData.apellido}
                                onChange={handleChange}
                            />
                            <input
                                type="email"
                                className="form-control mb-2"
                                placeholder="tuemail@email.com"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <input
                                type="password"
                                className="form-control mb-2"
                                placeholder="Tu Contraseña"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <input
                                type="password"
                                className="form-control mb-2"
                                placeholder="Repetir Contraseña"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            <div className="mb-3">
                                <h6 className="text-dark mt-1">Registrar como: </h6>
                                <div className="d-flex justify-content-around">
                                    <div className="form-check form-check-inline">
                                        <label className="form-check-label text-dark me-2" htmlFor="maestro">
                                            Maestro
                                        </label>
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="role"
                                            id="maestro"
                                            value="maestro"
                                            onChange={handleRadioChange}
                                        />
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <label className="form-check-label text-dark me-2" htmlFor="alumno">
                                            Alumno
                                        </label>
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="role"
                                            id="alumno"
                                            value="alumno"
                                            onChange={handleRadioChange}
                                        />
                                    </div>
                                    <div className="form-check form-check-inline justify-content-end">
                                        <label className="form-check-label text-dark me-2" htmlFor="padre">
                                            Padre
                                        </label>
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="role"
                                            id="padre"
                                            value="padre"
                                            onChange={handleRadioChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                <button type="button" className="btn btn-outline-dark" onClick={handleSubmit}>
                                    Registrar
                                </button>
                                {registroError ? (
                    <div>
                        <p className="p-alerta border-bottom border-danger mt-3" style={{ color: "red" }}>{errMsg}</p>
                    </div>
                ) : (
                    <div>
                        <p  className="p-alerta  mt-3" style={{ color: "green" }}>{errMsg}</p>
                    </div>
                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
