import { db } from "./config.js";

const getUsers = async () => {
  try {
    const query = "SELECT * FROM users";
    const [response] = await db.query(query);
    if (response.length === 0) {
      return "No hay usuarios registrados"
    }
    return response;

  } catch (error) {
    //control de errores
    console.error("Error al obtener usuarios:");
    if (error.code === 'ECONNREFUSED') {
      return "No se pudo establecer conexión con la base de datos.";
    } else {
      return "Error al obtener usuarios.";
    }
  }
}

const createUser = async (username, email, password) => {

  //doble validacion de que esten los datos
  if (!username || !email || !password) {
    return "Faltan parametros para crear el usuario. Uso: node index.js add <user> <email> <pass>"
  }

  try {
    const id = crypto.randomUUID();

    const query = "INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)";
    const [response] = await db.query(query, [id, username, email, password]);
    if (response.serverStatus === 2) {
      return `✅ Usuario '${username}' creado con éxito. ID: ${id}`;
    }
  } catch (error) {
    console.error("Error al crear usuario:");
    if (error.code === 'ECONNREFUSED') {
      return "No se pudo establecer conexión con la base de datos.";
    } else {
      return "Error al crear usuario.";
    }

  }
  return response;
}

const updateUser = async (id, updates) => {
  //validacion doble de que esten los datos
  if (!id) {
    return "Falta id para actualizar el usuario"
  }
  try {
    const q = `UPDATE users SET username =?, email =?, password =? WHERE id = ?`
    const { username, email, password } = updates
    const [response] = await db.query(q, [username, email, password, id])
    //validar que se encontre el usuario a actualizar
    if (response.affectedRows === 0) {
      return `❌ Error: No se encontró ningún usuario con el ID proporcionado: '${id}'`
    }
    //si no hubo cambios en los datos, informar que no se actualizó nada
    else if (response.changedRows === 0) {
      return `⚠️ No se realizaron cambios en el usuario con ID: '${id}'`
    }
    return `✅ Usuario con ID: '${id}' actualizado con éxito.`
  } catch (error) {
    console.error("Error al actualizar usuario:");
    if (error.code === 'ECONNREFUSED') {
      return "No se pudo establecer conexión con la base de datos.";
    } else {
      return "Error al actualizar usuario.";
    }
  }

  if (response.serverStatus === 0) {
    return "Usuario no encontrado"
  } else if (response.serverStatus === 2) {
    return "Usuario actualizado"
  }
}

const deleteUser = async (id) => {
  try {
    const q = `DELETE FROM users WHERE id = ?`
    const [response] = await db.query(q, [id])
    //validar que se encontro el usuario a borrar
    if (response.affectedRows === 0) {
      return `❌ Error: No se encontró ningún usuario con el ID: '${id}'`
    }
    //si se borro el usuario, informar que se borro con exito
    else {
      return `✅ Usuario con ID: '${id}' borrado con éxito.`
    }
  } catch (error) {
    console.error("Error al borrar usuario:");
    if (error.code === 'ECONNREFUSED') {
      return "No se pudo establecer conexión con la base de datos.";
    }
    else {
      return "Error inesperado al borrar usuario.";
    }
  }
}

export { getUsers, createUser, updateUser, deleteUser };
