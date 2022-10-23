# Consigna
Implementar sobre el entregable que venimos realizando un mecanismo de autenticación. Para ello:
Se incluirá una vista de registro, en donde se pidan email y contraseña. Estos datos se persistirán usando MongoDb, en una (nueva) colección de usuarios, cuidando que la contraseña quede encriptada (sugerencia: usar la librería bcrypt).
Una vista de login, donde se pida email y contraseña, y que realice la autenticación del lado del servidor a través de una estrategia de passport local.
Cada una de las vistas (logueo - registro) deberá tener un botón para ser redirigido a la otra.
Una vez logueado el usuario, se lo redirigirá al inicio, el cual ahora mostrará también su email, y un botón para desolguearse.
Además, se activará un espacio de sesión controlado por la sesión de passport. Esta estará activa por 10 minutos y en cada acceso se recargará este tiempo.
Agregar también vistas de error para login (credenciales no válidas) y registro (usuario ya registrado).
El resto de la funciones, deben quedar tal cual estaban el proyecto original.

# Dependencias a instalar:
- npm install express
- npm install --save-dev nodemon
- npm install express-handlebars
- npm install express socket.io
- npm install @faker-js/faker --save-dev
- npm install normalizr
- npm install express-session
- npm install connect-mongo
- npm install mongoose
- npm install passport
- npm install passport-local
- npm install bcrypt

# Dependecianas especiales
Dado que daba un error al ejecutarse el fetch, se tuvo que instalar la siguiente dependencia:
- npm i node-fetch@2.6.7
