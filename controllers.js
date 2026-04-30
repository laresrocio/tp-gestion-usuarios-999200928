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


export { getUsers, createUser };
