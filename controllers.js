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

export { getUsers }
