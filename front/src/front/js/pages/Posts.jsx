import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import imagetest from "../../img/imgtest.jpg";

export const Posts = () => {
    return (
        <div className="container mb-5 mt-5 d-flex flex-column align-items-center justify-content-center">
            <div className="col-12 mb-3 text-start">
                <h2 className="text-3xl md:text-6xl font-bold text-dark-black dark:text-principal-white big-text">
                    Hola Fulano 👋 
                </h2>
            </div>
            <div className="card border-5  shadow-2xl border-[#F9FCFD] bg-[#F9FCFD] mt-5 mb-3" style={{ maxWidth: '540px' }}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={imagetest} className="img-fluid rounded-start" alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body  ">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">
                                This is a wider card with supporting text below as a natural lead-in to additional
                                content. This content is a little bit longer.
                            </p>
                            <button type="button" class="btn btn-outline-dark text-start">Download PDF <i className="fa-solid fa-arrow-right"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
