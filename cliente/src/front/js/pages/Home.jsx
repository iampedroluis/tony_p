// Home.jsx
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

export const Home = () => {
    const { store, actions } = useContext(Context);
    

    useEffect(() => {
        // Cargar usuarios al montar el componente
    }, []);

    const obtenerUsuarios = async () => {
        
        await actions.getUsuarios();
        
    };

    const usuarios = store.usuarios

    return (
        <div className="container">
            <div className="text-center mt-5">
                <h1 className="bigtext text-line texto">Hola mundo</h1>
                <button className="btn btn-primary" onClick={obtenerUsuarios}>
                    Obtener Usuarios
                </button>
                <div className="mt-3">
                    <h2>Usuarios:</h2>
                    <ul>
                        {usuarios.map((usuario, index) => (
                            <li key={index}>{usuario.nombre}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
