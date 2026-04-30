import { db } from "./config.js";

const getUsers = async () => {
  try {
    const query = "SELECT * FROM users";
    const [response] = await db.query(query);
    return response;

  } catch (error) {
    console.error("Error al obtener usuarios:");
  }
}

const createUser = async (username, email, password) => {
  const id = crypto.randomUUID();
  const query = "INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)";
  const [response] = await db.query(query, [id, username, email, password]);
  return response;
}

const updateUser = async (id, updates) => {
  if (!id) {
    return "Falta id para actualizar el usuario"
  }
  const q = `UPDATE users SET username =?, email =?, password =? WHERE id = ?`
  const { username, email, password } = updates
  const [response] = await db.query(q, [username, email, password, id])

  if (response.serverStatus === 0) {
    return "Usuario no encontrado"
  } else if (response.serverStatus === 2) {
    return "Usuario actualizado"
  }
}

const deleteUser = async (id) => {
  const q = `DELETE FROM users WHERE id = ?`
  const [response] = await db.query(q, [id])
  if (response.serverStatus === 2) {
    return "Usuario borrado"
  }
}

export { getUsers, createUser, updateUser, deleteUser };
