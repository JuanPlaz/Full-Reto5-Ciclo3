package Reto3.Reto3.repositorios.CRUD;

import Reto3.Reto3.entidades.Message;
import Reto3.Reto3.entidades.Reservation;
import org.springframework.data.repository.CrudRepository;

public interface RepositoryCrudMessage extends CrudRepository<Message,Integer> {
}
