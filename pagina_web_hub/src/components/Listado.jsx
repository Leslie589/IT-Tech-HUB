import React ,{useState,useEffect} from 'react'
import "./Proyectos.css"
import axios from 'axios'
export const Listado=(props)=>{

    const [cards,setCard]=useState([]);
    const[estados,setEstados]=useState([]);
    const[imagen,setImgen]=useState('');
    

    useEffect(()=>{
        axios
        .post('/api/InformeProyecto',{"fecha1":props.Fechai,"fecha2":props.Fechaf})
        .then((res)=>{
          if(res)
          {
          setCard(res.data.Resultado);
         
      
        }})
      },[])

  
    return(
<>
<div style={{marginTop:"5%"}}>
<table className="table">
  <thead className="thead-dark">
    <tr>
   
      <th scope="col">Id Proyecto</th>
      <th scope="col">Proyecto</th>
      <th scope="col">Descripcion</th>
      <th scope="col">Cupo</th>
      <th scope='col'>Fecha Registro</th>
      <th scope='col'>Fecha Finalizacion</th>
      <th scope='col'>Estado</th>
      <th scope="col">No. Control</th>
      <th scope='col'>Nombre Alumno </th>
      <th></th>
      <th></th>
      <th scope='col'>Correo</th>
      <th scope='col'>Carrera</th>
    </tr>
  </thead>
  <tbody>
  {cards.slice(0,15).map((x,index)=>
    <tr key={index} id={x.IdProyecto}>
     <td>{x.IdProyecto}</td>
     <td>{x.Proyecto}</td>
     <td>{x.Descripcion.slice(0,15)}</td>
     <td>{x.Cupo}</td>
     <td>{x.FechaRegistro}</td>
     <td>{x.FechaFinalizacion}</td>
     <td>{x.Estado}</td>
     <td>{x.NoControl}</td>
     <td>{x.Alumno} </td>
     <td>{x.Apaterno}</td>
     <td>{ x.AMaterno}</td>
     <td>{x.Correo}</td>
     <td>{x.carrera}</td>
 

    </tr>
    )}
 
  </tbody>
</table>

</div>

    </>)
}



  