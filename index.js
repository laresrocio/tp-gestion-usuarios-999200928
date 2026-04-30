import { getUsers, createUser, updateUser } from "./controllers.js";


const params = process.argv.slice(2);
const operacion = params[0];

let resultado;

const main = async () => {
  switch (operacion) {
    case "get":
      resultado = await getUsers();
      break;
    case "add":
      resultado = await createUser(params[1], params[2], params[3]);
      break;
    case "update":
      const updates = {
        username: params[1],
        email: params[2],
        password: params[3]
      }
      resultado = await updateUser(params[4], updates)
      break
    case "delete":
      resultado = "aca se borra un usuario de la db"
      break;
    default:
      resultado = "operacion invalida"
      break;
  }
  console.log(resultado);

  process.exit();
}
main();

