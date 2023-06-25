const { json } = require("express");
var conexion = require("./Conexion");

module.exports = {
  AdminAcceso(usuario, password) {
    return new Promise((resolve, reject) => {
      var query = `select idusuario from usuarios where nombreusuario="${usuario}" and contrasenia=md5("${password}") and idestado=1;`;
      conexion.query(query, (err, resultados) => {
        if (err) reject(err);
        else resolve(resultados);
      });
    });
  },
  InsertarProyecto(json) {
    return new Promise((resolve, reject) => {
      conexion.query(
        `insert into proyecto
            (Nombre, Descripcion,Cupo,IdEstado,IdUsuario)
            values
            (?, ?,?,?,?)`,
        [json.Nombre, json.Descripcion,json.Cap, 1, 1],
        (err, resultados) => {
          if (err){
            console.log(err)
            reject(err);}
          else resolve(resultados.protocol41);
        }
      );
    });
  },
  InsertarRecursos(DescripcionImagen, ruta, IdProyecto) {

    return new Promise((resolve, reject) => {
      conexion.query(
        `insert into Recursos
            ( Descripcion,Ruta,IdProyecto,IdEstado)
            values
            ('${DescripcionImagen}','${ruta}',${IdProyecto},${1})`,
        (err, resultados) => {
          if (err) reject(err);
          else resolve(resultados.protocol41);
        }
      );
    });
  },
  InsertarHisProyec(json, nota, IdProyecto) {
    return new Promise((resolve, reject) => {
      conexion.query(
        `insert into HisProyec
            ( IdProyecto,Notas,IdEstado)
            values
            (?,?,?)`,
        [IdProyecto,nota, 1],
        (err, resultados) => {
          if (err)
          { 
         console.log(err)
            reject(err);
          }
          else
          {
  
            resolve(resultados.protocol41);
       
          }  }
      );
    });
  },
  RegistroAlumno(jsonval) {
    return new Promise((resolve, reject) => {
      console.log(jsonval.NControl);
      conexion.query(
        `insert into alumnos
            (NoControl, Nombre,APaterno,AMaterno,Correo,Carrera,IdEstado)
            values
            (${jsonval.NControl},
             ' ${jsonval.Nombre}',
             ' ${ jsonval.Apellidop}',
             '  ${jsonval.Apellidom}',
               '${jsonval.Correo}',
              ' ${jsonval.Carrera}', ${1})`,
       
        (err, resultados) => {
          if (err){
            console.log(err)
            reject(err);
          } 
          else {
        console.log(resultados.protocol41)
            resolve(resultados.protocol41);
        
          }}
      );
    });
  },
  InsertarRelacionAlPro(json) {
    return new Promise((resolve, reject) => {
      conexion.query(
        `insert into ConexionAlumProy
            (IdProyecto, NoControl,IdEstado )
            values
            (?, ?,?)`,
        [json.Proyecto, json.NControl, 1],
        (err, resultados) => {
          if (err) reject(err);
          else resolve(resultados.insertId);
        }
      );
    });
  },
  InsertarEvento(json) {
    return new Promise((resolve, reject) => {
      conexion.query(
        `insert into Eventos
            (Nombre, Descripcion,IdEstado )
            values
            (?, ?,?)`,
        [json.Nombre, json.Descripcion,1],
        (err, resultados) => {
          if (err) reject(err);
          else resolve(resultados.insertId);
        }
      );
    });
  },
  InsertarRecursosEv(DescripcionImagen, ruta, IdEvento) {
    console.log(DescripcionImagen + ruta + IdEvento)
    return new Promise((resolve, reject) => {

      conexion.query(
        `insert into Recursos
            ( Descripcion,Ruta,IdEvento,IdEstado)
            values
            (?, ?,?,?)`,
        [DescripcionImagen, ruta, IdEvento, 1],
        (err, resultados) => {
          if (err) {
            console.log(err)
            reject(err);}

          else resolve(resultados.protocol41);
        }
      );
    });
  },
  CatalogoProyecto() {
    return new Promise((resolve, reject) => {
      conexion.query(
        `    select p.IdProyecto,p.Nombre,p.Descripcion,p.Cupo,p.contador,r.Ruta, e.IdEstado,e.Nombre estado from proyecto p
        left join recursos r 
        on r.IdProyecto=p.IdProyecto
        left join Estados e
        on e.IdEstado=p.IdEstado
        where p.IdEstado=1
            `,
        (err, resultados) => {
          if (err){ console.log(resultados)
             reject(err);}
          else resolve(resultados);
        }
      );
    });
  },
  CatalogoEvento() {
    return new Promise((resolve, reject) => {
      conexion.query(
        `        select p.IdEvento,p.Nombre,p.Descripcion,r.Ruta, e.IdEstado,e.Nombre estado from Eventos p
        left join recursos r 
        on r.IdEvento=p.IdEvento
        left join Estados e
        on e.IdEstado=p.IdEstado
        where p.IdEstado=1`,
        (err, resultados) => {
          if (err) {
            console.log(err)
            reject(err);}
          else resolve(resultados);
        }
      );
    });
  },
  CatalogoProyectoId(Json) {
    return new Promise((resolve, reject) => {
      conexion.query(
        `       select p.IdProyecto,p.Nombre,p.Descripcion,p.Cupo,p.contador,r.Ruta, e.IdEstado,e.Nombre estado from proyecto p
        left join recursos r 
        on r.IdProyecto=p.IdProyecto
        left join Estados e
        on e.IdEstado=p.IdEstado
            where p.IdProyecto=?
            `,
        [Json.IdProyecto],
        (err, resultados) => {
          if (err) reject(err);
          else resolve(resultados);
        }
      );
    });
  },
  CatalogoEventoId(Json) {
    return new Promise((resolve, reject) => {
      conexion.query(
        `  select E.IdEvento,E.Nombre,E.Descripcion,es.IdEstado,es.Nombre estado,r.Ruta from Eventos E
        left join recursos r 
        on r.IdEvento=E.IdEvento
        left join estados es
        on es.IdEstado=E.IdEstado
            where E.IdEvento=${Json.IdEvento} `,
  
        (err, resultados) => {
          if (err) reject(err);
          else resolve(resultados);
        }
      );
    });
  },
  CatalogoProyectoNom(Json) {
    return new Promise((resolve, reject) => {
      conexion.query(
        `       select p.IdProyecto,p.Nombre,p.Descripcion,p.Cupo,r.Ruta, e.IdEstado,e.Nombre estado from proyecto p
        left join recursos r 
        on r.IdProyecto=p.IdProyecto
        left join Estados e
        on e.IdEstado=p.IdEstado
        
            where p.Nombre like '%${Json.Nombre}%' 
            `,
        (err, resultados) => {
          if (err) reject(err);
          else resolve(resultados);
        }
      );
    });
  },
  CatalogoEventoNom(Json) {
    return new Promise((resolve, reject) => {
      conexion.query(
        `  select E.IdEvento,E.Nombre,E.Descripcion ,es.IdEstado,es.Nombre estado,r.Ruta from Eventos E
        left join recursos r 
        on r.IdEvento=E.IdEvento
        left join estados es
        on es.IdEstado=E.IdEstado
            where E.Nombre Like '%${Json.Nombre}%'`,
    
        (err, resultados) => {
          if (err) reject(err);
          else resolve(resultados);
        }
      );
    });
  },
  ActualizarProyecto(Json) {

    return new Promise((resolve, reject) => {
      conexion.query(
        `update Proyecto
            set Nombre = '${Json.Nombre}',
            Descripcion = '${Json.Descripcion}',
            Cupo=${Json.Cupo},
            IdEstado=${Json.Estado}
            where IdProyecto = ${Json.IdProyecto}`,
           (err,resultados) => {
          if (err){ 
            console.log(err.sqlMessage)
            reject(err);
          }else resolve(resultados);
        }
      );
    });
  },
  ActualizarContador(Json) {

    return new Promise((resolve, reject) => {
      conexion.query(
        `update Proyecto
            set contador = contador+1
            where IdProyecto = ${Json.Proyecto}`,
           (err,resultados) => {
          if (err){ 
            console.log(err.sqlMessage)
            reject(err);
          }else resolve(resultados);
        }
      );
    });
  },
  ActualizarProyecto2(Json) {
  
    return new Promise((resolve, reject) => {
      conexion.query(
        `update Proyecto
            set Nombre = '${Json.Nombre}',
            Descripcion = '${Json.Descripcion}',
            FechaFinalizacion = now(),
            IdEstado=${Json.Estado}
            where IdProyecto = ${Json.IdProyecto}`,
      
        (err,resultados) => {
          if (err){ 
            reject(err)
          }
          else resolve(resultados);
        }
      );
    });
  },
  ActualizarEvento(Json) {
    return new Promise((resolve, reject) => {
      conexion.query(
        `update Eventos
            set Nombre = '${Json.Nombre}',
            Descripcion = '${Json.Descripcion}',
            IdEstado=${Json.Estado}
            where IdEvento = ${Json.IdEvento}`,
             (err,resultados) => {
          if (err){ 
            console.log(err)
            reject(err);
          
          }
            else resolve(resultados);
        }
      );
    });
  },
  ActualizarEvento2(Json) {
    return new Promise((resolve, reject) => {
      conexion.query(
        `update Eventos
            set Nombre = '${Json.Nombre}',
            Descripcion = '${Json.Descripcion}',
            IdEstado=${ Json.Estado},
            FechaFinalizacion=now()
            where IdEvento = ${Json.IdEvento}`,
        (err,resultados) => {
          if (err) {
            console.log(err)
            reject(err);}
          else resolve(resultados);
        }
      );
    });
  },
  InformProyecto() {
    return new Promise((resolve, reject) => {
      conexion.query(
        `   select P.IdProyecto,P.Nombre Proyecto,P.Descripcion,P.FechaRegistro,P.FechaFinalizacion,P.Cupo,P.IdEstado, E.Nombre Estado,A.NoControl,A.Nombre Alumno,A.Apaterno,A.AMaterno,A.Correo,A.carrera from proyecto P
        left join ConexionAlumProy CA
		on  CA.IdProyecto=P.IdProyecto
       left join alumnos A
       on A.NoControl=CA.NoControl
       left join estados E
       ON E.IdEstado=P.IdEstado`,
       
        (err,resultados) => {
          if (err) reject(err);
          else resolve(resultados);
        }
      );
    });
  },
  InformProyecto2(Json) {
    return new Promise((resolve, reject) => {
      conexion.query(
        `   select P.IdProyecto,P.Nombre Proyecto,P.Descripcion,P.FechaRegistro,P.FechaFinalizacion,P.Cupo,P.IdEstado, E.Nombre Estado,A.NoControl,A.Nombre Alumno,A.Apaterno,A.AMaterno,A.Correo,A.carrera from proyecto P
        left join ConexionAlumProy CA
		on  CA.IdProyecto=P.IdProyecto
       left join alumnos A
       on A.NoControl=CA.NoControl
       left join estados E
       ON E.IdEstado=P.IdEstado
       where P.FechaRegistro >='${Json.fecha1}'
       and P.FechaRegistro<='${Json.fecha2}'`,
       
        (err,resultados) => {
          if (err) {
            console.log(err);
            reject(err);}
          else resolve(resultados);
        }
      );
    });
  },
  Estados(){
    return new Promise((resolve, reject) => {
      conexion.query(
        ` select idestado,nombre from estados; 
            `,
        (err, resultados) => {
          if (err) reject(err);
          else resolve(resultados);
        }
      );
    });
  },
  /*IdEvento(nombre) {
    return new Promise((resolve, reject) => {
      conexion.query(
        ` select IdEvento from Eventos where Nombre = '${nombre}' and IdEstado=1 order by IdEvento desc limit 1 
            `,
        (err, resultados) => {
          console.log(resultados);
          if (err) reject(err);
          else resolve(resultados);
        }
      );
    });
  },*/
  prueba(nombre) {
    return new Promise((resolve, reject) => {
      conexion.query(
        ` select IdProyecto from proyecto where Nombre = '${nombre}' and IdEstado=1 order by IdProyecto desc limit 1 
            `,
        (err, resultados) => {
          if (err) reject(err);
          else resolve(resultados);
        }
      );
    });
  },
  prueba2(nombre) {
    return new Promise((resolve, reject) => {
      conexion.query(
        ` select IdEvento from eventos where Nombre = '${nombre}' and IdEstado=1 order by IdEvento desc limit 1 
            `,
        (err, resultados) => {
          if (err) reject(err);
          else resolve(resultados);
        }
      );
    });
  },
  validaralumno(control){
   return new Promise((resolve, reject) => {
    conexion.query(`select NoControl from Alumnos where NoControl=`+control,
    (err,resultados)=>    {
      if(err) reject(err)
      else resolve(resultados)
    }
    )
  })
}
};
