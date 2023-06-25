import React, { useState } from 'react'
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Carrousel.css"
import axios from 'axios';
import { useEffect } from 'react';
import { render } from 'react-dom';
import { Galeria } from './Galeria';

export const Carrousel = (props) => {
  const datos=[];
  const [carrusel,setCarrusel]=useState([]);
  const [carrusel2,setCarrusel2]=useState([]);
  

  const galeria=()=>{
   
   props.root1.render( <Galeria />)
   
  }

  useEffect(()=>{
  axios
  .get('/api/Carrucel')
  //.then((res)=> res.json())
  .then((res)=>
    setCarrusel(res.data.Resultado ));

 },[])
 useEffect(()=>{
  axios
  .get('/api/Carrucel2')
  //.then((res)=> res.json())
  .then((res)=>
    setCarrusel2(res.data.Resultado ));

 },[])
 return (
    <>
   <div className="container"  style={{ marginTop: "-60px"}}>
   
      <Carousel id="miCarrusel">
        {carrusel.map((imagen,index)=>
        <Carousel.Item key={index}>
        
   <a href="#/Galeria">  <div style={{cursor: "pointer"}} onClick={()=>galeria()} > <img  src= {imagen.Imagen} className="d-disabled w-100" height="500"  alt={imagen.Nombre} />
        </div></a>
        <Carousel.Caption>
          <h3 className='carrouseld '>{imagen.Nombre}</h3>
         
          </Carousel.Caption>
        </Carousel.Item>
        )}
          {carrusel2.map((imagen,index)=>
        <Carousel.Item key={index}>
        <a href="#/Galeria">   <div style={{cursor: "pointer"}} onClick={()=>galeria()} > <img  src= {imagen.Imagen} className="d-disabled w-100" height="500"  alt={imagen.Nombre} />
        </div></a> 
        <Carousel.Caption>
          <h3 className='carrouseld ' >{imagen.Nombre}</h3>
            
          </Carousel.Caption>
        </Carousel.Item>
        )}
    
      </Carousel>
      </div>
      


    </>
  )
}

