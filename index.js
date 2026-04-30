import { getUsers, createUser } from "./controllers.js";


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
      resultado = "aca se actualiza un usuario de la db"
      break;
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
