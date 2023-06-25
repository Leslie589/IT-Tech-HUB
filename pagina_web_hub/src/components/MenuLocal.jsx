import React, { useEffect, useState } from 'react'
import logo from "../images/logo.jpg"
import { NavLink } from 'react-router-dom'
import { Home } from './Home'
import ReactDOMClient,{createRoot} from 'react-dom/client';
import { Proyectos } from './Proyectos';
import { Galeria } from './Galeria';
import Login from './Login';

import { Eventos } from './Eventos';
import { Alert } from 'react-bootstrap';
//import {Login} from './Login';



export const MenuLocal = (props) => {
  


  const ln1=(id)=>{
console.log(id)
//document.getElementById('renderizados').innerHTML
//let root= ReactDOMClient.createRoot(elemnt);
const jsonvalue=[{"activo":false,"pagina":id,'proyecto':0}]
 localStorage.setItem('inicio', JSON.stringify(jsonvalue)); 

   switch(id)
   {
  case 1: 



props.root1.render(<Home root1={props.root1} root2={props.root2} />)
    break;
  
  case 2:   
  props.root1.render(<Proyectos  root1={props.root1} root2={props.root2}/>)
    break;
  case 3: 
  props.root1.render(<Eventos  root1={props.root1} root2={props.root2}/>)
    break;
    case 4:
      props.root1.render(<Galeria  root1={props.root1} root2={props.root2}/>)
      break;
      case 5:
        props.root1.render(<Login  root1={props.root1} root2={props.root2} />)
        break;
      
  }
  
 
    

    }


  return (
    <>



<nav  className="navbar navbar-expand-lg bg-body-tertiary navbar-light  " style={{width:'100%', backgroundColor: 'orange', right:'0',bottom:'1', zIndex:'1000'}}>
<div className="container-fluid">
<a href=" ">
          <img className='mx-2' src={logo}  height="80"  style={{ borderRadius: "10%", backgroundColor: "transparent" }} alt="No encontrada"/>
      </a>
      <h2  className="display-6 fw-bold" style={{color: "white"}} > IT-Tech HUB</h2>
  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="navbar-collapse collapse show" id="navbarSupportedContent" >
  <div className='navbar-nav ms-auto mx-1'>
 <a href="#Home" className='fs-4 nav-link text-center' onClick={()=>ln1(1)} style={{color: "white"}} >Inicio</a>  
 <a href="#Proyectos" className='fs-4 nav-link text-center' onClick={()=>ln1(2)} style={{color: "white"}} >Proyectos</a>    
 <a href="#Galeria"  className='fs-4 nav-link text-center' onClick={()=>ln1(3)} style={{color: "white"}} >Eventos</a>  
 <a href="#Eventos" className=' fs-4 nav-link text-center'  onClick={()=>ln1(4)} style={{color: "white"}} >Galería</a>    
 <a href="#Acceso"  className='fs-4 nav-link  text-center' onClick={()=>ln1(5)} style={{color: "white"}}  >Acceso</a>   
  </div>
 </div>
</div>
</nav>
<br />
<br />
</>
   
 
   )
  
  }

  

