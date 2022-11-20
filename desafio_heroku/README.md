# DesafioHeroku
Se toma como base el desafio_LoggerGzip para probarlo en Heroku, para ellos se ejecuto todo el proyecto en CLI, ya que a traves de GitHub, no se instalaban las dependencias.

# Pasos a seguir
- Se crea una nueva app en Heroku, tal cual las diapositivas de las clases. Se ejecuta heroku desde CLI, asi se instalan las dependencias para el desafio
![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/desafio_heroku/public/imagen/heroku1.png)
![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/desafio_heroku/public/imagen/heroku2.png)
- Se elimina faker del proyecto, ya que heroku no puede instalar la dependencia, y se agregan productos fijos en routes/routeFaker.js
![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/desafio_heroku/public/imagen/fakerCambio.png)
- Se modifica el puerto de escucha, para que escuche en el 8080 en modo local y con heroku, este le asigna uno. Tambien se modifica en packjson el npm start, para forzar el inicio en modo FORK y en dicho puerto
![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/desafio_heroku/public/imagen/herokuCambio1.png)
![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/desafio_heroku/public/imagen/herokuCambio2.png)