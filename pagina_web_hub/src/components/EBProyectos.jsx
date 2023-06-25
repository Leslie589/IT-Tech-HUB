import React ,{useState,useEffect} from 'react'
import "./Proyectos.css"
import { Listapro } from './Litapro'
import { UnicoProyecto } from './UnicoProyecto';
import{UnicoProyectonom} from './UnicoProyectonom';
import ReactDOM from "react-dom/client";
export const EBProyectos = () => {

 
 
  const busqueda=()=>{
if(document.getElementById('numero').checked==true)
{ 
    const elemnt= document.getElementById('procesos')
      const root= ReactDOM.createRoot(elemnt);
      root.render( <UnicoProyecto valor={document.getElementById('info').value} />)
}   
else
{
  const elemnt= document.getElementById('procesos')
  const root= ReactDOM.createRoot(elemnt);
  root.render( <UnicoProyectonom valor={document.getElementById('info').value} />)

}
    }
    


return (
  <>
  <div className='container'  >
    <h2>Edición de Proyectos.</h2>
    <br />
<div className='container' style={{width:"60%"}}>
<div className='row'>
  <div className='col'> 
  <div className='row'>
  <div className='col'> 
  <label htmlFor="numero">Por numero</label> 
   </div>
   <div className='col'>  
   <input type="radio" name="validar" id="numero" /> 
   </div>
   </div>
   <div className='row'>
   <div className='col'>  
   <label htmlFor="nombre">Por nombre</label>
   </div>
   <div className='col'>  
   <input type="radio" name="validar" id="nombre" />
   </div>
   </div>
   </div>
  <div className='col'>
  <input type="text" name="" id="info" />
  </div>
  <div className='col'>
    <button onClick={()=>busqueda()}  type="button" className="btn btn-primary">Consultar</button>
  </div>
</div>
</div>

<div  className='container' id='procesos'>
<Listapro/>

</div>
</div>  

  </>
)
}


