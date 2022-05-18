package com.cardiored.cardio.util;

import java.util.Date;
import java.util.stream.Collectors;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import com.cardiored.cardio.domain.Role;
import org.springframework.security.core.userdetails.User;
import com.cardiored.cardio.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;


public class TokenCreator {
    private static final Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
    private static final JWTVerifier verifier = JWT.require(algorithm).build();

    @Autowired
    private static UserService userService;

    public static String generateAccessToken(String refresh_token, String requestUrl) {
        DecodedJWT decodeJWT = verifier.verify(refresh_token);
        String username = decodeJWT.getSubject();
        com.cardiored.cardio.domain.User user = userService.findByUsername(username); 

        return JWT.create()
                    .withSubject(user.getUsername())
                    .withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 1000))
                    .withIssuer(requestUrl)
                    .withClaim("roles", user.getRoles().stream().map(Role::getName).collect(Collectors.toList()))
                    .sign(algorithm);
    }

    public static String generateAccessToken(Authentication authentication, String requestUrl) {
        User user = (User) authentication.getPrincipal();

        return JWT.create()
                    .withSubject(user.getUsername())
                    .withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 1000))
                    .withIssuer(requestUrl)
                    .withClaim("roles", user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                    .sign(algorithm);
    }

    public static String generateRefreshToken(Authentication authentication, String requestUrl) {
        User user = (User) authentication.getPrincipal();

        return JWT.create()
                    .withSubject(user.getUsername())
                    .withExpiresAt(new Date(System.currentTimeMillis() + 30 * 60 * 1000))
                    .withIssuer(requestUrl)
                    .sign(algorithm);
    }

}
