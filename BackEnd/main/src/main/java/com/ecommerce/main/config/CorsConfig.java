package com.ecommerce.main.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


/**
 * @fileoverview Configurazione CORS (Cross-Origin Resource Sharing) per l'applicazione Spring Boot.
 *
 * @class
 * Implementa l'interfaccia WebMvcConfigurer per definire le regole di accesso
 * dalle applicazioni frontend (client) al backend (server).
 * Questa configurazione abilita le richieste dal frontend in esecuzione su http://localhost:5173.
 */


@Configuration
public class CorsConfig implements WebMvcConfigurer{


    @Override
    public void addCorsMappings(CorsRegistry registry){
        registry.addMapping("/**")
        .allowedHeaders("*")
        .allowedMethods("GET", "PUT", "DELETE", "POST","OPTIONS")
        .allowedOrigins("http://localhost:5173")
        .allowCredentials(true);
    }
    
}
