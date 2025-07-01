package br.com.app.controlealimentos;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;

import java.time.LocalDate;

@Entity
public class RegistroConsumo extends PanacheEntity {
    @ManyToOne
    public Alimento alimento;
    public double pesoEmGramas;
    public LocalDate dataConsumo;

    public RegistroConsumo() {
        this.dataConsumo = LocalDate.now();
    }
}
