# Consigna
Revisar en forma completa el proyecto entregable que venimos realizando, refactorizando y reformando todo lo necesario para llegar al esquema de servidor API RESTful en capas planteado en esta clase.
Asegurarse de dejar al servidor bien estructurado con su ruteo / controlador, negocio, validaciones, persistencia y configuraciones (preferentemente utilizando en la codificación clases de ECMAScript).
No hace falta realizar un cliente ya que utilizaremos tests para verificar el correcto funcionamiento de las funcionalidades desarrolladas.
- Desarrollar un cliente HTTP de pruebas que utilice Axios para enviar peticiones, y realizar un test de la funcionalidad hacia la API Rest de productos, verificando la correcta lectura de productos disponibles, incorporación de nuevos productos, modificación y borrado.
- Realizar el cliente en un módulo independiente y desde un código aparte generar las peticiones correspondientes, revisando los resultados desde la base de datos y en la respuesta del servidor obtenida en el cliente HTTP.
- Luego, realizar las mismas pruebas, a través de un código de test apropiado, que utilice mocha, chai y Supertest, para probar cada uno de los métodos HTTP de la API Rest de productos.
- Escribir una suite de test para verificar si las respuestas a la lectura, incorporación, modificación y borrado de productos son las apropiadas. Generar un reporte con los resultados obtenidos de la salida del test.

# Ejecucion del Desafio
- Este desafio consta de 2 partes, el SERVIDOR que es tal cual el desafio de anterior (se instalan las mismas dependencia).
- Para ejecutarlo a este ya sea con ARCHIVOS o con Firebase, se aconseja escribir los siguientes comandos:
>> - npm start 8080 FORK NONE NONE TXT
>> - npm start 8080 FORK NONE NONE FIRE
- ![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/desafio21_TestApi/SERVIDOR/views/imagenes/modoArchivo.png)
- ![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/desafio21_TestApi/SERVIDOR/views/imagenes/modoFirebase.png)
- Luego nos dirigimos a la ruta donde se encuentra la carpeta de CLIENTE e instalamos las dependencias para el mismo, estan detalladas abajo.
- Despues de instalar la dependencias, se ejecuta el test manual con el siguiente comando npm run test-manual, en el mismo se hace una prueba con axios solamente y se deben obtener los siguientes resultados:
- ![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/desafio21_TestApi/SERVIDOR/views/imagenes/testManual.png)
- Para finalizar, se realizan las pruebas de MOCHA, CHAI y SUPERTEST, para realizar las mismas, se ejecuta el siguiente comando npm run test, se obtienen los siguientes resultados:
- ![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/desafio21_TestApi/SERVIDOR/views/imagenes/testAutomatico.png)


# Dependencias a instalar en el SERVIDOR:
- npm install express
- npm install --save-dev nodemon
- npm install express-handlebars
- npm install express socket.io
- npm install @faker-js/faker --save-dev
- npm install normalizr
- npm install express-session
- npm install connect-mongo
- npm install bcrypt
- npm install mongoose
- npm install passport
- npm install passport-local
- npm install dotenv
- npm install compression
- npm install firebase-admin
- npm install log4js
- npm install minimist
- npm install node-fetch

# Dependencias a instalar en el CLIENTE:
- npm install axios
- npm i -D mocha supertest chai nodemon