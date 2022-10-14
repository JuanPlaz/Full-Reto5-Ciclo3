package Reto3.Reto3.servicios;

import Reto3.Reto3.entidades.Category;
import Reto3.Reto3.repositorios.RepositoryCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceCategory {
    @Autowired
    private RepositoryCategory rc;
    public List<Category> getAll(){ return rc.getAll(); }
    public Category getCategory(Integer id){
        return  rc.getCategory(id).get();
    }
    public Category save(Category cat){
        return rc.save(cat);
    }
    public Category update(Category cat){
        return  rc.update(cat);
    }
    public void delete(Integer doc){ rc.deleteCategory(doc); }
}
