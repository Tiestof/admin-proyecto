import React, { useState } from "react";
import SimpleReactValidator from "simple-react-validator";
import axios from "axios";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const AddProjectForm = ({ onAddProject }) => {
  const [formData, setFormData] = useState({ name: "", description: "" });

  // Creamos nuestro validador
  const [validator] = useState(new SimpleReactValidator());

  // Creamos un estado para forzar re-renders al mostrar mensajes de error
  const [reload, setReload] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validator.allValid()) {
      try {
        // Simulamos la solicitud a una API con Axios usando jsonplaceholder y guardamos la respuesta.
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts/1");
        const additionalData = response.data;

        // Agregamos proyecto a Firestore
        await addDoc(collection(db, "projects"), {
          ...formData,
          additionalInfo: additionalData.title,
        });

        
        if (onAddProject) {
          onAddProject({ ...formData, additionalInfo: additionalData.title });
        }

        // Limpiamos el formulario
        setFormData({ name: "", description: "" });
      } catch (error) {
        console.error("Error al agregar proyecto:", error);
      }
    } else {
      // Mostramos mensajes de error y aplicamos hacemos render
      validator.showMessages();
      setReload(!reload);
    }
  };

  // formulario 
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre del Proyecto:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {validator.message("name", formData.name, "required")}
        </div>

        <div className="form-group">
          <label>Descripción:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          {validator.message("description", formData.description, "required|min:10")}
        </div>

        <button type="submit">Agregar Proyecto</button>
      </form>
    </div>
  );
};

export default AddProjectForm;
