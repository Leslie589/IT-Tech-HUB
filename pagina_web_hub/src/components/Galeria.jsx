import React, { useEffect,useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { MasGaleria } from "./MasGaleria";
import ReactDOM, { createRoot } from "react-dom/client";
import "./Galeria.css"
export const Galeria = (props) => {

    const [cards,setCard]=useState([]);
    const [cardev,setCardev]=useState([]);
    const masgaleria=(e,id,nombre, proev)=>{
       // const elemnt= document.getElementById('renderizados');
        //const root= createRoot(elemnt);
        const jsonvalue=[{"activo":false,"pagina":15,'proyecto':id,'nombre':nombre,'proev':proev}]
 localStorage.setItem('inicio', JSON.stringify(jsonvalue)); 
       props.root1.render(<MasGaleria id={id} nombre={nombre} proev={proev}/>);
    }
    useEffect(()=>{
      axios
      .get('/api/CatProyecto')
      .then((res)=>{
        setCard(res.data.Resultado);

      })
  axios
  .get("/api/CatEvento")
  .then((res)=>{
  setCardev(res.data.Resultado)

  })
  console.log('valiste')
  },[])
  

    return (
        <div style={{ marginTop: "-50px"}} >
        <h4  className="display-4 fw-bold lh-1 ">Galería.</h4>
        <br/>
        <p   className="clic" style={{ textAlign:"center"}}>Haz clic en la imagen para visualizar la galeria.</p>

        <div className="container" >
  
            <div className="row "  >
{cards.map((x,index)=>
                <div key={index} id={x.IdProyecto} className="col-sm-4 my-4">
                    <div className="card w-70 "   >
                       <a href="#MasGaleria"> <img src={x.Imagen} style={{cursor:'pointer'}} className="d-disabled w-100" height="300" alt="" onClick={(e)=>masgaleria(e,x.IdProyecto,'Proyecto', x.Nombre)} />
                       </a>
                        <div className="card-body">
                            <h5 className="card-title">{x.Nombre}</h5>
                           
                        </div>
                    </div>

                </div>
)}
{cardev.map((x,index)=>
                <div key={index} id={x.IdEvento} className="col-sm-4 my-4">
                    <div className="card w-70 "   >
                    <a href="#MasGaleria"> <img src={x.Imagen} className="d-disabled w-100" style={{cursor:'pointer'}}  height="300" alt="" onClick={(e)=>masgaleria(e,x.IdEvento,'Evento', x.Nombre)} />
                    </a> <div className="card-body">
                            <h5 className="card-title">{x.Nombre}</h5>
                           
                        </div>
                    </div>

                </div>
)}
               
               
       
               </div>
                
            </div>
        </div>
    )
}