# Semana 7 · Entity y Repository con JPA

## Entity

Se modela la entidad `Producto` para representar los productos almacenados en la base de datos.

```java
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private Double precio;

    public Producto() {
    }

    public Producto(String nombre, Double precio) {
        this.nombre = nombre;
        this.precio = precio;
    }

    public Long getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }
}
```

## Repository

El repository permite acceder a los datos de la entidad `Producto`.

```java
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductoRepository extends JpaRepository<Producto, Long> {

    List<Producto> findByNombre(String nombre);
}
```

La consulta `findByNombre` permite buscar productos por su nombre.

## Operaciones CRUD

### Create

Se usaría para registrar un nuevo producto en la base de datos.

```text
save(producto)
```

### Read

Se usaría para consultar todos los productos o buscar uno por su identificador.

```text
findAll()
findById(id)
```

### Update

Se usaría para modificar los datos de un producto existente y guardar los cambios.

```text
save(producto)
```

### Delete

Se usaría para eliminar un producto por su identificador.

```text
deleteById(id)
```