import { Outlet,Navigate } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import useAuth from "../hooks/useAuth"



const RutaProtegida = () => {

  const {auth,cargando}=  useAuth()
 
  
  if (cargando) {
    return ;
  }
  
  //si auth esta vacio redireccionar a incio
 if(auth?._id){
   return(
      <>
        <Header/>
        <main className="mx-auto p-10">
          <Outlet/>
        </main>
        <Footer/>
      </>
   )
 }else{
    return <Navigate to="/"/>
 }
  

}

export default RutaProtegida