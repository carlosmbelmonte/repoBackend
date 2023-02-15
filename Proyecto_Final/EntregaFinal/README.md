# Curso Backend - MERN Stack: Proyecto Final
**E-commerce project**
Desarrollarás el backend de una aplicación de **e-commerce** para poder vender productos de un rubro a elección.


## User story/brief:
- Contendrá las rutas necesarias que permitan listar los productos existentes, ingresar productos nuevos, borrar y modificar sus detalles, así como interactuar con el carrito de compras.
- Se implementará una API RESTful con los verbos get, post, put y delete para cumplir con todas las acciones necesarias.
- Debe brindar al frontend un mecanismo de ingreso autorizado al sistema basado en JWT (Json Web Token).
- Los productos ingresados se almacenarán en una base de datos MongoDB.
- El usuario podrá registrar sus credenciales de acceso (email y password) para luego poder ingresar a su cuenta. Estas credenciales serán guardadas en la base de datos MongoDB encriptando la contraseña.
- El cliente tendrá una sesión activa de usuario con tiempo de expiración configurable.
- Implementarás un canal de chat basado en websockets, el cual permita atender las consultas del cliente.
- La arquitectura del servidor estará basada en capas (MVC)
-  El servidor podrá tomar configuraciones desde un archivo externo.  
-  Dispondrá de una vista creada con pug, que permita ver la configuración del servidor.
-  Se enviará un mail a una casilla configurable, por cada registro nuevo de usuario y con cada orden de compra generada.
-  En caso de detectar algún error, el servidor enviará una vista implementada con ejs, que contenga el id y el detalle completo
-  Dos opciones para el frontend: desarrollo por parte del estudiante, ó se proporcionará uno para hacer las pruebas necesarias.

## Piezas sugeridas
**Te recomendamos incluir:**
-  Node.js
-  MongoDB
-  Passport JWT    
-  Mongoose    
-  Bcrypt    
-  Websocket    
-  Dotenv    
-  Handlebars, Pug, Ejs    
-  Nodemailer

## Requisitos base
**Los requisitos base  serán parte de los criterios de evaluación para aprobar el proyecto.**
-	Inicio: Al momento de requerir la ruta base **‘/’**
	-	Permitir un menú de ingreso al sistema con email y password así como también la posibilidad de registro de un nuevo usuario.
	-	El menú de registro consta del nombre completo del cliente, número telefónico, email y campo de password duplicado para verificar coincidencia.
	-	Si un usuario se loguea exitosamente o está en sesión activa, la ruta ‘/’ hará una re dirección a la ruta del carrito **/productos**
	-	La ruta **/productos** devolverá el listado de todos los productos disponibles  para la compra.
	-	La ruta **/categoria/:categoriaId/productos** devolverá los productos por la categoría requerida.
	-	Los ítems podrán ser agregados al carrito de compras y listados a través de la ruta **/carrito**.
	-	Se podrán modificar y borrar por su id a través de la ruta **/carrito:id**.
-	Flow: Se puede solicitar un producto específico con la ruta **/productos/:id**, donde **id** es el id del item generado por MongoDB y **devolver la descripción del producto** ( foto, precio, selector de cantidad).
-	Si se ingresa a **/productos/:id** y el **producto no existe** en MongoDB, debemos responder un mensaje adecuado que indique algo relacionado a que el producto no existe.
-	MongoDB:
	-	Implementar al menos estas colecciones:
		-	**usuarios:** clientes registrados
		
		-	**productos:** catálogo completo
				-	Link para foto (puede almacenarse de modo estático en la página en una subruta **/images/:productoid**).
				-	Precio unitario.
				-	Descripción.
				-	Categoría.
				
		-	**mensajes:** chat del usuario (preguntas y respuestas)
				-	Email: del usuario que pregunta o al que se responde.  
				-	Tipo (‘usuario’ para preguntas ó ‘sistema’ para respuestas).   
				-	Fecha y hora.    
				-	Cuerpo del mensaje.
				
		-	**carrito:** orden temporal de compra   
				-	Email.    
				-	Fecha y hora.    
				-	Items con sus cantidades.
				-	Dirección de entrega.
				
		-	**ordenes:** las órdenes generadas, que deben incluir los productos, descripciones y los precios **al momento de la compra**.
				-   Ítems: las órdenes deben poder tener productos surtidos, cada uno con su cantidad. Por ejemplo: remeras x 2 y gorra x 1.
				-   Número de orden: Se extrae de la cantidad de órdenes almacenadas.    
				-	Fecha y hora.
				-	Estado ( por defecto en ‘generada’).    
				-	Email de quién realizó la orden.
-	Finalizada la orden, enviar un mail a la dirección de mi cuenta con los detalles de la orden.
-	Se dispondrá de un archivo de configuración externo con opciones para desarrollo y otras para producción, que serán visualizadas a través de una vista construida con handlebars. Como parámetros de configuración estará el puerto de escucha del servidor, la url de la base de datos, el mail que recibirá notificaciones del backend, tiempo de expiración de sesión y los que sea necesario incluir.
-	Vamos a contar con un canal de chat general donde el usuario enviará los mensajes en la ruta **/chat** y en **/chat/:email** podrá ver sólo los suyos. Se utilizará la colección **mensajes** en MongoDB. La tecnología de comunicación a utilizar será Websockets. El servidor implementará una vista, utilizando handlebars, para visualizar todos los mensajes y poder responder individualmente a ellos, eligiendo el email de respuesta.


## Requisitos Extra
**Los requisitos extra pro-coders no se incluyen en los criterios de evaluación.**
Los requisitos extra son funcionalidades opcionales que no se incluyen en los criterios de evaluación, pero si te falta diversión y quieres agregar valor a tu proyecto... ¡bajo la única **condición** de que **lo que incluyas debe funcionar!**
-	**auth/login:** Implementar alguna de las estrategias de autenticación disponibles en passport para permitir el login con Facebook y Gmail    
-	**Custom item:** Posibilidad de agregar características seleccionables al producto (ej. talla, color, etc). La customización no debería modificar el precio. Las selecciones serán detalladas en el checkout. Por ejemplo: **1 x camisa (roja) $200 y 2 x camisa (verde) $400.**    
-	**Stock check:** Validar stock al momento de intentar generar la **orden**.    
-	**Mis órdenes:** El usuario podrá visualizar todas las órdenes que realizó a través de la ruta **/orden**.

## Dont’s
**No es necesario ni recomendado.**
-	Crear un administrador de stock, dado que puede escaparse del scope y requerir bastante trabajo extra. Podremos gestionar el stock desde la base MongoDB.    
-	Implementar el FrontEnd salvo que así sea deseado por parte del estudiante.

# Ejecucion del Desafio
- Se instalan todas las dependencias especificadas en el package.json con el comando npm i
- Se crean 2 archivos .env, uno para Desarrollo (development.env) y otro para Producción (production.env). Ambos comparten el mismo nombre de las variables globales, solo que cambian su contenido (en algunos casos).
- ![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/Proyecto_Final/EntregaFinal/public/imagen/development.png)
- ![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/Proyecto_Final/EntregaFinal/public/imagen/production.png)
- Para correr el server en modo desarrollo, se escribe el comando npm run dev.
- Para correr el server en modo producción, se escribe el comando npm run prod.
- El archivo package.json tiene 2 scripts, para aceptar estos comandos
- ![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/Proyecto_Final/EntregaFinal/public/imagen/scripts.png)
- En mongo atlas, se crea la colección proyectofinal. Tiene un documento llamado usuarios. En el mismo se debe crear un usuario admin con id=0, como se muestra en la imagen:
- ![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/Proyecto_Final/EntregaFinal/public/imagen/userAdmin.png)
- Se recomienda cambiar el tiempo de expiración en el archivo development.env, para poder ver la expiracion de los JWT. Los valores de los mismos estan expresados en segundos.
- En las rutas API se puede probar el proyecto RestFul, mientras que en el front del mismo, se prueba la creacion de usuarios, chats, carritos y ordenes. Tambien se pueden crear carritos, chats y ordenes desde las rutas API. Se recomienda usar Postman

# Carga documentos con Postman
- En la ruta /api/productos/ y mediante el metodo POST se cargan productos a la base de dato, estos son cargados a traves del body, con el siguiente formato, precio y stock son numeros, el resto string:
```json
{
    "nombre": " ",
    "descripcion": " ",
    "categoria": " ",
    "foto": " ",
    "precio": ,
    "stock": ,
}
```
- En la ruta /api/usuarios/signup y mediante el metodo POST se cargan usuarios a la DB, tambien se puede hacer desde el front. Tienen el siguiente formato, edad y telefono son numeros:
```json
{
    "nombrefull": " ",
    "password": " ",
    "password2": " ",
    "email": "", 
    "direccion": " ", 
    "edad": , 
    "telefono": , 
    "avatar": " "
}
```
- En la ruta /api/carritos/ y mediante el metodo POST se generan carritos en la DB, tambien se puede hacer desde el front. Estos estan asociados a un mail y una direccion:
```json
{
    "email": " ",
    "direccion": " "
}
```
- ACLARACION: Algunas rutas requieren de un token, ya sea de USUARIO o de ADMIN, para obtener estos tokens. La ruta para obtenerlos es /API/usuarios/login 
- Para esto se requiere que el usuario previamente se registre y luego colocar el mail/password. Con el siguiente JSON se obtiene el token:
```json
{
    "email": " ",
    "password": " "
}
```

# Navegabiidad
![image](https://github.com/carlosmbelmonte/repoBackend/blob/main/Proyecto_Final/EntregaFinal/public/imagen/ProyectoFinal-ecommerce.gif)

