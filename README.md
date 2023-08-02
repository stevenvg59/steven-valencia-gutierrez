# steven-valencia-gutierrez
Prueba Tecnica - Backend OnRoad

Ejercicio
Se pide crear un sistema de buses que maneje una serie de itinerarios de lima hacia
todas las demás provincias.
1. Los buses se identifican por placa y operador.
2. Los itinerarios deben tener la siguiente información:
Ciudad de origen
Ciudad de destino
Horario de salida
 Horario de llegada
Precio del pasaje
Bus asignado
3. Los buses tendrán un mínimo de 20 asientos y un máximo de 35.
4. Habrá 3 tipos de asientos: Turista, Ejecutivo, Premium. Cada uno de ellos
tendrá un valor agregado que lo manejará a criterio del desarrollador.
5. Los usuarios deben poder buscar itinerarios disponibles por ciudad de origen y
destino, y reservar su asiento en el bus seleccionado.
6. El sistema debe permitir agregar y actualizar itinerarios, así como revisar las
reservas realizadas en sus buses.
7. Se debe implementar un carrito de compras por usuario tipo pasajero, el usuario
puede comprar la cantidad de tickets que requiera.
8. Se debe hacer uso de una base de datos relacional.
9. Se tendrán 2 tipos de usuarios..
a. Usuario onroad: Podrá realizar todas las acciones del sistema basado en
privilegios de escritura, lectura.
b. Usuario pasajero: Usuario tipo cliente que abordará los buses.
10. Se pide una mensajería de chat en tiempo real entre usuarios tipo onroad para
poder realizar coordinaciones internas.