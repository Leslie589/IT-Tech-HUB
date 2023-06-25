import React ,{useState,useEffect} from 'react'
import "./Proyectos.css"
import axios from 'axios'
import ReactDOM, { createRoot } from "react-dom/client";
var global=''
export const UnicoProyectonom=(props)=>{
    
    const [cards,setCard]=useState([]);
    const[estados,setEstados]=useState([]);
    const[imagen,setImgen]=useState('');

    const cerrar=(e,id)=>{
      e.preventDefault()
      const elemnt= document.getElementById('Car'+id)
      console.log(elemnt)
          const root= ReactDOM.createRoot(elemnt);
          root.render( <div></div>)
    }
    const visualizar=(e,id)=>{
      e.preventDefault();
      const elemnt= document.getElementById('Car'+id)
      console.log(elemnt)
          const root= ReactDOM.createRoot(elemnt);
          root.render( <div className='row'> 
             < input type="file" name="" id={'agregarimagen'+id}  onChange={(e)=>agregarimagen(e,id)} />  
           <button  className="btn btn-primary"  onClick={(e)=>nuevaimagen(e,id)}>Agregar</button>
             <button  className="btn btn-warning" onClick={(e)=>cerrar(e,id)}>Cerrar</button></div>  )
      
      
          }
    const activar=(e,validar)=>{
        e.preventDefault();
      
  document.getElementById('DN'+validar).removeAttribute('hidden')
  document.getElementById('AN'+validar).setAttribute('hidden',true)
  document.getElementById('DD'+validar).removeAttribute('hidden')
  document.getElementById('AD'+validar).setAttribute('hidden',true)

  document.getElementById('DC'+validar).removeAttribute('hidden')
  document.getElementById('AC'+validar).setAttribute('hidden',true)

  document.getElementById('file'+validar).removeAttribute('hidden')
  document.getElementById('actualizar'+validar).removeAttribute('hidden')

  document.getElementById('DS'+validar).removeAttribute('hidden')
  
  document.getElementById('AS'+validar).setAttribute('hidden',true)


      
      }
      const agregarimagen=(e,validar)=>{
        e.preventDefault();
        var base64String='';
        var file = document.getElementById('agregarimagen'+validar)['files'][0]; //document.querySelector('input[type=file]')['files'][0];
           
        var reader = new FileReader();
        reader.onload = function () {
            base64String = reader.result.replace("data:", "")
                .replace(/^.+,/, "");
         //   imageBase64Stringsep = base64String;
      
   
         global=base64String;
       
        }
    reader.readAsDataURL(file);
      
       
      }
      const cargarimagen=(e,validar)=>{
        e.preventDefault();
        var base64String='';
        var file = document.getElementById('file'+validar)['files'][0]; //document.querySelector('input[type=file]')['files'][0];
            console.log(file)
        var reader = new FileReader();
        reader.onload = function () {
            base64String = reader.result.replace("data:", "")
                .replace(/^.+,/, "");
         //   imageBase64Stringsep = base64String;
         setImgen(base64String)
            display(validar,base64String)
        }
        reader.readAsDataURL(file);
      
       
      }
      const actualizar=(e,validar)=>
      {
      e.preventDefault()
      //alert('corre')
      var nombre=  document.getElementById('text1'+validar).value
      var Descripcion=document.getElementById('textarea1'+validar).value;
      var estado= document.getElementById("select"+validar).value;//.selectedIndex;
      var cupo=document.getElementById('cupo'+validar).value
      
      
        axios
        .post('/api/UpProyecto',{"IdProyecto":validar, "Nombre":nombre,"Descripcion":Descripcion,"Cupo":cupo,"Imagen":imagen ,"Estado":estado})
        .then((res)=>{
      
      if(res)
      {

        if(estado!=1)
        {
          document.getElementById(validar).setAttribute('hidden',true)
        }

        var info= document.getElementById("select"+validar);//.selectedIndex;
 
        document.getElementById('AN'+validar).innerText=nombre
        document.getElementById('AD'+validar).innerText=Descripcion
        document.getElementById('AS'+validar).innerText=info.options[info.selectedIndex].text;
        document.getElementById('AC'+validar).innerText=cupo



        document.getElementById('DN'+validar).setAttribute('hidden',true)
        document.getElementById('AN'+validar).removeAttribute('hidden')
        document.getElementById('DD'+validar).setAttribute('hidden',true)
        document.getElementById('AD'+validar).removeAttribute('hidden')
        document.getElementById('DC'+validar).setAttribute('hidden',true)
        document.getElementById('AC'+validar).removeAttribute('hidden')
      
        document.getElementById('file'+validar).setAttribute('hidden',true)
        document.getElementById('actualizar'+validar).setAttribute('hidden',true)
      
        document.getElementById('DS'+validar).setAttribute('hidden',true)
        
        document.getElementById('AS'+validar).removeAttribute('hidden')

      
      }    
        })
      }
      const nuevaimagen=(e,validar)=>
      {
      e.preventDefault()
console.log(global)
        axios
        .post('/api/agregarimagen',{"Imagen":global,'id':validar ,"nombre":'Proyecto'})
        .then((res)=>{
      
      if(res)
      {
      alert(res.data.Resuelto)
      
      }    
        })
      }

    useEffect(()=>{
    
        
        axios
        .post('/api/CatProyectoNom',{"Nombre":props.valor})
        .then((res)=>{
          if(res)
          {
          setCard(res.data.Resultado);
         
      
        }})

      

    },[]
      
      ///
      )

      useEffect(()=>{
        axios
        .get('/api/estados')
        .then((res)=>{
          if(res)
          {
         setEstados(res.data.Resultado);   
        }})
      },[])
    return(
        <>
    <div style={{marginTop:"5%"}}>
<table className="table">
  <thead className="thead-dark">
    <tr>
      <th scope='col'></th>
      <th scope="col">Id Proyecto</th>
      <th scope="col">Nombre</th>
      <th scope="col">Descripcion</th>
      <th scope="col">Cupo</th>
      <th scope="col">Imagen Pricipal</th>
      <th scope='col'> </th>
      <th scope='col'></th>
      <th scope='col'></th>
    </tr>
  </thead>
  <tbody>
  {cards.map((x,index)=>
    <tr key={index} id={x.IdProyecto}>
      <td ><button type="button" class="btn btn-warning" id={'editar'+x.IdProyecto} onClick={(e)=>activar(e,x.IdProyecto)}> Editar</button></td>
      <th scope="row">{x.IdProyecto}</th>


     <td id={'DN'+x.IdProyecto} hidden ><textarea name=""   id={'text1'+x.IdProyecto}  rows="1" >{x.Nombre}</textarea> </td>
         <td id={'AN'+x.IdProyecto} >{x.Nombre} </td>
      
    <td id={'DD'+x.IdProyecto} hidden><textarea name=""   id={'textarea1'+x.IdProyecto}  rows="2" >{x.Descripcion.slice(0,150)}</textarea> </td>
     <td id={'AD'+x.IdProyecto} >{x.Descripcion.slice(0,150)} </td>

     <td  id={'DC'+x.IdProyecto} hidden >
        <textarea name="" id={"cupo"+x.IdProyecto} rows="1">{x.Cupo}</textarea>
     </td>
     <td id={'AC'+x.IdProyecto}>{x.Cupo}</td>

    
      <td id={'DI'+x.IdProyecto}><img src={x.Imagen} alt="" id={'imagen'+x.IdProyecto}  style={{width:'30%',cursor:"pointer"}}  />
      < input type="file" name="" id={'file'+x.IdProyecto} hidden onChange={(e)=>cargarimagen(e,x.IdProyecto)} />      
      </td>
       <td id={'DS'+x.IdProyecto} hidden><select name="" id={"select"+x.IdProyecto} >
        <option value={x.IdEstado}>{x.estado}</option>
        {estados.map((items,ix)=>
          <option key={ix} value={items.idestado}>{items.nombre}</option>
        )}
      </select></td>  
    <td id={'AS'+x.IdProyecto}>{x.estado}</td>
    
     
       <td >  <button type="button" id={'actualizar'+x.IdProyecto} hidden  className="btn btn-primary" onClick={(e)=>actualizar(e,x.IdProyecto)}>Actualizar</button></td>
       
      
       <td id={'DAI'+x.IdProyecto}>  <button type="button" id={'imagenadd'+x.IdProyecto} className="btn btn-light" onClick={(e)=>visualizar(e,x.IdProyecto)} >Agregar Imagen</button></td> 
      
      <td id={'Car'+x.IdProyecto}></td>
      
  
    </tr>
    )}
 
  </tbody>
</table>

</div>
        
        
        </>
    )
}

function display(validar,base64String) {
    var imas= document.getElementById("imagen"+validar);
  
  var src = "data:image/jpeg;base64,";
    src += base64String;
  imas.src=src
  
  
  }