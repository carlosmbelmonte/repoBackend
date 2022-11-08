# Consigna:
Tomando con base el proyecto que vamos realizando, agregar un parámetro más en la ruta de comando que permita ejecutar al servidor en modo fork o cluster. Dicho parámetro será 'FORK' en el primer caso y 'CLUSTER' en el segundo, y de no pasarlo, el servidor iniciará en modo fork.
- Agregar en la vista info, el número de procesadores presentes en el servidor.
- Ejecutar el servidor (modos FORK y CLUSTER) con nodemon verificando el número de procesos tomados por node.
- Ejecutar el servidor (con los parámetros adecuados) utilizando Forever, verificando su correcta operación. Listar los procesos por Forever y por sistema operativo.
- Ejecutar el servidor (con los parámetros adecuados: modo FORK) utilizando PM2 en sus modos modo fork y cluster. Listar los procesos por PM2 y por sistema operativo.
- Tanto en Forever como en PM2 permitir el modo escucha, para que la actualización del código del servidor se vea reflejado inmediatamente en todos los procesos.
- Hacer pruebas de finalización de procesos fork y cluster en los casos que corresponda.

# Consigna:
Configurar Nginx para balancear cargas de nuestro servidor de la siguiente manera:
Redirigir todas las consultas a /api/randoms a un cluster de servidores escuchando en el puerto 8081. El cluster será creado desde node utilizando el módulo nativo cluster.
El resto de las consultas, redirigirlas a un servidor individual escuchando en el puerto 8080.
Verificar que todo funcione correctamente.
Luego, modificar la configuración para que todas las consultas a /api/randoms sean redirigidas a un cluster de servidores gestionado desde nginx, repartiéndolas equitativamente entre 4 instancias escuchando en los puertos 8082, 8083, 8084 y 8085 respectivamente.

# Aspectos a incluir en el entregable:
Incluir el archivo de configuración de nginx junto con el proyecto.
Incluir también un pequeño documento en donde se detallen los comandos que deben ejecutarse por línea de comandos y los argumentos que deben enviarse para levantar todas las instancias de servidores de modo que soporten la configuración detallada en los puntos anteriores.

# Documentacion de ejecucion
- Para ejecutar el desafio ya sea con nodemon o simplemente con node, se debe poner como primer parametro el puerto, luego seguido del modo de CLUSTER o FORK, si no se agrega nada, se inicia en modo FORK

Ejemplo de ejecucion en nodemon en modo FORK:
> npm start 8081
![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/desafio_BalanceCarga/public/imagen/modoFORK_nodemon.png)

Ejemplo de ejecucion en nodemon en modo CLUSTER:
> npm start 8081 CLUSTER
![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/desafio_BalanceCarga/public/imagen/modoCLUSTER_nodemon.png)

Ejemplo de ejecucion en modo FOREVER, se crean 2 servidores con puertos de escucha 8081 y 8082:
> forever start server.js 8081
> forever start server.js 8082
![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/desafio_BalanceCarga/public/imagen/modoFOREVER_2Server_Comandos.png)

Listamos los PID de cada Server:
> forever list
![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/desafio_BalanceCarga/public/imagen/modoFOREVER_2Server_ListProcess.png)

Listamos todos los procesos de node.js activos:
![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/desafio_BalanceCarga/public/imagen/modoFOREVER_2Server_procesosNode.png)

Frontend de los 2 servidores corriendo en paralelo:
![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/desafio_BalanceCarga/public/imagen/modoFOREVER_2Server.png)

Ejemplo de ejecucion con PM2 tanto modo FORK como CLUSTER, se crean 2 servidores con puertos de escucha 8081 y 8082:
> pm2 start server.js --name="Server1" --watch -- 8081
> pm2 start server.js --name="Server2" --watch -i 2 -- 8082
![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/desafio_BalanceCarga/public/imagen/modoPM2_ForkCluster.png)

Listamos todos los procesos de node.js activos:
![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/desafio_BalanceCarga/public/imagen/modoPM2_ForkCluster_procesosNode.png)

Paramos los servidores y los eliminamos:
![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/desafio_BalanceCarga/public/imagen/modoPM2_ForkCluster_StopDelete.png)

Para la primera parte de NGINX, para poder redireccionar todas las consultas al puerto 8080, excepto las de api/randoms (esta en el puerto 8081), se trabaja como en los anteriores ejemplos, para trabajar con NGINX se debe agregar un 4to parametro a la linea de comando, la misma ejecutara una funciones para llamarlo (Ver funcion final):
![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/desafio_BalanceCarga/public/imagen/comentarCodigo.png)

Luego ejecutar el modo FORK primero y luego el modo CLUSTER con los siguientes comandos:
- pm2 start server.js --name="Server1" --watch -- 8080 FORK
- pm2 start server.js --name="Server2" --watch -- 8081 CLUSTER
![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/desafio_BalanceCarga/public/imagen/redireccionamiento.png)
![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/desafio_BalanceCarga/public/imagen/puertosensimultaneo.png)


