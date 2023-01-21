import { useEffect,useState } from "react"
import { useParams,Link} from "react-router-dom" //leer los parametros de la url en recat
import clienteAxios from "../config/axios"
import Alerta from "../components/Alerta"

const NuevoPassword = () => {

    const [alerta, setAlerta] = useState({})
    const [tokenConfirmado,setTokenConfirmado] = useState(false)
    const [cargando, setCargando] = useState(true)
    const [password, setPassword] = useState('')
    const [confirmarPassword, setConfirmarPassword] = useState('')
    const [passwordActualizada, setPasswordActualizada] = useState(false)

    const params = useParams()

    const {token} = params

    useEffect(() => {

        const confirmarToken = async() =>{
            
            try {
                const url = `/veterinarios/olvide-password/${token}`;
                const {data} = await clienteAxios.get(url);

                setTokenConfirmado(true) //si esto se ejecuto es porque se confirmo correctamente
               
               
                
            } catch (error) {
                setAlerta({
                    msg: "Hubo un error al reestablecer la contraseña",
                    error: true
                })
            }
            setCargando(false)
        }

        confirmarToken();
    },[])


    const handleSubmit = async e =>{
        e.preventDefault();

        if (password !== confirmarPassword) {
     
            setAlerta({
              msg: 'Los passwords no coinciden',
              error: true
            })
            return;
          }
      
          if (password.length < 6) {
            setAlerta({
              msg: 'El password debe ser de al menos 6 caracteres',
              error: true
            })
            return;
          }   

          try {
            const url = `/veterinarios/olvide-password/${token}`;
            const {data} = await clienteAxios.post(url,{password});

            setPasswordActualizada(true)
            setAlerta({
                msg: "Se reestablecio correctamente su contraseña, vuelve a iniciar sesión",
                error: false
            })

            
          } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
          }
    }
  
    const {msg} = alerta
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Recupera tu Password y administra tus
          <span className="text-black"> Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {!cargando && msg && <Alerta alerta={alerta} />}

         {/* mostrara el formulario solo si el token es valido */}
        {tokenConfirmado && (

          <>
  
          <form className="mt-12" onSubmit={handleSubmit}>
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">
                Nuevo Password
              </label>
              <input
                type="password"
                placeholder="Tu password Nuevo"
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">
                Confirmar Nuevo Password
              </label>
              <input
                type="password"
                placeholder="Repetir Password Nuevo"
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={confirmarPassword}
                onChange={e => setConfirmarPassword(e.target.value)}
              />
            </div>

            <input
              type="submit"
              value="Guardar Nuevo Password"
              className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
            />
          </form>  

          </>
        )}

          {/* si el password se actualizo correctamente muestra el enlace a iniciar sesión */}
          {passwordActualizada &&(
             <Link
              className='block text-center my-5 text-gray-500'
              to="/">Iniciar Sesión</Link> 
          )}
      </div>
    </>
  );
}

export default NuevoPassword;