const getState = ({ getStore, getActions, setStore }) => {
   
  
    return {
      store: {
        usuarios:[]
      },
  
      actions: {
        createUser: async(jsonBody)=>{
          console.log(jsonBody)
        },
        login: async(jsonBody) =>{
          const url = process.env.REACT_APP_BACKEND_URL +  '/usuarios'
          const options = {
            method: "POST",
            body: JSON.stringify(jsonBody),
            headers:{
              "content-Type": "application/json"
            }
          }
          try{
            const resp = await fetch(url, options);
            if(resp.ok){
              const data = await resp.json()
              localStorage.setItem("userToken", data.token)
              return {success : true}
            }
          }catch(error){
            console.error(error)
            return { success: false, error: "Error de red"}
          }
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
      },
    };
  };
  export default getState;