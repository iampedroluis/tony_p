import React, { useContext } from "react";
import { Context } from "../store/appContext";
import Postimg from "../../img/posts-img.png";

export const Registro = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container mt-5 bg-gray-100 dark:bg-gray-900 shadow-md p-4 rounded">
            <div className="row">
                {/* Columna para el título */}
                <div className="col-12 mb-3 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white big-text">Registrarse</h2>
                </div>

                {/* Columna para la imagen */}
                <div className="col-md-6 mb-3">
                    <img src={Postimg} alt="Posts" className="w-100 h-auto" />
                </div>

                {/* Columna para el formulario */}
                <div className="col-md-6">
                    <div className="form registro bg-white dark:bg-gray-700 p-4 rounded border shadow p-3 mb-5 bg-body-tertiary rounded">
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="Nombre"
                            />
                            <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="Apellido"
                            />
                            <input
                                type="email"
                                className="form-control mb-2"
                                placeholder="tuemail@email.com"
                            />
                            <input
                                type="password"
                                className="form-control mb-2"
                                placeholder="Tu Contraseña"
                            />
                            <input
                                type="password"
                                className="form-control mb-2"
                                placeholder="Repetir Contraseña"
                            />
                            <div className="mb-3">
                                <h6 className="text-dark mt-1">Registrar como: </h6>
                                <div className="d-flex justify-content-around">
                                    <div className="form-check form-check-inline">
                                        <label className="form-check-label text-dark me-2" htmlFor="inlineRadio1">Maestro</label>
                                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <label className="form-check-label text-dark me-2" htmlFor="inlineRadio2">Alumno</label>
                                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                    </div>
                                    <div className="form-check form-check-inline justify-content-end">
                                        <label className="form-check-label text-dark me-2" htmlFor="inlineRadio3">Padre</label>
                                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" />
                                    </div>
                                </div>
                                
                            </div>
                            <div className="text-center">
                                <button type="button" className="btn btn-outline-dark">Registrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
