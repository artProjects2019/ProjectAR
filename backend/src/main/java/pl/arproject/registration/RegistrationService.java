package pl.arproject.registration;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.arproject.appuser.AppUser;
import pl.arproject.appuser.AppUserRepository;
import pl.arproject.appuser.AppUserRole;
import pl.arproject.email.RegistrationEmailService;
import pl.arproject.registration.token.ConfirmationToken;
import pl.arproject.registration.token.ConfirmationTokenService;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@AllArgsConstructor
@Service
public class RegistrationService {

    private final AppUserRepository appUserRepository;
    private final RegistrationValidator registrationValidator;
    private final RegistrationEmailService registrationEmailService;
    private final ConfirmationTokenService confirmationTokenService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public ResponseEntity<?> registerUser(RegistrationRequest request) {
        String errorMessage = registrationValidator.validateRegistrationRequest(request);

        // if registration data are invalid
        if(!errorMessage.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.UNPROCESSABLE_ENTITY)
                    .body(errorMessage);
        }

        AppUser appUser = new AppUser(
                request.getUsername(),
                request.getPassword(),
                request.getEmail(),
                AppUserRole.USER);

        boolean userFound = appUserRepository
                .findByEmailOrUsername(appUser.getEmail(), appUser.getUsername())
                .isPresent();

        // if email or username is already taken
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

    @Transactional
    public ResponseEntity<?> confirmToken(String token) {
        Optional<ConfirmationToken> tokenFromDb = confirmationTokenService.getToken(token);

        // if token does not exist
        if(tokenFromDb.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("token not found");
        }

        ConfirmationToken confirmationToken = tokenFromDb.get();

        // if token is already confirmed
        if(confirmationToken.getConfirmedAt() != null) {
            return ResponseEntity
                    .status(HttpStatus.UNPROCESSABLE_ENTITY)
                    .body("email already confirmed");
        }

        LocalDateTime expiresAt = confirmationToken.getExpiresAt();

        // if token already expired
        if(expiresAt.isBefore(LocalDateTime.now())) {
            return ResponseEntity
                    .status(HttpStatus.UNPROCESSABLE_ENTITY)
                    .body("token already expired");
        }

        confirmationTokenService.updateConfirmedAt(token);
        appUserRepository.enableUser(confirmationToken.getAppUser().getEmail());

        return ResponseEntity.ok().body("verification completed");
    }
}
