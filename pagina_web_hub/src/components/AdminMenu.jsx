import React, { useEffect,useState } from 'react'
import logo from "../images/logo.jpg"
import {AltaProyecto} from "./AltaProyecto";  
import {AltaEvento} from "./AltaEvento";  
import {EBEventos} from "./EBEventos";  
import {EBProyectos} from "./EBProyectos";  

import { MenuLocal } from './MenuLocal';
import { Reporte } from './Reporte';
import { Home } from './Home';


export const AdminMenu = (props) => {


  const [root1,setRoot] = useState()


  const ln1=(id)=>{
     const  jsonvalue=[{"activo":true,"pagina":id}]
localStorage.setItem('inicio', JSON.stringify(jsonvalue)); 

  switch(id)
  {
    case 6:  
    props.root1.render(<Home root1={props.root1} root2={props.root2}/>)
      break;
 case 7:  
 props.root1.render(<AltaProyecto  root1={props.root1} root2={props.root2}/>)
  break;
 
 
 case 8:
  props.root1.render(<AltaEvento root1={props.root1} root2={props.root2}/>);
  break;

case 9:
  props.root1.render(<EBProyectos root1={props.root1} root2={props.root2}/>);
  break;
  
  case 10:
    props.root1.render(<EBEventos root1={props.root1} root2={props.root2}/>);
  break;
case 11:
  props.root1.render(<Reporte root1={props.root1} root2={props.root2}/>);
  break;
  case 12: 
  const  jsonvalue=[{"activo":false,"pagina":1}]
  localStorage.setItem('inicio', JSON.stringify(jsonvalue)); 
  props.root1.render(<Home root1={props.root1} root2={props.root2}/>);
  props.root2.render(<MenuLocal root1={props.root1} root2={props.root2} />)
  break;
    }}
 

  return (
    <>

           <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-light " style={{backgroundColor: 'orange'}}>
      <div className="container-fluid">
      <a href=" ">
                <img className='mx-2' src={logo}  height="80"  style={{ borderRadius: "10%", backgroundColor: "transparent" }} alt="No encontrada"/>
            </a>
            <h2  className="display-6 fw-bold" style={{color: "white"}} >  IT-Tech HUB</h2>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse show" id="navbarSupportedContent" >
        <div className='navbar-nav ms-auto mx-1'>
                    <a href='#/Admin/Inicio' className=' fs-4 nav-link text-center' onClick={()=>ln1(6)} style={{color: "white"}} >Vista</a>  
                    <a href='#/Admin/AltaProyecto' className='fs-4 nav-link text-center' onClick={()=>ln1(7)} style={{color: "white"}} >Alta Proyecto</a>  
                    <a href='#/Admin/AltaEvento' className=' fs-4 nav-link text-center'  onClick={()=>ln1(8)} style={{color: "white"}} >Alta Eventos</a>  
                    <a href='#/Admin/BEProyecto' className='fs-4 nav-link text-center' onClick={()=>ln1(9)} style={{color: "white"}} >Edición/Proyectos</a>  
                    <a href='#/Admin/EBEventos' className=' fs-4 nav-link text-center'  onClick={()=>ln1(10)} style={{color: "white"}} >Edición/Eventos</a>  
                    <a href='#/Admin/Reportes' className=' fs-4 nav-link text-center'  onClick={()=>ln1(11)} style={{color: "white"}} >Reporte</a>
                    <a href='#/Salir'  className='fs-4 nav-link  text-center' onClick={()=>ln1(12)} style={{color: "white"}}  >Salir</a>  
               </div>
       
        </div>
      </div>
    </nav>
<br />
<br />
<br />
 
    </>
  )
}

