import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages 
import { Home } from "./pages/Home";
import {Registro } from "./pages/Registro.jsx"
import { Posts } from "./pages/Posts.jsx";
import {CreatePost } from "./pages/CreatePost.jsx"
import {Admin} from "./pages/Admin.jsx"
//Componentes
import { Navbar } from "./component/Navbar";
import { Footer } from "./component/Footer.jsx";

//Contexto
import { Context } from "./store/appContext";
import injectContext from "./store/appContext";



//create your first component
const Layout = () => {
  const { store, actions } = useContext(Context);
  
  const basename = process.env.BASENAME || "";

  return (
    <div >
      <BrowserRouter basename={basename}>
          <Navbar></Navbar>
          <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Registro/>}  path="/registro"/>
          <Route element={<Posts/> } path="/posts"/>
          <Route element={<CreatePost/>} path="/posts/create"/>
          <Route element={<Admin/>} path="/admin"/>
          </Routes>
          <Footer></Footer>
          </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);