import {useState,useEffect,createContext} from 'react'
import clienteAxios from '../config/axios'
import usePacientes from '../hooks/usePacientes'


const AuthContext = createContext()


const AuthProvider = ({children}) => {

    const [cargando,setCargando] = useState(true)
    const [auth,setAuth] = useState({})

    //comprueba si el usuario esta autenticado o no
    useEffect(() => {

      const autenticarUsuario = async () => {
          const token = localStorage.getItem('token')
          if(!token){//si no hay token no autentica el usuario
            setCargando(false)
            return;
          }

          const config ={
            headers:{
              "Content-Type":"application/json",
               Authorization: `Bearer ${token}`
            }
          }

          try {
            const url = '/veterinarios/perfil'
            const {data} = await clienteAxios.get(url,config)
           
            setAuth(data)
            
          } catch (error) {
             console.log(error.respnse.data.msg)
             setAuth({})
          }
          setCargando(false)

      }
        autenticarUsuario()
    },[])

    const cerrarSesion = () =>{
      localStorage.removeItem('token')
      setAuth({})
      
    }

    const actualizarPerfil =async datos => {
      
      const token = localStorage.getItem('token')
      const config ={
          headers:{
              "Content-Type":"application/json",
               Authorization: `Bearer ${token}`
          }
      }

      try {
        const url = `/veterinarios/perfil/${datos._id}`
        const {data} = await clienteAxios.put(url,datos,config)
        
        setAuth(data)

        return{
          error:false,
          msg:'Perfil actualizado correctamente'
        }
        
      } catch (error) {
          return{
              error:true,
              msg:error.response.data.msg
          }
      }
    }

    const actualizarPassword = async datos => {
      const token = localStorage.getItem('token')
      if(!token) return;
      const config ={
          headers:{
              "Content-Type":"application/json",
               Authorization: `Bearer ${token}`
          }
      }

      try {
      
        const url = `/veterinarios/cambiar-password/${auth._id}`
        const {data} = await clienteAxios.put(url,datos,config)
        

        return{
          error:false,
          msg: data.msg
        }
      
      } catch (error) {
        return{
          error:true,
          msg:error.response.data.msg
        }
      }
    }
    return(
      
        <AuthContext.Provider 
          value={{
            auth,
            setAuth,
            cargando,//indicara si se cargo correctamente o no
            cerrarSesion,
            actualizarPerfil,
            actualizarPassword
          }}
        >
         {/* indica todos los componentes que estan en AuthProvider en el App */}
        {children}

        </AuthContext.Provider>
    )
}


export{
    AuthProvider
}

export default AuthContext;