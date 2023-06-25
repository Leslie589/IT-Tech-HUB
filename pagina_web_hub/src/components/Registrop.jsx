import React, { useState } from "react";
import axios from "axios";
import "./Registrop.css"
import Swal from 'sweetalert2'

export default function Registrop(props) {
    const [nombrea, setnombrea] = useState("");
    const [pp, setPp] = useState("");
    const [pm, setPm] = useState("");
    const [carrera, setcarrera] = useState("");
    const [proyecto, setproyecto] = useState("");
    const [numc, setnumc] = useState("");
    const [email, setEmail] = useState("");
    const handleSubmit= async  (event)=> {
        //Para que me valide el llenado  de los datos y no los borre hasta terminar 
        event.preventDefault();
        var conta= props.contador+1
        if (conta< props.Cupo)
       { 
        try {
        // Validar el correo con regex con los dominios correspondientes

        const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
        const isValidEmail = emailRegex.test(email);
        if (isValidEmail==true) {

           if( email.endsWith('@tectijuana.edu.mx') || email.endsWith('@tectijuana.tecnm.mx') )
                {

                    axios
                    .post('/api/AltaAlumno',
                    {"NControl":numc,"Nombre":nombrea,"Apellidop":pp,"Apellidom":pm,"Carrera":carrera,"Correo":email,"Proyecto":props.id})
                    .then((res)=>{
                        if(res)
                        {
                            Swal.fire({
                                icon: "success",
                                title: "Registro exitoso",
                                text: 'El alumno se ha registrado correctamente al proyecto.',
                                
                              });

            
   document.getElementById("Nombre").value='' 
   document.getElementById("Apellidop" ).value='' 
      document.getElementById("Apellidom").value='' 
         document.getElementById("carrera" ).value='' 
         
         document.getElementById("numc" ).value='' 
            document.getElementById("email" ).value='' 
              document.getElementById("proyecto" ).value='' 
                        }
                    })
                 
                }
                else
                {
                    Swal.fire({
                        icon: "error",
                        title: "Correo no válido",
                        text: "Favor de ingresar el correo institucional.",
                        
                      });
                    return;

                }
          }

    
              } catch (error) {
                console.log(error);
              }
            }
            else  {


            Swal.fire({
                icon: "error",
                title: "El proyecto ha alcanzado el limite de participantes.",
                text: "Consulta otro proyecto de tu agrado.",
                
              });
           }
            };   

    return (
        <> 
        <center>
            
                <div  onSubmit={handleSubmit} className='container-registro' style={{ marginTop: "-50px", background: "#99DBF5", padding: 20 }}>
                    <form id="formulario">
                       <h1>Registro</h1>
                        <br />
                        <div>
                            <input style={{ marginBottom: 20 }} type="text" id="Nombre" className='form-control form-control-lg' placeholder='Nombre: '  onChange={(event) => { setnombrea(event.target.value) }} required />
                        </div>
                        <div>
                            <input style={{ marginBottom: 20 }} type="text" id="Apellidop" className='form-control form-control-lg' placeholder='Apellido Paterno: '  onChange={(event) => { setPp(event.target.value) }} required />
                        </div>
                        <div>
                            <input style={{ marginBottom: 20 }} type="text" id="Apellidom" className='form-control form-control-lg' placeholder='Apellido Materno: '  onChange={(event) => { setPm(event.target.value) }} required />
                        </div>
                        <div>
                            <input style={{ marginBottom: 20 }} type="text" id="carrera" className='form-control form-control-lg' placeholder='Carrera:' value={carrera}onChange={(event) => { setcarrera(event.target.value) }} required />
                        </div>
                        <div> 
                            <input style={{ marginBottom: 20 }} type="text" id="numc" className='form-control form-control-lg' placeholder='Número de control: ' onChange={(event) => { setnumc(event.target.value) }} required />
                        </div>
                        
                        <div> 
                            <input style={{ marginBottom: 20 }} type="email" className='form-control form-control-lg' id="email" placeholder='Correo institucional:'  onChange={(event) => { setEmail(event.target.value) }} required />
                        </div>
                        <div>
                            <input style={{ marginBottom: 20 }} type="text" id="proyecto" className='form-control form-control-lg' disabled placeholder='Proyecto ' value={props.Nombre} onChange={(event) => { setproyecto(event.target.value) }} required />
                        </div>
                    
                        <br/>
                        <button  className='btn btn-lg' style={{ background: "#16B821", color:'white' }}>Terminar registro.</button>
                        <br/>
                        <br/>
                
                    </form>
                </div>
            </center>
        </>
    )
}



