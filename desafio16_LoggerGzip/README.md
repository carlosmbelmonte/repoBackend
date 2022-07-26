# Consigna:
Incorporar al proyecto de servidor de trabajo la compresión gzip.
Verificar sobre la ruta /info con y sin compresión, la diferencia de cantidad de bytes devueltos en un caso y otro.
Luego implementar loggueo (con alguna librería vista en clase) que registre lo siguiente:
- Ruta y método de todas las peticiones recibidas por el servidor (info)
- Ruta y método de las peticiones a rutas inexistentes en el servidor (warning)
- Errores lanzados por las apis de mensajes y productos, únicamente (error)

Considerar el siguiente criterio:
- Loggear todos los niveles a consola (info, warning y error)
- Registrar sólo los logs de warning a un archivo llamada warn.log
- Enviar sólo los logs de error a un archivo llamada error.log

# Consigna: 
Luego, realizar el análisis completo de performance del servidor con el que venimos trabajando.

Vamos a trabajar sobre la ruta '/info', en modo fork, agregando ó extrayendo un console.log de la información colectada antes de devolverla al cliente. Además desactivaremos el child_process de la ruta '/randoms'

Para ambas condiciones (con o sin console.log) en la ruta '/info' OBTENER:
- El perfilamiento del servidor, realizando el test con --prof de node.js. Analizar los resultados obtenidos luego de procesarlos con --prof-process. 
Utilizaremos como test de carga Artillery en línea de comandos, emulando 50 conexiones concurrentes con 20 request por cada una. Extraer un reporte con los resultados en archivo de texto.

Luego utilizaremos Autocannon en línea de comandos, emulando 100 conexiones concurrentes realizadas en un tiempo de 20 segundos. Extraer un reporte con los resultados (puede ser un print screen de la consola)
- El perfilamiento del servidor con el modo inspector de node.js --inspect. Revisar el tiempo de los procesos menos performantes sobre el archivo fuente de inspección.
- El diagrama de flama con 0x, emulando la carga con Autocannon con los mismos parámetros anteriores.
Realizar un informe en formato pdf sobre las pruebas realizadas incluyendo los resultados de todos los test (texto e imágenes).

# Documentacion de ejecucion
Para comprobar la compresion, se agrega un 5to parametro por consola, el mismo indica en que modo se ejecuta el servidor (Con o Sin compresion)
- Sin compresion, no se agrega nada o cualquier valor excepto COMPRESION
![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/desafio_LoggerGzip/public/imagen/endpointINFO_sinCompresion.png)

- Con compresion, se agrega el parametro COMPRESION
![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/desafio_LoggerGzip/public/imagen/endpointINFO_conCompresion.png)

Para probar el logger, toda la informacion enviada por consola, se envia en INFO-WARN-ERROR.
- Los Warn por error de ruta o error en logueo, se guarda en una archivo warn.log.
- Para simular el error en el chat, se cambia el nombre del archivo de persistencia a chat2.txt, entonces al no encontrar el archivo chat.txt, se genera el error, y se lo guarda al mismo en errores.log
![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/desafio_LoggerGzip/public/imagen/logger.png)

Se agrega una funcion para agregar o quitar un ConsoleLog, el cual muestra la informacion que se envia al cliente, para utilizarla se debe descomentarla.
- Primero se inicia el server en modo FORK sin el consoleLog y se ejecuta artillery. Luego se agrega el consolelog, se vuelve a ejecutar el server y se prueba nuevamente artillery
![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/desafio_LoggerGzip/public/imagen/consolelogINFO.png)
![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/desafio_LoggerGzip/public/imagen/artillery.png)
- artillery quick --count 50 -n 20 http://localhost:8080/info > result_fork_sinConsoleLog.txt
- artillery quick --count 50 -n 20 http://localhost:8080/info > result_fork_conConsoleLog.txt

Luego se prende el servidor en modo profiler, se renombran los archivos para ambos casos (sin y con console)
- node --prof server.js 8080 FORK
- ![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/desafio_LoggerGzip/public/imagen/modoProfiler.png)

Se vuelve a ejecutar artillery para ambos modos, y en powershell (para el funcionamiento correcto en Windows) se ejecutan los siguiente comandos para decodificar los archivos:
- node --prof-process sinConsole-v8.log > result_fork_prof-sinConsole.txt
- node --prof-process conConsole-v8.log > result_fork_prof-conConsole.txt

Con autocannon se generan 100 conexiones en 20segundos, esto por consola (agregado/sacando el console.log):
- Se instala la dependencia de autocannon: npm i autocannon -g
- Se corre el servidor en el puerto 8080 modo FORK: npm start 8080 FORK
- ![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/desafio_LoggerGzip/public/imagen/autocannon1.png)
- En otra terminal, se ejecuta autocannon: autocannon -d 20 -c 100 "http://localhost:8080/info"
- Los resultados son los siguientes:
- ![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/desafio_LoggerGzip/public/imagen/autocannon2.png)
- SIN CONSOLE.LOG RESULTADOS:
- ![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/desafio_LoggerGzip/public/imagen/autocannon3.png)

Para el diagrama de flama se realiza lo siguiente:
- Se instala la dependencia npm install -g 0x
- En la ruta del proyecto se ejecuta el servidor de la siguiente manera 0x server.js 8080 FORK (tanto SIN y CON console.log)
- ![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/desafio_LoggerGzip/public/imagen/0x_sinConsole.png)
- Se ejecuta el comando de artillery 
- >> artillery quick --count 50 -n 20 http://localhost:8080/info > result_fork_sinConsoleLog.txt

El archivo con la conclusion obtenida, se encuentra en la siguiente ruta:
- https://github.com/carlosmbelmonte/repoBackend/blob/main/desafio_LoggerGzip/public/ConclusioObtenida.pdf




