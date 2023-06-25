import React,{useState,useEffect} from 'react'


//import {Login} from './Login';
import { Home } from './Home';
import { AdminMenu } from './AdminMenu';
import { MenuLocal } from './MenuLocal';
import ReactDOM, { createRoot } from "react-dom/client";
import { render } from 'react-dom';
import { Carrousel } from './Carrousel';
import { Card } from './Card';
import { Proyectos } from './Proyectos';
import { Galeria } from './Galeria';
import Login from './Login';
import {AltaProyecto} from "./AltaProyecto";  
import {AltaEvento} from "./AltaEvento";  
import {EBEventos} from "./EBEventos";  
import {EBProyectos} from "./EBProyectos";  
import { Reporte } from './Reporte';
import { Eventos } from './Eventos';
import { HomeAd } from './HomeAd';
import { Proyecto } from './Proyecto';
import { MasGaleria } from './MasGaleria';
import Registrop from './Registrop';

//position: 'fixed', top: 0,
export const Header = () => {

 const[root1,setRoot]=useState();
 const[root2,setRoot2]=useState();

useEffect(()=>{
 const validador=  localStorage.getItem("inicio")//JSON.parse( localStorage.getItem("inicio"));
 const elemnt2=document.getElementById('Menus')
 const elemnt=document.getElementById('renderizados')
const root=createRoot(elemnt);
const roots=createRoot(elemnt2)
 console.log(validador)
 if (validador===null) {
localStorage.setItem('info',10)
setRoot(root)
setRoot2(roots)
  //const elemnt2=document.getElementById('Menus')
 /* localStorage.setItem('root1',)
  localStorage.setItem('root2',)*/
  const jsonvalue=[{"activo":false,"pagina":1,'proyecto':0}]

localStorage.setItem('inicio', JSON.stringify(jsonvalue)); 
  //root2=createRoot(elemnt2)
  //const elemnt=document.getElementById('renderizados')
 //root=createRoot(elemnt)
//  setRoot(root)
}
else
{

var datos = localStorage.getItem("inicio");

const data=JSON.parse(datos)
console.log('reiniciando')
console.log(data)
  if (data[0].pagina>=6 && data[0].pagina<12 && data[0].activo===true){
    console.log('validado')

  roots.render(<AdminMenu root1={root} root2={roots}/>)
switch(data[0].pagina)
{
  case 6:

    root.render(<HomeAd root1={root} root2={roots} />);
break;
case 7:
console.log('entro')
  root.render(<AltaProyecto root1={root}  root2={roots}/>);

  break;
case 8:

  root.render(<AltaEvento root1={root} root2={roots}/>);
break;
case 9:

  root.render(<EBProyectos root1={root} root2={roots} />);
  break;
  case 10:
    root.render(<EBEventos root1={root} root2={roots} />);
    break
    case 11:

  root.render(<Reporte root1={root} root2={roots}/>);
  break;

}

  }
  else{
    console.log('locales')
    console.log(data[0].pagina)
    roots.render(<MenuLocal root1={root}  root2={roots}/>)
    switch(data[0].pagina)
  {case 1:

    root.render(<Home root1={root}  root2={roots}/>);
break;
case 2:
  root.render(<Proyectos root1={root} root2={roots}/>);

  break;
case 3:
  root.render(<Eventos root1={root} root2={roots} />);

break;
case 4:
  root.render(<Galeria root1={root} root2={roots} />);
  break;
  case 5:
    root.render(<Acceso root1={root} root2={roots}/>);
    break
  case 13:
    root.render(<Proyecto root1={root} root2={roots} id={data[0].proyecto}/>)
    break;
    case 14:
 
      console.log(data)
      root.render(<Registrop root1={root} root2={roots} id={data[0].proyecto}  Nombre={data[0].Nombre} Cupo={data[0].Cupo} contador={data[0].contador} />)
      break;
      case 15:
        console.log('aqui 15')
        console.log(data)
        root.render(<MasGaleria root1={root} root2={roots} id={data[0].proyecto} nombre={data[0].nombre} proev={data[0].proev}/>);
        break;
}}

}
}
,[])

  return (
    <>
    <header style={{color:'white', width: '100%', zIndex: 999}} id='Menus'>

    <br/>
    <br/>  
     <br/>
    </header>
    
      <br/>
  <br/>

  <div id='renderizados'><Home root1={root1} root2={root2}/>  <br /> </div>


     </>
   
 
 )

}


