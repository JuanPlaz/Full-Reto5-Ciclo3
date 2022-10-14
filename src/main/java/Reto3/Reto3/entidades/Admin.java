package Reto3.Reto3.entidades;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name="admin")
public class Admin implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 250)
    private String name;

    @Column(nullable = false, length = 45)
    private String email;

    @Column(nullable = false, length = 45)
    private String password;

}
