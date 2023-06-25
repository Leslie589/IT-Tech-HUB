import React ,{useState,useEffect} from 'react'
import "./Proyectos.css"
import axios from 'axios'
export const AgregarImagenes=(props)=>{

    const [cards,setCard]=useState([]);
    const[estados,setEstados]=useState([]);
    const[imagen,setImgen]=useState('');
    const[imagenes,setImagenes]=useState(false);
  
  
      const agregarimagen=(e,validar)=>{
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
      const nuevaimagen=(e,validar)=>
      {
      e.preventDefault()
    
        axios
        .post('/api/agregarimagen',{"Imagen":imagen })
        .then((res)=>{
      
      if(res)
      {
      
      
      }    
        })
      }

   
    return(
<>
<div id='imagenescarga'>
< input type="file" name="" id={'fileimagen'+props.id} hidden onChange={(e)=>agregarimagen(e,props.id)} />  

     <botton >Agregar</botton>
       <button >Cerrar</button>   </div>  
    </>)
}



function display(validar,base64String) {
    var imas= document.getElementById("imagen"+validar);
  
  var src = "data:image/jpeg;base64,";
    src += base64String;
  imas.src=src
  
  
  }
  