# Producto API

API REST developed with Spring Boot to manage products.

## Technologies

- Java 17
- Spring Boot
- Spring Web
- Spring Data JPA
- H2 Database
- Validation
- Swagger / OpenAPI
- Postman
- Maven

## Project structure

The project uses a layered architecture:

```text
src/main/java/com/actividad/productoapi
├── controller
│   └── ProductoController.java
├── entity
│   └── Producto.java
├── repository
│   └── ProductoRepository.java
├── service
│   └── ProductoService.java
└── ProductoApiApplication.java
```

## Run the project

Open a terminal in the project folder and run:

```bash
.\mvnw.cmd spring-boot:run
```

The API will run at:

```text
http://localhost:8080
```

Swagger UI is available at:

```text
http://localhost:8080/swagger-ui/index.html
```

## API reference

The API provides a `GET /api/productos` endpoint to retrieve all products.
The `GET /api/productos/{id}` endpoint retrieves a specific product by its identifier.
The `POST /api/productos` endpoint creates a new product.
The `PUT /api/productos/{id}` endpoint updates an existing product.
The `DELETE /api/productos/{id}` endpoint removes a product from the system.
The API returns `404 Not Found` when the requested product does not exist.
The API returns `400 Bad Request` when the submitted product data is invalid.

## Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/productos` | List all products |
| GET | `/api/productos/{id}` | Get a product by ID |
| POST | `/api/productos` | Create a new product |
| PUT | `/api/productos/{id}` | Update an existing product |
| DELETE | `/api/productos/{id}` | Delete a product |

## Product example

Example request body:

```json
{
  "nombre": "Monitor",
  "precio": 650000,
  "stock": 4
}
```

## HTTP responses

| Status code | Description |
|---|---|
| 200 OK | Successful GET or PUT request |
| 201 Created | Product created successfully |
| 204 No Content | Product deleted successfully |
| 400 Bad Request | Invalid product data |
| 404 Not Found | Product not found |

## Swagger

The API documentation can be tested using Swagger UI.

Run the application and open:

```text
http://localhost:8080/swagger-ui/index.html
```

Swagger includes the following operations:

```text
GET    /api/productos
GET    /api/productos/{id}
POST   /api/productos
PUT    /api/productos/{id}
DELETE /api/productos/{id}
```

## Postman tests

The API was tested using Postman.

The following requests were verified:

```text
POST /api/productos
GET /api/productos/{id}
```

A successful product creation returned:

```text
201 Created
```

A successful product query returned:

```text
200 OK
```

A request for a nonexistent product returned:

```text
404 Not Found
```

Validation errors returned:

```text
400 Bad Request
```

## Persistence

The project uses Spring Data JPA with an H2 in-memory database.

The product entity contains the following fields:

```text
id
nombre
precio
stock
```

The database table is created automatically when the application starts.

## Validation

The API validates product data before saving it.

The product name cannot be empty.
The price must be greater than zero.
The stock cannot be negative.

Invalid data returns:

```text
400 Bad Request
```

## Architecture

The application is organized using a layered architecture.

- `entity`: contains the `Producto` entity.
- `repository`: provides database access using JPA.
- `service`: contains the business logic.
- `controller`: exposes the REST endpoints.

## Build

To verify that the project compiles correctly, run:

```bash
.\mvnw.cmd clean install
```

A successful build should finish with:

```text
BUILD SUCCESS
```