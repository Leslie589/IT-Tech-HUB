const express = require("express");
const route = express();
const query = require("../MySql/Querys");
const path = require("path");
const fs = require("fs");
const uuid = require('uuid');
var direcion = __dirname;
  var dirs = direcion.substring(0, direcion.length - 7);
function savePictures( Id,Tipo,req,secuencia){
  console.log(req.body)
  binarydata = new Buffer.from(req.body.Imagen, "base64").toString("binary");
  fs.writeFile(
    dirs + `/Recursos/${Id}${Tipo} ${secuencia}.png`,
    binarydata,
    "binary",
  function (err) {
    if(err!=null){
    console.log(err);
    }}
  );

}
function savePictures2( Id,Tipo,req,secuencia){
 // console.log(req.body)
  binarydata = new Buffer.from(req, "base64").toString("binary");
  fs.writeFile(
    dirs + `/Recursos/${Id}${Tipo} ${secuencia}.png`,
    binarydata,
    "binary",
  function (err) {
    if(err!=null){
    console.log(err);
    }}
  );

}

route.post("/api/AltaProyecto", (req, res) => {

  query
    .InsertarProyecto(req.body)
    .then((response) => {
      if (response) {
      console.log('pas1')
        query
          .prueba(req.body.Nombre)
          .then((idp) => {
            if (idp)
            {
              console.log('pas2')
              savePictures(  idp[0].IdProyecto,"Proyecto",req,1);
            query
              .InsertarRecursos(idp[0].IdProyecto+"Proyecto","/Recursos/" + idp[0].IdProyecto+"Proyecto" + " 1.png",idp[0].IdProyecto)
              .then((response) => {
                if (response) {
                  console.log('pas3')
                  console.log("insertar recurso")
                  query
                    .InsertarHisProyec(req.body,"Insersion de datos",idp[0].IdProyecto)
                    .then((response) => {
                      if (response) {
                        console.log('validar')
                       res.status(200).json({ Resultado:"Proyecto creado con numero :" + idp[0].IdProyecto});
                      }
                    })
                    .catch((error) => {
                      res.status(200).json({ Alerta: error.sqlMessage });
                    });
                }
              })
              .catch((error) => {
                res.status(500).json({ Alerta: error.sqlMessage });
              });
       }
       })
          .catch((error) => {
            res.status(500).json({ Alerta: error.sqlMessage });
          });
      }
    })
    .catch((error) => {
      res.status(500).json({ Alerta: error.sqlMessage });
    });
});

route.post("/api/AltaEvento", (req, res) => {

  query
    .InsertarEvento(req.body)
    .then((idp) => {
      if (idp) {
      
console.log(idp)
    savePictures(  idp,"Evento",req,1);

          query
            .InsertarRecursosEv(idp+"Evento","/Recursos/" +idp+'Evento' + " 1.png",idp)
            .then((response) => {
              if (response) {
                console.log('paso4')
                res.status(200).json({ Resultado:"Evento creado con numero :" + idp});
                   
              }
            })
            .catch((error) => {
              res.status(200).json({ Alerta: error.sqlMessage });
            });
       
  }
})
        //pendiente generar consulta para id
       // 
        
  
    .catch((error) => {
      res.status(500).json({ Alerta: error.sqlMessage });
    });
});

route.post("/api/AdminAcceso", (req, res) => {

  console.log(req.body)
  //res.status(200).json({bandera:"true"})
  
  query
    .AdminAcceso(req.body.email, req.body.pass)
    .then((Acceso) => {
      console.log(Acceso)

if (Acceso.length>0)
{

      res.status(200).json({ bandera:1 });
   }
  else
{console.log('info')
  res.status(200).json({ bandera: 0 });
  
}   })
    .catch((error) => {
      res.status(500).json({ Alerta: error.sqlMessage });
    });
  });

route.post("/api/AltaAlumno", (req, res) => {
  console.log(req.body)
 query
.validaralumno(req.body.NControl)
.then((Validacion)=>{
  console.log(Validacion)
  if(Validacion.length>0)  {
    
console.log(Validacion)
  }
  else
  {
    query
    .RegistroAlumno(req.body)
    .then((ResRegistroA) => {
      if (ResRegistroA) {
        console.log(ResRegistroA)
        query
          .InsertarRelacionAlPro(req.body)
          .then((Resultado) => {
            if (Resultado) {
              query
              .ActualizarContador(req.body)
              .then((Resultado)=>{
                if (Resultado)
                {
                 res.status(200).json({ Alerta: "Registro realizado" });
            }
          })
             
            }
          })
          .catch((error) => {
            res.status(200).json({ Alerta: error.sqlMessage });
            // console.log(error)
          });
      }
    })
    .catch((error) => {
  
      res.status(500).json({ Alerta: error.sqlMessage });
      //console.log(error)
    });
  }
})
.catch((error)=>
{
  res.status(500).json({ Alerta: error.sqlMessage });
})
  /*query
    .RegistroAlumno(req.body)
    .then((Resultado) => {
      if (Resultado) {
        query
          .InsertarRelacionAlPro(req.body)
          .then((Resultado) => {
            if (Resultado) {
              res.status(200).json({ Alerta: "Registro realizado" });
            }
          })
          .catch((error) => {
            res.status(200).json({ Alerta: error.sqlMessage });
            // console.log(error)
          });
      }
    })
    .catch((error) => {
      console.log("aqui");
      res.status(500).json({ Alerta: error.sqlMessage });
      //console.log(error)
    });
 */

});
//var src = "data:image/jpeg;base64,";
route.get("/api/estados",(req,res)=>{
query
.Estados()
.then((Resultado)=>
{
if(Resultado)
{
  res.status(200).json({Resultado:Resultado});
}
})
.catch((error)=>{
  res.status(500).json({ Alerta: error.sqlMessage });
});
})
route.get("/api/Carrucel",(req,res)=>{

  var direcion = __dirname;
  var dirs = direcion.substring(0, direcion.length - 7);
  query
    .CatalogoProyecto()
    .then((Resultado) => {
      Resultado.forEach((element) => {
        if (element.Ruta != null) {
          var bitmap = fs.readFileSync(dirs + element.Ruta);
          element.Imagen ="data:image/jpeg;base64,"+ Buffer.from(bitmap).toString("base64");
        }
      });
//console.log(Resultado)
      res.status(200).json({Resultado:Resultado});
    })
    .catch((error) => {
      console.log("aqui");
      res.status(500).json({ Alerta: error.sqlMessage });
    });

})
route.get("/api/Carrucel2",(req,res)=>{

  var direcion = __dirname;
  var dirs = direcion.substring(0, direcion.length - 7);
  query
    .CatalogoEvento()
    .then((Resultado) => {
      Resultado.forEach((element) => {
        if (element.Ruta != null) {
          var bitmap = fs.readFileSync(dirs + element.Ruta);
          element.Imagen ="data:image/jpeg;base64,"+ Buffer.from(bitmap).toString("base64");
        }
      });
//console.log(Resultado)
      res.status(200).json({Resultado:Resultado});
    })
    .catch((error) => {
      console.log("aqui");
      res.status(500).json({ Alerta: error.sqlMessage });
    });

})
route.get("/api/CatProyecto", (req, res) => {
  var direcion = __dirname;
  var dirs = direcion.substring(0, direcion.length - 7);
  console.log(dirs)
  query
    .CatalogoProyecto()
    .then((Resultado) => {
      if(Resultado){
        console.log(Resultado)
      Resultado.forEach((element) => {
        if (element.Ruta != null) {
          var bitmap = fs.readFileSync(dirs + element.Ruta);
          element.Imagen = "data:image/jpeg;base64,"+Buffer.from(bitmap).toString("base64");
        }
      });
console.log(Resultado)
      res.status(200).json({Resultado:Resultado});
    }})
    .catch((error) => {
     
      res.status(500).json({ Alerta: error.sqlMessage });
    });
});

route.get("/api/CatEvento", (req, res) => {
  var direcion = __dirname;
  var dirs = direcion.substring(0, direcion.length - 7);
  query
    .CatalogoEvento()
    .then((Resultado) => {
      if(Resultado)
      {
        console.log(Resultado)
      Resultado.forEach((element) => {
        if (element.Ruta != null) {
          var bitmap = fs.readFileSync(dirs + element.Ruta);
          element.Imagen ="data:image/jpeg;base64,"+ Buffer.from(bitmap).toString("base64");
        } else {
          element.Imagen = "";
        }
      });
      console.log(Resultado);
      res.status(200).json({Resultado:Resultado});
    }
  })
    .catch((error) => {
      res.status(500).json({ Alerta: error.sqlMessage });
    });
});

route.post("/api/CatProyectoId", (req, res) => {
  console.log(req.body)
  var direcion = __dirname;
  var dirs = direcion.substring(0, direcion.length - 7);
  query
    .CatalogoProyectoId(req.body)
    .then((Resultado) => {
      Resultado.forEach((element) => {
        if (element.Ruta != null) {
          var bitmap = fs.readFileSync(dirs + element.Ruta);
          element.Imagen = "data:image/jpeg;base64,"+Buffer.from(bitmap).toString("base64");
        }
      });
console.log(Resultado)
      res.status(200).json({Resultado:Resultado});
    })
    .catch((error) => {
      console.log("aqui");
      console.log(error)
      res.status(500).json({ Alerta: error.sqlMessage });
    });
});

route.post("/api/CatEventoId", (req, res) => {
  var direcion = __dirname;
  var dirs = direcion.substring(0, direcion.length - 7);
  query
    .CatalogoEventoId(req.body)
    .then((Resultado) => {
      if (Resultado){
        console.log(Resultado);
      Resultado.forEach((element) => {
        if (element.Ruta != null) {
          var bitmap = fs.readFileSync(dirs + element.Ruta);
          element.Imagen ="data:image/jpeg;base64,"+ Buffer.from(bitmap).toString("base64");
        } else {
          element.Imagen = "";
        }
      });
    }
      
      res.status(200).json({Resultado:Resultado});
    })
    .catch((error) => {
      res.status(500).json({ Alerta: error.sqlMessage });
    });
});

route.post("/api/CatProyectoNom", (req, res) => {
  console.log(req.body)
  var direcion = __dirname;
  var dirs = direcion.substring(0, direcion.length - 7);
  query
    .CatalogoProyectoNom(req.body)
    .then((Resultado) => {
      if(Resultado){
      
        Resultado.forEach((element) => {
        if (element.Ruta != null) {
          var bitmap = fs.readFileSync(dirs + element.Ruta);
          element.Imagen = "data:image/jpeg;base64,"+Buffer.from(bitmap).toString("base64");
        }
      })
      console.log(Resultado)
      res.status(200).json({Resultado:Resultado});
    }})
    .catch((error) => {
      console.log("aqui");
      res.status(500).json({ Alerta: error.sqlMessage });
    });
});

route.post("/api/CatEventoNom", (req, res) => {
  var direcion = __dirname;
  var dirs = direcion.substring(0, direcion.length - 7);
  query
    .CatalogoEventoNom(req.body)
    .then((Resultado) => {
      Resultado.forEach((element) => {
        if (element.Ruta != null) {
          var bitmap = fs.readFileSync(dirs + element.Ruta);
          element.Imagen ="data:image/jpeg;base64,"+ Buffer.from(bitmap).toString("base64");
        } else {
          element.Imagen = "";
        }
      });
      console.log(Resultado)
      res.status(200).json({Resultado:Resultado});
    })
    .catch((error) => {
      res.status(500).json({ Alerta: error.sqlMessage });
    });
});

route.post("/api/UpProyecto",(req,res)=>{
  console.log(req.body)
if (req.body.Estado==1)
{
  console.log('pasa')

  query.ActualizarProyecto(req.body)
  .then((Resultado)=>{
if(Resultado)
{


  if(req.body.Imagen!='')
  {
  savePictures(  req.body.IdProyecto,  "Proyecto",1);
  }
  
  query.InsertarHisProyec(req.body,"Actualizacion del proyecto ", req.body.IdProyecto)
  .then((Resultado)=>{
    if(Resultado)
{
  res.status(200).json({Mesaje:"Informacion Actualizado en Proyecto "+ req.body.IdProyecto})
}
  })
  .catch((error)=>{
    res.status(500).json({ Alerta: error.sqlMessage });
  })
}

  })
  .catch((error) => {
    res.status(500).json({ Alerta: error.sqlMessage });
  });
} else
{

  query.ActualizarProyecto2(req.body)
  .then((Resultado)=>{
if(Resultado)
{
  console.log(Resultado)
  if(req.body.Imagen!='')
  {
  savePictures(  req.body.IdProyecto,  "Proyecto",1);
  }
  
  query.InsertarHisProyec(req.body,"Actualizacion del proyecto estado " + req.body.Estado, req.body.IdProyecto)
  .then((Resultado)=>{
    if(Resultado)
{
  res.status(200).json({Mesaje:"Informacion Actualizado en Proyecto "+ req.body.IdProyecto})
}
  })
  .catch()
}

  })
  .catch((error) => {
    res.status(500).json({ Alerta: error.sqlMessage });
  });
}

});
route.post("/api/UpEvento",(req,res)=>{
if(req.body.Estado=="1")
{
  query.ActualizarEvento(req.body)
  .then((Resultado)=>{
if(Resultado)
{
  console.log(Resultado)
  if(req.body.Imagen!='')
  {
  savePictures(  req.body.IdEvento,  "Evento",req,1);
  }
  res.status(200).json({Mesaje:"Informacion Actualizado en Evento "+ req.body.IdEvento})
}
  })
  .catch((error) => {
    res.status(500).json({ Alerta: error.sqlMessage });
  });
}
else{
  console.log('entra')
  query.ActualizarEvento2(req.body)
  .then((Resultado)=>{
if(Resultado)
{
  console.log(Resultado)
  if(req.body.Imagen!='')
  {
  savePictures(  req.body.IdEvento,  "Evento",req,1);
  }
  res.status(200).json({Mesaje:"Informacion Actualizado en Evento "+ req.body.IdEvento})
}
  })
  .catch((error) => {
    res.status(500).json({ Alerta: error.sqlMessage });
  });
}
});
route.post('/api/InformeProyecto',(req,res)=>{

  if (req.body.fecha1 == undefined)
  {
    query.InformProyecto()
.then((Resultado)=>{
  if(Resultado){
    res.status(200).json({Resultado:Resultado})
  }

})
.catch((error)=>{
  res.status(500).json({ Alerta: error.sqlMessage });
})
  }
else
{
  query.InformProyecto2(req.body)
  .then((Resultado)=>{
    if(Resultado){
      res.status(200).json({Resultado:Resultado})
    }
  
  })
  .catch((error)=>{
    res.status(500).json({ Alerta: error.sqlMessage });
  })
}

})

//pendiente generar reporte 

route.post("/api/ReporteExcel",(req,res)=>{

  console.log(req.body)
 if (req.body.fecha1 == undefined)
  {
    query.InformProyecto()
.then((Resultado)=>{
  if(Resultado){
   
var reporte=CreateCsv(Resultado);/*  getFileCsv(Resultado)
    .then((result) => {
      if (result) {
        res.contentType("text/csv")
        res.status(200).send(result)
      
      } 
      }     
      )
      .catch(e => res.send({ error: true, mensaje: e }))
  */

   res.status(200).json({Resultado:reporte})
  }

})
.catch((error)=>{
  res.status(500).json({ Alerta: error.sqlMessage });
})
  }
else
{
  query.InformProyecto2(req.body)
  .then((Resultado)=>{
    if(Resultado){
      console.log(Resultado)
      var reporte=CreateCsv(Resultado);
      console.log(reporte)
      res.status(200).json({Resultado:reporte})
    }
  
  })
  .catch((error)=>{
    res.status(500).json({ Alerta: error.sqlMessage });
  })
}

  
 
})
route.post('/api/agregarimagen',(req,res)=>{
/*  let files = []
 /* fs.readdir('./Recursos',(err, result) => {

    if(err) {
      console.error(err)
      throw Error(err)
    }
    files = result
  })*/ 
//  console.log(req.body)
  var image=req.body.id+req.body.nombre;
console.log(image)
const files=fs.readdirSync('./Recursos')

var encontrados=files.filter(element=>element.includes(image)===true )
var resultado1=encontrados.sort()[encontrados.length-1]
console.log(resultado1)
var resultado2=resultado1.substring((image.length+1),(resultado1.length-4))
var ress= parseInt(resultado2)+1
req.body.Imagen.forEach((x,index)=>{
savePictures2(req.body.id,req.body.nombre,x.imagen,ress)
ress++;
})
//*
//res.status(200).json({Resuelto:"Agregado"})

})

route.post('/api/MasImagenes',(req,res)=>{
  /*  let files = []
   /* fs.readdir('./Recursos',(err, result) => {
  
      if(err) {
        console.error(err)
        throw Error(err)
      }
      files = result
    })*/ 
    console.log(req.body)
   var image=req.body.id+req.body.nombre;
  console.log(image.length)
  const files=fs.readdirSync('./Recursos')
  
  var encontrados=files.filter(element=>element.includes(image)===true )
  var resultado1=encontrados.sort()
  console.log(resultado1)
  
  var arrra=[]
  resultado1.forEach((element) => {

      var bitmap = fs.readFileSync(`Recursos/${element}`);
      arrra.push({"Imagen": "data:image/jpeg;base64,"+Buffer.from(bitmap).toString("base64")
  });
  });

  console.log(arrra)
 // savePictures(req.body.id,req.body.nombre,req,parseInt(resultado2)+1)
  res.status(200).json({Resuelto:arrra})
  
  })
route.get("/test", (req, res) => {
  const email = req.body.email;

  var verdadero=0

  const emailRegex =
  new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
  const isValidEmail = emailRegex.test(req.body.email);

//  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
//emailRegex.test(email)
if (isValidEmail==true)
{
 if( email.endsWith('@tectijuana.edu.mx') || email.endsWith('@tectijuana.tecnm.mx') )
 {

    console.log('si paso ')
    res.status(200).json({Alerta: email})
  }
  else
  {
    console.log('no pasa')
  }
}
else
{
  console.log('no pasa')
}

});




let getFileCsv=async(body)=>{
 

  let file= `${uuid.v4()}.csv`; 
  console.log(file)
  let archivo =await CreateCsv(file,body);

  if(!archivo){
      response.mensaje='Error al generar archivo';
      return response;
  }

  response=await getFile(`/tmp/${file}`);
      
   return response;
}


const  CreateCsv=(obj)=>{
  try{
     
 var csvString ='Id Proyecto,Proyecto,Descripcion,Cupo,Fecha Registro,Fecha Finalizacion,Estado, No. Control,Nombre Alumno,Correo,Carrera \n'
obj.forEach((x)=>
{
  csvString=csvString+  `${x.IdProyecto},${x.Proyecto},${x.Descripcion.slice(0,15)},${x.Cupo},${x.FechaRegistro},${x.FechaFinalizacion},${x.Estado},${x.NoControl},${x.Alumno} ${x.Apaterno} ${x.AMaterno},${x.Correo},${x.carrera} \n`
})

  //  fs.writeFileSync(`tmp/${file}`,csvString); 
    return csvString;
   }catch(err){
    console.log('error')
     console.log(err);
     return false;
   }
}


module.exports = route;
