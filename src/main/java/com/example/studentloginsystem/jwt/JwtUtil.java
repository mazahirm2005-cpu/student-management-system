package com.example.studentloginsystem.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {


    private static final String SECRET =
            "mysecretkeymysecretkeymysecretkey123456";


    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());


    // Generate JWT Token (2 Minutes Expiry)
    public String generateToken(String username) {

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())

                // Token expiry = 2 minutes
                .setExpiration(
                        new Date(System.currentTimeMillis() + 1000 * 60 * 2)
                )

                .signWith(key)
                .compact();
    }



    // Extract Username from Token
    public String extractUsername(String token) {

        return getClaims(token)
                .getSubject();

    }



    // Validate Token
    public boolean validateToken(String token, String username) {


        String extractedUsername =
                extractUsername(token);


        return extractedUsername.equals(username)
                && !isTokenExpired(token);

    }



    // Check Token Expiry
    private boolean isTokenExpired(String token) {


        return getClaims(token)
                .getExpiration()
                .before(new Date());

    }



    // Get Token Claims
    private Claims getClaims(String token) {


        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

    }

}