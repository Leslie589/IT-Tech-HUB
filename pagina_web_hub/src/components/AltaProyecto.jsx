import React, { useState ,useEffect } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import Swal from 'sweetalert2'
import { render } from "@testing-library/react";

export  function AltaProyecto(props) {
    const [nombrea, setnombrea] = useState("");
    const [pp, setPp] = useState("");
    const [cap, setCap] = useState("");
    
    
    var base64String = "";
    const Uploaded=()=> {
        var file = document.querySelector('input[type=file]')['files'][0];
      
        var reader = new FileReader();
        reader.onload = function () {
            base64String = reader.result.replace("data:", "")
                .replace(/^.+,/, "");
         //   imageBase64Stringsep = base64String;
        }
        reader.readAsDataURL(file);
    }
   // const [post, setPost] = React.useState(null);


    const handleSubmit= async  (event)=> {
        //Para que me valide el llenado  de los datos y no los borre hasta terminar 
        event.preventDefault();
        try {
            console.log(base64String)
            axios
            .post('/api/AltaProyecto',{"Nombre":nombrea,"Descripcion":pp,"Cap":cap,"Imagen":base64String})
            .then((res)=>{
            if(res){
                Swal.fire({
                    title:  res.data.Resultado,
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                  });

                  
                document.getElementById('Nombre').value=''
                document.getElementById('Descripcion').value=''
                document.getElementById('Capacidad').value=''
                const elemnt= document.getElementById('files')
                const root= ReactDOM.createRoot(elemnt);
                root.render(<input style={{ marginBottom: 20 }} type="file" id="fileId" className='form-control form-control-lg'   onChange={(event) => { Uploaded() }} required />
                )
          
            }
            })
            
              } catch (error) {
                console.log(error);
              }
            };   


            useEffect(()=>{
                var datos = localStorage.getItem("inicio");
                const data=JSON.parse(datos)
                if(data.activo==true)
                  {
                    console.log()
                 localStorage.setItem('inicio', [{"activo":false,"pagina":props.locacion}]); 
                  }
               
              },[])            
           
           // if (error) return `Error: ${error.message}`;
           // if (!post) return "No post!"
          
          //  alert(post.message)
            
         
    
    
    return (
        <> 
        <center>
            
                <div  onSubmit={handleSubmit} className='container' style={{ width: "60%", marginTop: "-30px", background: "#FEC868", padding: 20 }}>
                    <form id="formulario">
                    <h1>Alta de Proyectos</h1>
                        <br />
                        <div>
                            <input style={{ marginBottom: 20 }} type="text" id="Nombre" className='form-control form-control-lg' placeholder='Nombre del Proyecto: '  onChange={(event) => { setnombrea(event.target.value) }} required />
                        </div>
                        <div  className="form-group green-border-focus">
                            <textarea style={{ marginBottom: 20 }} type="textarea" id="Descripcion" className='form-control md-textarea form-control-lg' rows='3' placeholder='Descripción: '  onChange={(event) => { setPp(event.target.value) }} required />
                        </div>
                        <div>
                            <input style={{ marginBottom: 20 }} type="text" id="Capacidad" className='form-control form-control-lg' placeholder='Capacidad: '  onChange={(event) => { setCap(event.target.value) }} required />
                        </div>
                        
                        <div id="files">
                            <input accept="image/x-png,image/gif,image/jpeg" style={{ marginBottom: 20 }} type="file" id="fileId" className='form-control form-control-lg'   onChange={(event) => { Uploaded() }} required />
                        </div>
                        
                        <br/>
                        <button  className='btn btn-danger btn-lg'>Publicar Proyecto</button>
                        <br/>
                        <br/>
                
                    </form>
                </div>
            </center>
        </>
    )
}
