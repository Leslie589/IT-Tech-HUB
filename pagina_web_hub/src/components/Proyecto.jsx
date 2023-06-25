import React ,{useState,useEffect} from 'react'
import "./Proyectos.css"
import axios from 'axios'
import { Link } from 'react-router-dom';
import Registrop from './Registrop'
import { render } from 'react-dom';
export const Proyecto= (props) => {
  const [cards,setCard]=useState([]);

  const more=(id,Nombre,Cupo,contador)=>{
    console.log('registro')
    console.log(id)
    const jsonvalue=[{"activo":false,"pagina":14,'proyecto':id , 'Nombre':Nombre ,'Cupo':Cupo ,'contador':contador}]

    localStorage.setItem('inicio', JSON.stringify(jsonvalue)); 
 props.root1. render( <Registrop id={id} Nombre={Nombre} Cupo={Cupo} contador={contador}/>)
  
}

  useEffect(()=>{

    
    axios
    .post('/api/CatProyectoId',{"IdProyecto":props.id})
    .then((res)=>{
        console.log(res.data.Resultado)
      setCard(res.data.Resultado);
      
    })
  },[])

 
  return (
    <>
 {cards.map((x,index)=>
   <div style={{ marginTop: "-70px"}} >
   <div className="container col-md-12  my-4">
   <p className="nombre "style={{ textAlign: 'left', marginLeft: 20}}> Proyecto » {x.Nombre}.</p>
      <div key={index} id={x.IdProyecto} className="container my-5  mt-100 "  >
        <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
          <div className="col-lg-12 p-3 p-lg-5 pt-lg-3">

          <h2 id="titulo" className="display-5 fw-bold">{x.Nombre}</h2>
            <div className="col-md-8 col-md-4 col-lg-12 col-md-12">
                  <br/>
                  <p className="descripcion "><strong>Descripción: </strong>{x.Descripcion}</p>
                </div>
            <div className="col-lg-10 offset-lg-1 p-0 overflow-hidden shadow-lg">
              <img src={x.Imagen} className="img-fluid w-100" height="900" alt="" />
            </div>
          
         <a href="#Registro">    <button id="boton-registro" onClick={()=>more(x.IdProyecto,x.Nombre,x.Cupo,x.contador)} className=" my-5"><b>Registrarme »</b></button>
           </a> 
          </div>
        </div>
      </div>
      </div>
      </div>
)}
  
    </>
  )
}

