package Reto3.Reto3.controladores;

import Reto3.Reto3.entidades.Category;
import Reto3.Reto3.entidades.Message;
import Reto3.Reto3.servicios.ServiceMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/Message")
public class ControllerMessage {
    @Autowired
    private ServiceMessage sm;

    @GetMapping("/all")
    public List<Message> getMessageAll(){ return sm.getAll(); }

    @GetMapping("/{doc}")
    public Message findMessageById(@PathVariable("doc")int doc){
        return sm.getMessage(doc);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Message save(@RequestBody Message cat) { return sm.save(cat); }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Message update(@RequestBody Message cat){
        return sm.update(cat);
    }

    @DeleteMapping("/{doc}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteMessageById(@PathVariable("doc") int doc){
        sm.delete(doc);
    }
}
