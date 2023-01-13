# Consigna
- En base al último proyecto entregable de servidor API RESTful, reformar la capa de routeo y el controlador para que los requests puedan ser realizados a través del lenguaje de query GraphQL.
- Si tuviésemos un frontend, reformarlo para soportar GraphQL y poder dialogar apropiadamente con el backend y así realizar las distintas operaciones de pedir, guardar, actualizar y borrar recursos.
- Utilizar GraphiQL para realizar la prueba funcional de los querys y las mutaciones.

# Ejecucion del Desafio
- Se instalan las dependencias especificadas abajo en la carpeta SERVIDOR.
- Se inicializa el servidor con DB ya sea en Archivo o Firebase
>> - npm start 8080 FORK NONE NONE TXT
>> - npm start 8080 FORK NONE NONE FIRE
- ![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/desafio22_GraphQL/SERVIDOR/views/imagenes/modoArchivo.png)
- ![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/desafio22_GraphQL/SERVIDOR/views/imagenes/modoFirebase.png)
- Luego en la ruta http://localhost:8080/api/graphql se ejecuta todas las funcionalidades de CRUD en graphql
- Para probar estos cambios, se utilizan los archivos queriesFIRE.graphql para la DB en Firebase, y queriesTXT.graphql para la DB en Archivos. En dicho archivos se muestran como ejecutar las funcionalidades, para ambos es lo mismo, solo cambia la cantidad de PRODUCTOS en las bases.
- El controlador de Graphql se encuentra en la carpeta SERVIDOR/controlador/graphcontroller.js

# Ejecucion con DB en Archivo, prueba Query y Mutation
- ![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/desafio22_GraphQL/SERVIDOR/views/imagenes/modoArchivo_graphqlQuery.png)
- ![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/desafio22_GraphQL/SERVIDOR/views/imagenes/modoArchivo_graphqlMutation.png)

# Ejecucion con DB en Firebase, prueba Query y Mutation
- ![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/desafio22_GraphQL/SERVIDOR/views/imagenes/modoFirebase_graphqlQuery.png)
- ![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/desafio22_GraphQL/SERVIDOR/views/imagenes/modoFirebase_graphqlMutation.png)

# Vista desde Front con producto agregado (Firebase y Archivo)
- ![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/desafio22_GraphQL/SERVIDOR/views/imagenes/frontFirebase.png)
- ![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/desafio22_GraphQL/SERVIDOR/views/imagenes/frontArchivo.png)

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
- npm install --save express-graphql
- npm install --save graphql

# Dependencias a instalar en el CLIENTE:
- npm install axios
- npm i -D mocha supertest chai nodemon