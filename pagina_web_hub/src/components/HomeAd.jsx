import React, { useState,useEffect } from 'react'

import { Card } from './Card';
import { Carrousel } from './Carrousel';

export const HomeAd = (props) => {



  useEffect(()=>{

 //localStorage.setItem('inicio',JSON.stringify(activo))
 var datos = localStorage.getItem("inicio");
 console.log('home')
const data=JSON.parse(datos)

  },[])
  return (
    <>
  <br/>
<br/>

  <Carrousel root1={props.root1} />
        <br/>
       <Card root1={props.root1}/>
   
     
    </>
  )
}
