package Reto3.Reto3.repositorios;

import Reto3.Reto3.entidades.Category;
import Reto3.Reto3.entidades.Client;
import Reto3.Reto3.repositorios.CRUD.RepositoryCrudCategory;
import Reto3.Reto3.repositorios.CRUD.RepositoryCrudClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class RepositoryClient {
    @Autowired
    private RepositoryCrudClient rc;

    public List<Client> getAll() { return (List<Client>) rc.findAll(); }
    public Optional<Client> getClient(int id) { return rc.findById(id); }

    public Client save(Client cli) {
        if (cli.getIdClient() == null) {
            return rc.save(cli);
        } else {
            Optional<Client> e = rc.findById(cli.getIdClient());
            if (e == null) {
                return rc.save(cli);
            } else {
                return cli;
            }
        }
    }

    public Client update(Client cli) {
        Optional<Client> e = rc.findById(cli.getIdClient());
        if (!e.isEmpty()) {
            if (cli.getName() != null)
            {
                e.get().setName(cli.getName());
            }
            if (cli.getEmail() != null)
            {
                e.get().setEmail(cli.getEmail());
            }
            if (cli.getAge() != null)
            {
                e.get().setAge(cli.getAge());
            }
            rc.save(e.get());
            return e.get();
        } else {
            return cli;
        }
    }

    public void delete(Client cli) { rc.delete(cli); }

    public boolean deleteClient(int id) {
        boolean aBoolean = getClient(id).map(client -> {
            rc.delete(client);
            return true;
        }).orElse(false);
        return aBoolean;
    }
}
