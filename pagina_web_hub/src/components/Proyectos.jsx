import React ,{useState,useEffect} from 'react'
import "./Proyectos.css"
import axios from 'axios'
import Registrop from './Registrop'
import { render } from 'react-dom';
export const Proyectos = (props) => {
  const [cards,setCard]=useState([]);
  useEffect(()=>{
    axios
    .get('/api/CatProyecto')
    .then((res)=>{
      setCard(res.data.Resultado);

    })
  
   
  },[])

 
  return (
    <>
 {cards.map((x,index)=>
 <div  style={{ marginTop: "-70px"}}>
   <div   className="container col-md-12 my-4">
      <div key={index} id={index} className="container my-5  mt-100 " >
        <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
          <div className="col-lg-12 p-3 p-lg-5 pt-lg-3">
            
          <h4 id="titulo"  className="display-5 fw-bold">Proyecto: {x.Nombre}.</h4>

          <div className="col-md-8 col-md-4 col-lg-12 col-md-12">
                  <br/>
                  <p className="descripcion"><strong>Descripción: </strong>{x.Descripcion}</p>
                </div>
            
            <div className="col-lg-10 offset-lg-1 p-0 overflow-hidden shadow-lg">
              <img src={x.Imagen} className="img-fluid w-100" height="900" alt="" />
            </div>
          
              <button id="boton-registro" onClick={()=>more(x.IdProyecto)} className=" my-5"><b>Registrarme »</b></button>
           
          </div>
        </div>
      </div>
      <br/>
      </div>
      </div>
)}
  
    </>
  )
}


const more=(id,Nombre)=>{
  const elemnt= document.getElementById('renderizados')
return(
render( <Registrop id={id} Nombre={Nombre}/>,elemnt)
)

}