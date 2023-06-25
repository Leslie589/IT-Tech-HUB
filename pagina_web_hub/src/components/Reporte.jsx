import React ,{useState,useEffect} from 'react'
import "./Proyectos.css"
import { Listapro } from './Litapro'
import { UnicoProyecto } from './UnicoProyecto';
import{UnicoProyectonom} from './UnicoProyectonom';
import ReactDOM from "react-dom/client";
import { Listado } from './Listado';
import axios from 'axios';
import fileDownload from 'js-file-download';

export const Reporte = () => {

 
 
  const busqueda=()=>{

  const elemnt= document.getElementById('procesos')
  const root= ReactDOM.createRoot(elemnt);
  root.render( <Listado Fechai={document.getElementById('fi').value} Fechaf={document.getElementById('ff').value} />)


    }
    const Generarxls=()=>{
if (document.getElementById('fi').value!='' && document.getElementById('ff').value!='')
{

    axios
    .post('/api/ReporteExcel',{"fecha1":document.getElementById('fi').value,"fecha2":document.getElementById('ff').value})
    .then((res)=>{
      if(res)
      { 
        fileDownload(res.data.Resultado,'reporte proyectos.csv')
    }})
}
else
{
    axios
    .post('/api/ReporteExcel')
    .then((res)=>{
      if(res)
      {
        fileDownload(res.data.Resultado,'reporte proyectos.csv')
    //    console.log()
     
  
    }})
}
 
      
      
          }
    
  return (
    <>
    <div className='container' >
      <h4>Generacion de reporte para proyectos</h4>
      <br />
 <div className='container' style={{width:"50%"}}>
  <div className='row'>
    <div className='col'> 
    <div className='row'>
    <div className='col'> 
    <label htmlFor="numero">Fecha Incial</label> 
     </div>
     <div className='col'>  
     <input type="date" name="" id="fi" />
     </div>
     </div>
     <div className='row'>
     <div className='col'>  
     <label htmlFor="nombre">Fecha Final</label>
     </div>
     <div className='col'>  
<input type="date" name="" id="ff" />
     </div>
     </div>
     </div>
 
    <div className='col'>
      <button onClick={()=>busqueda()}  type="button" class="btn btn-primary">Consultar</button>
      <button onClick={()=>Generarxls()}  type="button" class="btn btn-primary">Generar Reporte</button>
    </div>
  </div>
 </div>

<div id='procesos'>

<Listado/>
</div>
 </div>  
  
    </>
  )
}

