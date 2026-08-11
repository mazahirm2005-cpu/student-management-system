package com.example.studentloginsystem.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {


    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();

    }


    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config) throws Exception {

        return config.getAuthenticationManager();

    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {


        http

                // CORS
                .cors(cors -> {})


                // Disable CSRF for React frontend
                .csrf(csrf -> csrf.disable())


                // Session based login
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
                )


                .authorizeHttpRequests(auth -> auth


                        // Public APIs
                        .requestMatchers(
                                "/login",
                                "/register"
                        )
                        .permitAll()


                        // Admin APIs temporarily open
                        // because login is using custom HttpSession
                        .requestMatchers("/admin/**")
                        .permitAll()


                        // Other APIs
                        .anyRequest()
                        .permitAll()

                )

                .formLogin(form -> form.disable())

                .httpBasic(httpBasic -> httpBasic.disable())

                .logout(logout -> logout.disable());




        return http.build();

    }

}