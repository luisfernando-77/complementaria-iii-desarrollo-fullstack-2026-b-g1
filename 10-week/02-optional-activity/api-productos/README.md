# API de Productos

Proyecto desarrollado para la actividad práctica de la Semana 10 de Desarrollo Fullstack.

La aplicación implementa una API REST para gestionar productos mediante operaciones CRUD utilizando Spring Boot, Spring Data JPA y una base de datos H2.

## Tecnologías utilizadas

- Java 17
- Spring Boot 4.1.1
- Spring Web MVC
- Spring Data JPA
- H2 Database
- Jakarta Validation
- Swagger / OpenAPI
- Maven

## Estructura del proyecto

El proyecto está organizado por capas:

- `entity`: contiene la entidad `Producto`.
- `repository`: contiene el repositorio encargado del acceso a los datos.
- `service`: contiene la lógica de negocio.
- `controller`: contiene los endpoints REST de la aplicación.

La estructura principal del proyecto es:

```text
src
└── main
    ├── java
    │   └── com
    │       └── corhuila
    │           └── api_productos
    │               ├── controller
    │               │   └── ProductoController.java
    │               ├── entity
    │               │   └── Producto.java
    │               ├── repository
    │               │   └── ProductoRepository.java
    │               ├── service
    │               │   └── ProductoService.java
    │               └── ApiProductosApplication.java
    └── resources
        └── application.properties
```

## Modelo Producto

La entidad `Producto` contiene los siguientes atributos:

- `id`: identificador generado automáticamente.
- `nombre`: nombre del producto.
- `precio`: precio del producto.
- `categoria`: categoría del producto.
- `stock`: cantidad disponible.

También se implementaron validaciones para evitar datos inválidos, como nombres vacíos, precios menores o iguales a cero y valores negativos en el stock.

## Ejecutar el proyecto

Para ejecutar el proyecto se debe abrir una terminal dentro de la carpeta:

```text
10-week/02-optional-activity/api-productos
```

En Windows ejecutar:

```bash
.\mvnw.cmd spring-boot:run
```

Cuando la aplicación inicia correctamente, queda disponible en:

```text
http://localhost:8080
```

## Endpoints de la API

La URL base para trabajar con los productos es:

```text
http://localhost:8080/api/productos
```

### Listar todos los productos

```http
GET /api/productos
```

Ejemplo:

```text
http://localhost:8080/api/productos
```

Respuesta esperada:

```text
200 OK
```

---

### Buscar producto por ID

```http
GET /api/productos/{id}
```

Ejemplo:

```text
http://localhost:8080/api/productos/1
```

Si el producto existe:

```text
200 OK
```

Si el producto no existe:

```text
404 Not Found
```

---

### Buscar productos por nombre

```http
GET /api/productos?nombre=teclado
```

Este endpoint permite buscar productos cuyo nombre contenga el texto enviado como parámetro.

Ejemplo:

```text
http://localhost:8080/api/productos?nombre=teclado
```

Respuesta esperada:

```text
200 OK
```

---

### Crear un producto

```http
POST /api/productos
```

Ejemplo de cuerpo JSON:

```json
{
  "nombre": "Teclado mecánico",
  "precio": 180000,
  "categoria": "Perifericos",
  "stock": 15
}
```

Respuesta esperada:

```text
201 Created
```

Ejemplo de respuesta:

```json
{
  "id": 1,
  "nombre": "Teclado mecánico",
  "precio": 180000.0,
  "categoria": "Perifericos",
  "stock": 15
}
```

---

### Actualizar un producto

```http
PUT /api/productos/{id}
```

Ejemplo:

```text
http://localhost:8080/api/productos/1
```

Cuerpo JSON:

```json
{
  "nombre": "Teclado mecánico RGB",
  "precio": 195000,
  "categoria": "Perifericos",
  "stock": 12
}
```

Si el producto existe:

```text
200 OK
```

Si el producto no existe:

```text
404 Not Found
```

Ejemplo de respuesta:

```json
{
  "id": 1,
  "nombre": "Teclado mecánico RGB",
  "precio": 195000.0,
  "categoria": "Perifericos",
  "stock": 12
}
```

---

### Eliminar un producto

```http
DELETE /api/productos/{id}
```

Ejemplo:

```text
http://localhost:8080/api/productos/1
```

Si el producto existe:

```text
204 No Content
```

Si el producto no existe:

```text
404 Not Found
```

## Validaciones

La API utiliza Jakarta Validation para validar la información enviada.

Algunas validaciones implementadas son:

- El nombre del producto es obligatorio.
- El precio es obligatorio.
- El precio debe ser mayor que cero.
- La categoría es obligatoria.
- El stock no puede ser negativo.

## Swagger / OpenAPI

La API está documentada mediante Swagger y OpenAPI.

Swagger UI permite visualizar y probar los diferentes endpoints directamente desde el navegador.

Para acceder a Swagger:

```text
http://localhost:8080/swagger-ui.html
```

También se puede acceder mediante:

```text
http://localhost:8080/swagger-ui/index.html
```

La especificación OpenAPI se encuentra disponible en:

```text
http://localhost:8080/v3/api-docs
```

Desde Swagger se probaron las operaciones:

- `GET`
- `GET por ID`
- `POST`
- `PUT`
- `DELETE`

## Base de datos H2

El proyecto utiliza H2 como base de datos en memoria.

La consola de H2 se encuentra disponible en:

```text
http://localhost:8080/h2-console
```

Datos de conexión:

```text
JDBC URL: jdbc:h2:mem:productosdb
User Name: sa
Password:
```

La tabla de productos es generada automáticamente por Hibernate cuando inicia la aplicación.

## Configuración de H2

La configuración utilizada en `application.properties` es:

```properties
spring.application.name=api-productos

spring.datasource.url=jdbc:h2:mem:productosdb
spring.datasource.driver-class-name=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

spring.h2.console.enabled=true
spring.h2.console.path=/h2-console
```

## Pruebas realizadas con Swagger

La API fue probada desde Swagger UI.

### Crear producto

Se realizó una petición:

```http
POST /api/productos
```

Con el cuerpo:

```json
{
  "nombre": "Teclado mecánico",
  "precio": 180000,
  "categoria": "Perifericos",
  "stock": 15
}
```

La respuesta obtenida fue:

```text
201 Created
```

### Consultar producto

Se realizó una petición:

```http
GET /api/productos/3
```

La respuesta obtenida fue:

```text
200 OK
```

### Actualizar producto

Se realizó una petición:

```http
PUT /api/productos/3
```

Con el cuerpo:

```json
{
  "nombre": "Teclado mecánico RGB",
  "precio": 195000,
  "categoria": "Perifericos",
  "stock": 12
}
```

La respuesta obtenida fue:

```text
200 OK
```

### Eliminar producto

Se realizó una petición:

```http
DELETE /api/productos/4
```

La respuesta obtenida fue:

```text
204 No Content
```

También se comprobó el comportamiento de la API al intentar acceder a un recurso inexistente.

La respuesta obtenida fue:

```text
404 Not Found
```

## Pruebas realizadas con Postman

También se verificó el funcionamiento de la API utilizando Postman.

### Listar productos

```http
GET http://localhost:8080/api/productos
```

Resultado:

```text
200 OK
```

### Crear producto

```http
POST http://localhost:8080/api/productos
```

Cuerpo enviado:

```json
{
  "nombre": "Monitor 24 pulgadas",
  "precio": 650000,
  "categoria": "Tecnologia",
  "stock": 8
}
```

Resultado:

```text
201 Created
```

Ejemplo de respuesta:

```json
{
  "id": 5,
  "nombre": "Monitor 24 pulgadas",
  "precio": 650000.0,
  "categoria": "Tecnologia",
  "stock": 8
}
```

### Actualizar producto

```http
PUT http://localhost:8080/api/productos/5
```

Cuerpo enviado:

```json
{
  "nombre": "Monitor 24 pulgadas IPS",
  "precio": 690000,
  "categoria": "Tecnologia",
  "stock": 6
}
```

Resultado:

```text
200 OK
```

Respuesta:

```json
{
  "id": 5,
  "nombre": "Monitor 24 pulgadas IPS",
  "precio": 690000.0,
  "categoria": "Tecnologia",
  "stock": 6
}
```

### Eliminar producto

```http
DELETE http://localhost:8080/api/productos/5
```

Resultado:

```text
204 No Content
```

## Códigos HTTP comprobados

| Operación | Código HTTP |
|---|---|
| Listar productos | `200 OK` |
| Buscar producto existente | `200 OK` |
| Crear producto | `201 Created` |
| Actualizar producto | `200 OK` |
| Eliminar producto | `204 No Content` |
| Producto inexistente | `404 Not Found` |

## Resultado final

La API permite realizar correctamente las operaciones CRUD sobre productos.

Se implementaron las capas de entidad, repositorio, servicio y controlador.

La información se gestiona mediante Spring Data JPA y una base de datos H2.

Los endpoints fueron documentados con Swagger y probados tanto desde Swagger UI como desde Postman.

Con esto se cumple el objetivo de consolidar una API REST con persistencia, documentación y pruebas.