package Reto3.Reto3.controladores;

import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SecurityAdapter extends WebSecurityConfigurerAdapter {
    protected void configure(HttpSecurity http) throws Exception{
        http.authorizeRequests(a -> a
                .antMatchers("/", "/error", "/webjars/**",
                        "/api/**").permitAll()
                .anyRequest().authenticated()
        ).exceptionHandling(e -> e
                .authenticationEntryPoint(new HttpStatusEntryPoint((HttpStatus.UNAUTHORIZED)))
        ).oauth2Login().defaultSuccessUrl("/", true);

        http.cors().and().csrf().disable();
    }
}
