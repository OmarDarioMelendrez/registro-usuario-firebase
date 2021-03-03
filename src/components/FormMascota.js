import React, { useState, useEffect } from "react";
import { store } from "../FirebaseConfig";

const FormMascota = () => {
  const [modoEdicion, setModoEdicion] = useState(null);
  const [idMascota, setIdMascota] = useState("");
  const [nombre, setNombre] = useState("");
  const [raza, setRaza] = useState("");
  const [error, setError] = useState("");
  const [mascotas, setMascotas] = useState([]);

  useEffect(() => {
    const getMascotas = async () => {
      //solicitamos informacion de la coleccion
      const { docs } = await store.collection("mascotas").get();
      //guardamos los datos de la colección en un nuevo array
      const nuevoArray = docs.map((item) => ({ id: item.id, ...item.data() }));
      //seteamos en el estado los datos de la colección
      setMascotas(nuevoArray);
    };
    getMascotas();
  }, []);

  const agregarMascota = async (e) => {
    e.preventDefault();
    console.log("Ejecutando");
    if (!nombre.trim()) {
      setError("El campo nombre está vacío");
    }
    if (!raza.trim()) {
      setError("El campo raza está vacío");
    }

    const mascotasUsuario = {
      nombre: nombre,
      raza: raza,
    };
    console.log(mascotasUsuario);
    try {
      //Tomando la información del estado del formulario y agregando una mascota más por el usuario.
      await store.collection("mascotas").add(mascotasUsuario);
      //solicitamos informacion de la coleccion
      const { docs } = await store.collection("mascotas").get();
      //guardamos los datos de la colección en un nuevo array
      const nuevoArray = docs.map((item) => ({ id: item.id, ...item.data() }));
      //seteamos en el estado los datos de la colección
      setMascotas(nuevoArray);
      alert("Mascota agregada exitosamente");
    } catch (e) {
      console.log(e);
    }
    setNombre("");
    setRaza("");
  };

  const borrarMascota = async (id) => {
    try {
      // indicamos la coleccion y el id del documento que vamos a borrar
      await store.collection("mascotas").doc(id).delete();
      //solicitamos informacion de la coleccion
      const { docs } = await store.collection("mascotas").get();
      //guardamos los datos de la colección en un nuevo array
      const nuevoArray = docs.map((item) => ({ id: item.id, ...item.data() }));
      //seteamos en el estado los datos de la colección
      setMascotas(nuevoArray);
      alert("se ha borrado la mascota");
    } catch (e) {
      console.log(e);
    }
  };

  const actualizarMascota = async (id) => {
    try {
      //solicitamos la data a la base de datos del elemento a modificar
      const data = await store.collection("mascotas").doc(id).get();
      const { nombre, raza } = data.data();
      setNombre(nombre);
      setRaza(raza);
      setIdMascota(id);
      setModoEdicion(true);
    } catch (e) {
      console.log(e);
    }
  };

  const agregarActualizacionMascota = async(e) => {
    e.preventDefault();
    if (!nombre.trim()) {
      setError("El campo nombre está vacío");
    }
    if (!raza.trim()) {
      setError("El campo raza está vacío");
    }
    const mascotaUpdate = {
      nombre: nombre,
      raza:raza
    }
    try {
      //actualizamos el documento de mascota con la información que tenemos actualmente en el estado
      await store.collection('mascotas').doc(idMascota).set(mascotaUpdate);
      //actualizamos lista solicitando la coleccion a la base de datos
      const { docs } = await store.collection("mascotas").get();
      //guardamos los datos de la colección en un nuevo array
      const nuevoArray = docs.map((item) => ({ id: item.id, ...item.data() }));
      //seteamos en el estado los datos de la colección
      setMascotas(nuevoArray);
      alert("Mascota actualizada correctamente");
      setModoEdicion(null);
      setNombre("");
      setRaza("");
      setIdMascota("");
    } catch (e) {
      console.log(e)
    }
    
  }
  

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <h2>Formulario de Mascotas</h2>
          <form onSubmit={modoEdicion ? agregarActualizacionMascota : agregarMascota} className="form-group">
            <input
              value={nombre}
              onChange={(e) => {
                setNombre(e.target.value);
              }}
              type="text"
              className="form-control"
              placeholder="Introduce nombre mascota"
            />
            <input
              value={raza}
              onChange={(e) => {
                setRaza(e.target.value);
              }}
              type="text"
              className="form-control mt-3"
              placeholder="Introduce raza"
            />
            {modoEdicion ? (
              <button type="submit" className="btn btn-warning btn-block mt-3">
                Actualizar
              </button>
            ) : (
              <button type="submit" className="btn btn-dark btn-block mt-3">
                Registrar
              </button>
            )}
          </form>
          {error ? (
            <div className="error">
              <p>{error}</p>
            </div>
          ) : (
            <span></span>
          )}
        </div>
        <div className="col">
          <h2>Lista de tu agenda</h2>
          <ul className="list-group">
            {mascotas.map((mascota) => (
              <li key={mascota.id} className="list-group-item">
                Nombre: {mascota.nombre} Raza: {mascota.raza}
                <button
                  onClick={(id) => borrarMascota(mascota.id)}
                  className="btn btn-danger float-right"
                >
                  Eliminar
                </button>
                <button
                  onClick={(id) => actualizarMascota(mascota.id)}
                  className="btn btn-info float-right mr-3"
                >
                  Actualizar
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FormMascota;
