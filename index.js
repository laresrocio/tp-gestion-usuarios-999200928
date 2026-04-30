import { getUsers, createUser, updateUser, deleteUser } from "./controllers.js";


const params = process.argv.slice(2);
const operacion = params[0];

let resultado;

const main = async () => {
  switch (operacion) {
    case "get":
      resultado = await getUsers();
      break;
    case "add":
      //validaciones
      //contar con todos los parametros
      if (params.length < 4) {
        resultado = "Faltan parametros para crear el usuario. Uso: node index.js add <user> <email> <pass>"
        break;
      }
      //longitud de nombre
      if (params[1].length < 3) {
        resultado = "El nombre de usuario debe tener al menos 3 caracteres"
        break;
      }
      //email valido
      if (!params[2].endsWith("@gmail.com")) {
        resultado = "El email debe terminar con @gmail.com"
        break;
      }
      //contraseña segura
      if (params[3].length < 8) {
        resultado = "La contraseña debe tener al menos 8 caracteres"
        break;
      }

      //si todo sale bien se crea el usuario
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
      resultado = await deleteUser(params[1])
      break
    default:
      resultado = "operacion invalida"
      break;
  }
  console.log(resultado);

  process.exit();
}
main();

