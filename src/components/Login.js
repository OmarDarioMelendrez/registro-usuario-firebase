import React, { useState } from "react";
import { auth } from "../FirebaseConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");

 const registrarUsuario = (e) => {
     e.preventDefault();
         auth.createUserWithEmailAndPassword(email,pass)
         .then(e => alert('Usuario registrado'))
         .catch(e => {
             if (e.code === "auth/invalid-email") {
                 setEmailError("Formato de email incorrecto");
             }
             if (e.code === "auth/weak-password") {
                 setPassError("La contraseña debe tener mínimo 6 caracteres ó más");
                 
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
            {
                emailError ? (
                    <div className="alert alert-danger fs-6">{emailError}</div>
                ) : (<div></div>)
            }
            <input
              onChange={(e) => (setPass(e.target.value))}
              type="password"
              className="form-control mt-4"
              placeholder="Introduce tu password"
              required
            />
            {
                passError ? (
                    <div className="alert alert-danger fs-6">{passError}</div>
                ) : (<div></div>)
            }

            <button type="submit" className="btn btn-dark btn-block mt-4">
              Registrar usuario
            </button>
          </form>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};

export default Login;
