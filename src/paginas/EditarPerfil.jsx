import { useEffect ,useState} from "react"
import AdminNav from "../components/AdminNav"
import useAuth from "../hooks/useAuth"
import Alerta from "../components/Alerta"

const EditarPerfil = () => {

  const { auth,actualizarPerfil} = useAuth()
  const [perfil,setPerfil] = useState({})
  const [alerta,setAlerta] = useState({})

  useEffect(() => {

    setPerfil(auth)
  }, [auth])

  const handleSubmit = async e => {
    e.preventDefault()
    const{ nombre ,email } = perfil

    if(nombre.trim() === '' || email.trim() === ''){
      setAlerta({
        msg: 'El nombre y el email son obligatorios',
        error: true
      })
      return
    }

    const respuesta = await actualizarPerfil(perfil)

    setAlerta(respuesta)
    
  }

  const {msg} = alerta
  return (
    <>
      <AdminNav />

      <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>
      <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''} 
      <span className="text-indigo-600 font-bold">Información aquí</span></p>

      <div className="flex justify-center">
         <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
            {msg && <Alerta alerta={alerta} />}
            <form onSubmit={handleSubmit}>
                <div className="my-3">
                    <label htmlFor="nombre" className="uppercase text-gray-600 font-bold ">Nombre</label>
                    <input type="text" id="nombre" placeholder="Tu nombre" className="w-full border bg-gray-100 p-2 mt-5 rounded-lg "
                    name="nombre"
                    value={perfil.nombre || ''}
                    onChange = {e => setPerfil({
                        ...perfil,
                        [e.target.name]: e.target.value
                    })}
                    />

                </div>

                <div className="my-3">
                    <label htmlFor="web" className="uppercase text-gray-600 font-bold ">Sitio Web</label>
                    <input type="text" id="web" placeholder="Tu Sitio Web" className="w-full border bg-gray-100 p-2 mt-5 rounded-lg "
                    name="web"
                    value={perfil.web || ''}
                    onChange = {e => setPerfil({
                        ...perfil,
                        [e.target.name]: e.target.value
                    })}
                    />
                    
                </div>

                <div className="my-3">
                    <label htmlFor="telefono" className="uppercase text-gray-600 font-bold ">Telefono</label>
                    <input type="text" id="telefono" placeholder="Tu Telefono" className="w-full border bg-gray-100 p-2 mt-5 rounded-lg "
                    name="telefono"
                    value={perfil.telefono || ''}
                    onChange = {e => setPerfil({
                        ...perfil,
                        [e.target.name]: e.target.value
                    })}
                    />
                </div>

                <div className="my-3">
                    <label htmlFor="email" className="uppercase text-gray-600 font-bold ">Email</label>
                    <input type="email" id="email" placeholder="Tu Email" className="w-full border bg-gray-100 p-2 mt-5 rounded-lg "
                    name="email"
                    value={perfil.email || ''}
                    onChange = {e => setPerfil({
                        ...perfil,
                        [e.target.name]: e.target.value
                    })}
                    />
                </div>

                <input
                    type="submit"
                    className="bg-indigo-600 w-full font-bold mt-5 p-2 text-white uppercase hover:bg-indigo-700 cursor-pointer rounded-lg"
                    value="Guardar Cambios"
                />
            </form>
         </div>
      </div>
    </>
  )
}

export default EditarPerfil