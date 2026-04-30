# CLI Gestión de Usuarios (Node.js + MySQL)

Este proyecto es una herramienta de línea de comandos (CLI) para gestionar un CRUD de usuarios en una base de datos MySQL. Permite ver, crear, actualizar y eliminar usuarios directamente desde la terminal.

## Tecnologías utilizadas
- **Node.js**: Entorno de ejecución.
- **MySQL2**: Driver con soporte de promesas para la conexión a la base de datos.


## Requisitos 
1. Tener instalado [Node.js](https://nodejs.org/).
2. Tener un servidor MySQL activo (XAMPP, Laragon o MySQL Server).

## Configuración del proyecto

1. **Instalar dependencias:**
   Ejecutar en la terminal dentro de la carpeta del proyecto:
   ```bash
   npm install

2. **Base de datos:**

- Abrir phpMyAdmin (o tu gestor SQL).

- Importar el archivo database.sql incluido en la raíz del proyecto.

- Esto creará la base de datos cli_usuarios y la tabla users con un registro de prueba.

3. **Conexión:**
Si tus credenciales de MySQL son distintas a las configuradas por defecto (host: localhost, user: root, pass: ""), podés modificarlas en el archivo config.js.

## Guia de uso
El sistema funciona pasando argumentos al ejecutar el archivo index.js.
- **node index.js get**
Muestra todos los usuarios registrados o un aviso si la tabla está vacía.
- **node index.js add <nombre> <email> <password>**
Crea un nuevo usuario. 
El ID se genera automáticamente como UUID.

Validaciones: Nombre (letras, 3-20 caracteres), Email (debe ser @gmail.com) y Password (mínimo 8 caracteres).
- **node index.js update <nombre> <email> <password> <id_usuario>**
Modifica los datos de un usuario existente buscando por su ID.
- **node index.js delete <id_usuario>**
Borra un registro de la base de datos de forma permanente usando el ID.


## Estructura de archivos
- **index.js:** Punto de entrada, maneja la lógica del CLI y las validaciones de entrada.
- **controllers.js:**Contiene las funciones asíncronas (CRUD) que interactúan con la DB.
- **config.js:** Configuración del pool de conexiones a MySQL.
- **database.sql:** Script para montar la estructura de la base de datos.