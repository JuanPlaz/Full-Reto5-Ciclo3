package Reto3.Reto3.repositorios.CRUD;

import Reto3.Reto3.entidades.Reservation;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;
import java.util.List;
import java.util.Objects;

public interface RepositoryCrudReservation extends CrudRepository<Reservation,Integer> {

    @Query("SELECT c.client, COUNT(c.idReservation) FROM Reservation AS c GROUP BY c.client ORDER BY COUNT(c.idReservation) DESC")
    public List<Object[]> TotalReservationsByClients();
    public List<Reservation> findAllByStartDateAfterAndDevolutionDateBefore(Date start, Date end);
    public List<Reservation> findAllByStatus (String status);


}
