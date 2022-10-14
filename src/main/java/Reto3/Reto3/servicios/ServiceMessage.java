package Reto3.Reto3.servicios;

import Reto3.Reto3.entidades.Client;
import Reto3.Reto3.entidades.Message;
import Reto3.Reto3.repositorios.RepositoryMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceMessage {
    @Autowired
    private RepositoryMessage rm;

    public List<Message> getAll(){ return rm.getAll(); }
    public Message getMessage(Integer id){
        return  rm.getMessage(id).get();
    }
    public Message save(Message msg){
        return rm.save(msg);
    }
    public Message update(Message msg){
        return  rm.update(msg);
    }
    public void delete(Integer doc){ rm.deleteMessage(doc); }
}
