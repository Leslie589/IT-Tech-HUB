import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AdminMenu } from './AdminMenu';
import { Home } from './Home';
import './login.css';

export default function Login(props) {
  const [bandera, setBandera] = useState(true);
  const [pass, setPass] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('/api/AdminAcceso', { email: email, pass: pass }).then((res) => {
      if (res.data.bandera) {
        if (res.data.bandera === 1) {
          const setActivo = [{ activo: true, pagina: 6 }];
          localStorage.setItem('inicio', JSON.stringify(setActivo));
          props.root2.render(<AdminMenu root1={props.root1} root2={props.root2} />);
          props.root1.render(<Home root1={props.root1} root2={props.root2} />);
        }
      } else {
        setBandera(false);
        const setActivo = [{ activo: false, pagina: 5 }];
        localStorage.setItem('inicio', JSON.stringify(setActivo));
        Swal.fire({
          icon: 'error',
          title: 'Acceso denegado',
          text: 'Las credenciales proporcionadas no son válidas. Solo el administrador tiene acceso.',
        });
      }
    });
  };

  useEffect(() => {
    console.log('Email:', email);
    console.log('Password:', pass);
  }, [email, pass]);

  return (
    <>
      <center>
        <br />
        <br />
        <br />
        <div className="containeracceso" style={{ marginTop: '-50px', background: '#99DBF5', padding: 20 }}>
          <form id="formulario" onSubmit={handleSubmit}>
            <h1>Acceso</h1>
            <br />
            <div>
              <input
                style={{ marginBottom: 20 }}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                type="email"
                className="form-control form-control-lg"
                id="exampleInputEmail1"
                placeholder="Correo electrónico:"
              />
            </div>
            <div>
              <input
                style={{ marginBottom: 20 }}
                onChange={(e) => setPass(e.target.value)}
                name="pass"
                type="password"
                className="form-control form-control-lg"
                id="pwd"
                placeholder="Contraseña:"
              />
            </div>
            <br />
            <input type="submit" className="btn btn-lg" style={{ background: '#16B821', color: 'white' }} value="Iniciar sesión" />
          
          </form>
        </div>
      </center>
      <br />
      <br />
      <br />
    </>
  );
}

const renderizar = () => {
  const elemnt = document.getElementById('Menus');
  return render(<AdminMenu />, elemnt);
};