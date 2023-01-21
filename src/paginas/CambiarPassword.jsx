import { useState } from "react";
import AdminNav from "../components/AdminNav"
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";

const CambiarPassword = () => {

  const [alerta,setAlerta] = useState({})
  const [password,setPassword] = useState({
    pwd_actual: '',
    pwd_nuevo: ''
  })
  const {actualizarPassword} = useAuth()


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if(password.pwd_actual.trim() === '' || password.pwd_nuevo.trim() === ''){
      setAlerta({
        msg: 'Los campos son obligatorios',
        error: true
      })
      return
    }

    if(password.pwd_nuevo.length < 6){
      setAlerta({
        msg: 'El password debe tener al menos 6 caracteres',
        error: true
      })
      return
    }

    setAlerta({})
    const respuesta = await actualizarPassword(password)
    setAlerta(respuesta)
  }

  const {msg} = alerta
  return (
    <>
      <AdminNav />
      <h2 className="font-black text-3xl text-center mt-10">
        Cambiar Password
      </h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Modifica tu {""}
        <span className="text-indigo-600 font-bold">Password aquí</span>
      </p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
          {msg && <Alerta alerta={alerta} />}
          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <label
                htmlFor="pwd_actual"
                className="uppercase text-gray-600 font-bold "
              >
                Password Actual
              </label>
              <input
                type="password"
                id="pwd_actual"
                placeholder="Tu password actual"
                className="w-full border bg-gray-100 p-2 mt-5 rounded-lg "
                name="pwd_actual"
                onChange={e => setPassword({
                  ...password,
                  [e.target.name]: e.target.value
                })}
              />
            </div>

            <div className="my-3">
              <label
                htmlFor="pwd_nuevo"
                className="uppercase text-gray-600 font-bold "
              >
                Nuevo Password
              </label>
              <input
                type="password"
                id="pwd_nuevo"
                placeholder="Tu nuevo password"
                className="w-full border bg-gray-100 p-2 mt-5 rounded-lg "
                name="pwd_nuevo"
                onChange={e => setPassword({
                  ...password,
                  [e.target.name]: e.target.value
                })}
              />
            </div>

            <input
              type="submit"
              className="bg-indigo-600 w-full font-bold mt-5 p-2 text-white uppercase hover:bg-indigo-700 cursor-pointer rounded-lg"
              value="Actualizar Password"
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default CambiarPassword