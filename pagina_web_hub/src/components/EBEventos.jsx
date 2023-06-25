import React, { useEffect,useState } from "react";
import {Listaeven} from './Listaeven'
import {UnicoEvento} from './UnicoEvento'
import {UnicoEventonom} from './UnicoEventonom'
import ReactDOM from "react-dom/client";
export const EBEventos = () => {
  const busqueda=()=>{
    
   if(document.getElementById('numero').checked==true)
    { 
        const elemnt= document.getElementById('procesos2')
          const root= ReactDOM.createRoot(elemnt);
          root.render( <UnicoEvento valor={document.getElementById('info').value} />)
    }   
    else
    {
const elemnt= document.getElementById('procesos2')
 const root= ReactDOM.createRoot(elemnt);
      root.render( <UnicoEventonom valor={document.getElementById('info').value} />)
    
 }
        }
    
  return (
    <> 
      <div className='container' >
      <h2>Edición de Eventos</h2>
      <br />
 <div className='container' style={{width:"50%"}}>
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
  <div id='procesos2'>
<Listaeven/>

</div>
 </div>  
    
    </>
   







  );
};


