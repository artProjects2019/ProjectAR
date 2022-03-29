package pl.arproject.appuser;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import pl.arproject.registration.token.ConfirmationToken;
import pl.arproject.registration.token.ConfirmationTokenService;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@AllArgsConstructor
@Service
public class AppUserService implements UserDetailsService {

    private final AppUserRepository appUserRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ConfirmationTokenService confirmationTokenService;

    @Override
    public UserDetails loadUserByUsername(String email) throws WebApplicationException {
        return appUserRepository.findByEmail(email)
                .orElseThrow(() -> new WebApplicationException(Response
                        .status(Response.Status.NOT_FOUND)
                        .entity("user with email: " + email + " not found").build()));
    }

    public ResponseEntity<?> findAllUsers() {
        return ResponseEntity.ok(appUserRepository.findAll());
    }

    public ResponseEntity<?> findUserByUsername(String username) {
        Optional<AppUser> userFromDb = appUserRepository.findByUsername(username);

        if(userFromDb.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("user " + username + " not found");
        }

        return ResponseEntity.ok(userFromDb);
    }

    public ResponseEntity<?> signUpUser(AppUser appUser) {
        boolean userFoundByEmail = appUserRepository.findByEmail(appUser.getEmail()).isPresent();
        boolean userFoundByUsername = appUserRepository.findByUsername(appUser.getUsername()).isPresent();

        if(userFoundByEmail || userFoundByUsername) {
            // if there is an unconfirmed email and the username and password are the same
            // then send an email with the confirmation link

            // right now just inform that email is already taken
            return ResponseEntity
                    .status(HttpStatus.UNPROCESSABLE_ENTITY)
                    .body("email or username are already taken");
        }

        String encodedPassword = bCryptPasswordEncoder.encode(appUser.getPassword());
        appUser.setPassword(encodedPassword);
        appUserRepository.save(appUser);

        String token = UUID.randomUUID().toString();
        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15),
                appUser
        );

        confirmationTokenService.saveConfirmationToken(confirmationToken);

        // Send email with the confirmation link

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(token);
    }

    public void enableUser(String email) {
        appUserRepository.enableUser(email);
    }
}
