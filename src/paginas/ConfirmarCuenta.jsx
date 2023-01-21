import {useEffect,useState} from "react";
import { useParams,Link} from "react-router-dom" //leer los parametros de la url en recat
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";

const ConfirmarCuenta = () => {

  const [alerta, setAlerta] = useState({})
  const [cuentaConfirmada,setCuentaConfirmada] = useState(false)
  const [cargando, setCargando] = useState(true)

  const params = useParams();
  //console.log(params)

  const {id} = params;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/veterinarios/confirmar/${id}`;
        const {data} = await clienteAxios.get(url);

        setCuentaConfirmada(true) //si esto se ejecuto es porque se confirmo correctamente
  
        setAlerta({  //la data es lo que viene del backend
          msg: data.msg,
        })

        
      } catch (error) {
        
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
      setCargando(false); //el cargando pasa a falso porque ya se ejecuto la función
    }
    confirmarCuenta();
  }, [])


  return (
    <>
       <div>
            <h1 className="text-indigo-600 font-black text-6xl">Confirma tu Cuenta y Administra tus
            <span className="text-black"> Pacientes</span></h1>
       </div>

       <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
           {!cargando &&
            <Alerta
              alerta={alerta}
           />}

            {cuentaConfirmada && (
              <Link
              className='block text-center my-5 text-gray-500'
              to="/">Inicia Sesión</Link> 
            )}
       </div>
    </>
  )
}

export default ConfirmarCuenta