import React, { useState } from "react";
import AddProjectForm from "./components/AddProjectForm";
import ProjectList from "./components/ProjectList";
import "./styles.css";

function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="container">
      <h1>Gestión de Proyectos</h1>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Ocultar Formulario" : "Agregar Proyecto"}
      </button>
      {showForm && <AddProjectForm />}
      <ProjectList />
    </div>
  );
}

export default App;
