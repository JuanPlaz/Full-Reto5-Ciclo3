package Reto3.Reto3.repositorios;

import Reto3.Reto3.entidades.Client;
import Reto3.Reto3.entidades.DTOs.CountClient;
import Reto3.Reto3.entidades.Reservation;
import Reto3.Reto3.repositorios.CRUD.RepositoryCrudReservation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class RepositoryReservation {
    @Autowired
    private RepositoryCrudReservation rcr;

    public List<Reservation> getAll() { return (List<Reservation>) rcr.findAll(); }
    public Optional<Reservation> getReservation(int id) { return rcr.findById(id); }

    public Reservation save(Reservation rsv) {
        if (rsv.getIdReservation() == null) {
            return rcr.save(rsv);
        } else {
            Optional<Reservation> e = rcr.findById(rsv.getIdReservation());
            if (e == null) {
                return rcr.save(rsv);
            } else {
                return rsv;
            }
        }
    }

    public Reservation update(Reservation rsv) {
        Optional<Reservation> e = rcr.findById(rsv.getIdReservation());
        if (!e.isEmpty()) {
            if (rsv.getStartDate() != null)
            {
                e.get().setStartDate(rsv.getStartDate());
            }
            if (rsv.getDevolutionDate() != null)
            {
                e.get().setDevolutionDate(rsv.getDevolutionDate());
            }
            if (rsv.getScore() != null)
            {
                e.get().setScore(rsv.getScore());
            }
            if (rsv.getBike() != null)
            {
                e.get().setBike(rsv.getBike());
            }
            if (rsv.getClient() != null)
            {
                e.get().setClient(rsv.getClient());
            }
            if (rsv.getStatus() != null)
            {
                e.get().setStatus(rsv.getStatus());
            }
            rcr.save(e.get());
            return e.get();
        } else {
            return rsv;
        }
    }

    public void delete(Reservation rsv) { rcr.delete(rsv); }

    public boolean deleteReservation(int id) {
        boolean aBoolean = getReservation(id).map(reservation -> {
            rcr.delete(reservation);
            return true;
        }).orElse(false);
        return aBoolean;
    }

    public List<CountClient> getTopClients() {
        List<CountClient> respuesta = new ArrayList<>();
        List<Object[]> reporte = rcr.TotalReservationsByClients();
        for (int i = 0; i<reporte.size(); i++){
            respuesta.add(new CountClient((Long) reporte.get(i)[1], (Client) reporte.get(i)[0]));
        }
        return respuesta;
    }
    public List<Reservation> getReservationPeriod (Date start, Date Devolution){
        return rcr.findAllByStartDateAfterAndDevolutionDateBefore(start, Devolution);
    }

    public List<Reservation> getReservationStatus (String status) {
        return rcr.findAllByStatus(status);
    }
}
