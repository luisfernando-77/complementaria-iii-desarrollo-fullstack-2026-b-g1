# Semana 6 · Arquitectura en capas de una API

## Caso elegido

API para gestionar productos.

## Diagrama de capas

```text
Cliente
   |
   v
Controller
   |
   v
Service
   |
   v
Repository
   |
   v
Entity
```

## Responsabilidades por capa

### Controller

Recibe las solicitudes HTTP y devuelve las respuestas al cliente.

### Service

Contiene la lógica del negocio y procesa la información recibida desde el controller.

### Repository

Se encarga del acceso a los datos y de realizar operaciones de almacenamiento y consulta.

### Entity

Representa la estructura de los datos del producto dentro de la aplicación.

## Endpoint de ejemplo

```text
GET /productos
```

Flujo del endpoint:

```text
GET /productos
      |
      v
ProductController
      |
      v
ProductService
      |
      v
ProductRepository
      |
      v
Product
```

El controller recibe la petición, el service procesa la solicitud, el repository consulta los datos y la entity representa la información del producto.