package Reto3.Reto3.controladores;

import Reto3.Reto3.entidades.DTOs.CountClient;
import Reto3.Reto3.entidades.DTOs.CountStatus;
import Reto3.Reto3.entidades.Message;
import Reto3.Reto3.entidades.Reservation;
import Reto3.Reto3.servicios.ServiceReservation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/Reservation")
public class ControllerReservation {
    @Autowired
    private ServiceReservation sr;

    @GetMapping("/all")
    public List<Reservation> getReservationAll(){ return sr.getAll(); }

    @GetMapping("/report-clients")
    public List<CountClient> getReportTopClients (){
        return sr.getTopClients();
    }

    @GetMapping("/report-status")
    public CountStatus getReportReservationStatus(){
        return sr.getReservationStatus();
    }

    @GetMapping("/report-dates/{date1}/{date2}")
    public List<Reservation> getReportReservationDate(@PathVariable("date1")String date1, @PathVariable("date2")String date2){
        return sr.getReservationPeriod(date1, date2);
    }

    @GetMapping("/{doc}")
    public Reservation findReservationById(@PathVariable("doc")int doc){
        return sr.getReservation(doc);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Reservation save(@RequestBody Reservation rsv) { return sr.save(rsv); }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Reservation update(@RequestBody Reservation rsv){
        return sr.update(rsv);
    }

    @DeleteMapping("/{doc}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteReservationById(@PathVariable("doc") int doc){
        sr.delete(doc);
    }
}
