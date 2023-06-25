import React, { useState,useEffect } from 'react'

import { Card } from './Card';
import { Carrousel } from './Carrousel';

export const Home = (props) => {

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
