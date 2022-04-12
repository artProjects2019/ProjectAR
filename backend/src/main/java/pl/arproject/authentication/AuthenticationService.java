package pl.arproject.authentication;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import pl.arproject.appuser.AppUserService;
import pl.arproject.security.jwt.JwtUtil;

@AllArgsConstructor
@Service
public class AuthenticationService {

    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final AppUserService appUserService;

    public ResponseEntity<?> authenticateUser(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        UserDetails userDetails = appUserService.loadUserByUsername(request.getUsername());
        String jwt = jwtUtil.generateJwt(userDetails);

        return ResponseEntity.ok(new AuthenticationResponse(jwt, request.getUsername()));
    }
}
