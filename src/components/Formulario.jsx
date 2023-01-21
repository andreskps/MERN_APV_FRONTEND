import { useState,useEffect } from "react"
import Alerta from "./Alerta"
import usePacientes from "../hooks/usePacientes"

const Formulario = () => {

    const [nombre, setNombre] = useState('')
    const [propietario, setPropietario] = useState('')
    const [email, setEmail] = useState('')
    const [fecha, setFecha] = useState('')
    const [sintomas, setSintomas] = useState('')
    const [alerta, setAlerta] = useState({})
    const [id, setId] = useState(null)

    const {guardarPaciente,paciente} = usePacientes()

   useEffect(() => {
        if(paciente?.nombre){
            setId(paciente._id)
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
        }
   }, [paciente])

    const handleSubmit = (e) => {
        e.preventDefault()

        if([nombre,propietario,email,fecha,sintomas].includes('')){
            setAlerta({
                error: true,
                msg: 'Todos los campos son obligatorios'
            })
            return
        }

        
        guardarPaciente({
            nombre,
            propietario,
            email,
            fecha,
            sintomas,
            id
        })
        setAlerta({
            msg : 'Guardado correctamente',
            error: false
        })

        //reinicamos el state y se limpira el formulario
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')
        setId(null)

    }

    const {msg} = alerta 
  return (

    <>
       <h2 className="font-black text-3xl text-center">Administrador de Pacientes</h2>

       <p className="text-xl mt-5 mb-10 text-center">Añade tus pacientes y<span className="text-indigo-600 font-bold"> Administralos</span></p>

        {msg && <Alerta alerta={alerta} />}
        <form className="bg-white py-10 px-5 mb-10 md:mb-0 shadow-md rounded-md" onSubmit={handleSubmit}>
            <div className="mb-5">
                <label htmlFor="mascota" className="text-gray-700 uppercase font-bold">Nombre Mascota</label>
                <input 
                    id="nombre"
                    type="text"
                    placeholder="Nombre Mascota"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={nombre}
                    onChange={(e) => {setNombre(e.target.value)}}
                />
            </div>

            <div className="mb-5">
                <label htmlFor="propietario" className="text-gray-700 uppercase font-bold">Nombre Propietario</label>
                <input 
                    id="propietario"
                    type="text"
                    placeholder="Nombre Propietario"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={propietario}
                    onChange={(e) => {setPropietario(e.target.value)}}
                />
            </div>

            <div className="mb-5">
                <label htmlFor="email" className="text-gray-700 uppercase font-bold">Email</label>
                <input 
                    id="email"
                    type="email"
                    placeholder="Email Propietario"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={email}
                    onChange={(e) => {setEmail(e.target.value)}}
                />
            </div>

            <div className="mb-5">
                <label htmlFor="fecha" className="text-gray-700 uppercase font-bold">Fecha Alta</label>
                <input 
                    id="fecha"
                    type="date"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={fecha}
                    onChange={(e) => {setFecha(e.target.value)}}
                />
            </div>

            <div className="mb-5">
                <label htmlFor="sintomas" className="text-gray-700 uppercase font-bold">Sintomas</label>
                <textarea 
                    id="sintomas"
                    placeholder="Describe los sintomas de la mascota"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={sintomas}
                    onChange={(e) => {setSintomas(e.target.value)}}
                />
            </div>

            {/* si existe un id coloca editar paciente */}
            <input
                type="submit"
                value={id ? 'Editar Paciente' : 'Agregar Paciente'}
                className="bg-indigo-600 w-full p-2 text-white uppercase font-bold hover:bg-indigo-700 hover:cursor-pointer transition-colors"
               
            />
        </form>
    </>
  )
}

export default Formulario