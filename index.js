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
      if (params[1].length < 3 || params[1].length > 20) {
        resultado = "El nombre de usuario debe tener entre 3 y 20 caracteres"
        break;
      }

      //nombre de usuario valido solo con letras
      if (!/^[a-zA-Z]+$/.test(params[1])) {
        resultado = "El nombre de usuario solo puede contener letras"
        break;
      }

      //email valido
      if (!params[2].endsWith("@gmail.com")) {
        resultado = "El email debe terminar con @gmail.com"
        break;
      }

      //el email debe contener un nombre de usuario antes del @
      if (params[2] === "@gmail.com") {
        resultado = "El email debe contener un nombre de usuario antes del @"
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
      //validaciones
      //contar con todos los parametros
      if (params.length < 5) {
        resultado = "Faltan parametros para actualizar el usuario. Uso: node index.js update <user> <email> <pass> <id>"
        break;
      }
      const updates = {
        username: params[1],
        email: params[2],
        password: params[3]
      }

      //validar id
      //id con formato uuid
      if (params[4].length !== 36) {
        resultado = "El id debe tener un formato valido"
        break;
      }

      //longitud de nombre
      if (params[1].length < 3 || params[1].length > 20) {
        resultado = "El nombre de usuario debe tener entre 3 y 20 caracteres"
        break;
      }

      //nombre de usuario valido solo con letras
      if (!/^[a-zA-Z]+$/.test(params[1])) {
        resultado = "El nombre de usuario solo puede contener letras"
        break;
      }

      //email valido
      if (!params[2].endsWith("@gmail.com")) {
        resultado = "El email debe terminar con @gmail.com"
        break;
      }

      //el email debe contener un nombre de usuario antes del @
      if (params[2] === "@gmail.com") {
        resultado = "El email debe contener un nombre de usuario antes del @"
        break;
      }

      //contraseña segura
      if (params[3].length < 8) {
        resultado = "La contraseña debe tener al menos 8 caracteres"
        break;
      }

      //si todo esta bien se actualiza el usuario
      resultado = await updateUser(params[4], updates)
      break
    case "delete":
      //validaciones
      //tiene que enviar el id
      if (!params[1]) {
        resultado = "Faltan parametros para borrar el usuario. Uso: node index.js delete <id>"
        break;
      }
      //id con formato uuid
      if (params[1].length !== 36) {
        resultado = "El ID debe tener un formato valido"
        break;
      }

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

