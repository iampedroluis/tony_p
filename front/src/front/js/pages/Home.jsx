import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import Postimg from "../../img/posts-img.png";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const [loginError , setLoginError] = useState(null)
    const [errMsg, setErrMsg] = useState("")
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
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
                
                setLoginError(true);
                setErrMsg(`El campo ${key} no puede estar vacío.`);
            
                return;
            }
        }
        if (!validateEmail(formData.email)) {
            setLoginError(true);
            setErrMsg("Por favor, introduce un correo electrónico válido.");
            return;
        }
       
        // Enviar datos al backend o realizar acciones necesarias
        actions.login(formData);

        // Limpiar el formulario después del registro exitoso
        setFormData({
            
            email: "",
            password: ""
           
        });
        setLoginError(false);
        
    };

    return (
        <div className="container mt-5 bg-gray-100 dark:bg-gray-900 shadow-md p-4 rounded">
            <div className="row">
                <div className="col-12 mb-3 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white big-text">NexConnect</h2>
                </div>
                <div className="col-md-6 mb-3">
                    <img src={Postimg} alt="Posts" className="w-100 h-auto" />
                </div>
                <div className="col-md-6 mt-5">
                    <div className="form registro bg-white dark:bg-gray-700 p-4 rounded border shadow p-3 mb-5 bg-body-tertiary rounded">
                        <div className="mb-3">
                            
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
                            
                            <div className="text-center">
                                <button type="button" className="btn btn-outline-dark" onClick={handleSubmit}>
                                    Iniciar Sesion
                                </button>
                                {loginError ? (
                    <div>
                        <p className="p-alerta border-bottom border-danger mt-3" style={{ color: "red" }}>{errMsg}</p>
                    </div>
                ) : (<div>

                </div>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
