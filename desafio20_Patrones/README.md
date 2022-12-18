# Consigna
- Modificar la capa de persistencia incorporando los conceptos de Factory, DAO, y DTO.
- Los DAOs deben presentar la misma interfaz hacia la lógica de negocio de nuestro servidor.
- El DAO seleccionado (por un parámetro en línea de comandos como lo hicimos anteriormente) será devuelto por una Factory para que la capa de negocio opere con el.
- Cada uno de estos casos de persistencia, deberán ser implementados usando el patrón singleton que impida crear nuevas instancias de estos mecanismos de acceso a los datos.
- Comprobar que si llamo a la factory dos veces, con una misma opción elegida, devuelva la misma instancia.
- Implementar el patrón Repository para la persistencia de productos y mensajes.

# Ejecucion Desafio
- Para ejecutar el desafio, se debe poner por linea de comandos los parametros a elegir, teniendo en cuenta lo siguiente:
-> process.argv[2] pertenece al puerto de escucha, se recomienda utilizar el 8080.
-> process.argv[3] pertenece a la seleccion del modo CLUSTER o modo FORK, por defecto en modo FORK.
-> process.argv[4] pertenece a la seleccion del modo de trabajo con NGINX, si se coloca SINIGNX entra en este modo.
-> process.argv[5] pertenece a las pruebas de compresion, si se coloca COMPRESION en la ruta /info se realiza una compresion.
-> process.argv[6] seleccion de DAO de persistencia, TXT corresponde a archivos y FIRE pertenece a Firebase, por defecto se toma TXT.

