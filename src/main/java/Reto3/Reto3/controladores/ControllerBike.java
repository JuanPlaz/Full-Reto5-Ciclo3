package Reto3.Reto3.controladores;

import Reto3.Reto3.entidades.Bike;
import Reto3.Reto3.servicios.ServiceBike;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/Bike")
public class ControllerBike {
    @Autowired
    private ServiceBike sb;

    @GetMapping("/all")
    public List<Bike> getBikeAll(){ return sb.getAll(); }

    @GetMapping("/{doc}")
    public Bike findBikeById(@PathVariable("doc")int doc){
        return sb.getBike(doc);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Bike save(@RequestBody Bike cat) { return sb.save(cat); }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Bike update(@RequestBody Bike cat){
        return sb.update(cat);
    }

    @DeleteMapping("/{doc}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteBikeById(@PathVariable("doc") int doc){
        sb.delete(doc);
    }
}
