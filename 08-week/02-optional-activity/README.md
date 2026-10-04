# Semana 8 · CRUD REST con Spring Boot

## Descripción

Se desarrolló una API REST para gestionar productos utilizando Spring Boot, Spring Data JPA y una base de datos H2.

La aplicación utiliza una arquitectura en capas:

```text
Controller
   |
Service
   |
Repository
   |
Entity
```

## Tecnologías

- Java 17
- Spring Boot
- Spring Web
- Spring Data JPA
- H2 Database
- Maven
- Postman

## Estructura

```text
producto-api/
└── src/
    └── main/
        └── java/
            └── com/
                └── fullstack/
                    └── producto_api/
                        ├── controller/
                        │   └── ProductoController.java
                        ├── entity/
                        │   └── Producto.java
                        ├── repository/
                        │   └── ProductoRepository.java
                        ├── service/
                        │   └── ProductoService.java
                        └── ProductoApiApplication.java
```

## Entidad

La entidad `Producto` contiene los siguientes atributos:

- `id`
- `nombre`
- `precio`

## Endpoints

### Crear producto

```text
POST /productos
```

Ejemplo:

```json
{
  "nombre": "Teclado",
  "precio": 85000
}
```

### Listar productos

```text
GET /productos
```

### Obtener producto por id

```text
GET /productos/{id}
```

Ejemplo:

```text
GET /productos/1
```

### Actualizar producto

```text
PUT /productos/{id}
```

Ejemplo:

```json
{
  "nombre": "Teclado mecánico",
  "precio": 120000
}
```

### Eliminar producto

```text
DELETE /productos/{id}
```

## Pruebas

Los endpoints fueron probados utilizando Postman.

Se verificaron correctamente las operaciones:

- Create
- Read
- Update
- Delete

La aplicación se ejecuta en:

```text
http://localhost:8080
```

## Evidencias

Las capturas de las pruebas realizadas en Postman se encuentran en la carpeta:

```text
evidence/
```