package br.com.app.controlealimentos;


import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/api")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ConsumoResource {

    // Endpoint para listar os alimentos cadastrado
    @GET
    @Path("/alimentos")
    public List<Alimento> alimentos() {
        return Alimento.listAll();
    }
    //Endpoint para cadastrar um novo alimento
    @POST
    @Path("/alimentos")
    @Transactional
    public Response cadastrarAlimentos(Alimento alimento){
        alimento.persist();
        return Response.status(Response.Status.CREATED).entity(alimento).build();
    }
    // Endpoint para registrar um consumo (coração da aplicação)
    @POST
    @Path("/consumo")
    @Transactional
    public Response registrarConsumo (RegistroConsumo consumo){
        Alimento alimento = Alimento.findById(consumo.alimento.id);
            if (alimento == null){
                return Response.status(Response.Status.NOT_FOUND).entity("Alimento não encontrado").build();
            }
            consumo.persist();
            return Response.status(Response.Status.CREATED).entity(consumo).build();
    }

}
