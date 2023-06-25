import React, { useEffect,useState } from "react";
import axios from "axios";
import "./Eventos.css"
export const Eventos = (props) => {
  const [cardev,setCardev]=useState([]);
  useEffect(()=>{
    axios
    .get("/api/CatEvento")
    .then((res)=>{
    setCardev(res.data.Resultado)

    })
    },[])
    
  return (
    <> 

<div style={{ marginTop: "-50px"}} >
      <h1 className="display-3 fw-bold lh-1">Eventos</h1>
      <br/>  <br/><br/>
     <div className="container col-md-12  my-4 " >
     <br/>
     {cardev.map((x,index)=>
     
    <div key={index} id={x.IdEvento} className="row justify-content-center">
      <br />
      <div className="col-md-6 my-2 ">
        <img
          src={x.Imagen}
          alt="Imagen"
          className="img-fluid imagen"
        />
            <br /><br />
      </div>
      <div className="col-md-6 ">
        <h2> &nbsp;{x.Nombre}</h2>
        <br/>
        <p style={{textAlign:"left"}}>{x.Descripcion}</p>
        <hr/>
              <br/> <br/> <br/> <br/><br/>
      </div>
      <br />
    </div>

)}
    <br/>
  </div>
  </div>
    
    </>
   







  );
};


