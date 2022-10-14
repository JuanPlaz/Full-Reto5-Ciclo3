package Reto3.Reto3.controladores;

import Reto3.Reto3.entidades.Category;
import Reto3.Reto3.servicios.ServiceCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/Category")
public class ControllerCategory {
    @Autowired
    private ServiceCategory sc;

    @GetMapping("/all")
    public List<Category> getCategoryAll(){ return sc.getAll(); }

    @GetMapping("/{doc}")
    public Category findCategoryById(@PathVariable("doc")int doc){
        return sc.getCategory(doc);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Category save(@RequestBody Category cat) { return sc.save(cat); }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Category update(@RequestBody Category cat){
        return sc.update(cat);
    }

    @DeleteMapping("/{doc}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCategoryById(@PathVariable("doc") int doc){
        sc.delete(doc);
    }
}
