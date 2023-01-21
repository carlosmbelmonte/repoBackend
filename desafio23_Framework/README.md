# Consigna
- Elegir uno de los frameworks vistos en clase y trasladar a esta nueva plataforma el último proyecto entregable (con GraphQL) o al anterior (sin GraphQL).
- Verificar el correcto funcionamiento del servidor a nivel de sus rutas, vistas, lógica de negocio y persistencia.

# Ejecucion del Desafio
- Se instalan las dependencias especificadas abajo en la carpeta SERVIDOR, este contiene las vista que seran modificadas por el otro Framework
- Se instalan las dependencias especificadas abajo para el Framework SAILS, la persistencia para la prueba de los productos es en FIRESTORE.
- Se debe iniciar el servidor en modo FIRE, para poder ver los cambios realizados por el otro Framework en la DB.
>> - npm start 8080 FORK NONE NONE FIRE
- ![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/desafio23_Framework/SERVIDOR/views/imagenes/modoFirebase.png)
- Luego se abre otra consola y nos dirigimos a la carpeta SAILS, con las dependencias ya instaladas.
- Se crea la api con le siguiente comando 
>> - sails generate api productos
- En el archivo SAILS/api/models/Productos.js se espeficica el tipo de dato a recibir
- ![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/desafio23_Framework/SERVIDOR/views/imagenes/Productosjs.png)
- En el archivo SAILS/config/datastores.js se espeficica el tipo de DB para la persistencia. En serviceAccount se coloca el archivo JSON con las credenciales generas por firestore.
- ![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/desafio23_Framework/SERVIDOR/views/imagenes/datastoresjs.png)
- En el archivo SAILS/config/models.js se modifica el nombre para la fecha de creacion del producto y se omite la coleccion updatedAt ya que no la usamos en el SERVIDOR.
- ![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/desafio23_Framework/SERVIDOR/views/imagenes/modelsjs.png)

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

# Dependencias a instalar en la carpeta SAILS:
- npm -g install sails
- npm install --save-dev nodemon
- npm i sails-firestore
