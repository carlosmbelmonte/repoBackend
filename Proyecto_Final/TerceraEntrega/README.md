# TERCERA ENTREGA DEL PROYECTO FINAL
>> Se debe entregar:

- Un menú de registro y autenticación de usuarios basado en passport local, guardando en la base de datos las credenciales y el resto de los datos ingresados al momento del registro.
-- El registro de usuario consiste en crear una cuenta en el servidor almacenada en la base de datos, que contenga el email y password de usuario, además de su nombre, dirección, edad, número de teléfono (debe contener todos los prefijos internacionales) y foto ó avatar. La contraseña se almacenará encriptada en la base de datos.
-- La imagen se podrá subir al servidor y se guardará en una carpeta pública del mismo a la cual se tenga acceso por url.
- Un formulario post de registro y uno de login. De modo que, luego de concretarse cualquiera de estas operaciones en forma exitosa, el usuario accederá a su home.
-- El usuario se logueará al sistema con email y password y tendrá acceso a un menú en su vista, a modo de barra de navegación. Esto le permitirá ver los productos totales con los filtros que se hayan implementado y su propio carrito de compras e información propia (datos de registro con la foto). Además, dispondrá de una opción para desloguearse del sistema.
-- Ante la incorporación de un usuario, el servidor enviará un email al administrador con todos los datos de registro y asunto 'nuevo registro', a una dirección que se encuentre por el momento almacenada en una constante global.
- Envío de un email y un mensaje de whatsapp al administrador desde el servidor, a un número de contacto almacenado en una constante global.
-- El usuario iniciará la acción de pedido en la vista del carrito.
-- Será enviado una vez finalizada la elección para la realizar la compra de productos.
-- El email contendrá en su cuerpo la lista completa de productos a comprar y en el asunto la frase 'nuevo pedido de ' y el nombre y email del usuario que los solicitó. En el mensaje de whatsapp se debe enviar la misma información del asunto del email.
-- El usuario recibirá un mensaje de texto al número que haya registrado, indicando que su pedido ha sido recibido y se encuentra en proceso.

>> Aspectos a incluir:
- El servidor trabajará con una base de datos DBaaS (Ej. MongoDB Atlas) y estará preparado para trabajar en forma local o en la nube a través de la plataforma PaaS Heroku.
- Habilitar el modo cluster para el servidor, como opcional a través de una constante global.
- Utilizar alguno de los loggers ya vistos y así reemplazar todos los mensajes a consola por logs eficientes hacia la misma consola. En el caso de errores moderados ó graves el log tendrá además como destino un archivo elegido.
- Realizar una prueba de performance en modo local, con y sin cluster, utilizando Artillery en el endpoint del listado de productos (con el usuario vez logueado). Verificar los resultados.

# Pasos a seguir para ejecutar el proyecto
-  Se debe crear un archivo .env que contenga las credenciales de Twilio para poder mandar sms y Whatsapp. A su vez ese archivo .env debe tener el puerto de escucha del servidor:
>> ![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/Proyecto_Final/TerceraEntrega/public/imagen/variablesENV.png)
- Luego se debe ejecutar el servidor ya sea en modo FORK o CLUSTER, esto se lo toma como 3er parametro:
>> ![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/Proyecto_Final/TerceraEntrega/public/imagen/modoFORK_00.png)
>> ![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/Proyecto_Final/TerceraEntrega/public/imagen/modoCLUSTER_00.png)
- Despues aparece la vista de logueo, en la misma se debe colocar el mail de usuario y contraseña, en caso de un usuario creado, sino se debe crear uno.
- Para las pruebas en Artillery, se usa el endpoint http://localhost:8080/api/productos ya que el mismo, trae todos los productos disponibles en la DB.
>> ![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/Proyecto_Final/TerceraEntrega/public/imagen/comandosArtillery.png)
- Los resultados de las pruebas de Artillery estan en los archivos result_fork.txt y result_cluster.txt, en los mismos se evidencia que la performance del proyecto aumenta en modo CLUSTER.

# Cambios a tener en cuenta:
- En el archivo switchDB.js se selecciona que DB utilizar para almacenar los productos y carritos, hay 2 opciones, por archivos o por Firebase, para estas pruebas, se opto por Fisebase:
>> ![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/Proyecto_Final/TerceraEntrega/public/imagen/switchDB.png)
- En el archivo server.js se hace referencia al mail de Administrador, el mismo se debe cambiar en las lineas 44 (con su pass) y la linea 78:
>> ![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/Proyecto_Final/TerceraEntrega/public/imagen/server.png)
- En el archivo config.js se debe cambiar las credenciales de las base de datos, al respectivo administrador:
>> ![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/Proyecto_Final/TerceraEntrega/public/imagen/config.png)
- En la carpeta mongoAtlas, se encuentra la conexion a la DB, la cual manejara las cuentas de usuarios del servidor, es decir todos los logueos, en dicha carpeta se debe cambiar el username y password de la base de datos, a la base propia:
>> ![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/Proyecto_Final/TerceraEntrega/public/imagen/controllersdb.png)
- En la carpeta public/js, se debe modificar el archivo twiliowsp.js para agregar el nro de whatsapp del administrador:
>> ![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/Proyecto_Final/TerceraEntrega/public/imagen/twiliowsp.png)