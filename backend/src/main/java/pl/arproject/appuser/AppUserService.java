package pl.arproject.appuser;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import pl.arproject.email.RegistrationEmailService;
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
    private final RegistrationEmailService registrationEmailService;

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
        boolean userFound = appUserRepository
                .findByEmailOrUsername(appUser.getEmail(), appUser.getUsername())
                .isPresent();

        if(userFound) {
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
        registrationEmailService.sendEmail(appUser.getEmail(), appUser.getUsername(), token);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("verification link has been sent to your email");
    }

    public void enableUser(String email) {
        appUserRepository.enableUser(email);
    }
}
