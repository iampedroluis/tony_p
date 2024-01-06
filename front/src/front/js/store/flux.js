//const jwt = require('jsonwebtoken');
const getState = ({ getStore, getActions, setStore }) => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';
  /*
  function obtenerInformacionToken(token) {
    try {
      const decoded = jwt.decode(token);
      return decoded;
    } catch (error) {
      return { error: 'Token inválido' };
    }
  }
  */
  
    return {
      store: {
        usuarios:[],
        token: localStorage.getItem('userToken'),
        posts:[]
        
      },
  
      actions: {
        createUser: async(jsonBody)=>{
          console.log(jsonBody)
        },
        login: async (jsonBody) => {
          const url = `${backendUrl}/login`;
          const options = {
              method: "POST",
              body: JSON.stringify(jsonBody),
              headers: {
                  "Content-Type": "application/json"
              }
          };
      
          try {
              const resp = await fetch(url, options);
              if (resp.ok) {
                  const data = await resp.json();
                  localStorage.setItem("userToken", data.token);
                  await setStore({token: data.token})
                  return { success: true };
              } else {
                  const errorData = await resp.json();
                  console.log(errorData)
                  return { success: false, error: errorData.error || "Error de autenticación" };
              }
          } catch (error) {
              console.error(error);
              return { success: false, error: "Error de red" };
          }
      },
      logout:()=> {
        localStorage.removeItem('userToken')
        setStore({token:null})
      },

        getUsuarios: async () => {
          console.log(process.env.REACT_APP_BACKEND_URL)
          const url = "http://localhost:3000/usuarios";
          
          const options = {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
              
            },
          };
  
          try {
            // fetching data from the backend
            const resp = await fetch(url, options);
            const data = await resp.json();
            const usuarios = data
            
          setStore({usuarios});

          console.log("Usuarios en store:", getStore().usuarios);

            // don't forget to return something, that is how the async resolves
            return data;
          } catch (error) {
            console.log("Error loading message from backend", error);
          }
        },
        
        getPosts: async ()=>{
          const { token } = getStore();
          const url = `${backendUrl}/informacion`;
          const options = {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": 'Bearer ' + token
              }
          };
          try {
            const resp = await fetch(url, options);
            if (resp.ok) {
                const data = await resp.json();
                await setStore({posts: data})
                return { success: true };
            } else {
                const errorData = await resp.json();
                console.log(errorData)
                return { success: false, msg : "No Hay Posts Generados" };
            }
        } catch (error) {
            console.error(error);
            return { success: false, error: "Error de red" };
        }
        }
        
      },
    };
  };
  export default getState;