import { createContext,useState,useEffect } from "react";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

const PacientesContext = createContext();

const PacientesProvider = ({ children }) => {

    const [pacientes, setPacientes] = useState([]);
    const [paciente,setPaciente] = useState({})
    const {auth} = useAuth()


    useEffect(() => {

        //nos trae los pacientes del que inicio sesion
        const consultarAPI = async () => {
            try {
                const token = localStorage.getItem('token')
                if(!token) return;

                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                         Authorization: `Bearer ${token}`
                    }
                }
                const url = '/pacientes'
                const { data } = await clienteAxios.get(url, config)
                setPacientes(data)
                
              
            } catch (error) {
                console.log(error)
            }
        }
        consultarAPI()
    }, [auth]); //consulta el listado de pacientes una vez cambie el usuario, y no tener el error anterior que mostraba los pacientes de otro usuario

    const guardarPaciente = async (paciente) =>{

        const token = localStorage.getItem('token')
        const config ={
            headers:{
                "Content-Type":"application/json",
                 Authorization: `Bearer ${token}`
            }
        }
        if(paciente.id){ //indica que si viene un id del formulario es porque se esta editando
            try {
                const url = `/pacientes/${paciente.id}`
                const {data} = await clienteAxios.put(url,paciente,config)
                const {createdAt,updatedAt, __v,...pacienteAlmacenado} = data//quita el created, updatem y v y crea un nuevo objeto con los datos que no hay, que son los que requerimos

                const pacientesActualizados = pacientes.map(pacienteState => pacienteState._id === pacienteAlmacenado._id ? pacienteAlmacenado : pacienteState)

                setPacientes(pacientesActualizados)


            } catch (error) {
                console.log(error.response.data.msg)
            }
        }else{ //si es un registro nuevo
            try {
               
                //cuando le pasamos paciente debemos pasarle el token del usuario autentticado
                const url = '/pacientes'
                const {data} = await clienteAxios.post(url,paciente,config)
                const {createdAt,updatedAt, __v,...pacienteAlmacenado} = data//quita el created, updatem y v y crea un nuevo objeto con los datos que no hay, que son los que requerimos
                setPacientes([pacienteAlmacenado,...pacientes])
    
                
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }
        
    }

    const eliminarPaciente = async (pacienteEliminado) => {

            const confirmar = window.confirm("¿Estas seguro de eliminar este paciente?")
           if(pacienteEliminado._id && confirmar){

            const token = localStorage.getItem("token");
            const config = {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            };
            try {
                const url =  `/pacientes/${pacienteEliminado._id}`
                const { data } = await clienteAxios.delete(url, config);
                const pacientesActualizados = pacientes.filter( pacienteState => pacienteState._id !== pacienteEliminado._id)
                setPacientes(pacientesActualizados)

            } catch (error) {
              console.log(error);
            }

           } 
    }

    const setEdicion = (paciente) =>{
        setPaciente(paciente)
    }


    return(
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente,
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
}

export {
    PacientesProvider
}


export default PacientesContext;