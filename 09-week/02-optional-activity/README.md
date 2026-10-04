# Semana 9 · Documentar y probar la API

## Descripción

En esta actividad se documentó y probó la API REST de productos desarrollada con Spring Boot.

Se agregó Swagger / OpenAPI para visualizar y probar los endpoints desde el navegador. También se realizaron pruebas con Postman para verificar respuestas exitosas y un caso de error.

## Tecnologías

- Java 17
- Spring Boot
- Spring Web MVC
- Spring Data JPA
- H2 Database
- Maven
- Swagger / OpenAPI
- Postman

## Swagger

La documentación de la API fue habilitada mediante Springdoc OpenAPI.

Swagger UI está disponible en:

```text
http://localhost:8080/swagger-ui.html
```

También se genera la documentación OpenAPI en:

```text
http://localhost:8080/v3/api-docs
```

Desde Swagger se pueden visualizar los siguientes endpoints:

```text
GET    /productos
GET    /productos/{id}
POST   /productos
PUT    /productos/{id}
DELETE /productos/{id}
```

## Pruebas en Postman

Se realizaron pruebas a diferentes endpoints de la API.

### 1. Crear producto

```text
POST /productos
```

Ejemplo del cuerpo enviado:

```json
{
  "nombre": "Mouse",
  "precio": 45000
}
```

Respuesta obtenida:

```json
{
  "nombre": "Mouse",
  "precio": 45000.0,
  "id": 1
}
```

Código HTTP obtenido:

```text
200 OK
```

El código `200 OK` indica que la solicitud fue procesada correctamente.

### 2. Listar productos

```text
GET /productos
```

Respuesta esperada:

```json
[
  {
    "nombre": "Mouse",
    "precio": 45000.0,
    "id": 1
  }
]
```

Código HTTP obtenido:

```text
200 OK
```

El código `200 OK` indica que la consulta fue realizada correctamente.

### 3. Producto no encontrado

Para probar un caso de error se realizó la siguiente solicitud:

```text
GET /productos/999
```

Como el producto con ID `999` no existe, la API responde con:

```text
404 Not Found
```

El código `404 Not Found` indica que el recurso solicitado no fue encontrado.

## Códigos HTTP

| Código | Significado |
|---|---|
| 200 OK | La solicitud se procesó correctamente |
| 404 Not Found | El recurso solicitado no existe |

## Evidencias

Las evidencias de las pruebas se encuentran en la carpeta:

```text
evidence/
```

Archivos incluidos:

```text
swagger-ui.png
post-producto.png
get-productos.png
error-404.png
```

Estas capturas muestran Swagger activo, las pruebas realizadas con Postman y el caso de error 404.

## Ejecución

Para ejecutar el proyecto:

```bash
mvn spring-boot:run
```

Luego se puede acceder a Swagger desde:

```text
http://localhost:8080/swagger-ui.html
```