import React, { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";

function App() {
  //Arreglo de citas
  //Citas en local Storage

  let citasIniciales = JSON.parse(localStorage.getItem("citas"));

  if (!citasIniciales) {
    citasIniciales = [];
  }

  const [cita, guardarCitas] = useState(citasIniciales);

  // UseEffect para cuando el state cambia
  useEffect(() => {
    if (citasIniciales) {
      localStorage.setItem("citas", JSON.stringify(cita));
    } else {
      localStorage.setItem("citas", JSON.stringify([]));
    }
  }, [cita, citasIniciales]);

  //Funcion que toma citas actuales y agrega la nueva

  const crearCita = citas => {
    guardarCitas([...cita, citas]);
  };
  // Funcion que elimina una citas por su id
  const eliminarCita = id => {
    const nuevasCitas = cita.filter(cita => cita.id !== id);
    guardarCitas(nuevasCitas);
  };

  //Mensaje Condicional
  const titulo = cita.length === 0 ? "No hay citas" : "Administra tus citas";

  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {cita.map(cita => (
              <Cita key={cita.id} cita={cita} eliminarCita={eliminarCita} />
            ))}
          </div>          
        </div>        
      </div>
      <h1>JMangel&copy;2020</h1>
    </Fragment>
  
  );
}

export default App;
