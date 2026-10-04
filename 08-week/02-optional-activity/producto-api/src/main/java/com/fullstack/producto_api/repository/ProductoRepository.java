package com.fullstack.producto_api.repository;

import com.fullstack.producto_api.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
}