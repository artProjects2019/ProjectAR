package pl.arproject.security.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import pl.arproject.appuser.AppUser;
import pl.arproject.appuser.AppUserService;
import pl.arproject.authentication.AuthenticationRequest;
import pl.arproject.exception.UserNotFoundException;
import pl.arproject.security.JwtProperties;


import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static javax.servlet.http.HttpServletResponse.SC_UNAUTHORIZED;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JwtProperties jwtProperties;
    private final AppUserService appUserService;
    private AuthenticationRequest lastAuthenticationRequest;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager,
                                   JwtProperties jwtProperties,
                                   AppUserService appUserService) {

        this.authenticationManager = authenticationManager;
        this.jwtProperties = jwtProperties;
        this.appUserService = appUserService;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
                                                HttpServletResponse response) throws AuthenticationException {

        try {
            AuthenticationRequest authenticationRequest = new ObjectMapper()
                    .readValue(request.getInputStream(), AuthenticationRequest.class);

            lastAuthenticationRequest = authenticationRequest;

            Authentication authenticationToken = new UsernamePasswordAuthenticationToken(
                    authenticationRequest.getUsername(),
                    authenticationRequest.getPassword()
            );

            return authenticationManager.authenticate(authenticationToken);
        } catch (IOException e) {
            throw new UserNotFoundException("invalid username or password");
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authentication) throws IOException, ServletException {

        String jwt = Jwts.builder()
                .setSubject(authentication.getName())
                .claim("authorities", authentication.getAuthorities())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 10L * jwtProperties.getHour()))
                .signWith(jwtProperties.getSecretKey())
                .compact();

        Map<String, String> jsonResponse = new HashMap<>();
        jsonResponse.put("jwt", jwtProperties.getPrefix() + jwt);
        jsonResponse.put("username", authentication.getName());

        response.setContentType(APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(response.getOutputStream(), jsonResponse);
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request,
                                              HttpServletResponse response,
                                              AuthenticationException failed) throws IOException, ServletException {

        response.setContentType(APPLICATION_JSON_VALUE);
        response.setStatus(SC_UNAUTHORIZED);

        Optional<AppUser> userFromDb = appUserService.findByUsername(lastAuthenticationRequest.getUsername());

        if (userFromDb.isPresent()) {
            if (appUserService.passwordsMatchesAndTokenIsNotConfirmed(
                    userFromDb.get(), lastAuthenticationRequest.getPassword())) {

                response.getOutputStream().print("email not confirmed, try to register" +
                        " with the same data and then confirm your email");
            }
            else {
                response.getOutputStream().print("invalid username or password");
            }
        }
        else {
            response.getOutputStream().print("invalid username or password");
        }
    }
}
