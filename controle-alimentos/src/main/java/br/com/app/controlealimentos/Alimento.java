package br.com.app.controlealimentos;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;

@Entity
public class Alimento extends PanacheEntity {
    public String nome;
    public double carboidratos; // por 100g
    public double proteinas;    // por 100g
    public double gorduras;     // por 100g
    public double calorias;     // por 100g
}