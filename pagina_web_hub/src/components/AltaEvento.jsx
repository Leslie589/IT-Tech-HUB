import React, { useState ,useEffect} from "react";
import axios from "axios";
import Swal from 'sweetalert2'
    import ReactDOM from "react-dom/client";
export  function AltaEvento() {
    const [nombrea, setnombrea] = useState("");
    const [pp, setPp] = useState("");
    
    
      
    var base64String = "";
    const Uploaded=()=> {
        var file = document.querySelector('input[type=file]')['files'][0];
      
        var reader = new FileReader();
        reader.onload = function () {
            base64String = reader.result.replace("data:", "")
                .replace(/^.+,/, "");
         //   imageBase64Stringsep = base64String;
         console.log(base64String)
        }
        reader.readAsDataURL(file);
    }



    const handleSubmit= async  (event)=> {
        //Para que me valide el llenado  de los datos y no los borre hasta terminar 
        event.preventDefault();
        try {
   
            axios
            .post('/api/AltaEvento',{"Nombre":nombrea,"Descripcion":pp,"Imagen":base64String})
            .then((res)=>{
            if(res){
                Swal.fire({
                    title:  res.data.Resultado,
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                  });
                document.getElementById('Nombre').value=''
                document.getElementById('Descripcion').value=''
                const elemnt= document.getElementById('files')
                const root= ReactDOM.createRoot(elemnt);
                root.render(<input style={{ marginBottom: 20 }} type="file" id="fileId" className='form-control form-control-lg'   onChange={(event) => { Uploaded() }} required />
                )
          
            }
            })
            
              } catch (error) {
                console.log(error);
              }
            
    }
    useEffect(()=>{
        var datos = localStorage.getItem("inicio");
        if(datos.activo==true)
          {
         localStorage.setItem('inicio', [{"activo":false,"pagina":props.locacion}]); 
          }
       
      },[])      
    return (
        <> 
        <center>
            
                <div  onSubmit={handleSubmit} className='container' style={{ width: "60%", marginTop: "-30px", background: "#FEC868", padding: 20 }}>
                    <form id="formulario">
                    <h1>Alta de Eventos</h1>
                        <br />
                        <div>
                            <input style={{ marginBottom: 20 }} type="text" id="Nombre" className='form-control form-control-lg' placeholder='Nombre del Evento: '  onChange={(event) => { setnombrea(event.target.value) }} required />
                        </div>
                        <div>
                            <textarea style={{ marginBottom: 20 }} type="textarea" id="Descripcion" className='form-control form-control-lg' rows='3' placeholder='Descripcion:'  onChange={(event) => { setPp(event.target.value) }} required />
                        </div>
                        <div id="files">
                            <input style={{ marginBottom: 20 }} accept="image/x-png,image/gif,image/jpeg" type="file" id="fileId" className='form-control form-control-lg'   onChange={(event) => { Uploaded() }} required />
                        </div>
                        
                        <br/>
                        <button  className='btn btn-danger btn-lg'>Publicar Evento</button>
                        <br/>
                        <br/>
                
                    </form>
                </div>
            </center>
        </>
    )
}


//return (
  //  <form onSubmit={handleSubmit}>
     //   <div>
      //      <label htmlFor="nombrea">Nombre:</label>
         //   <input type="text" id="nombrea" value={nombrea} onChange={(e) => setnombrea(e.target.value)} required />
      //  </div>
      //  <div>
      //      <label htmlFor="carrera">Carrera:</label>
    //        <input type="text" id="carrera" value={carrera} onChange={(e) => setcarrera(e.target.value)} required />
       // </div>
      //  <div>
        //    <label htmlFor="numc">Número de control:</label>
        //    <input type="text" id="numc" value={numc} onChange={(e) => setnumc(e.target.value)} required />
      //  </div>
      //  <div>
       //     <label htmlFor="proyecto">Proyecto:</label>
       //     <input type="text" id="proyecto" value={proyecto} onChange={(e) => setproyecto(e.target.value)} required />
       // </div>
       // <div>
       //     <label htmlFor="email">Correo electrónico:</label>
        //    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
       // </div>
      //  {errorMessage && <div>{errorMessage}</div>}
       // <button type="submit">Registrar usuario</button>
   // </form>
//);
//}
