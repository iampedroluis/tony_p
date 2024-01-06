import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";


export const Posts = () => {
  const { store, actions } = useContext(Context);
  const [loadedImages, setLoadedImages] = useState(0);
  const [expandedDescription, setExpandedDescription] = useState([]);
  const [posts, setPosts] = useState([])

useEffect(() => {
  const fetchData = async () => {
    // Llama a la acción para obtener los posts
    const result = await actions.getPosts();

    // Si la llamada fue exitosa, actualiza el estado posts
    if (result.success) {
      setPosts(store.posts);
    }
  };

  // Llama a fetchData cuando el componente se monta
  fetchData();
}, [store.posts]);


  useEffect(() => {
    const handleImageLoad = () => {
      setLoadedImages((prevCount) => prevCount + 1);
    };

    const images = document.querySelectorAll('.card-img-top');

    images.forEach((img) => {
      img.addEventListener('load', handleImageLoad);
    });

    return () => {
      images.forEach((img) => {
        img.removeEventListener('load', handleImageLoad);
      });
    };
  }, []); // Se ejecuta solo una vez al montar el componente

  const openPDF = (pdfURL) => {
    window.open(pdfURL, '_blank');
  };
  const toggleDescriptionExpand = (index) => {
    setExpandedDescription((prevIndexes) => {
      const newIndexes = [...prevIndexes];
      newIndexes[index] = !newIndexes[index];
      return newIndexes;
    });
  };

  return (
    <div className="container mb-5 mt-5 d-flex flex-column align-items-center justify-content-center">
      <div className="col-12 mb-3 text-start">
        <h2 className="text-3xl md:text-6xl font-bold text-dark-black dark:text-principal-white big-text">
          Hola Fulano 👋
        </h2>
      </div>
      {posts.map((post, index) => (
        <div key={index} className="card w-75 h-100 border-5 shadow-2xl border-[#F9FCFD] bg-[#F9FCFD] mt-5 mb-3" style={{ maxWidth: '540px' }}>
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={post.url_imagen}
                className={`img-fluid rounded-start card-img-top h-100 `}
                alt="..."
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{post.titulo}</h5>
                <p className="card-text">
                  {expandedDescription[index]
                    ? post.descripcion
                    : `${post.descripcion.slice(0, 150)}...`}
                </p>
                {post.descripcion.length > 250 && (
                  <a
                    
                    onClick={() => toggleDescriptionExpand(index)}
                    className="btn btn-link"
                  >
                    {expandedDescription[index] ? "Leer menos" : "Leer más"}
                  </a>
                )}
                <p className="mt-5 font-light text-color-primary">
                  {post.rol_id === 1 && 'Maestros'}
                  {post.rol_id === 2 && 'Padres'}
                  {post.rol_id === 3 && 'Alumnos'}
                </p>
                {post.url_archivo && (
                  <button
                    type="button"
                    className="btn btn-outline-dark text-start border-dark-black hover:bg-dark-black hover:text-principal-white"
                    onClick={() => openPDF(post.url_archivo)}
                  >
                    Descargar PDF <i className="fa-solid fa-arrow-right"></i>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};