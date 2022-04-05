package pl.arproject.registration;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.arproject.appuser.AppUser;
import pl.arproject.appuser.AppUserRole;
import pl.arproject.appuser.AppUserService;
import pl.arproject.registration.token.ConfirmationToken;
import pl.arproject.registration.token.ConfirmationTokenService;

import java.time.LocalDateTime;
import java.util.Optional;

@AllArgsConstructor
@Service
public class RegistrationService {

    private final AppUserService appUserService;
    private final RegistrationValidator registrationValidator;
    private final ConfirmationTokenService confirmationTokenService;

    public ResponseEntity<?> signUpUser(RegistrationRequest request) {
        String errorMessage = registrationValidator.validateRegistrationRequest(request);

        if(!errorMessage.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.UNPROCESSABLE_ENTITY)
                    .body(errorMessage);
        }

        return appUserService.signUpUser(
                new AppUser(
                        request.getUsername(),
                        request.getPassword(),
                        request.getEmail(),
                        AppUserRole.USER
                )
        );
    }

    @Transactional
    public ResponseEntity<?> confirmToken(String token) {
        Optional<ConfirmationToken> tokenFromDb = confirmationTokenService.getToken(token);

        if(tokenFromDb.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("token not found");
        }

        ConfirmationToken confirmationToken = tokenFromDb.get();

        if(confirmationToken.getConfirmedAt() != null) {
            return ResponseEntity
                    .status(HttpStatus.UNPROCESSABLE_ENTITY)
                    .body("email already confirmed");
        }

        LocalDateTime expiresAt = confirmationToken.getExpiresAt();

        if(expiresAt.isBefore(LocalDateTime.now())) {
            return ResponseEntity
                    .status(HttpStatus.UNPROCESSABLE_ENTITY)
                    .body("token already expired");
        }

        confirmationTokenService.updateConfirmedAt(token);
        appUserService.enableUser(confirmationToken.getAppUser().getEmail());

        return ResponseEntity.ok().body("verification completed");
    }
}
