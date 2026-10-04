package com.actividad.productoapi.service;

import com.actividad.productoapi.entity.Producto;
import com.actividad.productoapi.repository.ProductoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {

    private final ProductoRepository productoRepository;

    public ProductoService(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    public List<Producto> listarTodos() {
        return productoRepository.findAll();
    }

    public Optional<Producto> buscarPorId(Long id) {
        return productoRepository.findById(id);
    }

    public Producto guardar(Producto producto) {
        return productoRepository.save(producto);
    }

    public Producto actualizar(Long id, Producto producto) {
        Optional<Producto> productoExistente = productoRepository.findById(id);

        if (productoExistente.isEmpty()) {
            return null;
        }

        Producto productoActual = productoExistente.get();

        productoActual.setNombre(producto.getNombre());
        productoActual.setPrecio(producto.getPrecio());
        productoActual.setStock(producto.getStock());

        return productoRepository.save(productoActual);
    }

    public boolean eliminar(Long id) {
        if (!productoRepository.existsById(id)) {
            return false;
        }

        productoRepository.deleteById(id);
        return true;
    }
}