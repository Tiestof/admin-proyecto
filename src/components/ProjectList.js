import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";

const ProjectList = () => {
  // Definimos un estado local para almacenar la lista de proyectos
  const [projects, setProjects] = useState([]);

  // Obtenemos la referencia al servicio de Functions.
  const functions = getFunctions();

  // Creamos una función que llama a la Cloud Function "deleteProject".
  const deleteProject = httpsCallable(functions, "deleteProject");

  // useEffect se ejecuta cuando el componente se carga, solo una vez
  useEffect(() => {
    // onSnapshot escucha en tiempo real la colección "projects" en Firestore por si hay añgun cambio en la coleccion.
    // la función callback se ejecuta y actualiza el estado con la nueva lista de proyectos.

    const unsubscribe = onSnapshot(collection(db, "projects"), (snapshot) => {

      // Extraemos la información de cada documento y creamos un array de proyectos.
      const projectsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // Actualizamos el estado 'projects' con la data obtenida
      setProjects(projectsData);
    });

      return () => unsubscribe();
  }, []);

  // Acción de eliminar un proyecto al usar el botón "Eliminar"
  const handleDelete = async (id) => {
    try {
      // Llamamos a la función de Firebase "deleteProject" y le pasamos como parámetro el 'id' del proyecto que deseamos borrar.
      const result = await deleteProject({ projectId: id });

    } catch (error) {
      console.error("Error al eliminar proyecto:", error.message);
    }
  };

  return (
    // Usamos React.Fragment (<>...</>) 
    <>
      {/* Validamos si la lista de proyectos está vacía, si es asi mostramos "No hay proyectos", de lo contrario, renderizamos la lista usando map(). */}
      {projects.length === 0 ? (
        <p>No hay proyectos</p>
      ) : (
        <ul className="project-list">
          {/* Recorremos el arreglocon los proyectos y los listamos */}
          {projects.map((project) => (
            <li className="project-item" key={project.id}>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <p>Información adicional: {project.additionalInfo}</p>
              {/* Boton "Eliminar", llamamos a handleDelete enviando el id del proyecto */}
              <button onClick={() => handleDelete(project.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ProjectList;