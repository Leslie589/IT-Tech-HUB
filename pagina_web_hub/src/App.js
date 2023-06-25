import './App.css';
import React, { useEffect, useState } from "react";
import { Header } from './components/Header';
import {BrowserRouter, Routes , Route} from "react-router-dom"
import { Footer } from './components/Footer';
import ReactDOMClient,{createRoot} from 'react-dom/client'; 



function App() {
 // const [uses,setUses]=useState(Uses)

/*useEffect(()=>{
setUses(   { userlocal:false,
  pagina:1})
  console.log(uses)
},[])*/

  return (
    <div className="App">

      <BrowserRouter>
    

      <Routes>
        <Route  path="/" element={<Header/>}  />
      </Routes>

      </BrowserRouter>
      <br/>
      <br/>
      <Footer/>
   
     
    </div>
  );
}

export default App;
