# Consigna
- Modificar la capa de persistencia incorporando los conceptos de Factory, DAO, y DTO.
- Los DAOs deben presentar la misma interfaz hacia la lógica de negocio de nuestro servidor.
- El DAO seleccionado (por un parámetro en línea de comandos como lo hicimos anteriormente) será devuelto por una Factory para que la capa de negocio opere con el.
- Cada uno de estos casos de persistencia, deberán ser implementados usando el patrón singleton que impida crear nuevas instancias de estos mecanismos de acceso a los datos.
- Comprobar que si llamo a la factory dos veces, con una misma opción elegida, devuelva la misma instancia.
- Implementar el patrón Repository para la persistencia de productos y mensajes.

# Ejecucion Desafio
- Para ejecutar el desafio, se debe poner por linea de comandos los parametros a elegir, teniendo en cuenta lo siguiente:
>> process.argv[2] pertenece al puerto de escucha, se recomienda utilizar el 8080.
>> process.argv[3] pertenece a la seleccion del modo CLUSTER o modo FORK, por defecto en modo FORK.
>> process.argv[4] pertenece a la seleccion del modo de trabajo con NGINX, si se coloca SINIGNX entra en este modo.
>> process.argv[5] pertenece a las pruebas de compresion, si se coloca COMPRESION en la ruta /info se realiza una compresion.
>> process.argv[6] seleccion de DAO de persistencia, TXT corresponde a archivos y FIRE pertenece a Firebase, por defecto se toma TXT.
- Para probar el desafio, se recomendienda aplicar las siguiente lineas por consola
>> npm start 8080 FORK NONE NONE TXT
>> ![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/desafio20_Patrones/views/imagenes/modoArchivo.png)
>> ![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/desafio20_Patrones/views/imagenes/modoArchivo2.png)
>> npm start 8080 FORK NONE NONE FIRE
>> ![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/desafio20_Patrones/views/imagenes/modoFirebase.png)
>> ![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/desafio20_Patrones/views/imagenes/modoFirebase2.png)

# Dependencias a instalar:
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

