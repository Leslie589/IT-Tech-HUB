import React, { useEffect,useState } from "react";
import { Link } from 'react-router-dom';
import "animate.css/animate.min.css";
import "./Card.css"

import axios from "axios";
import { Proyectos } from "./Proyectos";
import { render } from 'react-dom';
import { Proyecto } from "./Proyecto";
import { Eventos } from "./Eventos";

export const Card = (props) => {
  const [cards,setCard]=useState([]);
  const [cardev,setCardev]=useState([]);

  const eventos=()=>{
    const jsonvalue=[{"activo":false,"pagina":4,'proyecto':0}]

    localStorage.setItem('inicio', JSON.stringify(jsonvalue)); 
  props.root1.render( <Eventos  root1={props.root1} root2={props.root2} />)
  }
  
  const more=(Id)=>{
    const jsonvalue=[{"activo":false,"pagina":13,'proyecto':Id}]

    localStorage.setItem('inicio', JSON.stringify(jsonvalue)); 
    props.root1.render (<Proyecto id={Id} root1={props.root1} root2={props.root2}/>)
  
  }

  useEffect(()=>{
    axios
    .get('/api/CatProyecto')
    .then((res)=>{
      console.log(res.data.Resultado)
      setCard(res.data.Resultado);
    })
  },[])
useEffect(()=>{
axios
.get("/api/CatEvento")
.then((res)=>{
  if(res)
  {
    console.log(res.data.Resultado)
setCardev(res.data.Resultado)
}
})
},[])

  return (
    <div className="container">
    <br/>
    <div className="row">
      <div className="col-sm-6 col-md-8 ">
        <div className="card-deck ">
        <div className="card mb-4   animate__animated animate__fadeInLeft">
            <div className="card-body">
            <h2 className="card-title display-6 fw-bold">Proyectos</h2>
            </div>
          </div>
          {cards.map((imagen,index)=>
          <div className="card mb-4 my-1 animate__slow animate__animated  animate__delay-1s  animate__fadeInLeft  " key={index}>
            <img src={imagen.Imagen} className="card-img-top img-fluid w-100" alt="" />
            <div className="card-body">
              <h3 className="card-title">{imagen.Nombre}</h3>
              <p className="card-textp" >{imagen.Descripcion.slice(0,250)}[...]</p>
          
        <a href="#LeerMas">      <button onClick={()=>more(imagen.IdProyecto)} className="btn btn-primary"><b>Leer más</b></button></a>

             
            </div>
          </div>
          )}
      
          
        </div>
      </div>
      <div className="col-sm-6 col-md-4 animate__slow animate__animated animate__delay-2s  animate__fadeInRight">
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        
        
        <div className="card mb-3 m-1  ">
          <div className="card-body">
          <h2 className="card-title display-6 fw-bold">Eventos</h2>
          
          </div>
        </div>

        {cardev.map((value,index)=>
        <div className="card mb-4 m-1 " key={index}>
          <div className="card-body">
            <h3 className="card-title">{value.Nombre}</h3>
            <p className="card-textc" >{value.Descripcion.slice(0,230)}[...]</p>
             <a href="#Eventos">   <div style={{cursor: "pointer"}} onClick={()=>eventos()} > 
                <img src={value.Imagen} className="card-img-top" alt="No encontado" /> 
             </div> </a>
          </div>
        </div>

        )}

     
      </div>
    </div>
  </div>
  
  )
}
