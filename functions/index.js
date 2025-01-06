const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

exports.deleteProject = functions.https.onCall(async (data, context) => {
  console.log("INICIO de deleteProject"); // Log al inicio de la función para mirar en el console cloud de google
  console.log("Datos recibidos:", data); // logueamos lo datos recibidos

  const {projectId} = data.data;

  console.log("projectId extraído:", projectId); // mostramos el proyect ID Extraido para verificar que llego integro

  if (!projectId) {
    console.error("Error: projectId no proporcionado");
    throw new functions.https.HttpsError(
        "invalid-argument",
        "El campo projectId es obligatorio.",
    );
  }

  try {
    console.log("Intentando eliminar proyecto con ID:", projectId); // proceso de eliminacion del documento

    const projectDoc = await db.collection("projects").doc(projectId).get();
    console.log("Documento obtenido:", projectDoc.exists); // validamos si existe

    if (!projectDoc.exists) {
      console.error("Error: El proyecto no existe:", projectId); // si no existe se imprime el ID con el mensaje
      throw new functions.https.HttpsError(
          "not-found",
          "El proyecto no existe.",
      );
    }

    await db.collection("projects").doc(projectId).delete();
    console.log("Proyecto eliminado correctamente:", projectId); // si el proyecto existe lo eliminamos

    return {message: "Proyecto eliminado correctamente"}; // eliminacion completada
  } catch (error) {
    console.error("Error CATCH al eliminar proyecto:", error.message); // error en el la eliminacion

    throw new functions.https.HttpsError(
        "internal",
        "No se pudo eliminar el proyecto.",
        error.message,
    );
  } finally {
    console.log("FIN de deleteProject"); // Log al final la ejecucion de eliminado.
  }
});

