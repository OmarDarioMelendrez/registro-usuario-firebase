import React, { useState } from "react";
import { auth } from "../FirebaseConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

 const registrarUsuario = (e) => {
     e.preventDefault();
         auth.createUserWithEmailAndPassword(email,pass)
         .then(e => alert('Usuario registrado'))
         .catch(e => {
             if (e.code === "auth/invalid-email") {
                 setError("Formato de email incorrecto");
             }
             if (e.code === "auth/weak-password") {
                 setError("La contraseña debe tener mínimo 6 caracteres ó más");
                 
            }
         })
         
 }
 
 const LoginUsuario = () => {
     auth.signInWithEmailAndPassword(email,pass)
     .then(e=> console.log(e))
     .catch(err => {
         if (err.code === "auth/wrong-password") {
             setError("Contraseña incorrecta")
         }
     })
 }
 

  return (
    <div>
      <div className="row mt-5">
        <div className="col"></div>
        <div className="col">
          <form onSubmit={registrarUsuario} className="form-group" autoComplete="on" >
            <input
              onChange={(e) => (setEmail(e.target.value))}
              type="email"
              className="form-control"
              placeholder="Introduce tu email"
              required
              autoComplete="on"
            />
            <input
              onChange={(e) => (setPass(e.target.value))}
              type="password"
              className="form-control mt-4"
              placeholder="Introduce tu password"
              required
            />

            <button type="submit" className="btn btn-dark btn-block mt-4">
              Registrar usuario
            </button>
            <button onClick={LoginUsuario} type="button" className="btn btn-success btn-block">Iniciar sesión</button>
          </form>
            {
                error ? (
                    <p>{error}</p>
                ) : (<p></p>)
            }
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};

export default Login;
