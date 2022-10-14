package Reto3.Reto3.controladores;

import Reto3.Reto3.entidades.Category;
import Reto3.Reto3.entidades.Client;
import Reto3.Reto3.servicios.ServiceClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/Client")
public class ControllerClient {
    @Autowired
    private ServiceClient sc;

    @GetMapping("/all")
    public List<Client> getClientAll(){ return sc.getAll(); }

    @GetMapping("/{doc}")
    public Client findClientById(@PathVariable("doc")int doc){
        return sc.getClient(doc);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Client save(@RequestBody Client cli) { return sc.save(cli); }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Client update(@RequestBody Client cli){
        return sc.update(cli);
    }

    @DeleteMapping("/{doc}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCategoryById(@PathVariable("doc") int doc){
        sc.delete(doc);
    }
}
