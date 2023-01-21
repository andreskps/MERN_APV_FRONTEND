import usePacientes from "../hooks/usePacientes";


const Paciente = ({paciente}) => {

  const {email,fecha,nombre,propietario,sintomas, _id} = paciente;
  const {setEdicion,eliminarPaciente} = usePacientes()

  const formaterFecha = (fecha) =>{
    const nuevaFecha = new Date(fecha)
    return new Intl.DateTimeFormat('es-ES',{
      dateStyle:'long'
    }).format(nuevaFecha)

  }
  
  return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
      <p className="font-bold uppercase text-indigo-700">
        Nombre:
        <span className="font-normal normal-case text-black"> {nombre}</span>
      </p>

      <p className="font-bold uppercase text-indigo-700">
        Propietario:
        <span className="font-normal normal-case text-black">
          {" "}
          {propietario}
        </span>
      </p>

      <p className="font-bold uppercase text-indigo-700">
        Fecha:
        <span className="font-normal normal-case text-black"> {formaterFecha(fecha)}</span>
      </p>

      <p className="font-bold uppercase text-indigo-700">
        Sintomas:
        <span className="font-normal normal-case text-black"> {sintomas}</span>
      </p>

      <p className="font-bold uppercase text-indigo-700">
        Email:
        <span className="font-normal normal-case text-black"> {email}</span>
      </p>

      <div className="flex justify-between my-5">
        <button
          type="button"
          className="bg-indigo-600 text-white uppercase font-bold py-2 px-4 rounded text-xs hover:bg-indigo-800"
          onClick={()=>setEdicion(paciente)}
        >
          Editar
        </button>

        <button
          type="button"
          className="bg-red-600 text-white uppercase font-bold py-2 px-4 rounded text-xs hover:bg-red-800"
          onClick={()=>eliminarPaciente(paciente)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default Paciente